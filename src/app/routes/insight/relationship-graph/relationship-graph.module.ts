import { NgModule } from '@angular/core';
import { SharedModule } from '@mt-framework-ng/view';
import { ViewSpecialReportModule, DashboardInsightModule, RelationshipGraphModule} from '@mt-insight-ng/insight';
import { RelationshipGraphRoutingModule } from './relationship-graph-routing.module';


@NgModule({
  imports: [
    SharedModule,
    ViewSpecialReportModule,
    RelationshipGraphRoutingModule,
    DashboardInsightModule,
    RelationshipGraphModule
  ]
})
export class RelationshipGraphRouteModule { }
