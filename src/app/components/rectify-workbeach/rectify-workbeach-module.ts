import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { RectifyWorkbeachViewComponent } from './rectify-workbeach-view.component';



const COMPONENTS = [
    RectifyWorkbeachViewComponent
];
@NgModule({
  imports: [CommonModule, SharedModule],
  exports: [...COMPONENTS],
  declarations: [...COMPONENTS],
})
export class RectifyWorkBeachModule {}
