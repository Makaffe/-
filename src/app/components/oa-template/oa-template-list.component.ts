import { Component, OnInit, ViewChild } from '@angular/core';
import { TABLE_PARAMETER } from '@mt-framework-ng/core';
import { ObjectUtil } from '@ng-mt-framework/util';
import { OaTemplateDetailComponent } from './oa-template-detail.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'oa-template-list',
  templateUrl: './oa-template-list.component.html',
  styles: [],
})
export class OaTemplateListComponent implements OnInit {
  @ViewChild('oaTemplateDetailComponent', { static: true })
  oaTemplateDetailComponent: OaTemplateDetailComponent;

  /**
   * 列表数据
   */
  tableData: Array<any> = [
    {
      state: '待处理',
      postName: '2021-09审计报告',
    },
  ];
  /**
   * 列表参数
   */
  tableParameter = ObjectUtil.deepClone(TABLE_PARAMETER);
  columns = [
    { title: '序号', render: 'number', width: '100px', className: 'text-center', type: 'radio' },
    {
      title: '用途',
      index: 'state',
      width: '400px',
      sort: this.tableParameter.sortDef,
    },
    {
      title: '发文内容',
      index: 'postName',
      sort: this.tableParameter.sortDef,
    },
    { title: '操作', render: 'operations', width: '150px', className: 'text-center', fixed: 'right' },
  ];
  constructor() {}

  ngOnInit() {}

  showModel(id: string, edit: boolean) {
    if (edit) {
      this.oaTemplateDetailComponent.isVisible = true;
      this.oaTemplateDetailComponent.disabled = false;
    } else {
      this.oaTemplateDetailComponent.isVisible = true;
      this.oaTemplateDetailComponent.disabled = true;
    }
  }

  delete(id: string) {
    this.tableData = [];
  }
}
