import { DashboardComponent } from './../../dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyTestComponent } from '@mt-rectify-framework/comp/my-test';

const routes: Routes = [
  {
    path: 'home',
    component: MyTestComponent,
    data: { title: '测试组件', reuse: true },
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { title: '首页', reuse: true },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuditRectifyRoutingModule {}
