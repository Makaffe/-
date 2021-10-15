import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormUtil, TreeUtil } from '@mt-framework-ng/util';
import { OrganizationService, UserService } from '@ng-mt-framework/api';
import { ObjectUtil } from '@ng-mt-framework/util';
import { NzMessageService } from 'ng-zorro-antd';
import UUID from 'uuidjs';
import { RectifyProblemDTO } from './model/rectify-problem-dto';
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
  ) {}

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
   * 模态框是否可见
   */
  isVisible = false;

  /**
   * 后台请求标识
   */
  loading = false;

  /**
   * 子问题列表
   */
  childrenProblemList = [];

  /**
   * 当前整改问题对象
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
   * 问题类型列表
   */
  problemTypeList = [
    {
      label: '问题类型1',
      value: 'PROBLEM_ONE',
    },
    {
      label: '问题类型2',
      value: 'PROBLEM_TWO',
    },
  ];

  /**
   * 行内编辑开关
   */
  toggleEdit = false;

  /**
   * 行内编辑缓存
   */
  editCache: { [key: string]: { edit: boolean; data: any } } = {};

  /**
   * 开始行内编辑
   * @param uuid 数据uuid
   */
  startEdit(uuid: string): void {
    this.editCache[uuid].edit = true;
    this.toggleEdit = true;
  }

  /**
   * 取消行内编辑
   * @param uuid 数据uuid
   */
  cancelEdit(uuid: string): void {
    const index = this.childrenProblemList.findIndex(item => item.uuid === uuid);
    this.editCache[uuid] = {
      data: { ...this.childrenProblemList[index] },
      edit: false,
    };
    this.toggleEdit = false;
  }

  /**
   * 保存行内编辑
   * @param uuid 数据uuid
   */
  saveEdit(uuid: string): void {
    if (!this.validate()) {
      this.msg.warning('请补全信息！');
      return;
    }
    const index = this.childrenProblemList.findIndex(item => item.uuid === uuid);
    Object.assign(this.childrenProblemList[index], this.editCache[uuid].data);
    this.editCache[uuid].edit = false;
    this.toggleEdit = false;
  }

  /**
   * 删除子问题
   * @param uuid 数据uuid
   */
  onDelete(uuid: string): void {
    this.childrenProblemList = this.childrenProblemList.filter(item => item.uuid !== uuid);
    this.childrenProblemList = [...this.childrenProblemList];
  }

  /**
   * 更新行内编辑缓存数据
   */
  updateEditCache(): void {
    this.childrenProblemList.forEach(item => {
      this.editCache[item.uuid] = {
        edit: false,
        data: { ...item },
      };
    });
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
      data => {
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
   */
  edit(item?: RectifyProblemDTO) {
    this.problemItem = ObjectUtil.deepClone(item);
    if (item.children && item.children.length > 0) {
      item.children.forEach(problem => {
        this.childrenProblemList.push(this.initProblemDTO(problem));
        this.childrenProblemList = [...this.childrenProblemList];
      });
      this.updateEditCache();
    }
    this.isVisible = true;
  }

  /**
   * 新增子问题
   */
  addChildrenProblem() {
    if (this.toggleEdit === true) {
      this.msg.error('存在未保存的数据!');
      return;
    }
    const newline = this.initProblemDTO(null);
    newline.auditPostId = this.problemItem.auditPost.id;
    newline.parentId = this.problemItem.id;
    newline.sendStatus = 'NOT_ISSUED';
    newline.transferStatus = 'NOT_HANDED_OVER';
    newline.source = this.problemItem.source;
    this.childrenProblemList.push(newline);
    this.childrenProblemList = [...this.childrenProblemList];
    this.updateEditCache();
    this.editCache[newline.uuid].edit = true;
  }

  /**
   * 初始化dto
   * @param item 数据源dto
   */
  initProblemDTO(item: RectifyProblemDTO): RectifyProblemDTO {
    return {
      id: null,
      uuid: UUID.generate(),
      name: item ? item.name : null,
      type: item ? item.type : null,
      remark: item ? item.remark : null,
      advice: item ? item.advice : null,
      source: item ? item.source : null,
      sendStatus: item ? item.sendStatus : null,
      trackStatus: item ? item.trackStatus : null,
      auditPostId: item ? item.auditPost.id : null,
      transferStatus: item ? item.transferStatus : null,
      oaSendCase: item ? item.oaSendCase : false,
      rectifyDepartment: item ? item.rectifyDepartment : null,
      rectifyDepartmentId: item ? item.rectifyDepartment.id : null,
      dutyUser: item ? item.dutyUser : null,
      dutyUserId: item ? item.dutyUser.id : null,
      oaSendTime: item ? item.oaSendTime : null,
      transferTime: item ? item.transferTime : null,
      transferCase: item ? item.transferCase : false,
      rectifyEndTime: item ? item.rectifyEndTime : null,
      rectifyCompleteTime: item ? item.rectifyCompleteTime : null,
      rectifyBackFeedHz: item ? item.rectifyBackFeedHz : null,
      rectifyBackFeedHzUnit: item ? item.rectifyBackFeedHzUnit : null,
      rectifyProgress: item ? item.rectifyProgress : null,
      memo: item ? item.memo : null,
      parentId: item ? item.parent.id : null,
      children: [],
    };
  }

  /**
   * 问题类型label反显
   * @param value 问题类型value
   * @returns 问题类型label
   */
  convertProblemType(value: string) {
    if (value) {
      return this.problemTypeList.find(problem => problem.value === value).label;
    }
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
}
