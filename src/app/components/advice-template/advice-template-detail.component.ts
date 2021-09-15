import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'advice-template-detail',
  templateUrl: './advice-template-detail.component.html',
  styles: []
})
export class AdviceTemplateDetailComponent implements OnInit {

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
