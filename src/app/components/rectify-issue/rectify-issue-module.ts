import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@mt-framework-ng/view';

import { RectifyIssueListComponent } from './rectify-issue-list.component';
import { RectifyIssueSplitComponent } from './rectify-issue-split.component';
import { RectifyIssueTransferComponent } from './rectify-issue-transfer.component';
import { RectifyIssueViewComponent } from './rectify-issue-view.component';

const COMPONENTS = [
    RectifyIssueViewComponent,
    RectifyIssueListComponent,
    RectifyIssueSplitComponent,
    RectifyIssueTransferComponent
];
@NgModule({
  imports: [CommonModule, SharedModule],
  exports: [...COMPONENTS],
  declarations: [...COMPONENTS],
})
export class RectifyIssueModule {}
