import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@mt-framework-ng/view';

import { AuditPostDetailComponent } from './audit-post-detail.component';


import { AuditPostListComponent } from './audit-post-list.component';
import { AuditPostTreeEditComponent } from './audit-post-tree-edit.component';
import { AuditPostTypeTreeComponent } from './audit-post-type-tree.component';


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
