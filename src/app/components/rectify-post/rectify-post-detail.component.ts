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
  LEFT_WIDTH = 300;

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
   * 步骤条进度
   */
  current = 0;
  /**
   * 判断是否只读
   */
  readFlag1: boolean;
  readFlag2: boolean;
  visabled = false;
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
  pre(): void {
    this.current -= 1;
    this.changeContent();
  }

  next(): void {
    this.current += 1;
    this.visabled = true;
    this.changeContent();
  }

  done(): void {
    console.log('done');
  }

  changeContent(): void {
    switch (this.current) {
      case 0: {
        this.readFlag1 = false;
        this.readFlag2 = true;
        break;
      }
      case 1: {
        this.readFlag1 = true;
        this.readFlag2 = false;
        break;
      }
      default: {
        this.readFlag1 = true;
        this.readFlag1 = false;
      }
    }
  }
}
