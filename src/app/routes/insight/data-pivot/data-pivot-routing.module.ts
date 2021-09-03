import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataPivotEditComponent, DataPivotManagerComponent, DataPivotPreviewComponent } from '@mt-insight-ng/insight';

const routes: Routes = [
  {
    path: 'pivot-edit',
    component: DataPivotEditComponent,
    data: { reuse: true, title: '综合查询编辑' },
  },
  {
    path: 'pivot-manager',
    component: DataPivotManagerComponent,
    data: { reuse: true },
  },
  {
    path: 'pivot-preview',
    component: DataPivotPreviewComponent,
    data: { reuse: true },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataPivotRoutingModule {}
