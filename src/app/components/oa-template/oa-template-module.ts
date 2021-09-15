import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { OaTemplateDetailComponent } from './oa-template-detail.component';
import { OaTemplateListComponent } from './oa-template-list.component';
import { OaTemplateViewComponent } from './oa-template-view.component';

const COMPONENTS = [OaTemplateViewComponent, OaTemplateListComponent, OaTemplateDetailComponent];
@NgModule({
  imports: [CommonModule, SharedModule],
  exports: [...COMPONENTS],
  declarations: [...COMPONENTS],
})
export class OATemplateModule {}
