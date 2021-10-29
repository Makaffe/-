import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// tslint:disable-next-line:max-line-length

import { AuditorDashboardComponent } from '../../dashboard/auditor/auditor.dashboard.component';
import { RectifyDashboardComponent } from '../../dashboard/rectify/rectify.dashboard.component';
import { SuperviseDashboardComponent } from '../../dashboard/supervise/supervise.dashboard.component';
// tslint:disable-next-line:max-line-length
import {
  ReportEditComponent,
  ReportInfoComponent,
  ReportViewComponent,
  TemplateEditComponent,
  TemplateInfoComponent,
} from '@mt-insight-ng/insight';
import { RectifyIssueViewComponent } from 'src/app/components/rectify-issue/rectify-issue-view.component';
import { DepartmentDrawViewComponent } from 'src/app/components/department-draw/department-draw-view.component';
import { RectifyTrackViewComponent } from 'src/app/components/rectify-track/rectify-track-view.component';
import { TransferResultViewComponent } from 'src/app/components/rectify-track/transfer-result-view.component';
import { RectifyPostViewComponent } from 'src/app/components/rectify-post/rectify-post-view.component';
import { RectifyPostDetailComponent } from 'src/app/components/rectify-post/rectify-post-detail.component';
import { AdviceTemplateViewComponent } from 'src/app/components/advice-template/advice-template-view.component';
import { RectifyWorkbeachViewComponent } from 'src/app/components/rectify-workbeach/rectify-workbeach-view.component';
import { RectifyEffectComponent } from 'src/app/components/rectify-workbeach/rectify-effect.component';
import { AuditPostViewComponent } from 'src/app/components/audit-post/audit-post-view.component';
import { AuditPostDetailComponent } from 'src/app/components/audit-post/audit-post-detail.component';
import { OaTemplateViewComponent } from 'src/app/components/oa-template/oa-template-view.component';
// tslint:disable-next-line:max-line-length
import { StatisticsAnalysisAuditIssueViewComponent } from 'src/app/components/statistics-analysis/statistics-analysis-audit-issue-view.component';
// tslint:disable-next-line:max-line-length
import { StatisticsAnalysisAuditRectifyResultComponent } from 'src/app/components/statistics-analysis/statistics-analysis-audit-rectify-result.component';
import { RectificationPostComponent } from 'src/app/components/audit-post/rectification-post.component';
import { DepartmentDrawComponent } from 'src/app/components/department-draw/department-draw.component';

const routes: Routes = [
  {
    path: 'audit-post',
    component: AuditPostViewComponent,
    data: { title: '审计报告', reuse: true },
  },
  {
    path: 'rectification-post',
    component: RectificationPostComponent,
    data: { title: '整改台账', reuse: true },
  },
  {
    path: 'rectify-issue',
    component: RectifyIssueViewComponent,
    data: { title: '整改问题', reuse: true },
  },
  {
    path: 'rectify-track',
    component: RectifyTrackViewComponent,
    data: { title: '整改跟踪', reuse: true },
  },
  {
    path: 'audit-post-detail',
    component: AuditPostDetailComponent,
    data: { title: '审计报告详情', reuse: true },
  },
  {
    path: 'transfer-result',
    component: TransferResultViewComponent,
    data: { title: '移交结果', reuse: true },
  },
  {
    path: 'rectify-post',
    component: RectifyPostViewComponent,
    data: { title: '整改汇报', reuse: true },
  },
  {
    path: 'oa-template',
    component: OaTemplateViewComponent,
    data: { title: 'OA发文模板', reuse: true },
  },
  {
    path: 'advice-template',
    component: AdviceTemplateViewComponent,
    data: {
      title: '建议模板',
      reuse: true,
    },
  },
  {
    path: 'department-draw',
    component: DepartmentDrawComponent,
    data: {
      title: '部门画像',
      reuse: true,
    },
  },
  {
    path: 'rectify-workbeach',
    component: RectifyWorkbeachViewComponent,
    data: {
      title: '整改工作台',
      reuse: true,
    },
  },
  {
    path: 'audit-issue-analysis',
    component: StatisticsAnalysisAuditIssueViewComponent,
    data: {
      title: '审计问题分析',
      reuse: true,
    },
  },
  {
    path: 'rectify-result-analysis',
    component: StatisticsAnalysisAuditRectifyResultComponent,
    data: {
      title: '整改成果分析',
      reuse: true,
    },
  },
  {
    path: 'rectify-effect',
    component: RectifyEffectComponent,
    data: {
      title: '整改成效',
      reuse: true,
    },
  },
  {
    path: 'auditor-dashboard',
    component: AuditorDashboardComponent,
    data: { title: '首页', reuse: true },
  },
  {
    path: 'rectify-dashboard',
    component: RectifyDashboardComponent,
    data: { title: '首页', reuse: true },
  },
  {
    path: 'supervise-dashboard',
    component: SuperviseDashboardComponent,
    data: { title: '首页', reuse: true },
  },
  // 模板管理主页面
  { path: 'template-info', component: TemplateInfoComponent, data: { reuse: true } },
  { path: 'report-info', component: ReportInfoComponent, data: { reuse: true } },
  { path: 'report-edit', component: ReportEditComponent, data: { reuse: true, title: '编辑报告' } },
  { path: 'report-edit/:id/:status', component: ReportEditComponent, data: { reuse: true, title: '编辑报告' } },
  { path: 'template-edit', component: TemplateEditComponent, data: { reuse: true, title: '编辑模板' } },
  { path: 'template-edit/:id', component: TemplateEditComponent, data: { reuse: true, title: '编辑模板' } },
  { path: 'report-view/:id', component: ReportViewComponent, data: { reuse: true } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuditRectifyRoutingModule {}
