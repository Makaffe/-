import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { AttachListModule } from '../common/attach/attach-list.module';
import { RectifyIssueModule } from '../rectify-issue/rectify-issue-module';
import { RectifyIssueTransferComponent } from '../rectify-issue/rectify-issue-transfer.component';
import { RectifyDiaryComponent } from './rectify-diary.component';
import { RectifyEffectComponent } from './rectify-effect.component';
import { RectifyMeasureReplyComponent } from './rectify-measure-reply.component';
import { RectifyMeasureComponent } from './rectify-measure.component';
import { RectifyProblemSwitchComponent } from './rectify-problem-switch.component';
import { RectifyWorkbeachViewComponent } from './rectify-workbeach-view.component';

const COMPONENTS = [
  RectifyWorkbeachViewComponent,
  RectifyEffectComponent,
  RectifyDiaryComponent,
  RectifyMeasureComponent,
  RectifyMeasureReplyComponent,
  RectifyProblemSwitchComponent,
];
@NgModule({
  imports: [CommonModule, SharedModule, NgxEchartsModule, AttachListModule, RectifyIssueModule],
  exports: [...COMPONENTS],
  declarations: [...COMPONENTS],
})
export class RectifyWorkBeachModule {}
