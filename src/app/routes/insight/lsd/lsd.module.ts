import { NgModule } from '@angular/core';
import { SharedModule } from '@mt-framework-ng/view';
import { LsdModule } from '@mt-insight-ng/insight';
import { LsdRoutingModule } from './lsd-routing.module';

@NgModule({
  imports: [
    SharedModule,
    LsdModule,
    LsdRoutingModule
  ],
})
export class LsdRouteModule { }
