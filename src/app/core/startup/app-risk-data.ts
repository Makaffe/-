export const APP_RISK_DATA = {
  app: {
    name: 'Matech',
    description: 'Ng-zorro & Ng-alain admin panel front-end framework',
  },
  menu: [
    {
      text: '',
      i18n: '',
      group: true,
      hideInBreadcrumb: true,
      children: [
        {
          text: '首页',
          link: '/risk-assessment/dashboard',
          i18n: 'menu.dashboard',
          icon: 'anticon-dashboard',
          acl: ['EIA_RISK_ASSESS_CREATE', 'EIA_RISK_ASSESS_UPDATE', 'EIA_RISK_ASSESS_DELETE', 'EIA_RISK_ASSESS_RETRIEVE']
        },
      ],
    },
  ],
};
