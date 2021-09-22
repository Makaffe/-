import { Component, OnInit, ViewChild } from '@angular/core';
import { TABLE_PARAMETER } from '@mt-framework-ng/core';
import { ObjectUtil } from '@ng-mt-framework/util';
import { SuperviseProcessFormComponent } from './supervise-process-form/supervise-process-form.component';

export interface TreeNodeInterface {
  key: number;
  name: string;
  age?: number;
  level?: number;
  expand?: boolean;
  address?: string;
  children?: TreeNodeInterface[];
  parent?: TreeNodeInterface;
}
@Component({
  selector: 'app-supervise-dashboard',
  templateUrl: './supervise.dashboard.component.html',
  styles: [``],
})
export class SuperviseDashboardComponent implements OnInit {
  @ViewChild('superviseProcessFormComponent', { static: false })
  superviseProcessFormComponent: SuperviseProcessFormComponent;
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
    { title: '序号', render: 'number', width: '20px', className: 'text-center', type: 'radio' },
    {
      title: '状态',
      index: 'state',
      width: '20px',
      sort: this.tableParameter.sortDef,
    },
    {
      title: '问题来源',
      index: 'postName',
      width: '40px',
      sort: this.tableParameter.sortDef,
      className: 'text-center',
    },
    {
      title: '问题名称',
      index: 'unitName',
      width: '40px',
      sort: this.tableParameter.sortDef,
      className: 'text-left',
    },
    {
      title: '问题类型',
      index: 'time',
      width: '40px',
      sort: this.tableParameter.sortDef,
      className: 'text-left',
    },
    {
      title: '整改部门',
      index: 'issueAmount',
      width: '40px',
      sort: this.tableParameter.sortDef,
      className: 'text-left',
    },
    {
      title: '整改负责人',
      index: 'issueAmount',
      width: '40px',
      sort: this.tableParameter.sortDef,
      className: 'text-left',
    },
    {
      title: '移交时间',
      index: 'issueAmount',
      width: '40px',
      sort: this.tableParameter.sortDef,
      className: 'text-left',
    },
    {
      title: '移交原因',
      index: 'issueAmount',
      width: '40px',
      sort: this.tableParameter.sortDef,
      className: 'text-left',
    },
    { title: '操作', render: 'operations', width: '50px', className: 'text-center', fixed: 'right' },
  ];
  ngOnInit(): void {}

  process() {
    this.superviseProcessFormComponent.show();
  }
}
