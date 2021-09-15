import { Component, OnInit, ViewChild } from '@angular/core';
import { AdviceTemplateDetailComponent } from './advice-template-detail.component';

@Component({
  selector: 'advice-template-view',
  templateUrl: './advice-template-view.component.html',
  styles: []
})
export class AdviceTemplateViewComponent implements OnInit {

  @ViewChild('adviceTemplateDetailComponent', { static: false })
  adviceTemplateDetailComponent: AdviceTemplateDetailComponent;
  constructor() {}

  ngOnInit() {}

  create() {
    this.adviceTemplateDetailComponent.edit();
  }

}
