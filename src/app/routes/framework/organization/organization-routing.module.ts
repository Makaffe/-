import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  PositionViewComponent,
  DepartmentViewComponent,
  UnitViewComponent,
  EmployeeViewComponent,
} from '@ng-mt-framework/comp';
import { ACLGuard } from '@delon/acl';

const routes: Routes = [
  {
    path: 'units',
    canActivate: [ACLGuard],
    component: UnitViewComponent,
    data: {
      title: '单位管理',
    }
  },
  {
    path: 'department',
    canActivate: [ACLGuard],
    component: DepartmentViewComponent,
    data: {
      title: '部门管理',
    }
  },
  {
    path: 'position',
    canActivate: [ACLGuard],
    component: PositionViewComponent,
    data: {
      title: '岗位管理',
    }
  },
  {
    path: 'employees',
    canActivate: [ACLGuard],
    component: EmployeeViewComponent,
    data: {
      title: '员工管理',
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationRoutingModule { }
