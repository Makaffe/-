import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'audit-post-view',
  templateUrl: './audit-post-view.component.html',
  styles: [],
})
export class AuditPostViewComponent implements OnInit {
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
  constructor(private router: Router) {}

  ngOnInit() {}
  push() {
    this.router.navigate(['/audit-rectify/audit-post-detail']);
  }
}
