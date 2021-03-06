// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  // SERVER_URL: `http://192.168.1.46:9740/mt-rectify-framework/server`,
  //  SERVER_URL: `http://192.168.0.152:9696/mt-rectify-framework/server`,
  SERVER_URL: `http://localhost:8080`,
  // SERVER_URL: `http://192.168.2.28:9696/mt-rectify-framework/server`,

  production: false,
  useHash: true,
  hmr: false,
  encrypt: false,
  // 系统名称
  systemName: '审计整改信息化系统',
  // 业务数据分析子系统
  dataAnalysis: {
    show: true,
    name: '业务数据分析',
  },
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
