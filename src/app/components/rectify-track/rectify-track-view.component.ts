import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
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

  constructor(@Inject(LOCALE_ID) private locale: string) {}

  ngOnInit() {}

  onChangeRectifyEndTime(date: any) {
    if (date instanceof Date) {
      this.formatDateFun(date);
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

  search(): void {
    this.rectifyTrackList.load();
  }
}
