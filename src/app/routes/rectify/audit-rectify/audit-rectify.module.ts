import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuditRectifyRoutingModule } from './audit-rectify-routing.module';
import { AuditorDashboardComponent } from '../../dashboard/auditor/auditor.dashboard.component';
import { RectifyDashboardComponent } from '../../dashboard/rectify/rectify.dashboard.component';
import { SuperviseDashboardComponent } from '../../dashboard/supervise/supervise.dashboard.component';
import { AuditPostModule } from '@mt-rectify-framework/comp/audit-post';
import { RectifyIssueModule } from '@mt-rectify-framework/comp/rectify-issue';
import { RectifyTrackModule } from '@mt-rectify-framework/comp/rectify-track';
import { RectifyPostModule } from '@mt-rectify-framework/comp/rectify-post';
import { OATemplateModule } from '@mt-rectify-framework/comp/oa-template';
import { AdviceTemplateModule } from '@mt-rectify-framework/comp/advice-template';
import { SharedModule } from '@shared';
import { DepartmentDrawModule } from '@mt-rectify-framework/comp/department-draw';
import { RectifyWorkBeachModule } from '@mt-rectify-framework/comp/rectify-workbeach';
import { StatisticsAnalysisModule } from '@mt-rectify-framework/comp/statistics-analysis';
import { DictPipe } from 'src/app/matech/pipe/dict-pipe.pipe';
import { DataSourceModule } from '../../insight/data-source/data-source.module';
import { AvaitorFunctionModule, InsightChartModule, ViewSpecialReportModule } from '@mt-insight-ng/insight';
import { DataInsightModule } from '../../insight/data-insight/data-insight.module';
import { InsightReportModule } from '../../insight-report/insight-report.module';
import { MtReportModule } from '@mt-insight-ng/insight-report';
import { IssueAssignFormComponent } from '../../dashboard/rectify/issue-assign-form/issue-assign-form.component';
import { SuperviseProcessFormComponent } from '../../dashboard/supervise/supervise-process-form/supervise-process-form.component';
import { AttachListModule } from 'src/app/components/common/attach/attach-list.module';

const COMMPONENTS = [
  AuditorDashboardComponent,
  RectifyDashboardComponent,
  SuperviseDashboardComponent,
  DictPipe,
  IssueAssignFormComponent,
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
