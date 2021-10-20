import { Component, OnInit, ViewChild } from '@angular/core';
import { RectificationReportDTO } from './model/RectificationReportDTO';
import { TempalteSelectComponent } from './tempalte-select.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rectify-post-detail',
  templateUrl: './rectify-post-detail.component.html',
  styleUrls: ['./rectify-post-detail.component.less'],
})
export class RectifyPostDetailComponent implements OnInit {
  /**
   * 引用模板弹窗
   */
  @ViewChild('tempalteSelectComponent', { static: false })
  tempalteSelectComponent: TempalteSelectComponent;

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
   * 当前编辑对象
   */
  currentItem: RectificationReportDTO = new RectificationReportDTO();

  /**
   * 当前选中的模板
   */
  template = null;
  /**
   * 整改统计时间
   */
  auditTime = null;

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
  listOfData = [];
  constructor() { }

  ngOnInit() { }
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
  /**
   * 引用模板
   */
  referenceTempl(): void {
    this.tempalteSelectComponent.show();
  }
  selectTmpl($event) {
    console.log('模板', $event);
    this.template = $event;
    this.listOfData = [{ name: $event.name, reportName: this.currentItem.name }];
  }
}
