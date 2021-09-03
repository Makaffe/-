import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@mt-framework-ng/view';
import { ViewDataSetModule } from '@mt-insight-ng/insight';
import { DataSetRoutingModule } from './data-set-routing.module';

@NgModule({
  imports: [CommonModule, SharedModule, DataSetRoutingModule, ViewDataSetModule],
})
export class DataSetModule { }
