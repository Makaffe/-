import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { STColumnTag } from '@delon/abc';
import { ApiPagedData, QueryOptions, TABLE_PARAMETER } from '@mt-framework-ng/core';
import { ObjectUtil } from '@ng-mt-framework/util';
import { NzMessageService } from 'ng-zorro-antd';
import { AuditPostDetailComponent } from './audit-post-detail.component';
import { AuditPostDTO } from './model/AuditPostDTO';
import { AuditReportDTO } from './newmodel/AuditReportDTO';
import { AuditReportService } from './newservice/AuditReportService';
import { AuditPostService } from './service/AuditPostService';

const TAG: STColumnTag = {
  COMPLETED: { text: '已整改', color: 'red' },
  NOT_RECTIFIED: { text: '未整改', color: 'green' },
  RECTIFYING: { text: '整改中', color: 'blue' },
};
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'audit-post-list',
  templateUrl: './audit-post-list.component.html',
  styles: [],
})
export class AuditPostListComponent implements OnInit {
  /**
   * 后台请求表示
   */
  loading = false;

  /**
   * 列表数据
   */
  tableData: Array<any> = [{
    auditReportStatus: 'NOT_RECTIFIED',
    name: '关于XXX部门审计报告测试',
    auditName: 'XXX单位',
    auditStartTime: '2021-10-10',
    auditEndTime: '2020-12-29',
    auditOpinionCount: '1',
    auditProposalCount: '1',

  }];

  /**
   * 列表参数
   */
  tableParameter = ObjectUtil.deepClone(TABLE_PARAMETER);

  /**
   * 列定义
   */
  columns = [
    { title: '序号', render: 'number', width: '50px', className: 'text-center', },
    {
      title: '状态',
      render: 'auditReportStatus',
      width: '12%',
      className: 'text-center',
      fixed: 'left',
    },
    // {
    //   title: '审计报告来源',
    //   render: 'auditSource',
    //   width: '10%',
    //   className: 'text-center',
    // },
    {
      title: '审计报告名称',
      index: 'name',
      width: '22%',
      className: 'text-center',
    },
    {
      title: '审计单位名称',
      index: 'auditName',
      width: '18%',
      className: 'text-left',
    },
    {
      title: '审计开始时间',
      index: 'auditStartTime',
      render: 'auditStartTime',
      width: '14%',
      sort: this.tableParameter.sortDef,
      className: 'text-left',
    },
    {
      title: '审计结束时间',
      index: 'auditEndTime',
      render: 'auditEndTime',
      width: '14%',
      sort: this.tableParameter.sortDef,
      className: 'text-left',
    },
    {
      title: '意见问题数',
      index: 'auditOpinionCount',
      width: '10%',
      sort: this.tableParameter.sortDef,
      className: 'text-right',
    },
    {
      title: '建议问题数',
      index: 'auditProposalCount',
      width: '10%',
      sort: this.tableParameter.sortDef,
      className: 'text-right',
    },
    { title: '操作', render: 'operations', width: '180px', className: 'text-center' },
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

  constructor(private router: Router, private auditReportService: AuditReportService, private msg: NzMessageService) {}

  ngOnInit() {
    this.load();
  }

  /**
   * 加载列表数据
   */
  load(): void {
    this.loading = true;
    this.auditReportService
      .findOnePage(
        this.queryOptions,
        this.filterParams.typeId,
        this.filterParams.name,
        this.filterParams.auditBeginTime,
        this.filterParams.auditEndTime,
        this.filterParams.auditUnitName,
      )
      .subscribe({
        next: (data: ApiPagedData<AuditReportDTO>) => {
          this.tableData = data.data;
          this.tableParameter.page.total = data.totalRecords;
        },
        error: () => {},
        complete: () => {
          this.loading = false;
        },
      });
  }

  /**
   *
   * @param row 查看和编辑的方法
   * 编辑已去掉
   */
  edit(row): void {
    this.router.navigate(['/audit-rectify/audit-post-detail'], {
      queryParams: {
        postTypeId: null,
        isWatch: false,
        isEdit: true,
        isNew: false,
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
        postId: row.id,
      },
    });
  }

  delete(row): void {
    this.auditReportService.delete(row.id).subscribe({
      next: () => {
        this.msg.success(`删除成功`);
        this.load();
      },
      error: () => {},
      complete: () => {},
    });
  }
}
