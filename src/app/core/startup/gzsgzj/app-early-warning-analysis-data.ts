export const APP_EARLY_WARNING_ANALYSIS_DATA = {
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
          link: '/dashboard',
          i18n: 'menu.dashboard',
          icon: 'anticon-dashboard',
        },
        {
          text: '预警分析模型',
          i18n: 'menu.pre-warning.model',
          icon: 'anticon-radar-chart',
          // acl: [],
        },
        {
          text: '预警运行任务',
          icon: 'anticon-calendar',
          i18n: 'menu.pre-warning.run-task',
          // link: '/audit-work/audit-find',
          // acl: [],
        },
        {
          text: '预警疑点库',
          icon: 'anticon-info-circle',
          i18n: 'menu.pre-warning.doubt',
          // link: '/audit-work/audit-report',
          // acl: [],
        },
      ],
    },
  ],
};
