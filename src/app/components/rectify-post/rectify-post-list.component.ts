import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { STChange, STColumnTag } from '@delon/abc';
import { QueryOptions, TABLE_PARAMETER } from '@mt-framework-ng/core';
import { ObjectUtil } from '@ng-mt-framework/util';
import { NzMessageService } from 'ng-zorro-antd';
import { Subscription } from 'rxjs';
import { Broadcaster } from 'src/app/matech/service/broadcaster';
import { RectificationReportDTO } from './model/RectificationReportDTO';
import { RectificationReportTypeDTO } from './model/RectificationReportTypeDTO';
import { RectificationReportService } from './service/RectificationReportService';

const TAG: STColumnTag = {
  NO_CREATE: { text: '未生成' },
  CREATED: { text: '已生成', color: 'green' },
};
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rectify-post-list',
  templateUrl: './rectify-post-list.component.html',
  styles: [],
})
export class RectifyPostListComponent implements OnInit {

  /**
   * 搜索条件
   */
  @Input()
  filter = {
    name: null,
    auditTime: null,
  };

  /**
   * 编辑或修改整改报告数据变更事件
   */
  dataChangeSubscription: Subscription = null;

  /**
   * 当前左侧树点击的节点
   */
  @Input()
  currentClickNode: RectificationReportTypeDTO = new RectificationReportTypeDTO();

  /**
   * 列表数据
   */
  tableData: Array<RectificationReportDTO> = [];

  /**
   * 列表加载状态
   */
  loading = false;

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
   * 列表参数
   */
  tableParameter = ObjectUtil.deepClone(TABLE_PARAMETER);
  columns = [
    { title: '编号', index: 'id', type: 'checkbox', width: '10px', className: 'text-center' },
    { title: '序号', render: 'number', width: '10px', className: 'text-center', type: 'radio' },
    {
      title: '状态',
      index: 'auditReportStatus',
      width: '15px',
      type: 'tag',
      tag: TAG,
      className: 'text-center',
      sort: this.tableParameter.sortDef,
    },
    {
      title: '整改报告名称',
      index: 'name',
      width: '40px',
      sort: this.tableParameter.sortDef,

    },
    {
      title: '整改统计时间',
      index: 'auditTime',
      width: '30px',
      sort: this.tableParameter.sortDef,
      className: 'text-left',
    },
    { title: '操作', render: 'operations', width: '20px', className: 'text-center', fixed: 'right' },
  ];
  constructor(
    private router: Router,
    private rectificationReportService: RectificationReportService,
    private msg: NzMessageService,
    private broadcaster: Broadcaster,
  ) {
    this.dataChangeSubscription = this.broadcaster.on<any>('rectify-report-list:change').subscribe(() => {
      this.load();
    });
  }

  ngOnInit() {
    this.load();
  }

  /**
   * 加载列表数据
   */
  load() {
    this.loading = true;
    const auditStartTime = this.filter.auditTime && this.filter.auditTime.length > 0
      ? formatDate(this.filter.auditTime[0], 'yyyy-MM-dd', 'ZH') : null;
    const auditEndTime = this.filter.auditTime && this.filter.auditTime.length > 0
      ? formatDate(this.filter.auditTime[1], 'yyyy-MM-dd', 'ZH') : null;
    this.rectificationReportService.findAOnePage(
      this.queryOptions.page,
      this.queryOptions.size,
      this.queryOptions.sort,
      this.currentClickNode && this.currentClickNode.id ? this.currentClickNode.id : null,
      this.filter.name,
      auditStartTime,
      auditEndTime
    ).subscribe(data => {
      data.data.forEach(item => {
        // 整改统计时间
        let auditTime = '';
        if (item.auditStartTime && item.auditEndTime) {
          auditTime = formatDate(item.auditStartTime, 'yyyy-MM-dd', 'ZH') + '~' + formatDate(item.auditEndTime, 'yyyy-MM-dd', 'ZH');
        }
        Object.assign(item, { auditTime });
      });
      this.tableData = data.data;
      this.tableParameter.page.total = data.totalRecords;
      this.tableParameter.pi = data.pageNo + 1;
    }, null, () => { this.loading = false; });
  }
  /**
   * 查看，编辑整改报告
   */
  edit(row: RectificationReportDTO, isWatch: boolean): void {
    row.rectificationReportTypeId = row.rectificationReportType ? row.rectificationReportType.id : row.rectificationReportTypeId;
    this.router.navigate([`/audit-rectify/rectify-post-detail/${isWatch}/${row.rectificationReportTypeId}/${row.id}`]);
  }
  /**
   * 删除
   */
  delete(row: RectificationReportDTO) {
    this.rectificationReportService.delete(row.id).subscribe(() => {
      this.msg.success('删除成功！');
      this.load();
    });
  }
  change(e: STChange): void {
  }
}
