import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { OrganizationRoutingModule } from './organization-routing.module';
import { OrganizationComponentModule } from '@ng-mt-framework/comp';
import { CommonModule } from '@angular/common';

const COMPONENTS = [];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [SharedModule, OrganizationRoutingModule, OrganizationComponentModule, CommonModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT,
})
export class OrganizationModule {}
