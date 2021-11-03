import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { AttachListModule } from '../common/attach/attach-list.module';
import { AuditPostWatchComponent } from './audit-post-watch.component';
import { ProblemTypeDetailComponent } from './problem-type/problem-type-detail.component';
import { ProblemTypeViewComponent } from './problem-type/problem-type-view.component';
import { RectifyChildIssueDetailComponent } from './rectify-child-issue-detail.component';
import { RectifyIssueListComponent } from './rectify-issue-list.component';
import { RectifyIssueNoticeComponent } from './rectify-issue-notice.component';
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
  AuditPostWatchComponent,
  RectifyIssueNoticeComponent,
  ProblemTypeViewComponent,
  ProblemTypeDetailComponent,
];
@NgModule({
  imports: [CommonModule, SharedModule, AttachListModule],
  exports: [...COMPONENTS],
  declarations: [...COMPONENTS],
})
export class RectifyIssueModule {}
