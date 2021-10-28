import { Component, Inject, Input, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { STColumn, STColumnTag, STComponent } from '@delon/abc';
import { TABLE_PARAMETER } from '@ng-mt-framework/comp';
import { ObjectUtil } from '@ng-mt-framework/util';
import { RectifyWorkbeachPutComponent } from './rectify-workbeach-put.component';

const TAG: STColumnTag = {
  1: { text: '通过', color: 'green' },
  2: { text: '错误', color: 'red' },
  3: { text: '进行中', color: 'blue' },
  4: { text: '通过中', color: '' },
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
   * st 表格组件
   */
  @ViewChild('st', { static: false })
  st: STComponent;

  /**
   * 列表参数
   */
  tableParameter = ObjectUtil.deepClone(TABLE_PARAMETER);

  /**
   * 控制弹窗是否弹出
   */
  isVisible = false;



  /**
   * 接收数据
   */
  approvingData = [];

  constructor() {}

  /**
   * 列定义
   */
  columns: STColumn[] = [
    { title: '序号', render: 'number', width: '80px', className: 'text-center' },
    {
      title: '状态',
      index: 'status',
      width: '100px',
      className: 'text-center',
      type: 'tag',
      tag: TAG,
    },
    {
      title: '延期截止日期',
      index: 'time2',
      width: '140px',
      className: 'text-center',
      sort: this.tableParameter.sortDef,
    },
    {
      title: '原整改截止日期',
      index: 'endTime',
      width: '140px',
      className: 'text-center',
      sort: this.tableParameter.sortDef,
    },
    { title: '批复人', index: 'name1', width: '100px' },
    { title: '批复日期', index: 'time', width: '140px', className: 'text-center', sort: this.tableParameter.sortDef },
    { title: '申请人', index: 'name2', width: '100px' },
    { title: '申请日期', index: 'time2', width: '140px', className: 'text-center', sort: this.tableParameter.sortDef },
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
      name1: '张伟',
      name2: '张有山',
      time2: '2021-10-26',
      endTime: '2021-10-26',
    },
    {
      id: 'r1',
      status: '1',
      time: '2021-11-18',
      name1: '刘壮实',
      name2: '邓莉屏',
      time2: '2021-10-26',
      endTime: '2021-11-18',
    },
  ];

  handleCancel() {
    this.isVisible = false;
  }

  ngOnInit(): void {}

  /**
   *
   * @param e 翻页设置
   */
  stChange(e: any) {}

  /**
   * 打开列表弹窗
   */
  Open(title: string) {
    this.columns.forEach(colums => {
      if (colums.index === 'name') {
        colums.title = title;
      }
    });

    this.isShowData();
    this.st.resetColumns({ columns: this.columns, emitReload: true });
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

  /**
   * 批复人与批复日期显示还是不显示
   */
  isShowData() {
    this.listOfData[0].name1 = '';
    this.listOfData[0].time = '';
    this.rectifyWorkbeachPutComponent.access = true;
  }
}
