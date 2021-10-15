import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { QueryOptions, TABLE_PARAMETER } from '@mt-framework-ng/core';
import { ObjectUtil } from '@ng-mt-framework/util';
import { NzMessageService } from 'ng-zorro-antd';
import { ProposalTemplateDTO } from './model/ProposalTemplateDTO';
import { ProposalTemplateService } from './service/ProposalTemplateService';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'advice-template-list',
  templateUrl: './advice-template-list.component.html',
  styles: [],
})
export class AdviceTemplateListComponent implements OnInit {
  @Output()
  tableOperations = new EventEmitter<any>();

  /**
   * 列表加载状态
   */
  loading = false;

  /**
   * 列表数据
   */
  tableData: Array<ProposalTemplateDTO> = [];
  /**
   * 列表参数
   */
  tableParameter = ObjectUtil.deepClone(TABLE_PARAMETER);
  /**
   * 分页，排序参数
   */
  @Input()
  queryOptions: QueryOptions = {
    page: 0,
    size: 10,
    sort: 'id,desc',
  };

  columns = [
    { title: '序号', render: 'number', width: '50px', className: 'text-center', type: 'radio' },
    {
      title: '问题类型',
      index: 'problemType',
      width: '30%',
      sort: this.tableParameter.sortDef,
    },
    {
      title: '审计建议',
      index: 'auditProposal',
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
  constructor(private proposalTemplateTypeService: ProposalTemplateService, private msg: NzMessageService) { }

  ngOnInit() {
    this.load();
  }

  /**
   * 加载列表
   */
  load() {
    this.loading = true;
    this.proposalTemplateTypeService.findAOnePage(
      this.queryOptions.page,
      this.queryOptions.size,
      this.queryOptions.sort
    ).subscribe(data => {
      data.data.forEach(item => {
        item.problemType = item.problemType === 'PROBLEM_ONE' ? '类型一' : '类型二';
      });
      this.tableData = data.data;
      this.tableParameter.page.total = data.totalRecords;
    }, () => { }, () => { this.loading = false; });
  }

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
