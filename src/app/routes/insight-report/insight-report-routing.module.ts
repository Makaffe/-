import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportDisplayComponent, ReportManageComponent,
         ReportRuleEditComponent, ReportPreviewComponent,
         ReportTemplateManageComponent } from '@mt-insight-ng/insight-report';

// ReportDisplayComponent,
const routes: Routes = [
  {
    path: 'edit',
    component: ReportRuleEditComponent,
    data: { reuse: true },
  },
  {
    path: 'edit/:id',
    component: ReportRuleEditComponent,
    data: { reuse: true },
  },
  {
    path: 'manage',
    component: ReportManageComponent,
    data: { reuse: true },
  },
  {
    path: 'display',
    component: ReportDisplayComponent,
    data: { reuse: true },
  },
  {
    path: 'template',
    component: ReportTemplateManageComponent,
    data: { reuse: true },
  },
  {
    path: 'preview/:id/:period',
    component: ReportPreviewComponent,
    data: { reuse: true },
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InsightReportRoutingModule { }
