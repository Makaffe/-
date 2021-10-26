import { Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { STColumn } from '@delon/abc';
import { TABLE_PARAMETER } from '@ng-mt-framework/comp';
import { ObjectUtil } from '@ng-mt-framework/util';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rectify-workbeach-table',
  templateUrl: './rectify-workbeach-table.component.html',
  styles: [],
})
export class RectifyWorkbeachTableComponent implements OnInit {
  loading = false;

  /**
   * 列表参数
   */
   tableParameter = ObjectUtil.deepClone(TABLE_PARAMETER);

  isVisible = false;

  approvingData = [];

  constructor() {}

  columns: STColumn[] = [
    { title: '序号', render: 'number', width: '30px', sort: this.tableParameter.sortDef, className: 'text-center' },
    { title: '状态', index: 'status', width: '30px', sort: this.tableParameter.sortDef, className: 'text-center' },
    { title: '申请原因', index: 'key', width: '30px', sort: this.tableParameter.sortDef, className: 'text-center' },
    { title: '提交截止日期', index: 'time', width: '30px', sort: this.tableParameter.sortDef, className: 'text-center' },
    { title: '批复人', index: 'name', width: '30px', sort: this.tableParameter.sortDef, className: 'text-center' },
    { title: '批复日期', index: 'quesion', width: '30px', sort: this.tableParameter.sortDef, className: 'text-center' },
    { title: '批复意见', index: 'startTime', width: '30px', sort: this.tableParameter.sortDef, className: 'text-center' },
    { title: '申请问题原整改截止日期', index: 'endTime', width: '30px', sort: this.tableParameter.sortDef, className: 'text-center' },
    { title: '操作', render: 'operations', width: '30px', sort: this.tableParameter.sortDef, className: 'text-center' },
  ];



  /**
   * 对应的列表中表的数据
   */
  listOfData = [
    {
      key: '1',
      name: '一号部门',
      time: '2022-09-8',
      status: '黑了',
      quesion: '没有任何问题',
      endTime: '100-32-56',
      startTime: '2568-102-25',
    },
    {
      key: '11',
      name: '一号部门',
      time: '2019-09-586',
      status: '按了',
      quesion: '有很多问题',
      endTime: '58-455-32-56',
      startTime: '2568-102-25',
    },
    {
      key: 'r1',
      name: '一号部门',
      time: '2019-09-8',
      status: '走人了',
      quesion: '解决完所有问题',
      endTime: '100214-3342-56',
      startTime: '2568-133402-25',
    }
  ];






  handleCancel() {
    this.isVisible = false;
  }

  ngOnInit(): void {}

  stChange(e: any) {}


  agree() {

  }
  /**
   * 打开列表弹窗
   */
  Open() {
    this.isVisible = true;
  }

  saveData() {

    this.isVisible = false;

  }


}
