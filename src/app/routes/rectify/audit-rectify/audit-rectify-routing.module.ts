import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdviceTemplateViewComponent } from '@mt-rectify-framework/comp/advice-template';
import { AuditPostDetailComponent, AuditPostViewComponent } from '@mt-rectify-framework/comp/audit-post';
import { OaTemplateViewComponent } from '@mt-rectify-framework/comp/oa-template';
import { RectifyIssueViewComponent } from '@mt-rectify-framework/comp/rectify-issue';
import { RectifyPostDetailComponent, RectifyPostViewComponent } from '@mt-rectify-framework/comp/rectify-post';
import { RectifyTrackViewComponent, TransferResultViewComponent } from '@mt-rectify-framework/comp/rectify-track';
import { RectifyEffectComponent, RectifyWorkbeachViewComponent } from '@mt-rectify-framework/comp/rectify-workbeach';
import { StatisticsAnalysisAuditIssueViewComponent, StatisticsAnalysisAuditRectifyResultComponent } from '@mt-rectify-framework/comp/statistics-analysis';
import { DepartmentDrawViewComponent } from '@mt-rectify-framework/comp/department-draw';

import { AuditorDashboardComponent } from '../../dashboard/auditor/auditor.dashboard.component';
import { RectifyDashboardComponent } from '../../dashboard/rectify/rectify.dashboard.component';
import { SuperviseDashboardComponent } from '../../dashboard/supervise/supervise.dashboard.component';
import { ReportEditComponent, ReportInfoComponent, ReportViewComponent, TemplateEditComponent, TemplateInfoComponent } from '@mt-insight-ng/insight';

const routes: Routes = [
  {
    path: 'audit-post',
    component: AuditPostViewComponent,
    data: { title: '审计报告', reuse: true },
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
    data: { title: '整改报告', reuse: true },
  },
  {
    path: 'rectify-post-detail',
    component: RectifyPostDetailComponent,
    data: { title: '整改报告详情', reuse: true },
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
       title: '建议模板', reuse: true },
  },
  {
    path: 'department-draw',
    component: DepartmentDrawViewComponent,
    data: {
       title: '部门画像', reuse: true },
  },
  {
    path: 'rectify-workbeach',
    component: RectifyWorkbeachViewComponent,
    data: {
       title: '整改工作台', reuse: true },
  },
  {
    path: 'audit-issue-analysis',
    component: StatisticsAnalysisAuditIssueViewComponent,
    data: {
       title: '审计问题分析', reuse: true },
  },
  {
    path: 'rectify-result-analysis',
    component: StatisticsAnalysisAuditRectifyResultComponent,
    data: {
       title: '整改成果分析', reuse: true },
  },
  {
    path: 'rectify-effect',
    component: RectifyEffectComponent,
    data: {
       title: '整改成效', reuse: true },
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
