import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LsdComponent } from '@mt-insight-ng/insight';

const routes: Routes = [
  {
    path: '',
    component: LsdComponent,
    data: { reuse: true },
  }, {
    path: ':prefix',
    component: LsdComponent,
    data: { reuse: true},
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LsdRoutingModule { }
