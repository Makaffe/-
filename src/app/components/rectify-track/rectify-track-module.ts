import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { RectifyIssueModule } from '../rectify-issue/rectify-issue-module';

import { RectifyTrackListComponent } from './rectify-track-list.component';
import { RectifyTrackViewComponent } from './rectify-track-view.component';
import { TransferResultListComponent } from './transfer-result-list.component';
import { TransferResultViewComponent } from './transfer-result-view.component';

const COMPONENTS = [
  TransferResultViewComponent,
  TransferResultListComponent,
  RectifyTrackViewComponent,
  RectifyTrackListComponent,
];

@NgModule({
  imports: [CommonModule, SharedModule, RectifyIssueModule],
  exports: [...COMPONENTS],
  declarations: [...COMPONENTS],
})
export class RectifyTrackModule {}
