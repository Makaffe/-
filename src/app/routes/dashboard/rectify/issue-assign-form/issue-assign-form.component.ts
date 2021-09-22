import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'issue-assign-form',
  templateUrl: './issue-assign-form.component.html',
  styles: [],
})
export class IssueAssignFormComponent implements OnInit {
  isVisible = false;
  constructor() {}

  ngOnInit() {}

  handleCancel() {
    this.isVisible = false;
  }

  show() {
    this.isVisible = true;
  }
}
