import { formatDate } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  LOCALE_ID,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { _HttpClient } from '@delon/theme';
import { FormUtil, TreeUtil } from '@mt-framework-ng/util';
import { OrganizationService, UserService } from '@ng-mt-framework/api';
import { ObjectUtil } from '@ng-mt-framework/util';
import { NzMessageService } from 'ng-zorro-antd';
import UUID from 'uuidjs';
import { AuditPostWatchComponent } from './audit-post-watch.component';
import { RectifyProblemDTO } from './model/rectify-problem-dto';
import { RectifyChildIssueDetailComponent } from './rectify-child-issue-detail.component';
import { RectifyProblemService } from './service/RectifyProblemService';
import { ProposalTemplateService } from '../advice-template/service/ProposalTemplateService';

@Component({
  selector: 'app-rectify-issue-split',
  templateUrl: './rectify-issue-split.component.html',
  styles: [],
})
export class RectifyIssueSplitComponent implements OnInit, AfterViewInit {
  constructor(
    private proposalTemplateService: ProposalTemplateService,
    private rectifyProblemService: RectifyProblemService,
    private organizationService: OrganizationService,
    private msg: NzMessageService,
    private userService: UserService,
    private http: _HttpClient,
    @Inject(LOCALE_ID) private locale: string,
  ) { }

  /**
   * 临时数据
   */
  currentItem: RectifyProblemDTO = new RectifyProblemDTO();

  /**
   * 数据改变通知事件
   */
  @Output()
  notification = new EventEmitter();

  /**
   * 表单组件
   */
  @ViewChild('form', { static: false })
  form: NgForm;

  /**
   * 子问题详情组件
   */
  @ViewChild('rectifyChildIssueDetailComponent', { static: false })
  rectifyChildIssueDetailComponent: RectifyChildIssueDetailComponent;

  /**
   * 审计报告查看组件
   */
  @ViewChild('auditPostWatchComponent', { static: false })
  auditPostWatchComponent: AuditPostWatchComponent;

  /**
   * 模态框是否可见
   */
  isVisible = false;

  /**
   * 模态框高度
   */
  height = null;

  /**
   * 后台请求标识
   */
  loading = false;

  /**
   * 是否查看
   */
  isWatch = false;

  /**
   * 左侧宽度
   */
  leftSize = 40;

  /**
   * 右侧宽度
   */
  rightSize = 60;

  /**
   * 子问题列表
   */
  childrenProblemList = [];

  /**
   * 当前整改问题对象(父问题)
   */
  problemItem: RectifyProblemDTO = new RectifyProblemDTO();

  /**
   * 整改部门树
   */
  organizationTree = [];

  /**
   * 构建整改单位到人  map
   */
  organizationTreeMap: Map<string, string> = new Map<string, string>();

  /**
   * 整改部门map
   */
  organizationMap: Map<string, string> = new Map<string, string>();

  /**
   * 整改负责人列表
   */
  dutyUserList = [];

  userMap = new Map<string, any>();

  /**
   * 整改负责人/从组织到人 id数组
   */
  dutyUserIds = [];

  /**
   * 选择的整改对象
   */
  values: string[] | null = null;

  /** 审计建议模板 */
  proposalTemplateAll = [];
  proposalTemplates = [];

  /** 审计建议 */
  tempAdvice = null;

  /**
   * 删除子问题
   * @param item 数据
   */
  onDelete(item: any): void {
    this.childrenProblemList.splice(this.childrenProblemList.indexOf(item), 1);
    this.childrenProblemList = [...this.childrenProblemList];
  }

  ngOnInit(): void {
    // 加载整改负责人级联选择
    this.organizationService.findUserTree().subscribe(data => {
      let CascadeData = [];
      CascadeData = this.fomatCascadeData(data);
      this.organizationTree = CascadeData;
    });
    this.userService.findAll().subscribe(data => {
      if (data) {
        this.dutyUserList = data;
        data.forEach(d => {
          this.userMap.set(d.id, d);
        });
      }
    });
    this.loadProposalTemplates();
  }

  /**
   * 加载审计建议模板
   */
  loadProposalTemplates() {
    this.proposalTemplateService.findAll().subscribe(result => {
      if (result) {
        this.proposalTemplateAll = result;
      }
    });
  }

  /**
   * 获取引用模板
   */
  getProposalTemplates(event?: string) {
    this.proposalTemplates = [];
    if (event) {
      this.proposalTemplateAll.forEach(data => {
        if (event === data.rectifyProblemType.id) {
          this.proposalTemplates.push(data);
        }
      });
    }
    this.proposalTemplates = [...this.proposalTemplates];
  }

  /**
   * 选中引用模板
   */
  proposalTemplateChange(event: string) {
    this.tempAdvice = null;
    if (event) {
      this.proposalTemplateAll.forEach(data => {
        if (data.id === event) {
          this.tempAdvice = data.auditProposal;
        }
      });
    }
  }

  /**
   * 格式成级联选择数据
   */
  fomatCascadeData(data?: Array<any>): Array<RectifyProblemDTO> {
    data = data.filter((row) => row.id > 0);
    data = [...data];
    data.forEach(item => {
      this.organizationTreeMap.set(item.id, item.name);
      item.value = item.id;
      item.label = item.name;
      item.children = item.userBaseDTOS && item.userBaseDTOS.length > 0 ? item.userBaseDTOS : item.children;
      if (item && item.children && item.children.length > 0) {
        this.fomatCascadeData(item.children);
      } else if (!item.organizationType || !item.children || item.children.length === 0) {
        item.isLeaf = true;
      }
    });
    return [...data];
  }
  /**
   * 关闭
   */
  handleCancel() {
    this.childrenProblemList = [];
    this.isVisible = false;
    FormUtil.resetForm(this.form.form);
  }

  /**
   * 验证表单
   */
  private validate() {
    return FormUtil.validateForm(this.form.form);
  }

  /**
   * 保存
   */
  save() {
    if (!this.validate()) {
      this.msg.warning('请补全标星号信息！');
      return;
    }
    this.loading = true;
    this.currentItem.rectifyProblemTypeId = this.currentItem.rectifyProblemType ? this.currentItem.rectifyProblemType.id : null;
    this.currentItem.mainType = this.currentItem.rectifyProblemType && this.currentItem.rectifyProblemType.parent
      ? this.currentItem.rectifyProblemType.parent.id : this.currentItem.rectifyProblemTypeId;
    if (this.childrenProblemList.length > 0) {
      this.childrenProblemList.forEach(item => {
        item.auditUserId = this.currentItem.auditUserId;
      });
    }
    this.currentItem.orgLevel = this.dutyUserIds.toString();
    this.currentItem.childrenRectifyProblemEditInfoDTO = this.childrenProblemList;

    this.rectifyProblemService.rectifyProblemSplit(this.currentItem).subscribe(
      () => {
        this.msg.success('操作成功！');
        this.childrenProblemList = [];
        this.notification.emit();
        this.handleCancel();
      },
      () => { },
      () => {
        this.loading = false;
      },
    );
  }

  /**
   * 初始化编辑页面
   * @param item 数据源
   * @param isWatch 是否查看
   */
  edit(item: RectifyProblemDTO, isWatch: boolean) {
    this.isVisible = true;
    // this.rectifyProblemService.rectifyTrackById(item.id).subscribe(data => {
    //   this.getProposalTemplates(data.rectifyProblemType.id);
    //   this.setTabContentHeight();
    //   this.isWatch = isWatch;
    //   this.problemItem = new RectifyProblemDTO(data);
    //   this.currentItem = new RectifyProblemDTO(data);
    //   if (data.children && data.children.length > 0) {
    //     this.currentItem.children.forEach(problem => {
    //       this.rectifyProblemService.rectifyTrackById(problem.id).subscribe(row => {
    //         row.rectifyProblemTypeId = row.rectifyProblemType ? row.rectifyProblemType.id : null;
    //         row.uuid = row.uuid
    //           ? row.uuid : this.childrenProblemList.length > 0
    //             ? this.childrenProblemList[this.childrenProblemList.length - 1].uuid + 1 : '1';

    //         row.unitAndDepartment = '';
    //         let orgs = row.orgLevel ? row.orgLevel.split(',') : [];
    //         orgs = orgs.slice(0, orgs.length - 2);
    //         orgs.forEach(org => {
    //           row.unitAndDepartment = row.unitAndDepartment + this.organizationTreeMap.get(org) + '/';
    //         });
    //         row.unitAndDepartment = row.unitAndDepartment.slice(0, row.unitAndDepartment.length - 1);
    //         if (row.dutyUser) {
    //           row.dutyUserName = this.organizationTreeMap.get(row.dutyUser.id);
    //         }
    //         this.childrenProblemList.push(new RectifyProblemDTO(row));
    //         this.childrenProblemList = [...this.childrenProblemList];

    //         console.log(this.childrenProblemList);
    //       });
    //     });
    //   }

    //   this.dutyUserIds = item && item.orgLevel ? item.orgLevel.split(',') : [];
    //   this.isVisible = true;
    // });
  }

  /**
   * 新增子问题
   */
  addChildrenProblem() {
    this.rectifyChildIssueDetailComponent.edit(null, false, this.currentItem.rectifyProblemType);
  }

  /**
   * 编辑子问题
   * @param item 子问题
   */
  startEdit(item: RectifyProblemDTO) {
    this.rectifyChildIssueDetailComponent.edit(item, false, this.currentItem.rectifyProblemType);
  }

  /**
   * 查看子问题
   * @param item 子问题
   */
  watchChildrenProblem(item: RectifyProblemDTO) {
    this.rectifyChildIssueDetailComponent.edit(item, true, this.currentItem.rectifyProblemType);
  }

  /**
   * 获取子问题
   * @param childrenProblem 子问题
   */
  getChildrenProblem(childrenProblem: RectifyProblemDTO) {
    const unitAndDepartment = childrenProblem.unitAndDepartment;
    Object.assign(childrenProblem, { unitAndDepartment });
    childrenProblem.uuid = childrenProblem.uuid
      ? childrenProblem.uuid : this.childrenProblemList.length > 0
        ? this.childrenProblemList[this.childrenProblemList.length - 1].uuid + 1 : '1';
    const index = this.childrenProblemList.findIndex(data => data.uuid === childrenProblem.uuid);
    if (index > -1) {
      this.childrenProblemList[index] = childrenProblem;
    } else if (this.childrenProblemList.length > 0
      && this.childrenProblemList[this.childrenProblemList.length - 1].id === this.currentItem.id) {
      this.childrenProblemList[this.childrenProblemList.length - 1] = childrenProblem;
    } else {
      this.childrenProblemList.push(childrenProblem);
    }
    this.childrenProblemList = [...this.childrenProblemList];
    console.log('ziwentilieb===', this.childrenProblemList);
  }

  /**
   * 折叠或展开问题详情
   */
  fold() {
    if (this.leftSize === 0) {
      this.leftSize = 40;
      this.rightSize = 60;
    } else {
      this.leftSize = 0;
      this.rightSize = 100;
    }
  }

  /**
   * 格式化date
   * @param date 标准时间格式
   * @returns string
   */
  formatDateFun(date: Date) {
    if (date) {
      return formatDate(date, 'yyyy-MM-dd', this.locale);
    } else {
      return '';
    }
  }

  /**
   * 查看审计报告
   * @param auditPostId 审计报告id
   */
  watchAuditPost(auditPostId: string) {
    this.auditPostWatchComponent.edit(auditPostId);
  }

  /**
   * 拖动结束调用的方法
   * @param sizes 左右两块的尺寸
   */
  dragEnd(sizes: Array<any>) {
    this.leftSize = sizes[0];
    this.rightSize = sizes[1];
  }


  /**
   * 设置设置弹窗高度
   */
  private setTabContentHeight() {
    // 浏览器内容区高度
    const tabContentHeight = document.body.clientHeight;
    this.height = tabContentHeight * 0.8 + 'px';
  }

  ngAfterViewInit() {
    // this.setTabContentHeight();
  }

  @HostListener('window:resize', ['$event'])
  onResize($event) {
    this.setTabContentHeight();
  }

  /**
   * 选择整改负责人
   */
  dutyUserChange(event: Array<any>) {
    if (event && event.length > 0) {
      if (event[event.length - 1].account) {
        const rectifyUnitIds = [];
        const rectifyDepartmentIds = [];
        event.forEach(e => {
          if (e.organizationType && e.organizationType === 'UNIT') {
            rectifyUnitIds.push(e.id);
          }
          if (e.organizationType && e.organizationType === 'DEPARTMENT') {
            rectifyDepartmentIds.push(e.id);
          }
        });
        this.currentItem.rectifyUnitId =
          rectifyUnitIds.length > 0 ? rectifyUnitIds[rectifyUnitIds.length - 1] : null;
        this.currentItem.rectifyDepartmentId =
          rectifyDepartmentIds.length > 0 ? rectifyDepartmentIds[rectifyDepartmentIds.length - 1] : null;
        this.currentItem.dutyUserId = event[event.length - 1].id;
      } else {
        this.dutyUserIds = [];
        this.msg.warning('整改负责人选项请具体到人员！');
      }

    }
  }

  /**
   * 引用建议模板
   */
  confirmReference() {
    this.currentItem.advice = this.tempAdvice;
  }
}
