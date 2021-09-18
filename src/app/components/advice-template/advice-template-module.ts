import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@mt-framework-ng/view';

import { AdviceTemplateDetailComponent } from './advice-template-detail.component';
import { AdviceTemplateListComponent } from './advice-template-list.component';
import { AdviceTemplateViewComponent } from './advice-template-view.component';

const COMPONENTS = [
    AdviceTemplateViewComponent,
    AdviceTemplateListComponent,
    AdviceTemplateDetailComponent
];
@NgModule({
  imports: [CommonModule, SharedModule],
  exports: [...COMPONENTS],
  declarations: [...COMPONENTS],
})
export class AdviceTemplateModule {}
