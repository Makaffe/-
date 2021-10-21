import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RectificationReportTypeDTO } from './model/RectificationReportTypeDTO';
import { RectifyPostListComponent } from './rectify-post-list.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rectify-post-view',
  templateUrl: './rectify-post-view.component.html',
  styles: []
})
export class RectifyPostViewComponent implements OnInit {

  /**
   * 整改报告列表
   */
  @ViewChild('rectifyPostListComponent', { static: false })
  rectifyPostListComponent: RectifyPostListComponent;

  /**
   * 搜索条件
   */
  filter = {
    name: null,
    auditTime: null,
  };

  /**
   * 当前左侧树点击的节点
   */
  currentClickNode: RectificationReportTypeDTO = new RectificationReportTypeDTO();

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
  constructor(private router: Router) { }

  ngOnInit() {
  }

  /**
   * 查找
   */
  search() {
    this.rectifyPostListComponent.load();
  }


  /**
   * 情况搜索条件
   */
  clearCondition() {
    this.filter.auditTime = null;
    this.filter.name = null;
  }

  /**
   * 新增整改报告
   */
  create() {
    this.router.navigate([`/audit-rectify/rectify-post-detail/false/${this.currentClickNode.id}/null`]);
  }

  /**
   * 左侧树点击事件
   */
  selectNode($event) {
    this.currentClickNode = $event;
    if ($event) {
      setTimeout(() => {
        this.rectifyPostListComponent.load();
      }, 100);
    }
  }
}
