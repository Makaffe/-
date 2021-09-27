import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'oa-template-detail',
  templateUrl: './oa-template-detail.component.html',
  styles: [],
})
export class OaTemplateDetailComponent implements OnInit {
  isVisible = false;
  disabled = false;
  constructor() {}

  ngOnInit() {}
  handleCancel() {
    this.isVisible = false;
  }

  edit() {
    this.isVisible = true;
  }
}
