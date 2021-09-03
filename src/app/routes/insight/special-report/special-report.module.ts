import { NgModule } from '@angular/core';
import { SharedModule } from '@mt-framework-ng/view';
import { ViewSpecialReportModule, DashboardInsightModule } from '@mt-insight-ng/insight';
import { SpecialReportRoutingModule } from './special-report-routing.module';
@NgModule({
  imports: [
    SharedModule,
    ViewSpecialReportModule,
    SpecialReportRoutingModule,
    DashboardInsightModule
  ]
})
export class SpecialReportModule { }
