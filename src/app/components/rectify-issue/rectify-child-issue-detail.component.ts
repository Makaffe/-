import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import UUID from 'uuidjs';
import { FormUtil, ObjectUtil } from '@ng-mt-framework/util';
import { NzMessageService } from 'ng-zorro-antd';
import { TreeUtil } from '@mt-framework-ng/util';
import { OrganizationService, UserService } from '@ng-mt-framework/api';
import { RectifyProblemDTO } from './model/rectify-problem-dto';
import { ProblemTypeDTO } from '../common/problem-type-select/ProblemTypeDTO';
import { ProblemTypeService } from '../common/problem-type-select/ProblemTypeService.service';

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
  currentItem: RectifyProblemDTO = new RectifyProblemDTO();

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

  /**
   * 是否查看
   */
  isWatch = false;


  /**
   * 选择的整改对象
   */
  values: string[] | null = null;

  problemTypeList: Array<ProblemTypeDTO> = [];

  constructor(
    private msg: NzMessageService,
    private organizationService: OrganizationService,
    private userService: UserService,
    private problemTypeService: ProblemTypeService,
  ) { }

  ngOnInit() {
    // 加载整改负责人级联选择
    this.organizationService.findUserTree().subscribe(data => {
      let CascadeData = [];
      CascadeData = this.fomatCascadeData(data);
      this.organizationTree = CascadeData;
    });
    // 加载问题类型下拉
    this.problemTypeService.findAllUsingGET().subscribe(data => {
      this.problemTypeList = data;
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
    this.currentItem.isTrunk = false;
    this.currentItem.rectifyProblemTypeId = this.currentItem.rectifyProblemType ? this.currentItem.rectifyProblemType.id : null;
    this.currentItem.mainType = this.currentItem.rectifyProblemType && this.currentItem.rectifyProblemType.parent
      ? this.currentItem.rectifyProblemType.parent.id : this.currentItem.rectifyProblemTypeId;
    this.currentItem.rectifyUnitId = this.currentItem.dutyUserId[this.currentItem.dutyUserId.length - 3];
    this.currentItem.rectifyDepartmentId = this.currentItem.dutyUserId[this.currentItem.dutyUserId.length - 2];
    this.currentItem.dutyUserId = this.currentItem.dutyUserId[this.currentItem.dutyUserId.length - 1];
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
   * @param isWatch 是否查看
   */
  edit(item: RectifyProblemDTO, isWatch: boolean): void {
    this.isWatch = isWatch;
    this.currentItem = new RectifyProblemDTO(item);
    if (this.problemItem && this.problemItem.auditReport) {
      this.currentItem.auditReportId = this.problemItem.auditReport.id;
      this.currentItem.parentId = this.problemItem.id;
    }
    if (!item) {
      this.currentItem.sendStatus = 'NOT_ISSUED';
      this.currentItem.transferStatus = 'NOT_HANDED_OVER';
      this.currentItem.trackStatus = 'NOT_RECTIFIED';
      this.currentItem.noRectifyStatus = false;
      this.currentItem.multipleYearRectify = false;
      this.currentItem.oaSendCase = false;
      this.currentItem.source = this.problemItem.source;
    }
    this.isVisible = true;
  }


  /**
   * 格式成级联选择数据
   */
  fomatCascadeData(data?: Array<any>): Array<RectifyProblemDTO> {
    data = data.filter((row) => row.id > 0);
    data = [...data];
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
    return [...data];
  }
}
