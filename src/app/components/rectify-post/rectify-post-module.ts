import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@mt-framework-ng/view';

import { RectifyPostDetailComponent } from './rectify-post-detail.component';

import { RectifyPostListComponent } from './rectify-post-list.component';
import { RectifyPostTypeTreeEditComponent } from './rectify-post-type-tree-edit.component';
import { RectifyPostTypeTreeComponent } from './rectify-post-type-tree.component';

import { RectifyPostViewComponent } from './rectify-post-view.component';

const COMPONENTS = [
    RectifyPostViewComponent,
    RectifyPostListComponent,
    RectifyPostTypeTreeComponent,
    RectifyPostTypeTreeEditComponent,
    RectifyPostDetailComponent
];
@NgModule({
  imports: [CommonModule, SharedModule],
  exports: [...COMPONENTS],
  declarations: [...COMPONENTS],
})
export class RectifyPostModule {}
