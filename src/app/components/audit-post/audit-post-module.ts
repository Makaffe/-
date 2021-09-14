import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { AuditPostDetailComponent } from './audit-post-detail/audit-post-detail.component';
import { AuditPostListComponent } from './audit-post-list.component';

import { AuditPostTreeEditComponent } from './audit-post-type-tree/audit-post-tree-edit.component';
import { AuditPostTypeTreeComponent } from './audit-post-type-tree/audit-post-type-tree.component';
import { AuditPostViewComponent } from './audit-post-view.component';

const COMPONENTS = [
  AuditPostViewComponent,
  AuditPostListComponent,
  AuditPostTypeTreeComponent,
  AuditPostTreeEditComponent,
  AuditPostTypeTreeComponent,
  AuditPostDetailComponent,
];
@NgModule({
  imports: [CommonModule, SharedModule],
  exports: [...COMPONENTS],
  declarations: [...COMPONENTS],
})
export class AuditPostModule {}
