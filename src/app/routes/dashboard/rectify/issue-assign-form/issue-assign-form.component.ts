import { Component, OnInit, ViewChild } from '@angular/core';
import { IssueAssignTableComponent } from './issue-assign-table.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'issue-assign-form',
  templateUrl: './issue-assign-form.component.html',
  styles: [],
})
export class IssueAssignFormComponent implements OnInit {
  @ViewChild('issueAssignTableComponent', { static: false })
  issueAssignTableComponent: IssueAssignTableComponent;

  isVisible = false;
  radioValue = false;
  constructor() {}

  ngOnInit() {}

  handleCancel() {
    this.isVisible = false;
    console.log(this.radioValue);
  }

  show() {
    this.isVisible = true;
  }
  redio() {
    console.log(this.radioValue);
  }
}
