import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourcePrototypeComponent } from '@mt-insight-ng/insight';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'resource', component: ResourcePrototypeComponent, data: { reuse: true } },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResourcePrototypeModule { }
