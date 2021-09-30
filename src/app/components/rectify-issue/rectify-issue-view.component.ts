import { Component, OnInit, ViewChild } from '@angular/core';
import { RectifyIssueOrderComponent } from './rectify-issue-order.component';
import { RectifyIssueSplitComponent } from './rectify-issue-split.component';
import { RectifyIssueTransferComponent } from './rectify-issue-transfer.component';

@Component({
  selector: 'rectify-issue-view',
  templateUrl: './rectify-issue-view.component.html',
  styles: [],
})
export class RectifyIssueViewComponent implements OnInit {
  @ViewChild('rectifyIssueSplitComponent', { static: false })
  rectifyIssueSplitComponent: RectifyIssueSplitComponent;
  @ViewChild('rectifyIssueTransferComponent', { static: false })
  rectifyIssueTransferComponent: RectifyIssueTransferComponent;
  @ViewChild('rectifyIssueOrderComponent', { static: false })
  rectifyIssueOrderComponent: RectifyIssueOrderComponent;
  listOfOption: string[] = ['未下发', '已下发', '未移交'];
  listOfSelectedValue = ['未下发'];
  constructor() {}

  ngOnInit() {}

  splitIssue() {
    this.rectifyIssueSplitComponent.edit();
  }
  transfer() {
    this.rectifyIssueTransferComponent.edit();
  }
  order() {
    this.rectifyIssueOrderComponent.edit();
  }
}
