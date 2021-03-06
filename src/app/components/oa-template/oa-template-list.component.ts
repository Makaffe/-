import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { QueryOptions, TABLE_PARAMETER } from '@mt-framework-ng/core';
import { ObjectUtil } from '@ng-mt-framework/util';
import { NzMessageService } from 'ng-zorro-antd';
import { __spread } from 'tslib';
import { OASendTemplateDTO } from './model/OASendTemplateDTO';
import { OASendTemplateEditInfoDTO } from './model/OASendTemplateEditInfoDTO';
import { OASendTemplateTypeDTO } from './model/OASendTemplateTypeDTO';
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
   * 数据请求标志
   */
  loading = false;

  /**
   * 记录类型id
   */
  typeId: string;

  /**
   * 当前选中节点Id
   */
  selectedNode: OASendTemplateTypeDTO = null;

  /**
   * 列表参数
   */
  TABLE_PARAMETER = ObjectUtil.deepClone(TABLE_PARAMETER);

  /**
   * 列表数据
   */
  tableData: Array<OASendTemplateDTO> = [];

  /**
   * 分页参数
   */
  QueryOptions = {
    page: 0,
    size: 20,
    sort: 'id,desc',
  };

  /**
   * 列表参数
   */
  tableParameter = ObjectUtil.deepClone(TABLE_PARAMETER);
  columns = [
    { title: '序号', render: 'number', width: '50px', className: 'text-center', type: 'radio' },
    {
      title: 'OA模板名称',
      index: 'name',
      width: '40%',
    },
    {
      title: 'OA模板内容',
      index: 'content',
      width: '60%',
    },
    { title: '操作', render: 'operations', width: '150px', className: 'text-center', fixed: 'right' },
  ];
  constructor(private oASendTemplateService: OASendTemplateService, private msg: NzMessageService) {}

  ngOnInit() {
    this.loadAll();
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

  nodeChange($event: OASendTemplateTypeDTO): void {}

  deleteData(item: OASendTemplateEditInfoDTO) {
    this.oASendTemplateService.deleteUsingDELETE(item.id).subscribe(() => {
      this.msg.success('删除成功');
      this.load(this.typeId);
    });
  }

  load(typeId?: string, templateName?: string, templateContent?: string) {
    this.loading = true;
    // tslint:disable-next-line:max-line-length
    this.oASendTemplateService
      .findOnePageUsingGET(
        this.QueryOptions.sort,
        this.QueryOptions.page,
        this.QueryOptions.size,
        this.selectedNode ? this.selectedNode.id : null,
        templateName,
        templateContent,
      )
      .subscribe(
        data => {
          if (data) {
            this.typeId = typeId;
            this.tableData = data.data;
            this.TABLE_PARAMETER.page.total = data.totalRecords;
            this.TABLE_PARAMETER.pi = data.pageNo + 1;
          }
        },
        null,
        () => (this.loading = false),
      );
  }

  loadAll(templateName?: string, templateContent?: string) {
    this.loading = true;
    this.oASendTemplateService.findAllUsingGET(templateContent, templateName).subscribe(
      data => {
        console.log(data);
        if (data) {
          this.tableData = data;
        }
      },
      null,
      () => {
        this.loading = false;
      },
    );
  }
}
