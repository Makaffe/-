// register angular
import { registerLocaleData } from '@angular/common';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// #region default language
// 参考：https://ng-alain.com/docs/i18n
import { default as ngLang } from '@angular/common/locales/zh';
import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { I18NService } from '@core/i18n/i18n.service';
import { DefaultInterceptor } from '@core/net/default.interceptor';
// #endregion
// #region Startup Service
import { StartupService } from '@core/startup/startup.service';
import { ACLService } from '@delon/acl';
import { JWTInterceptor } from '@delon/auth';
import { ALAIN_I18N_TOKEN, DELON_LOCALE, zh_CN as delonLang } from '@delon/theme';
import { LOGIN_UTIL_TOKEN } from '@mt-framework-ng/core';
import { DataResourceViewServiceComponent, RESOURCE_ROUTER, LoginUtil } from '@mt-framework-ng/view';
import { DataPivotViewComponent, DataSetViewComponent, InsightGridsterViewerComponent } from '@mt-insight-ng/insight';
import { EncryptionInterceptor, WorkingOrganizationInterceptor } from '@ng-mt-framework/api';
// #endregion
// #region i18n services
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// #region
// #region JSON Schema form (using @delon/form)
import { JsonSchemaModule } from '@shared/json-schema/json-schema.module';
import { NZ_I18N, zh_CN as zorroLang } from 'ng-zorro-antd';
import { DragulaModule } from 'ng2-dragula';
import { NgxEchartsModule } from 'ngx-echarts';
import { UEditorModule } from 'ngx-ueditor';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
// #endregion
import { DelonModule } from './delon.module';
import { LayoutModule } from './layout/layout.module';
import { RoutesModule } from './routes/routes.module';
import { SharedModule } from './shared/shared.module';
const LANG = {
  abbr: 'zh',
  ng: ngLang,
  zorro: zorroLang,
  delon: delonLang,
};
registerLocaleData(LANG.ng, LANG.abbr);
const LANG_PROVIDES = [
  { provide: LOCALE_ID, useValue: LANG.abbr },
  { provide: NZ_I18N, useValue: LANG.zorro },
  { provide: DELON_LOCALE, useValue: LANG.delon },
];

// 加载i18n语言文件
export function I18nHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, `assets/data/`, '.json');
}

const I18NSERVICE_MODULES = [
  TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: I18nHttpLoaderFactory,
      deps: [HttpClient],
    },
  }),
];

const I18NSERVICE_PROVIDES = [{ provide: ALAIN_I18N_TOKEN, useClass: I18NService, multi: false }];

const FORM_MODULES = [JsonSchemaModule];
const INTERCEPTOR_PROVIDES = [
  { provide: HTTP_INTERCEPTORS, useClass: EncryptionInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: WorkingOrganizationInterceptor,
    multi: true,
  },
];
// #endregion

// #region global third module
const GLOBAL_THIRD_MODULES = [];
// tslint:disable-next-line: ban-types
export function StartupServiceFactory(startupService: StartupService): Function {
  return () => startupService.load();
}
const APPINIT_PROVIDES = [
  { provide: LOGIN_UTIL_TOKEN, useClass: LoginUtil },
  StartupService,
  {
    provide: APP_INITIALIZER,
    useFactory: StartupServiceFactory,
    deps: [StartupService],
    multi: true,
  },
];

/** 中转服务 */
RESOURCE_ROUTER.SERVICE = {
  name: '平台服务',
  notMgr: true,
  icon: 'link',
  routeURL: 'resource/view-service',
  comp: DataResourceViewServiceComponent
};
/** 数据分析 */
RESOURCE_ROUTER.DATA_INSIGHT = {
  name: '多维数据分析',
  icon: 'line-chart',
  routeURL: '/insight/data-insight/insight-preview',
  comp: InsightGridsterViewerComponent
};
/** 综合查询分析 */
RESOURCE_ROUTER.DATA_PIVOT = {
  name: '综合查询分析',
  routeURL: '/insight/data-pivot/pivot-preview',
  comp: DataPivotViewComponent
};
/** 数据集 */
RESOURCE_ROUTER.DATASET = {
  name: '数据集',
  icon: 'database',
  routeURL: '/insight/dept-execution/view-resource',
  comp: DataSetViewComponent
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DelonModule.forRoot(),
    DragulaModule.forRoot(),
    UEditorModule.forRoot({
      js: [`./assets/ueditor/ueditor.config.special-report.js`, `./assets/ueditor/ueditor.all.min.js`],
      options: {
        UEDITOR_HOME_URL: `./assets/ueditor/`,
      },
    }),
    CoreModule,
    SharedModule,
    LayoutModule,
    RoutesModule,
    NgxEchartsModule,
    ...I18NSERVICE_MODULES,
    ...FORM_MODULES,
    ...GLOBAL_THIRD_MODULES,
  ],
  providers: [...LANG_PROVIDES, ...INTERCEPTOR_PROVIDES, ...I18NSERVICE_PROVIDES, ...APPINIT_PROVIDES, ACLService],
  bootstrap: [AppComponent],
})
export class AppModule {}
