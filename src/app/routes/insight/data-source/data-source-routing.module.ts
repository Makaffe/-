import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataSourceComponent } from '@mt-insight-ng/insight';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: DataSourceComponent, data: { reuse: true }  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataSourceRoutingModule {}
