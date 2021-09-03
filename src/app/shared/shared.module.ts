import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DelonABCModule } from '@delon/abc';
import { DelonACLModule } from '@delon/acl';
import { DelonFormModule } from '@delon/form';
// delon
import { AlainThemeModule } from '@delon/theme';
// i18n
import { TranslateModule } from '@ngx-translate/core';
import { AngularSplitModule } from 'angular-split';
// #region third libs
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CountdownModule } from 'ngx-countdown';
import { NgxEchartsModule } from 'ngx-echarts';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
// #endregion
// #region your componets & directives
import { UEditorModule } from 'ngx-ueditor';
const THIRDMODULES = [NgZorroAntdModule, CountdownModule, AngularSplitModule, NgxEchartsModule, PdfJsViewerModule];

const COMPONENTS = [

];

const DIRECTIVES = [];
// #endregion

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    AlainThemeModule.forChild(),
    DelonABCModule,
    DelonACLModule,
    DelonFormModule,
    // third libs
    ...THIRDMODULES,
    UEditorModule
  ],
  declarations: [
    // your components
    ...COMPONENTS,
    ...DIRECTIVES,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AlainThemeModule,
    DelonABCModule,
    DelonACLModule,
    DelonFormModule,
    // i18n
    TranslateModule,
    // third libs
    ...THIRDMODULES,
    // your components
    ...COMPONENTS,
    ...DIRECTIVES,
  ],

  providers: [DatePipe],
})
export class SharedModule {}
