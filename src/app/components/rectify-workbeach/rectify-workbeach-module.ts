import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@mt-framework-ng/view';
import { NgxEchartsModule } from 'ngx-echarts';
import { UeditorComponent } from '../common/ueditor/ueditor.component';
import { RectifyDiaryComponent } from './rectify-diary.component';
import { RectifyEffectComponent } from './rectify-effect.component';

import { RectifyWorkbeachViewComponent } from './rectify-workbeach-view.component';

const COMPONENTS = [RectifyWorkbeachViewComponent, RectifyEffectComponent, RectifyDiaryComponent, UeditorComponent];
@NgModule({
  imports: [CommonModule, SharedModule, NgxEchartsModule],
  exports: [...COMPONENTS],
  declarations: [...COMPONENTS],
})
export class RectifyWorkBeachModule {}
