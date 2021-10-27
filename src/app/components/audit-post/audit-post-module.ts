import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OrganizationComponentModule, SecurityComponentModule } from '@ng-mt-framework/comp';
import { SharedModule } from '@shared';
import { AttachListModule } from '../common/attach/attach-list.module';

import { DictSelectComponent } from '../common/dict-select/dict-select.component';

import { AuditPostDetailComponent } from './audit-post-detail.component';

import { AuditPostListComponent } from './audit-post-list.component';
import { AuditPostTreeEditComponent } from './audit-post-tree-edit.component';
import { AuditPostTypeTreeComponent } from './audit-post-type-tree.component';

import { AuditPostViewComponent } from './audit-post-view.component';
import { RectificationPostComponent } from './rectification-post.component';

const COMPONENTS = [
  AuditPostViewComponent,
  AuditPostListComponent,
  AuditPostTypeTreeComponent,
  AuditPostTreeEditComponent,
  AuditPostTypeTreeComponent,
  AuditPostDetailComponent,
  RectificationPostComponent,
];
@NgModule({
  imports: [CommonModule, SharedModule, OrganizationComponentModule, SecurityComponentModule, AttachListModule],
  exports: [...COMPONENTS],
  declarations: [...COMPONENTS],
})
export class AuditPostModule {}
