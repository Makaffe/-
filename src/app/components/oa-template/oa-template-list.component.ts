import { Component, OnInit, ViewChild } from '@angular/core';
import { TABLE_PARAMETER } from '@mt-framework-ng/core';
import { ObjectUtil } from '@ng-mt-framework/util';
import { NzMessageService } from 'ng-zorro-antd';
import { OASendTemplateDTO } from './model/OASendTemplateDTO';
import { OASendTemplateEditInfoDTO } from './model/OASendTemplateEditInfoDTO';
import { OaTemplateDetailComponent } from './oa-template-detail.component';
import { OASendTemplateService } from './service/OASendTemplateService';

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
  tableData: Array<OASendTemplateDTO> = [];
  /**
   * 列表参数
   */
  tableParameter = ObjectUtil.deepClone(TABLE_PARAMETER);
  columns = [
    { title: '序号', render: 'number', width: '100px', className: 'text-center', type: 'radio' },
    {
      title: 'OA模板名称',
      index: 'name',
      width: '400px',
      sort: this.tableParameter.sortDef,
    },
    {
      title: 'OA模板内容',
      index: 'content',
      sort: this.tableParameter.sortDef,
    },
    { title: '操作', render: 'operations', width: '150px', className: 'text-center', fixed: 'right' },
  ];
  constructor(private oASendTemplateService: OASendTemplateService, private msg: NzMessageService) {}

  ngOnInit() {
    this.load();
  }
  // 更新编辑
  showModel(item: OASendTemplateEditInfoDTO, edit: boolean) {
    if (edit) {
      this.oaTemplateDetailComponent.edit(item, false);
      this.oaTemplateDetailComponent.disabled = false;
    } else {
      this.oaTemplateDetailComponent.edit(item, false);
      this.oaTemplateDetailComponent.disabled = true;
    }
  }

  deleteData(item: OASendTemplateEditInfoDTO) {
    this.oASendTemplateService.deleteUsingDELETE(item.id).subscribe(() => {
      this.msg.success('删除成功');
      this.load();
    });
  }

  load() {
    this.oASendTemplateService.findAllUsingGET().subscribe(data => {
      if (data) {
        this.tableData = data;
      }
    });
  }
}
