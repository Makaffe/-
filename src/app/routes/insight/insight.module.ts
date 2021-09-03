import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@mt-framework-ng/view';
import { InsightRoutingModule } from './insight-routing.module';



const COMPONENT = [
  // QRComponent,
];

const COMPONENT_NOROUNT = [
];

@NgModule({
  imports: [CommonModule, SharedModule, InsightRoutingModule],
  providers: [],
  declarations: [...COMPONENT, ...COMPONENT_NOROUNT],
})
export class InsightModule { }
