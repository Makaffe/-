import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@mt-framework-ng/view';
import { NgxEchartsModule } from 'ngx-echarts';

import { StatisticsAnalysisAuditIssueViewComponent } from './statistics-analysis-audit-issue-view.component';
import { StatisticsAnalysisAuditRectifyResultComponent } from './statistics-analysis-audit-rectify-result.component';

const COMPONENTS = [
    StatisticsAnalysisAuditIssueViewComponent,
    StatisticsAnalysisAuditRectifyResultComponent
];
@NgModule({
  imports: [CommonModule, SharedModule, NgxEchartsModule],
  exports: [...COMPONENTS],
  declarations: [...COMPONENTS],
})
export class StatisticsAnalysisModule {}
