import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@mt-framework-ng/view';
import { NgxEchartsModule } from 'ngx-echarts';

import { StatisticsAnalysisAuditIssueViewComponent } from './statistics-analysis-audit-issue-view.component';
import { StatisticsAnalysisAuditRectifyResultComponent } from './statistics-analysis-audit-rectify-result.component';
// tslint:disable-next-line:max-line-length
import { StatisticsAnalysisRectifyDepartmentComponent } from './statistics-analysis-rectify-department/statistics-analysis-rectify-department.component';

const COMPONENTS = [
  StatisticsAnalysisAuditIssueViewComponent,
  StatisticsAnalysisAuditRectifyResultComponent,
  StatisticsAnalysisRectifyDepartmentComponent
];
@NgModule({
  imports: [CommonModule, SharedModule, NgxEchartsModule],
  exports: [...COMPONENTS],
  declarations: [...COMPONENTS],
})
export class StatisticsAnalysisModule { }
