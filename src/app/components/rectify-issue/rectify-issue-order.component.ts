import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TreeUtil } from '@mt-framework-ng/util';
import { QueryOptions } from '@ng-mt-framework/api';
import { TABLE_PARAMETER } from '@ng-mt-framework/comp';
import { ObjectUtil } from '@ng-mt-framework/util';
import { NzMessageService, NzTreeNode } from 'ng-zorro-antd';
import { __spread } from 'tslib';
import { OASendTemplateService } from '../oa-template/service/OASendTemplateService';
import { OASendTemplateTypeService } from '../oa-template/service/OASendTemplateTypeService';
import { RectifyProblemDTO } from './model/rectify-problem-dto';
import { RectifyProblemService } from './service/RectifyProblemService';
@Component({
  selector: 'app-rectify-issue-order',
  templateUrl: './rectify-issue-order.component.html',
  styles: [],
})
export class RectifyIssueOrderComponent implements OnInit {
  constructor(
    private rectifyProblemService: RectifyProblemService,
    private oaSendTemplateService: OASendTemplateService,
    private msg: NzMessageService,
    private oASendTemplateTypeService: OASendTemplateTypeService,
  ) { }

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
   * OA模板表格加载
   */
  tableData = [];

  /**
   * 引用OA模板内容
   */
  content: string;
  tempContent = null;


  templateNodes = [];

  proposalTemplates = [];
  proposalTemplateId = null;

  /**
   * 分页参数
   */
  QueryOptions: any = {
    page: 0,
    size: 20,
    sort: 'id,desc',
  };

  /**
   * 列表参数
   */
  tableParameter = ObjectUtil.deepClone(TABLE_PARAMETER);

  /**
   * 列名称
   */
  columns = [
    { title: '序号', render: 'number', width: '10%', className: 'text-center', type: 'radio' },
    {
      title: 'OA模板名称',
      index: 'name',
      width: '30%',
      sort: this.tableParameter.sortDef,
    },
    {
      title: 'OA模板内容',
      index: 'content',
      sort: this.tableParameter.sortDef,
      width: '60%',
    },
  ];
  /**
   * 表格数据
   */
  listOfData: any[] = [];

  /**
   * oa模板类型树
   */
  oASendTemplateTypeTree = [];

  /**
   * 选择的oa模板类型
   */
  selectOaSendTemplateType = null;

  ngOnInit() {
    this.loadProposalTemplates();
  }

  loadProposalTemplates() {
    this.oaSendTemplateService.findAllUsingGET().subscribe(data => {
      this.proposalTemplates = data;
    });
  }

  /**
   * 关闭
   */
  handleCancel() {
    this.listOfData = [];
    this.isVisible = false;
  }

  /**
   * 保存
   */
  save() {
    this.loading = true;
    const ids = this.listOfData.map(item => item.id);
    this.rectifyProblemService.rectifyProblemSend(ids, this.content).subscribe(
      data => {
        this.msg.success('问题下发成功！');
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
   * @param problems 整改问题数据
   *
   */
  edit(problems: Array<RectifyProblemDTO>) {
    this.proposalTemplateId = null;
    this.content = null;
    problems.forEach(problem => {
      this.listOfData.push({
        id: problem.id,
        unitAndDepartment: problem.unitAndDepartment ? problem.unitAndDepartment : null,
        auditReportName: problem.auditReport.name,
        name: problem.name,
        dutyUser: problem.dutyUser ? problem.dutyUser.name : null
      });
    });
    this.listOfData = [...this.listOfData];
    this.isVisible = true;
  }

  proposalTemplateChange(event: string) {
    this.tempContent = null;
    if (event) {
      this.proposalTemplates.forEach(data => {
        if (data.id === event) {
          this.tempContent = data.content;
        }
      });
    }
  }

  confirmReference() {
    this.content = this.tempContent;
  }

  /**
   *
   * @param $event
   * 树节点
   * 点击后触发
   */
  onChange($event: string) {
    this.oaSendTemplateService.findOnePageUsingGET(this.QueryOptions.sort, this.QueryOptions.page,
      this.QueryOptions.size, $event).subscribe(
        data => {
          if (data) {
            this.tableData = data.data;
            this.tableData = [...this.tableData];
            this.tableParameter.page.total = data.totalRecords;
            this.tableParameter.pi = data.pageNo + 1;
          }
        },
        null,
        () => (this.loading = false),
    );
  }
}
