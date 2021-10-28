import { DatePipe, formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { OrganizationService } from '@ng-mt-framework/api';
import { TreeUtil } from '@ng-mt-framework/comp';
import { RectifyIssueTransferComponent } from '../rectify-issue/rectify-issue-transfer.component';
import { RectifyTrackListComponent } from './rectify-track-list.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rectify-track-view',
  templateUrl: './rectify-track-view.component.html',
  styles: [],
})
export class RectifyTrackViewComponent implements OnInit {
  @ViewChild('rectifyTrackList', { static: false })
  rectifyTrackList: RectifyTrackListComponent;

  /**
   * 时间
   */
  date: Date;

  /**
   * 日期格式化
   */
  dateFormat = 'yyyy/MM/dd';
  /**
   *
   * 查询参数
   */
  params = this.initParams();

  /**
   * 整改部门树
   */
  organizationTree = [];

  /**
   * 下发状态
   */
  sendStatusList = [
    {
      label: '下发中',
      value: 'ISSUING',
    },
    {
      label: '已下发',
      value: 'ISSUED',
    },
  ];

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private organizationService: OrganizationService,
    private datePipe: DatePipe,
  ) {}

  ngOnInit() {
    this.organizationService.getOrganizationTreeOfEmployeeOrUser().subscribe(data => {
      this.organizationTree = TreeUtil.populateTreeNodes(data, 'id', 'name', 'children');
    });
  }

  initParams() {
    return {
      auditPostName: null, // 报告名称
      improtAuditPostStartTime: null, // 导入报告开始时间
      improtAuditPostEndTime: null, // 导入报告开始时间
      problemType: null, // 问题类型
      problemName: null, // 问题名称
      isDistribute: null, // 是否已分配
      isSend: null, // 是否已下发
      rectifyProblemName: null,
      rectifyDepartmentId: null,
      sendStatus: null,
      transferStatus: null,
    };
  }

  formatDateFun(date: Date) {
    if (date) {
      return formatDate(date, 'yyyy-MM-dd', this.locale);
    } else {
      return '';
    }
  }

  search(): void {
    this.rectifyTrackList.load();
  }

  /**
   * 清空查询条件
   */
  clear() {
    this.params = this.initParams();
  }

  /**
   * 禁用开始时间
   */
  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue || !this.params.improtAuditPostEndTime) {
      return false;
    }
    return startValue.getTime() > new Date(this.params.improtAuditPostEndTime).getTime();
    // tslint:disable-next-line:semicolon
  };

  /**
   * 禁用结束时间
   */
  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.params.improtAuditPostStartTime) {
      return false;
    }
    return endValue.getTime() <= new Date(this.params.improtAuditPostStartTime).getTime();
    // tslint:disable-next-line:semicolon
  };
}
