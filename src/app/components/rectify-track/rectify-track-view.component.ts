import { DatePipe, formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { OrganizationService } from '@ng-mt-framework/api';
import { TreeUtil } from '@ng-mt-framework/comp';
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
      rectifyProblemName: null,
      rectifyDepartmentId: null,
      sendStatus: null,
      transferStatus: null,
      startTime: null,
      endTime: null,
    };
  }

  onChangeRectifyEndTime(date: any) {
    if (date instanceof Date) {
      this.formatDateFun(date);
      this.params.startTime = date[0];
      this.params.endTime = date[1];
    } else {
      this.date = null;
    }
  }

  formatDateFun(date: Date) {
    if (date) {
      return formatDate(date, 'yyyy-MM-dd', this.locale);
    } else {
      return '';
    }
  }

  /**
   * 时间格式化
   */
  //  this.params.startTime = this.datePipe.transform(event[0], 'yyyy-MM-dd');
  //   this.params.endTime = this.datePipe.transform(event[1], 'yyyy-MM-dd');
  selectDateRange($event) {
    console.log('=========SELECT-DATERANGE==========');
    console.dir($event);
    this.params.startTime = this.datePipe.transform($event[0], 'yyyy-MM-dd');
    this.params.endTime = this.datePipe.transform($event[1], 'yyyy-MM-dd');
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
}
