import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { DepartmentDrawListComponent } from './department-draw-list.component';
import { DepartmentDrawViewComponent } from './department-draw-view.component';


const COMPONENTS = [
  DepartmentDrawListComponent,
  DepartmentDrawViewComponent
];
@NgModule({
  imports: [CommonModule, SharedModule],
  exports: [...COMPONENTS],
  declarations: [...COMPONENTS],
})
export class DepartmentDrawModule {}
