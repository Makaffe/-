import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RelationshipGraphManageComponent
} from '@mt-insight-ng/insight';

const routes: Routes = [
  { path: 'graph-manage', component: RelationshipGraphManageComponent, data: { reuse: true } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelationshipGraphRoutingModule { }
