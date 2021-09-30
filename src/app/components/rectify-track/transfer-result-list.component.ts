import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { STColumnTag } from '@delon/abc';
import { TABLE_PARAMETER } from '@mt-framework-ng/core';
import { ObjectUtil } from '@ng-mt-framework/util';
const TAG: STColumnTag = {
  未处理: { text: '未处理', color: 'grey' },
  已处理: { text: '已处理', color: 'blue' },
};
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
      state: '未处理',
      postName: '2021-09审计报告',
      unitName: 'false',
      time: '2021-10-12',
      issueAmount: '33',
    },
    {
      state: '已处理',
      postName: '2021-09审计报告二',
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
      className: 'text-center',
      type: 'tag',
      tag: TAG,
    },
    {
      title: '问题来源',
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
      title: '移交时间',
      index: 'unitName',
      width: '150px',
      sort: this.tableParameter.sortDef,
      className: 'text-left',
    },
    {
      title: '是否发函',
      index: 'unitName',
      width: '150px',
      sort: this.tableParameter.sortDef,
      className: 'text-left',
    },
    {
      title: '是否处分',
      index: 'unitName',
      width: '150px',
      sort: this.tableParameter.sortDef,
      className: 'text-left',
    },
    {
      title: '处分记录',
      index: 'unitName',
      width: '150px',
      sort: this.tableParameter.sortDef,
      className: 'text-left',
    },
    {
      title: '处分描述',
      index: 'unitName',
      width: '150px',
      sort: this.tableParameter.sortDef,
      className: 'text-left',
    },
    {
      title: '附件',
      index: 'unitName',
      width: '200px',
      className: 'text-left',
    },
  ];
  constructor(private router: Router) {}

  ngOnInit() {}

  goWorkBeach() {
    this.router.navigate(['/audit-rectify/rectify-workbeach']);
  }
}
