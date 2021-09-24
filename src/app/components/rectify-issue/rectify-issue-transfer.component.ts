import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rectify-issue-transfer',
  templateUrl: './rectify-issue-transfer.component.html',
  styles: []
})
export class RectifyIssueTransferComponent implements OnInit {
  isVisible = false;
  constructor() { }

  ngOnInit() {
  }
  handleCancel() {
    this.isVisible = false;
  }
  save() {
    this.isVisible = false;
  }
  edit() {
    this.isVisible = true;

  }
}
