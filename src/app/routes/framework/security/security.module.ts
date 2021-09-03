import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { SecurityRoutingModule } from './securtiy-routing.module';
import { PasswordStrengthModule, MultiListModule } from '@ng-mt-framework/core';
import { SecurityComponentModule } from '@ng-mt-framework/comp';
import { CommonModule } from '@angular/common';

const COMPONENTS = [];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    SecurityRoutingModule,
    SecurityComponentModule,
    CommonModule,
    PasswordStrengthModule,
    MultiListModule,
  ],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
})
export class SecurityModule {}
