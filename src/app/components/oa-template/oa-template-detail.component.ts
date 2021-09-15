import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'oa-template-detail',
  templateUrl: './oa-template-detail.component.html',
  styles: [],
})
export class OaTemplateDetailComponent implements OnInit {
  isVisible = false;
  constructor() {}

  ngOnInit() {}
  handleCancel() {
    this.isVisible = false;
  }

  edit() {
    this.isVisible = true;
  }
}
