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

@Component({
  selector: 'app-rectify-issue-split',
  templateUrl: './rectify-issue-split.component.html',
  styles: [],
})
export class RectifyIssueSplitComponent implements OnInit, AfterViewInit {
  constructor(
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
  problemItem: RectifyProblemDTO = null;

  /**
   * 整改部门树
   */
  organizationTree = [];

  /**
   * 整改部门map
   */
  organizationMap: Map<string, string> = new Map<string, string>();

  /**
   * 整改负责人列表
   */
  dutyUserList = [];

  /**
   * 整改负责人map
   */
  dutyUserMap: Map<string, string> = new Map<string, string>();

  /**
   * 选择的整改对象
   */
  values: string[] | null = null;

  /**
   * 删除子问题
   * @param uuid 数据uuid
   */
  onDelete(uuid: string): void {
    this.childrenProblemList = this.childrenProblemList.filter(item => item.uuid !== uuid);
    this.childrenProblemList = [...this.childrenProblemList];
  }

  ngOnInit(): void {
    // 加载整改负责人级联选择
    this.organizationService.findUserTree().subscribe(data => {
      this.fomatCascadeData(data);
      this.organizationTree = [...data];
    });
    this.userService.findAll().subscribe(data => {
      console.log('userlist', data);
      if (data) {
        this.dutyUserList = data;
        this.dutyUserList.forEach(user => {
          this.dutyUserMap.set(user.id, user.name);
        });
      }
    });
  }

  /**
   * 格式成级联选择数据
   */
  fomatCascadeData(data?: Array<any>) {
    data.forEach(item => {
      item.value = item.id;
      item.label = item.name;
      item.children = item.userBaseDTOS && item.userBaseDTOS.length > 0 ? item.userBaseDTOS : item.children;
      if (item && item.children && item.children.length > 0) {
        this.fomatCascadeData(item.children);
      } else if (!item.organizationType) {
        item.isLeaf = true;
      }
    });
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
    this.rectifyProblemService.rectifyProblemSplit(this.problemItem, this.childrenProblemList).subscribe(
      () => {
        this.msg.success('问题拆分成功！');
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
    this.setTabContentHeight();
    this.isWatch = isWatch;
    this.problemItem = new RectifyProblemDTO(item);
    this.currentItem = new RectifyProblemDTO(item);
    if (item.children && item.children.length > 0) {
      item.children.forEach(problem => {
        this.childrenProblemList.push(new RectifyProblemDTO(problem));
        this.childrenProblemList = [...this.childrenProblemList];
      });
    }
    this.isVisible = true;
  }

  /**
   * 新增子问题
   */
  addChildrenProblem() {
    this.rectifyChildIssueDetailComponent.edit(null, false);
  }

  /**
   * 编辑子问题
   * @param item 子问题
   */
  startEdit(item: RectifyProblemDTO) {
    this.rectifyChildIssueDetailComponent.edit(item, false);
  }

  /**
   * 查看子问题
   * @param item 子问题
   */
  watchChildrenProblem(item: RectifyProblemDTO) {
    this.rectifyChildIssueDetailComponent.edit(item, true);
  }

  /**
   * 整改负责人name回显
   * @param id 整改负责人id
   * @returns 整改负责人name
   */
  convertDutyUser(ids: Array<string>) {
    console.log('id', ids);
    if (ids && ids.length > 0) {
      return this.dutyUserMap.get(ids[ids.length - 1]);
    }
  }

  /**
   * 整改部门name回显
   * @param id 整改部门id
   * @returns 整改部门name
   */
  convertOrganization(id: string) {
    if (id) {
      return this.organizationMap.get(id);
    }
  }

  /**
   * 获取子问题
   * @param childrenProblem 子问题
   */
  getChildrenProblem(childrenProblem: RectifyProblemDTO) {
    const index = this.childrenProblemList.findIndex(data => data.id === childrenProblem.id);
    if (index > -1) {
      this.childrenProblemList[index] = childrenProblem;
    } else {
      this.childrenProblemList.push(childrenProblem);
    }
    this.childrenProblemList = [...this.childrenProblemList];
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
    this.auditPostWatchComponent.isVisible = true;
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
}
