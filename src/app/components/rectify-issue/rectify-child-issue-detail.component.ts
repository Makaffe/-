import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import UUID from 'uuidjs';
import { FormUtil, ObjectUtil } from '@ng-mt-framework/util';
import { NzMessageService } from 'ng-zorro-antd';
import { TreeUtil } from '@mt-framework-ng/util';
import { OrganizationService, UserService } from '@ng-mt-framework/api';
import { RectifyProblemDTO } from './model/rectify-problem-dto';

@Component({
  selector: 'app-rectify-child-issue-detail',
  templateUrl: './rectify-child-issue-detail.component.html',
})
export class RectifyChildIssueDetailComponent implements OnInit {
  /**
   * 数据更改通知事件
   */
  @Output()
  dataChange = new EventEmitter();

  /**
   * 表单组件
   */
  @ViewChild('form', { static: false })
  form: NgForm;

  /**
   * 父问题
   */
  @Input()
  problemItem: RectifyProblemDTO = null;

  /**
   * 当前编辑对象
   */
  currentItem: RectifyProblemDTO = this.initProblemDTO();

  /**
   * 整改部门树
   */
  organizationTree = [];

  /**
   * 整改负责人列表
   */
  dutyUserList = [];

  /**
   * 弹窗可见性
   */
  isVisible = false;

  /**
   * 数据请求标志
   */
  loading = false;

  constructor(
    private msg: NzMessageService,
    private organizationService: OrganizationService,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.organizationService.getOrganizationTreeOfEmployeeOrUser().subscribe(data => {
      this.organizationTree = TreeUtil.populateTreeNodes(data, 'id', 'name', 'children');
    });
    this.userService.findAll().subscribe(data => {
      if (data) {
        this.dutyUserList = data;
      }
    });
  }

  /**
   * 取消
   */
  handleCancel() {
    this.isVisible = false;
    FormUtil.resetForm(this.form.form);
  }

  /**
   * 保存
   */
  saveData() {
    if (!this.validate()) {
      this.msg.warning('请补全标星号的必填信息项！');
      return;
    }
    this.dataChange.emit(ObjectUtil.deepClone(this.currentItem));
    this.msg.success('操作成功！');
    this.handleCancel();
  }

  /**
   * 验证表单
   */
  private validate() {
    return FormUtil.validateForm(this.form.form);
  }

  /**
   * 初始化编辑页面
   * @param item 数据源dto
   */
  edit(item?: RectifyProblemDTO): void {
    this.currentItem = this.initProblemDTO(item);
    this.currentItem.auditPostId = this.problemItem.auditPost.id;
    this.currentItem.parentId = this.problemItem.id;
    if (!item) {
      this.currentItem.sendStatus = 'NOT_ISSUED';
      this.currentItem.transferStatus = 'NOT_HANDED_OVER';
      this.currentItem.trackStatus = 'NOT_RECTIFIED';
      this.currentItem.source = this.problemItem.source;
    }
    this.isVisible = true;
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
      zgdw: item ? item.zgdw : null,
      sjje: item ? item.sjje : null,
      zgjzsj: item ? item.zgjzsj : null,
    };
  }
}
