import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumnTag } from '@delon/abc';
import { TABLE_PARAMETER } from '@mt-framework-ng/core';
import { ObjectUtil } from '@ng-mt-framework/util';
import { RectifyIssueSplitComponent } from './rectify-issue-split.component';
import { RectifyIssueTransferComponent } from './rectify-issue-transfer.component';
const TAG: STColumnTag = {
  未下发: { text: '未下发', color: 'grey' },
  已下发: { text: '已下发', color: '#008CEC' },
  待处理: { text: '待处理', color: '#F76A00' },
};
const situationTAG: STColumnTag = {
  未移交: { text: '未移交', color: '#D9001B' },
  已移交: { text: '已移交', color: 'green' },
};
@Component({
  selector: 'rectify-issue-list',
  templateUrl: './rectify-issue-list.component.html',
  styles: [],
})
export class RectifyIssueListComponent implements OnInit {
  @ViewChild('rectifyIssueSplitComponent', { static: false })
  rectifyIssueSplitComponent: RectifyIssueSplitComponent;
  @ViewChild('rectifyIssueTransferComponent', { static: false })
  rectifyIssueTransferComponent: RectifyIssueTransferComponent;
  /**
   * 列表数据
   */
  tableData: Array<any> = [
    {
      state: '未下发',
      postName: '2021-09审计报告',
      situation: '未移交',
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
      className: 'text-center',
      type: 'tag',
      tag: TAG,
    },
    {
      title: '移交情况',
      index: 'situation',
      width: '150px',
      sort: this.tableParameter.sortDef,
      className: 'text-center',
      type: 'tag',
      tag: situationTAG,
    },
    {
      title: '审计报告名称',
      index: 'postName',
      width: '150px',
      sort: this.tableParameter.sortDef,
      className: 'text-center',
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
