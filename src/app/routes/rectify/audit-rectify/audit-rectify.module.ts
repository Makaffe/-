import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuditRectifyRoutingModule } from './audit-rectify-routing.module';
import { MyTestModule } from '@mt-rectify-framework/comp/my-test';
import { DashboardComponent } from '../../dashboard/dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, AuditRectifyRoutingModule, MyTestModule],
  exports: [DashboardComponent],
})
export class AuditRectifyModule {}
