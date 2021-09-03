import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataSetComponent } from '@mt-insight-ng/insight';

const routes: Routes = [
  {
    path: '',
    component: DataSetComponent,
    data: { reuse: true }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataSetRoutingModule { }
