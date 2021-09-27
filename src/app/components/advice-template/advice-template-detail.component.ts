import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'advice-template-detail',
  templateUrl: './advice-template-detail.component.html',
  styles: [],
})
export class AdviceTemplateDetailComponent implements OnInit {
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
