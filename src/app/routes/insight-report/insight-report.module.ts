import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@mt-framework-ng/view';
import { InsightReportRoutingModule } from './insight-report-routing.module';
import { MtReportModule } from '@mt-insight-ng/insight-report';


const COMPONENT = [
  // QRComponent,
];

@NgModule({
  imports: [CommonModule, SharedModule, InsightReportRoutingModule, MtReportModule],
  providers: [
  ],
  declarations: [...COMPONENT],
})
export class InsightReportModule { }
