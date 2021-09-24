import { NgModule } from '@angular/core';
import { AttachListComponent } from './attach-list.component';
import { SharedModule } from '@shared';
import { DatePipe } from '@angular/common';

const COMPONENTS = [AttachListComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [SharedModule],
  exports: [...COMPONENTS],
  providers: [DatePipe],
})
export class AttachListModule {}
