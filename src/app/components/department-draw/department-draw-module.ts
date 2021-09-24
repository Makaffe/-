import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@mt-framework-ng/view';
import { NgxEchartsModule } from 'ngx-echarts';

import { DepartmentDrawListComponent } from './department-draw-list.component';
import { DepartmentDrawViewComponent } from './department-draw-view.component';


const COMPONENTS = [
  DepartmentDrawListComponent,
  DepartmentDrawViewComponent
];
@NgModule({
  imports: [CommonModule, SharedModule, NgxEchartsModule],
  exports: [...COMPONENTS],
  declarations: [...COMPONENTS],
})
export class DepartmentDrawModule {}
