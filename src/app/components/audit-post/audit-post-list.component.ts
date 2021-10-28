import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { STColumnTag } from '@delon/abc';
import { ApiPagedData, QueryOptions, TABLE_PARAMETER } from '@mt-framework-ng/core';
import { ObjectUtil } from '@ng-mt-framework/util';
import { NzMessageService } from 'ng-zorro-antd';
import { AuditPostDTO } from './model/AuditPostDTO';
import { AuditPostService } from './service/AuditPostService';

const TAG: STColumnTag = {
  GENERATED: { text: '已整改', color: 'red' },
  NO_GENERATED: { text: '未整改', color: 'green' },
  GENERATING: { text: '整改中', color: 'blue' },
};
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
  tableData: Array<any> = [
    {
      auditReportStatus: 'GENERATED',
      name: '审计报告',
      auditName: '审计单位',
      auditStartTime: '2021-10-26',
      auditEndTime: '2021-10-27',
      probkemAmount: 10,
    },
    {
      auditReportStatus: 'NO_GENERATED',
      name: '审计报告',
      auditName: '审计单位',
      auditStartTime: '2021-10-26',
      auditEndTime: '2021-10-27',
      probkemAmount: 10,
    },
    {
      auditReportStatus: 'GENERATING',
      name: '审计报告',
      auditName: '审计单位',
      auditStartTime: '2021-10-26',
      auditEndTime: '2021-10-27',
      probkemAmount: 10,
    },
  ];
  /**
   * 列表参数
   */
  tableParameter = ObjectUtil.deepClone(TABLE_PARAMETER);
  columns = [
    { title: '序号', render: 'number', width: '10px', className: 'text-center', type: 'radio' },
    {
      title: '状态',
      index: 'auditReportStatus',
      width: '15px',
      className: 'text-center',
      type: 'tag',
      tag: TAG,
      fixed: 'left',
    },
    {
      title: '审计报告名称',
      index: 'name',
      width: '40px',
      sort: this.tableParameter.sortDef,
      className: 'text-center',
    },
    {
      title: '审计单位名称',
      index: 'auditName',
      width: '40px',
      sort: this.tableParameter.sortDef,
      className: 'text-left',
    },
    {
      title: '审计开始时间',
      index: 'auditStartTime',
      render: 'auditStartTime',
      width: '40px',
      sort: this.tableParameter.sortDef,
      className: 'text-left',
    },
    {
      title: '审计结束时间',
      index: 'auditEndTime',
      render: 'auditEndTime',
      width: '40px',
      sort: this.tableParameter.sortDef,
      className: 'text-left',
    },
    {
      title: '审计问题数',
      render: 'probkemAmount',
      index: 'probkemAmount',
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
    size: 20,
    sort: 'id,desc',
  };

  /**
   * 查询过滤参数
   */

  @Input()
  filterParams: {
    name: string;
    auditBeginTime: string;
    auditEndTime: string;
    auditUnitName: string;
    typeId: string;
  } = {
    name: null,
    auditBeginTime: null,
    auditEndTime: null,
    auditUnitName: null,
    typeId: null,
  };

  constructor(private router: Router, private auditPostService: AuditPostService, private msg: NzMessageService) {}

  ngOnInit() {
    // this.load();
  }

  load(): void {
    this.loading = true;
    this.auditPostService
      .findOnePage(
        this.queryOptions.page,
        this.queryOptions.size,
        this.queryOptions.sort,
        this.filterParams.typeId,
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
    this.router.navigate(['/audit-rectify/audit-post-detail'], {
      queryParams: {
        postTypeId: null,
        isWatch: false,
        isEdit: true,
        isNew: false,
        allshow: false,
        postId: row.id,
      },
    });
  }
  check(row): void {
    this.router.navigate(['/audit-rectify/audit-post-detail'], {
      queryParams: {
        postTypeId: null,
        isWatch: true,
        isEdit: false,
        isNew: false,
        allshow: true,
        postId: row.id,
      },
    });
  }

  delete(row): void {
    this.auditPostService.delete(row.id).subscribe({
      next: () => {
        this.msg.success(`删除成功`);
        this.load();
      },
      error: () => {},
      complete: () => {},
    });
  }
}
