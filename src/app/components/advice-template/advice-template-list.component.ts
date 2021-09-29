import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { TABLE_PARAMETER } from '@mt-framework-ng/core';
import { ObjectUtil } from '@ng-mt-framework/util';
import { AdviceTemplateDetailComponent } from './advice-template-detail.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'advice-template-list',
  templateUrl: './advice-template-list.component.html',
  styles: [],
})
export class AdviceTemplateListComponent implements OnInit {
  @Output()
  tableOperations = new EventEmitter();

  /**
   * 列表数据
   */
  tableData: Array<any> = [
    {
      state: '待处理',
      postName: '2021-09审计报告',
      unitName: '2',
    },
  ];
  /**
   * 列表参数
   */
  tableParameter = ObjectUtil.deepClone(TABLE_PARAMETER);
  columns = [
    { title: '序号', render: 'number', width: '50px', className: 'text-center', type: 'radio' },
    {
      title: '问题类型',
      index: 'state',
      width: '30%',
      sort: this.tableParameter.sortDef,
    },
    {
      title: '审计建议',
      index: 'postName',
      width: '55%',
      sort: this.tableParameter.sortDef,
    },
    {
      title: '历史引用次数',
      index: 'unitName',
      width: '15%',
      sort: this.tableParameter.sortDef,
    },
    { title: '操作', render: 'operations', width: '150px', className: 'text-center', fixed: 'right' },
  ];
  constructor() {}

  ngOnInit() {}
  showModel(id: string, edit: boolean) {
    if (edit) {
      this.tableOperations.emit({
        id,
        edit,
      });
    } else {
      this.tableOperations.emit({
        id,
        edit,
      });
    }
  }

  delete(id: string) {
    this.tableData = [];
  }
}
