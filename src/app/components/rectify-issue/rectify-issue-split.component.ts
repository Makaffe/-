import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TreeUtil } from '@mt-framework-ng/util';
import { OrganizationService, UserService } from '@ng-mt-framework/api';
import { ObjectUtil } from '@ng-mt-framework/util';
import { NzMessageService } from 'ng-zorro-antd';
import { __spread } from 'tslib';
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
   * 整改负责人列表
   */
  dutyUserList = [];

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
   * 行内编辑缓存
   */
  editCache: { [key: string]: { edit: boolean; data: any } } = {};

  /**
   * 开始行内编辑
   * @param id 数据id
   */
  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }

  /**
   * 取消行内编辑
   * @param id 数据id
   */
  cancelEdit(id: string): void {
    const index = this.childrenProblemList.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: { ...this.childrenProblemList[index] },
      edit: false,
    };
  }

  /**
   * 保存行内编辑
   * @param id 数据id
   */
  saveEdit(id: string): void {
    const index = this.childrenProblemList.findIndex(item => item.id === id);
    Object.assign(this.childrenProblemList[index], this.editCache[id].data);
    this.editCache[id].edit = false;
  }

  /**
   * 更新行内编辑缓存数据
   */
  updateEditCache(): void {
    this.childrenProblemList.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item },
      };
    });
  }

  ngOnInit(): void {
    this.organizationService.getOrganizationTreeOfEmployeeOrUser().subscribe(data => {
      this.organizationTree = TreeUtil.populateTreeNodes(data, 'id', 'name', 'children');
    });
    this.userService.findAll().subscribe(data => {
      this.dutyUserList = data;
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
   * 保存
   */
  save() {
    this.loading = true;
    this.rectifyProblemService.rectifyProblemSplit(this.problemItem.id, this.childrenProblemList).subscribe(
      data => {
        this.msg.success('问题拆分成功！');
        this.notification.emit();
      },
      () => {},
      () => {
        this.loading = false;
        this.handleCancel();
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
    if (this.childrenProblemList.length === 0) {
      this.childrenProblemList = [
        ...this.childrenProblemList,
        {
          key: this.problemItem.key * 10 + 1,
          id: this.problemItem.id + '1',
          proName: '子问题一',
          status: '未下发',
          situation: '未移交',
          admitName: '',
          proCome: '子问题一来源',
          oaSend: '',
          proDes: '描述一',
          proType: '类型一',
          department: '部门一',
          person: '张三',
          suggest: '子问题审计建议xxx',
          children: null,
          checked: false,
        },
      ];
    } else {
      this.childrenProblemList = [
        ...this.childrenProblemList,
        {
          key: this.childrenProblemList[this.childrenProblemList.length - 1].key + 1,
          id: (+this.childrenProblemList[this.childrenProblemList.length - 1].key + 1).toLocaleString(),
          proName: this.childrenProblemList[this.childrenProblemList.length - 1].proName,
          status: '未下发',
          situation: '未移交',
          admitName: this.childrenProblemList[this.childrenProblemList.length - 1].admitName,
          proCome: this.childrenProblemList[this.childrenProblemList.length - 1].proCome,
          oaSend: this.childrenProblemList[this.childrenProblemList.length - 1].oaSend,
          proDes: this.childrenProblemList[this.childrenProblemList.length - 1].proDes,
          proType: this.childrenProblemList[this.childrenProblemList.length - 1].proType,
          department: this.childrenProblemList[this.childrenProblemList.length - 1].department,
          person: this.childrenProblemList[this.childrenProblemList.length - 1].person,
          suggest: this.childrenProblemList[this.childrenProblemList.length - 1].suggest,
          children: null,
          checked: false,
        },
      ];
    }
    this.updateEditCache();
  }

  /**
   * 初始化dto
   * @param item 数据源dto
   */
  initProblemDTO(item: RectifyProblemDTO): RectifyProblemDTO {
    return {
      id: null,
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
      rectifyDepartmentId: item ? item.rectifyDepartment.id : null,
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
      showOrder: item ? item.showOrder : null,
      parentId: item ? item.parent.id : null,
      children: [],
    };
  }
}
