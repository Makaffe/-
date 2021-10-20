import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CategoryTreeService, TemplateFile } from '@mt-insight-ng/insight';
import { QueryOptions } from '@ng-mt-framework/api';
import { TemplateListComponent } from './template-list.component';

@Component({
  selector: 'app-tempalte-select',
  templateUrl: './tempalte-select.component.html',
  styles: [],
})
export class TempalteSelectComponent implements OnInit {
  @ViewChild('templateListComponent', { static: false })
  templateListComponent: TemplateListComponent;
  /**
   * 数据请求标志
   */
  loading = false;
  isVisible = false;
  value;

  queryParams = {
    cateType: null,
    categoryId: null,
    filterField: '',
  };

  nodes = [];
  allNodes = [];
  @Input()
  selectedtemplateFile: TemplateFile = null;
  @Output()
  selectedTemplateFileChange = new EventEmitter<TemplateFile>();

  /**
   * 分页，排序参数
   */
  queryOptions: QueryOptions = {
    page: 0,
    size: 20,
    sort: 'id,desc',
  };

  private categoryQueryOptions = {
    code: 'TMP_SPECIAL_REPORT',
    searchType: 0,
    keyword: '',
    isSearchResource: false,
  };

  constructor(private categoryTreeService: CategoryTreeService) { }

  ngOnInit() {
    this.loadCategory();
  }

  loadCategory(): void {
    this.categoryTreeService
      .get(
        this.categoryQueryOptions.code,
        this.categoryQueryOptions.searchType,
        this.categoryQueryOptions.keyword,
        this.categoryQueryOptions.isSearchResource,
      )
      .subscribe(data => {
        this.nodes = data;
        this.tramsform(this.nodes, 100);
        this.nodes = [...this.nodes];
        this.value = this.nodes && this.nodes[0] ? this.nodes[0].key : null;
        this.queryParams.categoryId = this.nodes && this.nodes[0] ? this.nodes[0].id : null;
        this.templateListComponent.load();
        const allNodes = [];
        this.getAllNodes(this.nodes, allNodes);
        this.allNodes = allNodes;
      });
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  save(): void {
    this.handleCancel();
  }

  show(): void {
    this.templateListComponent.load();
    this.isVisible = true;
  }

  search(): void {
    this.templateListComponent.load();
  }



  onChange($event: string): void {
    if ($event) {
      const node = this.allNodes.filter(item => item.key === $event)[0];
      this.queryParams.categoryId = node.id;
    } else {
      this.queryParams.categoryId = null;
    }
  }



  tramsform(data: Array<any>, level: number): void {
    let counter = 0;
    data.forEach(item => {
      item.title = item.name;
      item.key = `${level + counter}`;
      counter++;
      if (item.children && item.children.length > 0) {
        this.tramsform(item.children, level * 10);
      }
    });
  }

  /***
   * 递归获取节点
   */
  getAllNodes(tree: Array<any>, array: Array<any>) {
    for (const node of tree) {
      array.push(node);
      if (node.children && node.children.length > 0) {
        this.getAllNodes(node.children, array);
      }
    }
  }

  templateFileChange($event): void {
    if ($event) {
      this.selectedtemplateFile = $event;
      this.selectedTemplateFileChange.emit($event);
    }
  }
}
