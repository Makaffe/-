import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdviceTemplateViewComponent } from '@mt-rectify-framework/comp/advice-template';
import { AuditPostDetailComponent, AuditPostViewComponent } from '@mt-rectify-framework/comp/audit-post';
import { OaTemplateViewComponent } from '@mt-rectify-framework/comp/oa-template';
import { RectifyIssueViewComponent } from '@mt-rectify-framework/comp/rectify-issue';
import { RectifyPostDetailComponent, RectifyPostViewComponent } from '@mt-rectify-framework/comp/rectify-post';
import { RectifyTrackViewComponent, TransferResultViewComponent } from '@mt-rectify-framework/comp/rectify-track';
import { AuditorDashboardComponent } from '../../dashboard/auditor/auditor.dashboard.component';
import { RectifyDashboardComponent } from '../../dashboard/rectify/rectify.dashboard.component';
import { SuperviseDashboardComponent } from '../../dashboard/supervise/supervise.dashboard.component';

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
    data: { title: '建议模板', reuse: true },
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuditRectifyRoutingModule {}
