import { EventEmitter, ViewChild } from '@angular/core';
import { log } from 'ng-zorro-antd';
import { Component, Input, OnInit } from '@angular/core';
import { STColumn } from '@delon/abc';
import { QueryOptions } from '@ng-mt-framework/api';
import { TABLE_PARAMETER } from '@ng-mt-framework/comp';
import { ObjectUtil } from '@ng-mt-framework/util';
import { CategoryTreeService, TemplateFile } from '@mt-insight-ng/insight';
import { TemplateFileService } from '@mt-insight-ng/insight';
import { Output } from '@angular/core';
import { STComponent } from '@delon/abc';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styles: [],
})
export class TemplateListComponent implements OnInit {
  @ViewChild('st', { static: false })
  st: STComponent;
  /**
   * 数据请求标志
   */
  loading = false;
  isVisible = false;

  @Input()
  queryParams = {
    cateType: null,
    categoryId: null,
    filterField: '',
  };

  /**
   * 分页，排序参数
   */
  @Input()
  queryOptions: QueryOptions = {
    page: 0,
    size: 20,
    sort: 'createdTime,desc',
  };

  /**
   * 列表参数
   */
  tableParameter = ObjectUtil.deepClone(TABLE_PARAMETER);

  @Input()
  templateFile: TemplateFile = null;
  @Output()
  templateFileChange = new EventEmitter<TemplateFile>();

  /**
   * 列表数据
   */
  tableData: any[] = [];

  columns: STColumn[] = [
    { width: '50px', className: 'text-center', type: 'radio' },
    { title: '序号', render: 'number', width: '10%', className: 'text-center' },
    { title: '模板名称', index: 'templateName', width: '45%', className: 'text-center' },
    { title: '创建时间', index: 'createdTime', width: '45%', className: 'text-center' },
  ];

  constructor(private templateFileService: TemplateFileService) {}

  ngOnInit() {}

  /**
   * 表格变化事件，用于双击、排序，翻页等操作
   * @param e 事件
   */
  change(e: any): void {
    // 双击事件
    if (e.type === 'dblClick') {
    }

    // 排序事件
    if (e.type === 'sort') {
      if (e.sort.map) {
        this.queryOptions.sort = e.sort.map.sort;
      }
    }
    // 翻页设置
    if (e.type === 'ps' || e.type === 'pi') {
      this.queryOptions.page = e.pi - 1;
      this.queryOptions.size = e.ps;
    }
    // 单选事件
    if (e.type === 'radio') {
      this.templateFile = e.radio;
      this.templateFileChange.emit(e.radio);
    }
  }

  load(): void {
    this.loading = true;
    this.templateFileService
      .findByPage(
        this.queryParams.categoryId,
        this.queryParams.cateType,
        null,
        this.queryOptions.page,
        this.queryOptions.size,
      )
      .subscribe(result => {
        this.tableData = result.data;
        this.tableData = [...this.tableData];
        if (this.templateFile) {
          this.tableData.forEach(item => {
            if (item.id === this.templateFile.id) {
              item.checked = true;
            }
          });
        }
        this.tableParameter.page.total = result.totalRecords;
        this.tableParameter.pi = result.pageNo + 1;
        this.loading = false;
      });
  }
}
