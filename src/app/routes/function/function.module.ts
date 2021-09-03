import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@mt-framework-ng/view';
import { FunctionRoutingModule } from './function-routing.module';



const COMPONENT = [
];

@NgModule({
  imports: [CommonModule, SharedModule, FunctionRoutingModule],
  providers: [],
  declarations: [...COMPONENT],
})
export class FunctionMudule { }
