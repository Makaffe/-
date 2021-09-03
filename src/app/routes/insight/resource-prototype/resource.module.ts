import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourcePrototypeModule } from './resource-prototype.module';
import { ResourceModuleModule } from '@mt-insight-ng/insight';
import { SharedModule } from '@mt-framework-ng/view';



@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ResourceModuleModule,
    ResourcePrototypeModule
  ]
})
export class ResourceModule { }
