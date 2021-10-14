import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuditPostListComponent } from './audit-post-list.component';

@Component({
  selector: 'audit-post-view',
  templateUrl: './audit-post-view.component.html',
  styles: [],
})
export class AuditPostViewComponent implements OnInit {
  @ViewChild('auditPostList', { static: false })
  auditPostList: AuditPostListComponent;
  /**
   * 喜欢总的审计报告版本
   */
  selectedPostType = null;
  /**
   * 左侧宽度常量
   */
  LEFT_WIDTH = 180;

  /**
   * 左侧宽度常量
   */
  TOP_HIGHT = 50;
  /**
   * 左侧组织机构树宽度
   */
  leftSize = this.LEFT_WIDTH;

  /**
   * 左侧组织机构树上部分高度
   */
  topSize = this.TOP_HIGHT;

  /**
   * 查询条件参数
   */
  filterParams: {
    name: string;
    auditBeginTime: string;
    auditEndTime: string;
    auditUnitName: string;
    auditDateRange?: [];
  } = {
    name: null,
    auditBeginTime: null,
    auditEndTime: null,
    auditUnitName: null,
    auditDateRange: null,
  };

  selectDateRange($event) {
    console.log('=========SELECT-DATERANGE==========');
    console.dir($event);
    this.filterParams.auditBeginTime = this.datePipe.transform($event[0], 'yyyy-MM-dd');
    this.filterParams.auditEndTime = this.datePipe.transform($event[1], 'yyyy-MM-dd');
  }

  constructor(private router: Router, private datePipe: DatePipe) {}

  ngOnInit() {}
  push() {
    this.router.navigate(['/audit-rectify/audit-post-detail']);
  }

  search(): void {
    this.auditPostList.load();
  }
}
