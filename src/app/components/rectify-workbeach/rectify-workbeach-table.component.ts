import { Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { STColumn, STColumnTag } from '@delon/abc';
import { TABLE_PARAMETER } from '@ng-mt-framework/comp';
import { ObjectUtil } from '@ng-mt-framework/util';
import { RectifyWorkbeachPutComponent } from './rectify-workbeach-put.component';

const TAG: STColumnTag = {
  1: { text: '通过', color: 'green' },
  2: { text: '错误', color: 'red' },
  3: { text: '进行中', color: 'blue' },
  4: { text: '草稿', color: '' },
  5: { text: '警告', color: 'orange' },
};
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rectify-workbeach-table',
  templateUrl: './rectify-workbeach-table.component.html',
  styles: [],
})
export class RectifyWorkbeachTableComponent implements OnInit {
  loading = false;

  /**
   * 整改部门提交申请请求
   * 调用弹窗组件
   */
  @ViewChild('rectifyWorkbeachPutComponent', { static: false })
  rectifyWorkbeachPutComponent: RectifyWorkbeachPutComponent;

  /**
   * 列表参数
   */
  tableParameter = ObjectUtil.deepClone(TABLE_PARAMETER);

  isVisible = false;

  approvingData = [];

  constructor() {}

  columns: STColumn[] = [
    { title: '序号', render: 'number', width: '80px', sort: this.tableParameter.sortDef, className: 'text-center' },
    {
      title: '状态',
      index: 'status',
      width: '20%',
      sort: this.tableParameter.sortDef,
      className: 'text-center',
      type: 'tag',
      tag: TAG,
    },
    {
      title: '延期截止日期',
      index: 'time',
      width: '20%',
      sort: this.tableParameter.sortDef,
    },
    { title: '批复人', index: 'name', width: '20%', sort: this.tableParameter.sortDef },
    { title: '批复日期', index: 'time2', width: '20%', sort: this.tableParameter.sortDef },
    {
      title: '原整改截止日期',
      index: 'endTime',
      width: '20%',
      sort: this.tableParameter.sortDef,
    },
    { title: '操作', render: 'operations', width: '80px', className: 'text-center' },
  ];

  /**
   * 对应的列表中表的数据
   */
  listOfData = [
    {
      id: '1',
      status: '4',
      time: '2021-10-26',
      name: '张伟',
      time2: '2021-10-26',
      endTime: '2021-10-26',
    },
    {
      id: 'r1',
      status: '1',
      time: '2021-11-18',
      name: '刘壮实',
      time2: '2021-10-26',
      endTime: '2021-11-18',
    },
  ];

  handleCancel() {
    this.isVisible = false;
  }

  ngOnInit(): void {}

  stChange(e: any) {}

  agree() {}
  /**
   * 打开列表弹窗
   */
  Open() {
    this.isVisible = true;
  }

  saveData() {
    this.isVisible = false;
  }

  /**
   * 查看
   */
  watch() {
    this.rectifyWorkbeachPutComponent.isWatchForTable = true;
    this.rectifyWorkbeachPutComponent.create = true;
    this.rectifyWorkbeachPutComponent.currentItem.closingDate = new Date();
    this.rectifyWorkbeachPutComponent.isVisible = true;
  }
}
