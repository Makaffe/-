import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// tslint:disable-next-line:max-line-length
import {
  ReportEditComponent,
  ReportInfoComponent,
  ReportViewComponent,
  TemplateEditComponent,
  TemplateInfoComponent,
} from '@mt-insight-ng/insight';
import { AdviceTemplateViewComponent } from 'src/app/components/advice-template/advice-template-view.component';
import { AuditPostDetailComponent } from 'src/app/components/audit-post/audit-post-detail.component';
import { AuditPostViewComponent } from 'src/app/components/audit-post/audit-post-view.component';
import { RectificationPostComponent } from 'src/app/components/audit-post/rectification-post.component';
import { DepartmentDrawComponent } from 'src/app/components/department-draw/department-draw.component';
import { OaTemplateViewComponent } from 'src/app/components/oa-template/oa-template-view.component';
import { ProblemTypeViewComponent } from 'src/app/components/rectify-issue/problem-type/problem-type-view.component';
import { RectifyIssueViewComponent } from 'src/app/components/rectify-issue/rectify-issue-view.component';
import { RectifyPostViewComponent } from 'src/app/components/rectify-post/rectify-post-view.component';
import { RectifyTrackViewComponent } from 'src/app/components/rectify-track/rectify-track-view.component';
import { TransferResultViewComponent } from 'src/app/components/rectify-track/transfer-result-view.component';
import { RectifyEffectComponent } from 'src/app/components/rectify-workbeach/rectify-effect.component';
import { RectifyWorkbeachViewComponent } from 'src/app/components/rectify-workbeach/rectify-workbeach-view.component';
// tslint:disable-next-line:max-line-length
import { StatisticsAnalysisAuditIssueViewComponent } from 'src/app/components/statistics-analysis/statistics-analysis-audit-issue-view.component';
// tslint:disable-next-line:max-line-length
import { StatisticsAnalysisAuditPostViewComponent } from 'src/app/components/statistics-analysis/statistics-analysis-audit-post-view.component';
// tslint:disable-next-line:max-line-length
import { StatisticsAnalysisAuditRectifyResultComponent } from 'src/app/components/statistics-analysis/statistics-analysis-audit-rectify-result.component';
// tslint:disable-next-line:max-line-length

// tslint:disable-next-line:max-line-length
import { StatisticsAnalysisRectifyDepartmentComponent } from 'src/app/components/statistics-analysis/statistics-analysis-rectify-department/statistics-analysis-rectify-department.component';

// tslint:disable-next-line:max-line-length
import { AuditorDashboardComponent } from '../../dashboard/auditor/auditor.dashboard.component';
import { RectifyDashboardComponent } from '../../dashboard/rectify/rectify.dashboard.component';
import { SuperviseDashboardComponent } from '../../dashboard/supervise/supervise.dashboard.component';

const routes: Routes = [
  {
    path: 'audit-post',
    component: AuditPostViewComponent,
    data: { title: '????????????', reuse: true },
  },
  {
    path: 'rectification-post',
    component: RectificationPostComponent,
    data: { title: '????????????', reuse: true },
  },
  {
    path: 'rectify-issue',
    component: RectifyIssueViewComponent,
    data: { title: '????????????', reuse: true },
  },
  {
    path: 'problem-type',
    component: ProblemTypeViewComponent,
    data: {
      title: '??????????????????',
    },
  },
  {
    path: 'rectify-track',
    component: RectifyTrackViewComponent,
    data: { title: '????????????', reuse: true },
  },
  {
    path: 'audit-post-detail',
    component: AuditPostDetailComponent,
    data: { title: '??????????????????', reuse: true },
  },
  {
    path: 'transfer-result',
    component: TransferResultViewComponent,
    data: { title: '????????????', reuse: true },
  },
  {
    path: 'rectify-post',
    component: RectifyPostViewComponent,
    data: { title: '????????????', reuse: true },
  },
  {
    path: 'oa-template',
    component: OaTemplateViewComponent,
    data: { title: 'OA????????????', reuse: true },
  },
  {
    path: 'advice-template',
    component: AdviceTemplateViewComponent,
    data: {
      title: '????????????',
      reuse: true,
    },
  },
  {
    path: 'department-draw',
    component: DepartmentDrawComponent,
    data: {
      title: '????????????',
      reuse: true,
    },
  },
  {
    path: 'rectify-workbeach',
    component: RectifyWorkbeachViewComponent,
    data: {
      title: '???????????????',
      reuse: true,
    },
  },
  {
    path: 'rectify-department-analysis',
    component: StatisticsAnalysisRectifyDepartmentComponent,
    data: {
      title: '??????????????????',
      reuse: true,
    },
  },
  {
    path: 'audit-issue-analysis',
    component: StatisticsAnalysisAuditIssueViewComponent,
    data: {
      title: '??????????????????',
      reuse: true,
    },
  },
  {
    path: 'audit-post-analysis',
    component: StatisticsAnalysisAuditPostViewComponent,
    data: {
      title: '????????????',
      reuse: true,
    },
  },
  {
    path: 'rectify-result-analysis',
    component: StatisticsAnalysisAuditRectifyResultComponent,
    data: {
      title: '??????????????????',
      reuse: true,
    },
  },
  {
    path: 'rectify-effect',
    component: RectifyEffectComponent,
    data: {
      title: '????????????',
      reuse: true,
    },
  },
  {
    path: 'auditor-dashboard',
    component: AuditorDashboardComponent,
    data: { title: '??????', reuse: true },
  },
  {
    path: 'rectify-dashboard',
    component: RectifyDashboardComponent,
    data: { title: '??????', reuse: true },
  },
  {
    path: 'supervise-dashboard',
    component: SuperviseDashboardComponent,
    data: { title: '??????', reuse: true },
  },
  // ?????????????????????
  { path: 'template-info', component: TemplateInfoComponent, data: { reuse: true } },
  { path: 'report-info', component: ReportInfoComponent, data: { reuse: true } },
  { path: 'report-edit', component: ReportEditComponent, data: { reuse: true, title: '????????????' } },
  { path: 'report-edit/:id/:status', component: ReportEditComponent, data: { reuse: true, title: '????????????' } },
  { path: 'template-edit', component: TemplateEditComponent, data: { reuse: true, title: '????????????' } },
  { path: 'template-edit/:id', component: TemplateEditComponent, data: { reuse: true, title: '????????????' } },
  { path: 'report-view/:id', component: ReportViewComponent, data: { reuse: true } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuditRectifyRoutingModule {}
