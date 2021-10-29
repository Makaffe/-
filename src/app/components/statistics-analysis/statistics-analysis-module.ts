import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@mt-framework-ng/view';
import { RectifyIssueModule } from '@mt-rectify-framework/comp/rectify-issue';
import { NgxEchartsModule } from 'ngx-echarts';
import { AuditPostModule } from '../audit-post/audit-post-module';

import { StatisticsAnalysisAuditIssueViewComponent } from './statistics-analysis-audit-issue-view.component';
import { StatisticsAnalysisAuditPostViewComponent } from './statistics-analysis-audit-post-view.component';
import { StatisticsAnalysisAuditRectifyResultComponent } from './statistics-analysis-audit-rectify-result.component';

// tslint:disable-next-line:max-line-length
import { StatisticsAnalysisRectifyDepartmentComponent } from './statistics-analysis-rectify-department/statistics-analysis-rectify-department.component';

import { StatisticsAnalysisDeatilComponent } from './statistics-analysis-detail.component';

const COMPONENTS = [
  StatisticsAnalysisAuditIssueViewComponent,
  StatisticsAnalysisAuditRectifyResultComponent,
  StatisticsAnalysisRectifyDepartmentComponent,
  StatisticsAnalysisDeatilComponent,
  StatisticsAnalysisAuditPostViewComponent,
];
@NgModule({
  imports: [CommonModule, SharedModule, NgxEchartsModule, AuditPostModule, RectifyIssueModule],
  exports: [...COMPONENTS],
  declarations: [...COMPONENTS],
})
export class StatisticsAnalysisModule { }
