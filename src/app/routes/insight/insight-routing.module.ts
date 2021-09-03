import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JWTGuard } from '@delon/auth';

const routes: Routes = [
  { path: 'data-insight', canActivateChild: [JWTGuard], loadChildren: './data-insight/data-insight.module#DataInsightModule' },
  { path: 'data-set', canActivateChild: [JWTGuard], loadChildren: './data-set/data-set.module#DataSetModule' },
  { path: 'data-source', canActivateChild: [JWTGuard], loadChildren: './data-source/data-source.module#DataSourceModule' },
  { path: 'data-pivot', canActivateChild: [JWTGuard], loadChildren: './data-pivot/data-pivot.module#DataPivotModule' },
  { path: 'special-report', canActivateChild: [JWTGuard], loadChildren: './special-report/special-report.module#SpecialReportModule' },
  { path: 'resource-prototype', canActivateChild: [JWTGuard], loadChildren: './resource-prototype/resource.module#ResourceModule' },
  { path: 'relationship-graph', canActivateChild: [JWTGuard], loadChildren: './relationship-graph/relationship-graph.module#RelationshipGraphRouteModule' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InsightRoutingModule { }
