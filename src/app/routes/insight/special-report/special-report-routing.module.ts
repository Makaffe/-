import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  ReportEditorComponent,
  ViewInsightModelComponent,
  DashboardInsightComponent,
  ReportViewComponent,
  ReportListComponent,
  ReportInfoComponent,
  TemplateInfoComponent,
  ReportEditComponent,
  TemplateEditComponent,
} from '@mt-insight-ng/insight';

const routes: Routes = [
  { path: 'report-editor', component: ReportEditorComponent, data: { reuse: true } },
  { path: 'report-editor/:status', component: ReportEditorComponent, data: { reuse: true } },
  { path: 'report-editor/:status/:template', component: ReportEditorComponent, data: { reuse: true } },
  { path: 'view-insight-model', component: ViewInsightModelComponent, data: { reuse: true } },
  { path: 'view-report', component: DashboardInsightComponent, data: { reuse: true } },
  { path: 'report-view', component: ReportViewComponent, data: { reuse: true } },
  { path: 'report-view/:id', component: ReportViewComponent, data: { reuse: true } },
  { path: 'report-list', component: ReportListComponent, data: { reuse: true } },
  { path: 'report-list/:id', component: ReportListComponent, data: { reuse: true } },
  { path: 'report-info', component: ReportInfoComponent, data: { reuse: true } },
  { path: 'template-info', component: TemplateInfoComponent, data: { reuse: true } },
  { path: 'report-edit', component: ReportEditComponent, data: { reuse: true, title: '编辑报告' } },
  { path: 'report-edit/:id/:status', component: ReportEditComponent, data: { reuse: true, title: '编辑报告' } },
  { path: 'template-edit', component: TemplateEditComponent, data: { reuse: true, title: '编辑模板' } },
  { path: 'template-edit/:id', component: TemplateEditComponent, data: { reuse: true, title: '编辑模板' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecialReportRoutingModule { }
