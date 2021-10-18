import { Component, OnInit } from '@angular/core';
import { ProposalTemplateTypeService } from './service/ProposalTemplateTypeService';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'advice-template-detail',
  templateUrl: './advice-template-detail.component.html',
  styles: [],
})
export class AdviceTemplateDetailComponent implements OnInit {
  isVisible = false;

  disabled = false;

  constructor(private proposalTemplateTypeService: ProposalTemplateTypeService) {}

  ngOnInit() {}
  handleCancel() {
    this.isVisible = false;
  }

  edit(id?: string) {
    this.isVisible = true;
  }
  save() {
    this.handleCancel();
  }
}
