import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiPagedData, QueryOptions, TABLE_PARAMETER } from '@mt-framework-ng/core';
import { ObjectUtil } from '@ng-mt-framework/util';
import { AuditPostDTO } from './model/AuditPostDTO';
import { AuditPostService } from './service/AuditPostService';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'audit-post-list',
  templateUrl: './audit-post-list.component.html',
  styles: [],
})
export class AuditPostListComponent implements OnInit {
  loading = false;
  /**
   * 列表数据
   */
  tableData: Array<any> = [];
  /**
   * 列表参数
   */
  tableParameter = ObjectUtil.deepClone(TABLE_PARAMETER);
  columns = [
    { title: '序号', render: 'number', width: '10px', className: 'text-center', type: 'radio' },
    {
      title: '状态',
      render: 'state',
      width: '15px',
    },
    {
      title: '审计报告名称',
      index: 'postName',
      width: '40px',
      sort: this.tableParameter.sortDef,
      className: 'text-center',
    },
    {
      title: '审计单位名称',
      index: 'unitName',
      width: '40px',
      sort: this.tableParameter.sortDef,
      className: 'text-left',
    },
    {
      title: '审计时间',
      index: 'time',
      width: '40px',
      sort: this.tableParameter.sortDef,
      className: 'text-left',
    },
    {
      title: '审计问题数',
      index: 'issueAmount',
      width: '40px',
      sort: this.tableParameter.sortDef,
      className: 'text-left',
    },
    { title: '操作', render: 'operations', width: '30px', className: 'text-center', fixed: 'right' },
  ];

  /**
   * 分页，排序参数
   */
  @Input()
  queryOptions: QueryOptions = {
    page: 0,
    size: 10,
    sort: 'id,desc',
  };

  /**
   * 查询过滤参数
   */

  @Input()
  filterParams: { name: string; auditBeginTime: string; auditEndTime: string; auditUnitName: string } = {
    name: null,
    auditBeginTime: null,
    auditEndTime: null,
    auditUnitName: null,
  };

  constructor(private router: Router, private auditPostService: AuditPostService) {}

  ngOnInit() {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.auditPostService
      .findOnePage(
        this.queryOptions.page,
        this.queryOptions.size,
        this.queryOptions.sort,
        this.filterParams.name,
        this.filterParams.auditBeginTime,
        this.filterParams.auditEndTime,
        this.filterParams.auditUnitName,
      )
      .subscribe({
        next: (data: ApiPagedData<AuditPostDTO>) => {
          this.tableData = data.data;
          this.tableParameter.page.total = data.totalRecords;
        },
        error: () => {},
        complete: () => {
          this.loading = false;
        },
      });
  }

  edit(row): void {
    this.router.navigate(['/audit-rectify/audit-post-detail']);
  }
  check(row): void {
    this.router.navigate(['/audit-rectify/audit-post-detail']);
  }
}
