import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { RouteRoutingModule } from './routes-routing.module';
// passport pages
import { LoginComponent } from './login/login.component';
import 'echarts/theme/macarons.js';
// single pages
import { UserLockComponent } from './passport/lock/lock.component';
import { UserRegisterComponent } from './passport/register/register.component';
import { UserRegisterResultComponent } from './passport/register-result/register-result.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { NavigationComponent } from './navigation/navigation.component';
import { CopyRightComponent } from './navigation/copyright/copyright.component';
import { SysNameComponent } from './navigation/sys-name/sys-name.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MtBaseDataModule } from '@mt-framework-ng/view';
import { SystemDashboardComponent } from './dashboard/system/system-dashboard.component';


const COMPONENTS = [
  // passport pages
  LoginComponent,
  UserLockComponent,
  UserRegisterComponent,
  UserRegisterResultComponent,
  NavigationComponent,
  CopyRightComponent,
  SysNameComponent,
  SystemDashboardComponent
];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [SharedModule, RouteRoutingModule, MtBaseDataModule, NgxEchartsModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT,
})
export class RoutesModule {}
