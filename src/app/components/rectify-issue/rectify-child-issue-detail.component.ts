import { deepCopy } from '@delon/util';
import { AdviceTemplateSelectComponent } from './../common/advice-template-select/advice-template-select.component';
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

  @ViewChild('templateSelect', { static: false })
  templateSelect: AdviceTemplateSelectComponent;

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
   * 构建整改单位到人  map
   */
  organizationTreeMap: Map<string, string> = new Map<string, string>();
  /**
   * 整改部门树
   */
  organizationTree = [];

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

  problemTypeName = null;

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
        data.forEach(d => {
          this.userMap.set(d.id, d);
        });
      }
    });
  }

  /**
   * 取消
   */
  handleCancel() {
    this.isVisible = false;
    this.templateSelect.proposalTemplateId = null;
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
    this.currentItem.rectifyProblemType = this.problemTypeList.filter(item => this.currentItem.rectifyProblemTypeId === item.id)[0];
    this.currentItem.mainType = this.currentItem.rectifyProblemType && this.currentItem.rectifyProblemType.parent
      ? this.currentItem.rectifyProblemType.parent.id : this.currentItem.rectifyProblemTypeId;
    this.currentItem.orgLevel = this.dutyUserIds.toString();
    let arr = deepCopy(this.dutyUserIds);
    arr = arr.length > 0 ? arr.slice(0, arr.length - 2) : [];
    this.currentItem.unitAndDepartment = '';
    arr.forEach(element => {
      this.currentItem.unitAndDepartment = this.currentItem.unitAndDepartment + this.organizationTreeMap.get(element) + '/';
    });
    this.currentItem.unitAndDepartment = this.currentItem.unitAndDepartment.slice(0, this.currentItem.unitAndDepartment.length - 1);
    this.currentItem.dutyUserName = this.organizationTreeMap.get(this.currentItem.dutyUserId);
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
  edit(item: RectifyProblemDTO, isWatch: boolean, rectifyProblemType: any): void {
    this.isWatch = isWatch;
    this.currentItem = new RectifyProblemDTO(item);
    this.currentItem.rectifyProblemTypeId = this.currentItem.rectifyProblemType ? this.currentItem.rectifyProblemType.id : null;
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
    this.dutyUserIds = item && item.orgLevel ? item.orgLevel.split(',') : [];
    this.problemTypeName = rectifyProblemType.name;
    this.currentItem.rectifyProblemTypeId = rectifyProblemType.id;
    this.isVisible = true;
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

  adviceTemplateChange(event: string) {
    this.currentItem.advice = event;
  }
}
