import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuditRectifyRoutingModule } from './audit-rectify-routing.module';

import { AuditorDashboardComponent } from '../../dashboard/auditor/auditor.dashboard.component';
import { RectifyDashboardComponent } from '../../dashboard/rectify/rectify.dashboard.component';
import { SuperviseDashboardComponent } from '../../dashboard/supervise/supervise.dashboard.component';
import { AuditPostModule } from '@mt-rectify-framework/comp/audit-post';

const COMMPONENTS = [AuditorDashboardComponent,RectifyDashboardComponent,SuperviseDashboardComponent]
@NgModule({
  declarations: [...COMMPONENTS],
  imports: [CommonModule, AuditRectifyRoutingModule,AuditPostModule],
  exports: [...COMMPONENTS],
})
export class AuditRectifyModule {}
