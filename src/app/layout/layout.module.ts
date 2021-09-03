import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

import { LayoutDefaultComponent } from './default/default.component';
import { LayoutFullScreenComponent } from './fullscreen/fullscreen.component';
import { HeaderComponent } from './default/header/header.component';
import { SidebarComponent } from './default/sidebar/sidebar.component';
import { HeaderSearchComponent } from './default/header/components/search.component';
import { HeaderIconComponent } from './default/header/components/icon.component';
import { HeaderFullScreenComponent } from './default/header/components/fullscreen.component';
import { HeaderI18nComponent } from './default/header/components/i18n.component';
import { HeaderStorageComponent } from './default/header/components/storage.component';
import { HeaderUserComponent } from './default/header/components/user.component';
import { HeaderSyncADComponent } from './default/header/components/syncad.component';
import { SettingDrawerComponent } from './default/setting-drawer/setting-drawer.component';
import { SettingDrawerItemComponent } from './default/setting-drawer/setting-drawer-item.component';
import { SecurityComponentModule } from '@ng-mt-framework/comp';

const SETTINGDRAWER = [SettingDrawerComponent, SettingDrawerItemComponent];

const COMPONENTS = [
  LayoutDefaultComponent,
  LayoutFullScreenComponent,
  HeaderComponent,
  SidebarComponent,
  ...SETTINGDRAWER,
];

const HEADERCOMPONENTS = [
  HeaderSearchComponent,
  HeaderIconComponent,
  HeaderFullScreenComponent,
  HeaderI18nComponent,
  HeaderStorageComponent,
  HeaderUserComponent,
  HeaderSyncADComponent,
];

@NgModule({
  imports: [SharedModule, SecurityComponentModule],
  entryComponents: SETTINGDRAWER,
  declarations: [...COMPONENTS, ...HEADERCOMPONENTS],
  exports: [...COMPONENTS],
})
export class LayoutModule {}
