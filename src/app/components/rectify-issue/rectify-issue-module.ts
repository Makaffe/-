import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { RectifyChildIssueDetailComponent } from './rectify-child-issue-detail.component';
import { RectifyIssueListComponent } from './rectify-issue-list.component';
import { RectifyIssueOrderComponent } from './rectify-issue-order.component';
import { RectifyIssueSplitComponent } from './rectify-issue-split.component';
import { RectifyIssueTransferComponent } from './rectify-issue-transfer.component';
import { RectifyIssueViewComponent } from './rectify-issue-view.component';

const COMPONENTS = [
  RectifyIssueViewComponent,
  RectifyIssueListComponent,
  RectifyIssueSplitComponent,
  RectifyIssueTransferComponent,
  RectifyIssueOrderComponent,
  RectifyChildIssueDetailComponent,
];
@NgModule({
  imports: [CommonModule, SharedModule],
  exports: [...COMPONENTS],
  declarations: [...COMPONENTS],
})
export class RectifyIssueModule {}
