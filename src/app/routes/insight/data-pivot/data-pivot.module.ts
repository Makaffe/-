import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@mt-framework-ng/view';
import { ViewDataPivotModule } from '@mt-insight-ng/insight';
import { DataPivotRoutingModule } from './data-pivot-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DataPivotRoutingModule,
    ViewDataPivotModule
  ],
})
export class DataPivotModule { }
