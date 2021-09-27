import { Component, OnInit, ViewChild } from '@angular/core';
import { OaTemplateDetailComponent } from './oa-template-detail.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'oa-template-view',
  templateUrl: './oa-template-view.component.html',
  styles: [],
})
export class OaTemplateViewComponent implements OnInit {
  @ViewChild('oaTemplateDetailComponent', { static: false })
  oaTemplateDetailComponent: OaTemplateDetailComponent;

  searchValue: string;

  /*
   * 左侧宽度常量
   */
  LEFT_WIDTH = 300;

  /**
   * 左侧树宽度
   */
  leftSize = this.LEFT_WIDTH;

  nodes = [
    {
      title: 'parent 1',
      key: '100',
      expanded: true,
      children: [
        {
          title: 'parent 1-0',
          key: '1001',
          expanded: true,
          children: [
            { title: 'leaf', key: '10010', isLeaf: true },
            { title: 'leaf', key: '10011', isLeaf: true },
            { title: 'leaf', key: '10012', isLeaf: true },
          ],
        },
        {
          title: 'parent 1-1',
          key: '1002',
          children: [{ title: 'leaf', key: '10020', isLeaf: true }],
        },
        {
          title: 'parent 1-2',
          key: '1003',
          children: [
            { title: 'leaf', key: '10030', isLeaf: true },
            { title: 'leaf', key: '10031', isLeaf: true },
          ],
        },
      ],
    },
  ];

  constructor() {}

  ngOnInit() {}

  create() {
    this.oaTemplateDetailComponent.edit();
  }
}
