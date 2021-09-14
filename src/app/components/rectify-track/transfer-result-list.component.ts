import { Component, OnInit } from '@angular/core';
import { TABLE_PARAMETER } from '@mt-framework-ng/core';
import { ObjectUtil } from '@ng-mt-framework/util';

@Component({
  selector: 'transfer-result-list',
  templateUrl: './transfer-result-list.component.html',
  styles: [],
})
export class TransferResultListComponent implements OnInit {
  /**
   * 列表数据
   */
  tableData: Array<any> = [
    {
      state: 'false',
      postName: '2021-09审计报告',
      unitName: 'false',
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
      fixed: 'left',
    },
    {
      title: '移交情况',
      index: 'unitName',
      width: '150px',
      sort: this.tableParameter.sortDef,
    },
    {
      title: '问题名称',
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
      title: '整改具体负责人',
      index: 'unitName',
      width: '150px',
      sort: this.tableParameter.sortDef,
      className: 'text-left',
    },
    {
      title: '已完成整改措施数',
      index: 'unitName',
      width: '150px',
      sort: this.tableParameter.sortDef,
      className: 'text-left',
    },
    {
      title: '整改截止时间',
      index: 'unitName',
      width: '150px',
      sort: this.tableParameter.sortDef,
      className: 'text-left',
    },
    {
      title: '整改拟完成时间',
      index: 'unitName',
      width: '150px',
      sort: this.tableParameter.sortDef,
      className: 'text-left',
    },
    {
      title: '最近一次反馈时间',
      index: 'unitName',
      width: '150px',
      sort: this.tableParameter.sortDef,
      className: 'text-left',
    },
    {
      title: '下一次反馈时间',
      index: 'unitName',
      width: '150px',
      sort: this.tableParameter.sortDef,
      className: 'text-left',
    },
    {
      title: '整改反馈进度',
      index: 'unitName',
      width: '200px',
      render: 'progressbar',
    },
    {
      title: '备注',
      index: 'unitName',
      width: '150px',
      sort: this.tableParameter.sortDef,
      className: 'text-left',
    },
    { title: '操作', render: 'operations', width: '150px', className: 'text-center', fixed: 'right' },
  ];
  constructor() {}

  ngOnInit() {}
}
