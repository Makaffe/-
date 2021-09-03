import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ACLGuard } from '@delon/acl';
import { NoticeViewComponent } from '@ng-mt-framework/comp';


const routes: Routes = [
  {
    path: 'management',
    canActivate: [ACLGuard],
    component: NoticeViewComponent,
    data: {
      title: '公告管理',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoticeRoutingModule { }
