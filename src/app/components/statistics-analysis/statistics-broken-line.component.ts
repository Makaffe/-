import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { RectificationPostListComponent } from '../audit-post/rectification-post-list.component';
import { RectifyIssueListComponent } from '../rectify-issue/rectify-issue-list.component';

@Component({
  selector: 'app-statistics-broken-line',
  templateUrl: './statistics-broken-line.component.html',
  styles: [],
})
export class StatisticsBrokenLineComponent implements OnInit {
  /**
   * 接收传进来的类型
   */
  @Input() option: any;

  isVisible = false;

  /**
   * 折线图
   */
  optionCreaseLine = {
    // title: {
    //   text: '问题数据历史变化',
    //   left: 'center',
    // },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: ['类型1', '类型2', '类型3', '类型4', '类型5', '类型6', '类型7', '类型8', '类型9', '类型10'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [30, 20, 24, 12, 30, 20, 24, 12, 30, 20],
        type: 'line',
        color: ['orange'],
      },
    ],
  };

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
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}
