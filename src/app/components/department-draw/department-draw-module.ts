import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@mt-framework-ng/view';
import { NgxEchartsModule } from 'ngx-echarts';
import { StatisticsAnalysisModule } from '../statistics-analysis/statistics-analysis-module';

import { DepartmentDrawListComponent } from './department-draw-list.component';
import { DepartmentDrawViewComponent } from './department-draw-view.component';
import { DepartmentDrawComponent } from './department-draw.component';

const COMPONENTS = [DepartmentDrawListComponent, DepartmentDrawViewComponent, DepartmentDrawComponent];
@NgModule({
  imports: [CommonModule, SharedModule, NgxEchartsModule, StatisticsAnalysisModule],
  exports: [...COMPONENTS],
  declarations: [...COMPONENTS],
})
export class DepartmentDrawModule {}
