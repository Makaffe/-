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
   * 搜索条件
   */
  @Input()
  filter = {
    auditProposal: null,
    problemType: null,
    proposalTemplateType: null
  };
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
    size: 20,
    sort: 'id,desc',
  };

  columns = [
    { title: '序号', render: 'number', width: '50px', className: 'text-center', type: 'radio' },
    {
      title: '模板名称',
      index: 'name',
      width: '20%',
      sort: this.tableParameter.sortDef,
    },
    {
      title: '问题类型',
      index: 'rectifyProblemType.name',
      width: '10%',
      className: 'text-center',
      sort: this.tableParameter.sortDef,
    },
    {
      title: '审计建议',
      index: 'auditProposal',
      width: '45%',
      sort: this.tableParameter.sortDef,
    },
    { title: '操作', render: 'operations', width: '150px', className: 'text-center', fixed: 'right' },
  ];
  constructor(private proposalTemplateService: ProposalTemplateService, private msg: NzMessageService) { }

  ngOnInit() {
    this.load();
  }

  /**
   * 加载列表
   */
  load() {
    this.loading = true;
    this.proposalTemplateService.findAOnePage(
      this.queryOptions.page,
      this.queryOptions.size,
      this.queryOptions.sort,
      this.filter.auditProposal,
      this.filter.problemType,
      this.filter.proposalTemplateType ? this.filter.proposalTemplateType.id : null
    ).subscribe(data => {
      this.tableData = data.data;
      this.tableParameter.page.total = data.totalRecords;
      this.tableParameter.pi = data.pageNo + 1;
    }, () => { }, () => { this.loading = false; });
  }

  /**
   * 显示弹窗
   */
  showModel(item: any, isWatch: boolean) {
    this.tableOperations.emit({
      item,
      isWatch,
    });
  }

  /**
   * 删除一行数据
   */
  delete(id: string) {
    this.proposalTemplateService.delete(id).subscribe(() => {
      this.load();
      this.msg.success('删除成功');
    });
  }

  /**
   * 表格变化事件，用于双击、排序，翻页等操作
   * @param e 事件
   */
  change(e: any): void {
    // 双击事件
    if (e.type === 'dblClick') {
      this.showModel(e.dblClick.item, true);
    }

    // 排序事件
    if (e.type === 'sort') {
      if (e.sort.map) {
        this.queryOptions.sort = e.sort.map.sort;
      }
      this.load();
    }

    // 翻页设置
    if (e.type === 'ps' || e.type === 'pi') {
      this.queryOptions.page = e.pi - 1;
      this.queryOptions.size = e.ps;
      this.load();
    }
  }

}
