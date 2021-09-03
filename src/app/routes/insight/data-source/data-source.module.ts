import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@mt-framework-ng/view';
import { DataSourceRoutingModule } from './data-source-routing.module';
import { ViewDataSourceModule } from '@mt-insight-ng/insight';

@NgModule({
  imports: [CommonModule, SharedModule, DataSourceRoutingModule, ViewDataSourceModule],
})
export class DataSourceModule { }
