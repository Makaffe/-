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

@Component({
  selector: 'department-draw-list',
  templateUrl: './department-draw-list.component.html',
  styles: [],
})
export class DepartmentDrawListComponent implements OnInit {
  /**
   * 列表数据
   */
  tableData: Array<any> = [
    {
      state: 'false',
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
    { title: '序号', render: 'number', width: '50px', className: 'text-center', fixed: 'left' },
    {
      title: '状态',
      index: 'state',
      width: '100px',
      type: 'tag',
      tag: TAG,
      fixed: 'left',
    },
    {
      title: '移交情况',
      index: 'postName',
      width: '100px',

      className: 'text-center',
    },
    {
      title: '问题名称',
      index: 'unitName',
      width: '100px',
      className: 'text-left',
    },
    {
      title: '整改部门',
      index: 'time',
      width: '100px',

      className: 'text-left',
    },
    {
      title: '整改负责人',
      index: 'issueAmount',
      width: '100px',
      className: 'text-left',
    },
    {
      title: '整改具体负责人',
      index: 'issueAmount',
      width: '150px',
      className: 'text-left',
    },
    {
      title: '已完成整改措施数',
      index: 'issueAmount',
      width: '150px',
      className: 'text-left',
    },
    {
      title: '整改截止时间',
      index: 'issueAmount',
      width: '150px',
      className: 'text-left',
    },
    {
      title: '整改拟完成时间',
      index: 'issueAmount',
      width: '150px',
      className: 'text-left',
    },
    {
      title: '剩余整改天数',
      index: 'issueAmount',
      width: '150px',
      className: 'text-left',
    },
    {
      title: '历史发生次数',
      index: 'issueAmount',
      width: '150px',
      className: 'text-left',
    },
    {
      title: '整改后续进度',
      index: 'issueAmount',
      width: '150px',
      className: 'text-left',
    },
    { title: '操作', render: 'operations', width: '150px', className: 'text-center', fixed: 'right' },
    {
      title: '备注',
      index: 'issueAmount',
      width: '150px',

      fixed: 'right',
      className: 'text-left',
    },
  ];
  constructor(private router: Router) {}

  ngOnInit() {}
}
