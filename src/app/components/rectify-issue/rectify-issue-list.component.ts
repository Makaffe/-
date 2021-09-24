import { Component, OnInit, ViewChild } from '@angular/core';
import { TABLE_PARAMETER } from '@mt-framework-ng/core';
import { ObjectUtil } from '@ng-mt-framework/util';
import { RectifyIssueSplitComponent } from './rectify-issue-split.component';
import { RectifyIssueTransferComponent } from './rectify-issue-transfer.component';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'rectify-issue-list',
  templateUrl: './rectify-issue-list.component.html',
  styles: [],
})
export class RectifyIssueListComponent implements OnInit {
  @ViewChild('rectifyIssueSplitComponent', { static: false })
  rectifyIssueSplitComponent: RectifyIssueSplitComponent;
  @ViewChild('rectifyIssueTransferComponent', {static: false})
  rectifyIssueTransferComponent: RectifyIssueTransferComponent;
  /**
   * 列表数据
   */
  tableData: Array<any> = [
    {
      state: '待处理',
      postName: '2021-09审计报告',
      unitName: '审计一部',
      time: '2021-10-12',
      issueAmount: '33',
    },
  ];
  /**
   * 列表参数
   */
  tableParameter = ObjectUtil.deepClone(TABLE_PARAMETER);
  columns = [
    { title: '序号', render: 'number', width: '100px', className: 'text-center', type: 'radio', fixed: 'left' },
    {
      title: '状态',
      index: 'state',
      width: '100px',
      sort: this.tableParameter.sortDef,
      fixed: 'left',
    },
    {
      title: '审计报告名称',
      index: 'postName',
      width: '150px',
      sort: this.tableParameter.sortDef,
      className: 'text-center',
    },
    {
      title: '移交情况',
      index: 'unitName',
      width: '150px',
      sort: this.tableParameter.sortDef,
      className: 'text-left',
    },
    {
      title: '问题名称',
      index: 'unitName',
      width: '150px',
      sort: this.tableParameter.sortDef,
      className: 'text-left',
    },
    {
      title: '问题描述',
      index: 'unitName',
      width: '150px',
      sort: this.tableParameter.sortDef,
      className: 'text-left',
    },
    {
      title: '问题类型',
      index: 'unitName',
      width: '150px',
      sort: this.tableParameter.sortDef,
      className: 'text-left',
    },
    {
      title: '整改部门',
      index: 'unitName',
      width: '150px',
      sort: this.tableParameter.sortDef,
      className: 'text-left',
    },
    {
      title: '整改负责人',
      index: 'unitName',
      width: '150px',
      sort: this.tableParameter.sortDef,
      className: 'text-left',
    },
    {
      title: '审计建议',
      index: 'unitName',
      width: '150px',
      sort: this.tableParameter.sortDef,
      className: 'text-left',
    },
    {
      title: '问题来源',
      index: 'unitName',
      width: '150px',
      sort: this.tableParameter.sortDef,
      className: 'text-left',
    },
    {
      title: 'OA发送情况',
      index: 'unitName',
      width: '150px',
      sort: this.tableParameter.sortDef,
      className: 'text-left',
    },
    { title: '操作', render: 'operations', width: '150px', className: 'text-center', fixed: 'right' },
  ];
  constructor() {}

  ngOnInit() {}

  splitIssue(row) {
    this.rectifyIssueSplitComponent.edit();
  }
  transfer(row) {
    this.rectifyIssueTransferComponent.edit();

  }
}
