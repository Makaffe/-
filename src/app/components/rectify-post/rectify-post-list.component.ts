import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { STChange, STColumnTag } from '@delon/abc';
import { QueryOptions, TABLE_PARAMETER } from '@mt-framework-ng/core';
import { ObjectUtil } from '@ng-mt-framework/util';
import { NzMessageService } from 'ng-zorro-antd';
import { Subscription } from 'rxjs';
import { Broadcaster } from 'src/app/matech/service/broadcaster';
import { RectificationReportDetailDTO } from './model/RectificationReportDetailDTO';
import { RectificationReportDTO } from './model/RectificationReportDTO';
import { RectificationReportTypeDTO } from './model/RectificationReportTypeDTO';
import { RectifyPostDetailComponent } from './rectify-post-detail.component';
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
   * 整改报告详情弹窗
   */
  @ViewChild('rectifyPostDetailComponent', { static: false })
  rectifyPostDetailComponent: RectifyPostDetailComponent;

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
  tableData: Array<RectificationReportDetailDTO> = [];

  /**
   * 当前单选框选中的数据
   */
  @Input()
  selectedData = null;

  /**
   * 单选框选中事件
   */
  @Output()
  selectedDataChange = new EventEmitter<RectificationReportDetailDTO>();


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
    // { index: 'id', type: 'radio', width: '5px', className: 'text-center' },
    { title: '序号', render: 'number', width: '10px', className: 'text-center' },
    {
      title: '报告年份',
      index: 'year',
      width: '15px',
      type: 'tag',
      className: 'text-center',
      sort: this.tableParameter.sortDef,
    },
    {
      title: '报告类型',
      index: 'rectificationReportType.name',
      width: '20px',
      type: 'tag',
      className: 'text-center',
      sort: this.tableParameter.sortDef,
    },
    {
      title: '整改汇报名称',
      index: 'name',
      width: '45px',
      sort: this.tableParameter.sortDef,

    },
    {
      title: '整改统计时间',
      index: 'auditTime',
      width: '25px',
      sort: this.tableParameter.sortDef,
      className: 'text-center',
    },
    { title: '操作', render: 'operations', width: '25px', className: 'text-center', fixed: 'right' },
  ];
  constructor(
    private router: Router,
    private rectificationReportService: RectificationReportService,
    private msg: NzMessageService,
    private broadcaster: Broadcaster,
  ) { }

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
      this.setColums();
      data.data.forEach(item => {
        // 整改统计时间
        let auditTime = '';
        let year = '';
        if (item.auditStartTime && item.auditEndTime) {
          auditTime = formatDate(item.auditStartTime, 'yyyy-MM-dd', 'ZH') + '~' + formatDate(item.auditEndTime, 'yyyy-MM-dd', 'ZH');
          year = formatDate(item.auditStartTime, 'yyyy', 'ZH');
        }
        Object.assign(item, { auditTime });
        Object.assign(item, { year });
      });
      this.tableData = data.data;
      this.tableParameter.page.total = data.totalRecords;
      this.tableParameter.pi = data.pageNo + 1;
    }, null, () => { this.loading = false; });
  }

  /**
   * 根据左边树类型设置列表 的colum
   */
  setColums() {
    if (this.currentClickNode && this.currentClickNode.id) {
      if (this.currentClickNode.name === '按审计报告') {
        this.columns[4] = {
          title: '审计报告',
          index: 'auditReport',
          width: '25px',
          sort: this.tableParameter.sortDef,
          className: 'text-center',
        };
      } else if (this.currentClickNode.name === '按整改部门') {
        this.columns[4] = {
          title: '整改部门',
          index: 'rectifyDepartment',
          width: '25px',
          sort: this.tableParameter.sortDef,
          className: 'text-center',
        };
      } else if (this.currentClickNode.name === '按时间区间') {
        this.columns[4] = {
          title: '整改统计时间',
          index: 'auditTime',
          width: '25px',
          sort: this.tableParameter.sortDef,
          className: 'text-center',
        };
      }
      this.columns = [...this.columns];
    }
  }
  /**
   * 查看，编辑整改报告
   */
  edit(row: RectificationReportDetailDTO, isWatch: boolean, rectificationReportTypeId?: string): void {
    this.rectifyPostDetailComponent.openModal(row, isWatch, rectificationReportTypeId);
  }

  /**
   * 查看生成的报告
   */
  viewGnerateReport(item?: any) {

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

  /**
   * 表格变化事件，用于双击、排序，翻页等操作
   * @param e 事件
   */
  change(e: any): void {
    // 双击事件
    if (e.type === 'dblClick') {
      this.edit(e.dblClick.item, true);
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

    // 单选事件
    if (e.type === 'radio') {
      this.selectedData = e.radio;
      this.selectedDataChange.emit(e.radio);
    }
  }

}
