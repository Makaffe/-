import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuditRectifyRoutingModule } from './audit-rectify-routing.module';
import { AuditorDashboardComponent } from '../../dashboard/auditor/auditor.dashboard.component';
import { RectifyDashboardComponent } from '../../dashboard/rectify/rectify.dashboard.component';
import { SuperviseDashboardComponent } from '../../dashboard/supervise/supervise.dashboard.component';

import { SharedModule } from '@shared';

import { DataSourceModule } from '../../insight/data-source/data-source.module';
import { AvaitorFunctionModule, InsightChartModule, ViewSpecialReportModule } from '@mt-insight-ng/insight';
import { DataInsightModule } from '../../insight/data-insight/data-insight.module';
import { InsightReportModule } from '../../insight-report/insight-report.module';
import { MtReportModule } from '@mt-insight-ng/insight-report';
import { IssueAssignFormComponent } from '../../dashboard/rectify/issue-assign-form/issue-assign-form.component';
import { SuperviseProcessFormComponent } from '../../dashboard/supervise/supervise-process-form/supervise-process-form.component';
import { AttachListModule } from 'src/app/components/common/attach/attach-list.module';
import { IssueAssignTableComponent } from '../../dashboard/rectify/issue-assign-form/issue-assign-table.component';
import { RectifyIssueModule } from 'src/app/components/rectify-issue/rectify-issue-module';
import { AuditPostModule } from 'src/app/components/audit-post/audit-post-module';
import { RectifyTrackModule } from 'src/app/components/rectify-track/rectify-track-module';
import { OATemplateModule } from 'src/app/components/oa-template/oa-template-module';
import { DepartmentDrawModule } from 'src/app/components/department-draw/department-draw-module';
import { RectifyPostModule } from 'src/app/components/rectify-post/rectify-post-module';
import { AdviceTemplateModule } from 'src/app/components/advice-template/advice-template-module';
import { RectifyWorkBeachModule } from 'src/app/components/rectify-workbeach/rectify-workbeach-module';
import { StatisticsAnalysisModule } from 'src/app/components/statistics-analysis/statistics-analysis-module';

const COMMPONENTS = [
  AuditorDashboardComponent,
  RectifyDashboardComponent,
  SuperviseDashboardComponent,
  IssueAssignFormComponent,
  IssueAssignTableComponent,
  SuperviseProcessFormComponent,
];
@NgModule({
  declarations: [...COMMPONENTS],
  imports: [
    CommonModule,
    SharedModule,
    DataSourceModule,
    DataInsightModule,
    AvaitorFunctionModule,
    InsightChartModule,
    InsightReportModule,
    MtReportModule,
    ViewSpecialReportModule,
    AuditRectifyRoutingModule,
    AuditPostModule,
    RectifyIssueModule,
    RectifyTrackModule,
    RectifyPostModule,
    OATemplateModule,
    AdviceTemplateModule,
    DepartmentDrawModule,
    RectifyWorkBeachModule,
    StatisticsAnalysisModule,
    AttachListModule,
  ],
  exports: [...COMMPONENTS],
})
export class AuditRectifyModule {}
