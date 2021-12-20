import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ACLGuard } from '@delon/acl';
import {
  ConfigurationViewComponent, DictionaryViewComponent, DistrictViewComponent, MenuViewComponent
} from '@ng-mt-framework/comp';
const routes: Routes = [
  {
    path: 'dictionaries',
    component: DictionaryViewComponent,
    data: {
      title: '字典管理',
    },
  },
  {
    path: 'menus',
    // canActivate: [ACLGuard],
    component: MenuViewComponent,
    data: {
      title: '菜单管理',
    },
  },
  {
    path: 'districts',
    // canActivate: [ACLGuard],
    component: DistrictViewComponent,
    data: {
      title: '地区管理',
    },
  },
  {
    path: 'configurations',
    // canActivate: [ACLGuard],
    component: ConfigurationViewComponent,
    data: {
      title: '系统参数管理',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BaseDataRoutingModule { }
