import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@mt-framework-ng/view';
import { NgxEchartsModule } from 'ngx-echarts';
import { RectifyEffectComponent } from './rectify-effect.component';


import { RectifyWorkbeachViewComponent } from './rectify-workbeach-view.component';



const COMPONENTS = [
    RectifyWorkbeachViewComponent,
    RectifyEffectComponent
];
@NgModule({
  imports: [CommonModule, SharedModule, NgxEchartsModule],
  exports: [...COMPONENTS],
  declarations: [...COMPONENTS],
})
export class RectifyWorkBeachModule {}
