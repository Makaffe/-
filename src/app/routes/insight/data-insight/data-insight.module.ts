import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@mt-framework-ng/view';
import { ViewDataInsightModule, ChartsConverterModule } from '@mt-insight-ng/insight';
import { DataInsightRoutingModule } from './data-insight-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DataInsightRoutingModule,
    ViewDataInsightModule,
    ChartsConverterModule
  ],
})
export class DataInsightModule { }
