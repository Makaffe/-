import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuditPostViewComponent } from '@mt-rectify-framework/comp/audit-post';
import { RectifyIssueViewComponent } from '@mt-rectify-framework/comp/rectify-issue';
import { RectifyTrackViewComponent, TransferResultViewComponent } from '@mt-rectify-framework/comp/rectify-track';
import { AuditPostDetailComponent } from 'src/app/components/audit-post/audit-post-detail/audit-post-detail.component';
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
    data: { title: '报告详情', reuse: true },
  },
  {
    path: 'transfer-result',
    component: TransferResultViewComponent,
    data: { title: '移交结果', reuse: true },
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
