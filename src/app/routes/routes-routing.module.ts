import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SimpleGuard } from '@delon/auth';
import { environment } from '@env/environment';
import { DataResourceViewComponent, DataResourceViewServiceComponent } from '@mt-framework-ng/view';
// layout
import { LayoutDefaultComponent } from '../layout/default/default.component';

import { SystemDashboardComponent } from './dashboard/system/system-dashboard.component';
// passport pages
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';

const routes = [
  {
    path: '',
    component: LayoutDefaultComponent,
    // canActivate: [SimpleGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'sys-dashboard', component: SystemDashboardComponent, data: { title: '首页' } },
      { path: 'exception', loadChildren: './exception/exception.module#ExceptionModule' },
      // 业务子模块
      { path: 'base-data', loadChildren: './framework/base-data/base-data.module#BaseDataModule' },
      { path: 'security', loadChildren: './framework/security/security.module#SecurityModule' },
      { path: 'organization', loadChildren: './framework/organization/organization.module#OrganizationModule' },
      { path: 'notice', loadChildren: './framework/notice/notice.module#NoticeModule' },
      { path: 'insight', loadChildren: './insight/insight.module#InsightModule', data: { reuse: true } },
      {
        path: 'insight-report',
        loadChildren: './insight-report/insight-report.module#InsightReportModule',
        data: { reuse: true },
      },
      { path: 'function', loadChildren: './function/function.module#FunctionMudule', data: { reuse: true } },
      {
        path: 'resource/view',
        component: DataResourceViewComponent,
        data: { title: '资源查看网关', reuse: false },
      },
      {
        path: 'resource/view-service',
        component: DataResourceViewServiceComponent,
        data: { title: '平台服务查看网关', reuse: false },
      },
      // 审计整改模块
      {
        path: 'audit-rectify',
        loadChildren: './rectify/audit-rectify/audit-rectify.module#AuditRectifyModule',
        data: { reuse: true },
      },
    ],
  },

  // 单页不包裹Layout
  { path: 'login', component: LoginComponent, data: { title: '登录' } },
  { path: 'navigation', component: NavigationComponent, data: { title: '功能导航' } },
  { path: '**', redirectTo: 'exception/404' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: environment.useHash,
      // NOTICE: If you use `reuse-tab` component and turn on keepingScroll you can set to `disabled`
      // Pls refer to https://ng-alain.com/components/reuse-tab
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class RouteRoutingModule { }
