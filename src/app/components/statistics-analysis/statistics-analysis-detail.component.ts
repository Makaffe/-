import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NzModalService, NzModalRef } from 'ng-zorro-antd';
import { RectificationPostListComponent } from '../audit-post/rectification-post-list.component';
import { RectifyIssueListComponent } from '../rectify-issue/rectify-issue-list.component';

@Component({
  selector: 'app-statistics-analysis-detail',
  templateUrl: './statistics-analysis-detail.component.html',
  styles: [],
})
export class StatisticsAnalysisDeatilComponent implements OnInit {
  /**
   * 整改台账
   */
  @ViewChild('rectificationPostListComponent', { static: false })
  rectificationPostListComponent: RectificationPostListComponent;

  /**
   * 整改问题清单
   */
  @ViewChild('rectifyIssueListComponent', { static: false })
  rectifyIssueListComponent: RectifyIssueListComponent;
  /**
   * 接收传进来的类型
   */
  @Input() option: string;

  @Input() proState: string;

  isVisible = false;

  constructor() {}

  ngOnInit(): void {}

  showModal(): void {
    this.isVisible = true;
    console.log(this.option);
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
