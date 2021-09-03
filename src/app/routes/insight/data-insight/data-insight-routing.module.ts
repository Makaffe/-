import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  InsightManagerComponent,
  InsightPanelEditComponent,
  InsightGridsterViewerComponent,
  ChartsConverterComponent
} from '@mt-insight-ng/insight';

const routes: Routes = [
  {
    path: 'panel-edit',
    component: InsightPanelEditComponent,
    data: { reuse: true },
  },
  {
    path: 'insight-manager',
    component: InsightManagerComponent,
    data: { reuse: true },
  },
  {
    path: 'insight-manager/:subInsightShowType',
    component: InsightManagerComponent,
    data: { reuse: true },
  },
  {
    path: 'insight-preview',
    component: InsightGridsterViewerComponent,
    data: { reuse: true },
  }, {
    path: 'converter',
    component: ChartsConverterComponent,
    data: { reuse: true },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataInsightRoutingModule {}
