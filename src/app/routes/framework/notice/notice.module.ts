import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NoticeComponentModule } from '@ng-mt-framework/comp';
import { MultiListModule, PasswordStrengthModule } from '@ng-mt-framework/core';
import { SharedModule } from '@shared';
import { NoticeRoutingModule } from './notice-routing.module';

const COMPONENTS = [];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    NoticeRoutingModule,
    NoticeComponentModule,
    CommonModule,
    PasswordStrengthModule,
    MultiListModule,
  ],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
})
export class NoticeModule {}
