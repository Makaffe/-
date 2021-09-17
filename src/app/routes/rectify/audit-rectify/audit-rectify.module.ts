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
import { DepartmentDrawModule } from '@mt-rectify-framework/comp/unit-draw';
import { RectifyWorkBeachModule } from '@mt-rectify-framework/comp/rectify-workbeach';

const COMMPONENTS = [AuditorDashboardComponent, RectifyDashboardComponent, SuperviseDashboardComponent];
@NgModule({
  declarations: [...COMMPONENTS],
  imports: [
    CommonModule,
    SharedModule,
    AuditRectifyRoutingModule,
    AuditPostModule,
    RectifyIssueModule,
    RectifyTrackModule,
    RectifyPostModule,
    OATemplateModule,
    AdviceTemplateModule,
    DepartmentDrawModule,
    RectifyWorkBeachModule
  ],
  exports: [...COMMPONENTS],
})
export class AuditRectifyModule {}
