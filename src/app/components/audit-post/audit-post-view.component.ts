import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Broadcaster } from 'src/app/matech/service/broadcaster';
import { AuditPostListComponent } from './audit-post-list.component';

@Component({
  selector: 'app-audit-post-view',
  templateUrl: './audit-post-view.component.html',
  styles: [],
})
export class AuditPostViewComponent implements OnInit, OnDestroy {
  @ViewChild('auditPostList', { static: false })
  auditPostList: AuditPostListComponent;
  /**
   * 选择的审计报告类型
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

  sevaAudit: Subscription;

  /**
   * 查询条件参数
   */
  filterParams: {
    name: string;
    auditBeginTime: string;
    auditEndTime: string;
    auditUnitName: string;
    auditDateRange?: [];
    typeId?: string;
  } = {
      name: null,
      auditBeginTime: null,
      auditEndTime: null,
      auditUnitName: null,
      auditDateRange: null,
      typeId: null,
    };

  selectDateRange($event) {
    console.log('=========SELECT-DATERANGE==========');
    console.dir($event);
    this.filterParams.auditBeginTime = this.datePipe.transform($event[0], 'yyyy-MM-dd');
    this.filterParams.auditEndTime = this.datePipe.transform($event[1], 'yyyy-MM-dd');
  }

  constructor(private router: Router, private datePipe: DatePipe, private broadcastr: Broadcaster) {
    this.sevaAudit = new Subscription();
  }
  ngOnDestroy(): void {
    this.sevaAudit.unsubscribe();
  }

  ngOnInit() {
    this.sevaAudit = this.broadcastr.on<any>('seva:data-seva').subscribe(data => {
      this.search();
    });
  }

  push() {
    this.router.navigate(['/audit-rectify/audit-post-detail'], {
      queryParams: {
        postTypeId: this.selectedPostType ? this.selectedPostType.key : null,
        isWatch: false,
        isEdit: true,
        isNew: true,
        postId: null,
      },
    });
  }

  search(): void {
    if (this.selectedPostType) {
      this.filterParams.typeId = this.selectedPostType.key;
    }
    this.auditPostList.load();
  }

  postTypeChange($event) {
    console.log('=============TYPE CHANGE================');
    console.log($event);
    this.filterParams.typeId = $event ? $event.key : null;
    this.auditPostList.load();
  }
}
