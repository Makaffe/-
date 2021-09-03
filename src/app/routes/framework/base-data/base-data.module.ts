import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { BaseDataRoutingModule } from './base-data-routing.module';
import { BaseDataComponentModule } from '@ng-mt-framework/comp';

const COMPONENTS = [];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [SharedModule, BaseDataComponentModule, BaseDataRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT,
})
export class BaseDataModule {}
