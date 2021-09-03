import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthorityViewComponent, RoleViewComponent, UserViewComponent, LogViewComponent } from '@ng-mt-framework/comp';
import { ACLGuard } from '@delon/acl';

const routes: Routes = [
  {
    path: 'authorities',
    canActivate: [ACLGuard],
    component: AuthorityViewComponent,
    data: {
      title: '权限管理',
    }
  },
  {
    path: 'roles',
    canActivate: [ACLGuard],
    component: RoleViewComponent,
    data: {
      title: '角色管理'
    }
  },
  {
    path: 'users',
    canActivate: [ACLGuard],
    component: UserViewComponent,
    data: {
      title: '用户管理'
    }
  },
  {
    path: 'logs',
    canActivate: [ACLGuard],
    component: LogViewComponent,
    data: {
      title: '系统日志'
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecurityRoutingModule { }
