import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rectify-post-view',
  templateUrl: './rectify-post-view.component.html',
  styles: []
})
export class RectifyPostViewComponent implements OnInit {

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
  constructor() { }

  ngOnInit() {
  }

}
