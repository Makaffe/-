import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { StatisticsAnalysisAuditIssueViewComponent } from './statistics-analysis-audit-issue-view.component';
import { StatisticsAnalysisAuditRectifyResultComponent } from './statistics-analysis-audit-rectify-result.component';

const COMPONENTS = [
    StatisticsAnalysisAuditIssueViewComponent,
    StatisticsAnalysisAuditRectifyResultComponent
];
@NgModule({
  imports: [CommonModule, SharedModule],
  exports: [...COMPONENTS],
  declarations: [...COMPONENTS],
})
export class StatisticsAnalysisModule {}
