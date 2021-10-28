import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { RectificationPostListComponent } from './rectification-post-list.component';
@Component({
  selector: 'app-rectification-post',
  templateUrl: './rectification-post.component.html',
})
export class RectificationPostComponent implements OnInit {
  /**
   * 列表组件
   */

  @ViewChild('rectificationPostListComponent', { static: false })
  rectificationPostListComponent: RectificationPostListComponent;
  /**
   * 搜索参数
   */
  params = this.initParams();

  startValue: Date | null = null;
  endValue: Date | null = null;
  endOpen = false;

  /**
   * 表格高度
   */
  @Input()
  tableHeight = '100%';

  /**
   *
   * @param startValue 开始时间
   *
   */
  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue || !this.endValue) {
      return false;
    }
    return startValue.getTime() > this.endValue.getTime();
    // tslint:disable-next-line:semicolon
  };
  /**
   *
   * @param endValue 结束时间
   *
   */
  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.startValue) {
      return false;
    }
    return endValue.getTime() <= this.startValue.getTime();
    // tslint:disable-next-line:semicolon
  };

  /**
   *
   * @param item 参数
   *
   */
  initParams(item?: any) {
    return {
      name: item ? item.name : null,
      auditPostName: item ? item.auditPostName : null,
      importAuditPostStartTime: item ? item.importAuditPostStartTime : null,
      importAuditPostEndTime: item ? item.importAuditPostEndTime : null,
      problemType: item ? item.problemType : null,
      finishStatus: item ? item.finishStatus : null,
      source: item ? item.source : null,
    };
  }

  /**
   * 搜索
   */
  search() {}

  /**
   * 清除
   */
  clear() {}
  ngOnInit(): void {}
}
