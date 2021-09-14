import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { STColumnTag } from '@delon/abc';
import { TABLE_PARAMETER } from '@mt-framework-ng/core';
import { ObjectUtil } from '@ng-mt-framework/util';

const TAG: STColumnTag = {
  已锁: { text: '已锁', color: 'red' },
  解除锁定: { text: '解除锁定', color: 'green' },
  true: { text: '已激活', color: 'green' },
  false: { text: '未激活', color: 'red' },
};
const RETIFY_TAG: STColumnTag = {
  已锁: { text: '已锁', color: 'red' },
  解除锁定: { text: '解除锁定', color: 'green' },
  false: { text: '已移交', color: 'green' },
  true: { text: '未激活', color: 'red' },
};
@Component({
  selector: 'rectify-track-list',
  templateUrl: './rectify-track-list.component.html',
  styles: [],
})
export class RectifyTrackListComponent implements OnInit {
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
      className: 'text-center', type: 'tag', tag: TAG,
      fixed: 'left',
    },
    {
      title: '移交情况',
      index: 'unitName',
      width: '150px',
      className: 'text-center', type: 'tag', tag: RETIFY_TAG,
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
      render:'progressbar'
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
  constructor(private router: Router) {}

  ngOnInit() {}


  checkTransferResult(){
     this.router.navigate(['/audit-rectify/transfer-result'])
  }
}
