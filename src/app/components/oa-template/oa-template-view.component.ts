import { Component, OnInit, ViewChild } from '@angular/core';
import { OaTemplateDetailComponent } from './oa-template-detail.component';

@Component({
  selector: 'oa-template-view',
  templateUrl: './oa-template-view.component.html',
  styles: [],
})
export class OaTemplateViewComponent implements OnInit {
  @ViewChild('oaTemplateDetailComponent', { static: false })
  oaTemplateDetailComponent: OaTemplateDetailComponent;
  constructor() {}

  ngOnInit() {}

  create() {
    this.oaTemplateDetailComponent.edit();
  }
}
