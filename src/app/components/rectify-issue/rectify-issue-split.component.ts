import { formatDate } from '@angular/common';
import { Component, EventEmitter, Inject, LOCALE_ID, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormUtil, TreeUtil } from '@mt-framework-ng/util';
import { OrganizationService, UserService } from '@ng-mt-framework/api';
import { ObjectUtil } from '@ng-mt-framework/util';
import { NzMessageService } from 'ng-zorro-antd';
import UUID from 'uuidjs';
import { RectifyProblemDTO } from './model/rectify-problem-dto';
import { RectifyChildIssueDetailComponent } from './rectify-child-issue-detail.component';
import { RectifyProblemService } from './service/RectifyProblemService';

@Component({
  selector: 'app-rectify-issue-split',
  templateUrl: './rectify-issue-split.component.html',
  styles: [],
})
export class RectifyIssueSplitComponent implements OnInit {
  constructor(
    private rectifyProblemService: RectifyProblemService,
    private organizationService: OrganizationService,
    private msg: NzMessageService,
    private userService: UserService,
    @Inject(LOCALE_ID) private locale: string,
  ) {}

  /**
   * 临时数据
   */
  currentItem = {
    zgzzfzr: null,
    zgdw: null,
    rectifyDepartmentId: null,
    dutyUserId: null,
    zgjzsj: null,
    sjje: 123,
  };

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
   * 模态框是否可见
   */
  isVisible = false;

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
   * 删除子问题
   * @param uuid 数据uuid
   */
  onDelete(uuid: string): void {
    this.childrenProblemList = this.childrenProblemList.filter(item => item.uuid !== uuid);
    this.childrenProblemList = [...this.childrenProblemList];
  }

  ngOnInit(): void {
    this.organizationService.getOrganizationTreeOfEmployeeOrUser().subscribe(data => {
      this.organizationTree = TreeUtil.populateTreeNodes(data, 'id', 'name', 'children');
      this.recursionOrganizationTree(data);
    });
    this.userService.findAll().subscribe(data => {
      if (data) {
        this.dutyUserList = data;
        this.dutyUserList.forEach(user => {
          this.dutyUserMap.set(user.id, user.name);
        });
      }
    });
  }

  /**
   * 递归organizationTree设置organizationMap用于方便回显
   * @param organizationTree 组织树
   */
  recursionOrganizationTree(organizationTree: Array<any>) {
    organizationTree.forEach(organization => {
      this.organizationMap.set(organization.id, organization.name);
      if (organization.children && organization.children.length > 0) {
        this.recursionOrganizationTree(organization.children);
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
    this.rectifyProblemService.rectifyProblemSplit(this.problemItem.id, this.childrenProblemList).subscribe(
      () => {
        this.msg.success('问题拆分成功！');
        this.notification.emit();
        this.handleCancel();
      },
      () => {},
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
    this.isWatch = isWatch;
    this.problemItem = ObjectUtil.deepClone(item);
    if (item.children && item.children.length > 0) {
      item.children.forEach(problem => {
        this.childrenProblemList.push(this.initProblemDTO(problem));
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
   * 初始化dto
   * @param item 数据源dto
   */
  initProblemDTO(item?: RectifyProblemDTO): RectifyProblemDTO {
    return {
      id: item ? item.id : null,
      uuid: item ? (item.uuid ? item.uuid : UUID.generate()) : UUID.generate(),
      name: item ? item.name : null,
      type: item ? item.type : null,
      remark: item ? item.remark : null,
      advice: item ? item.advice : null,
      source: item ? item.source : null,
      sendStatus: item ? item.sendStatus : null,
      trackStatus: item ? item.trackStatus : null,
      auditPostId: item ? (item.auditPost ? item.auditPost.id : null) : null,
      transferStatus: item ? item.transferStatus : null,
      oaSendCase: item ? item.oaSendCase : false,
      rectifyDepartment: item ? item.rectifyDepartment : null,
      rectifyDepartmentId: item
        ? item.rectifyDepartmentId
          ? item.rectifyDepartmentId
          : item.rectifyDepartment
          ? item.rectifyDepartment.id
          : null
        : null,
      dutyUser: item ? item.dutyUser : null,
      dutyUserId: item ? (item.dutyUserId ? item.dutyUserId : item.dutyUser ? item.dutyUser.id : null) : null,
      oaSendTime: item ? item.oaSendTime : null,
      transferTime: item ? item.transferTime : null,
      transferCase: item ? item.transferCase : false,
      rectifyEndTime: item ? item.rectifyEndTime : null,
      rectifyCompleteTime: item ? item.rectifyCompleteTime : null,
      rectifyBackFeedHz: item ? item.rectifyBackFeedHz : null,
      rectifyBackFeedHzUnit: item ? item.rectifyBackFeedHzUnit : null,
      rectifyProgress: item ? item.rectifyProgress : null,
      memo: item ? item.memo : null,
      parentId: item ? (item.parent ? item.parent.id : null) : null,
      children: [],
    };
  }

  /**
   * 整改负责人name回显
   * @param id 整改负责人id
   * @returns 整改负责人name
   */
  convertdutyUser(id: string) {
    if (id) {
      return this.dutyUserMap.get(id);
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
    const index = this.childrenProblemList.findIndex(data => data.uuid === childrenProblem.uuid);
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
}
