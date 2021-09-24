import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TABLE_PARAMETER } from '@mt-framework-ng/core';
import { ObjectUtil } from '@ng-mt-framework/util';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'audit-post-list',
  templateUrl: './audit-post-list.component.html',
  styles: [],
})
export class AuditPostListComponent implements OnInit {
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
    { title: '序号', render: 'number', width: '10px', className: 'text-center', type: 'radio' },
    {
      title: '状态',
      index: 'state',
      width: '15px',
      sort: this.tableParameter.sortDef,
    },
    {
      title: '审计报告名称',
      index: 'postName',
      width: '40px',
      sort: this.tableParameter.sortDef,
      className: 'text-center',
    },
    {
      title: '审计单位名称',
      index: 'unitName',
      width: '40px',
      sort: this.tableParameter.sortDef,
      className: 'text-left',
    },
    {
      title: '审计时间',
      index: 'time',
      width: '40px',
      sort: this.tableParameter.sortDef,
      className: 'text-left',
    },
    {
      title: '审计问题数',
      index: 'issueAmount',
      width: '40px',
      sort: this.tableParameter.sortDef,
      className: 'text-left',
    },
    { title: '操作', render: 'operations', width: '30px', className: 'text-center', fixed: 'right' },
  ];
  constructor(private router: Router) {}

  ngOnInit() {}

  edit(row): void {
    this.router.navigate(['/audit-rectify/audit-post-detail']);
  }
  check(row): void {
    this.router.navigate(['/audit-rectify/audit-post-detail']);
  }
}
