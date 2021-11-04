import { DatePipe, formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { OrganizationService } from '@ng-mt-framework/api';
import { TreeUtil } from '@ng-mt-framework/comp';
import { RectifyTrackListComponent } from './rectify-track-list.component';

@Component({
  selector: 'app-rectify-track-view',
  templateUrl: './rectify-track-view.component.html',
  styles: [],
})
export class RectifyTrackViewComponent implements OnInit {
  /**
   * 列表组件
   */
  @ViewChild('rectifyTrackListComponent', { static: false })
  rectifyTrackListComponent: RectifyTrackListComponent;

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
  filter = this.initFilter();

  /**
   * 整改部门树
   */
  organizationTree = [];

  /**
   * 下发状态
   */
  sendStatusList = [
    {
      label: '未下发',
      value: 'NOT_ISSUED',
    },
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

  /**
   * 初始化查询参数
   */
  initFilter() {
    return {
      reportName: null,
      rectifyProblemName: null,
      rectifyUnitId: null,
      rectifyDepartmentId: null,
      rectifyUserId: null,
      sendStatus: [],
      transferStatus: null,
      trackStatus: null,
      startTime: null,
      endTime: null,
      dutyUserId: null,
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
    this.rectifyTrackListComponent.load();
  }

  /**
   * 清空查询条件
   */
  clear() {
    this.filter = this.initFilter();
  }

  /**
   * 禁用开始时间
   */
  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue || !this.filter.endTime) {
      return false;
    }
    return startValue.getTime() > new Date(this.filter.endTime).getTime();
    // tslint:disable-next-line:semicolon
  };

  /**
   * 禁用结束时间
   */
  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.filter.startTime) {
      return false;
    }
    return endValue.getTime() <= new Date(this.filter.startTime).getTime();
    // tslint:disable-next-line:semicolon
  };
}
