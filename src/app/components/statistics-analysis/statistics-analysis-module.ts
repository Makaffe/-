import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@mt-framework-ng/view';
import { RectifyIssueModule } from '@mt-rectify-framework/comp/rectify-issue';
import { NgxEchartsModule } from 'ngx-echarts';
import { AuditPostModule } from '../audit-post/audit-post-module';

import { StatisticsAnalysisAuditIssueViewComponent } from './statistics-analysis-audit-issue-view.component';
import { StatisticsAnalysisAuditPostViewComponent } from './statistics-analysis-audit-post-view.component';
import { StatisticsAnalysisAuditRectifyResultComponent } from './statistics-analysis-audit-rectify-result.component';
import { StatisticsAnalysisDeatilComponent } from './statistics-analysis-detail.component';
import { StatisticsBrokenLineComponent } from './statistics-broken-line.component';

const COMPONENTS = [
  StatisticsAnalysisAuditIssueViewComponent,
  StatisticsAnalysisAuditRectifyResultComponent,
  StatisticsAnalysisAuditPostViewComponent,
  StatisticsAnalysisDeatilComponent,
  StatisticsBrokenLineComponent,
];
@NgModule({
  imports: [CommonModule, SharedModule, NgxEchartsModule, AuditPostModule, RectifyIssueModule],
  exports: [...COMPONENTS],
  declarations: [...COMPONENTS],
})
export class StatisticsAnalysisModule {}
