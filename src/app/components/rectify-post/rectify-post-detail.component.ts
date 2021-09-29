import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rectify-post-detail',
  templateUrl: './rectify-post-detail.component.html',
  styleUrls: ['./rectify-post-detail.component.less'],
})
export class RectifyPostDetailComponent implements OnInit {
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
  listOfData = [
    {
      id: '1',
      quote: '模板1',
      reportName: 'xxxx整改报告',
    },
    {
      id: '2',
      quote: '模板2',
      reportName: 'xxxx整改报告',
    },
    {
      id: '3',
      quote: '模板2',
      reportName: 'xxxx整改报告',
    },
  ];
  constructor() {}

  ngOnInit() {}
}
