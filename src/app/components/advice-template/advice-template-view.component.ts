import { Component, OnInit, ViewChild } from '@angular/core';
import { AdviceTemplateDetailComponent } from './advice-template-detail.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'advice-template-view',
  templateUrl: './advice-template-view.component.html',
  styles: [],
})
export class AdviceTemplateViewComponent implements OnInit {
  @ViewChild('adviceTemplateDetailComponent', { static: false })
  adviceTemplateDetailComponent: AdviceTemplateDetailComponent;

  searchValue: string;

  isVisible = false;

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
    this.adviceTemplateDetailComponent.edit();
  }

  showModel(value: any) {
    if (value.edit) {
      this.adviceTemplateDetailComponent.edit();
      this.adviceTemplateDetailComponent.disabled = false;
    } else {
      this.adviceTemplateDetailComponent.disabled = false;
    }
  }

  edit() {}

  delete() {}
}
