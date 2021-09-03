export const APP_DATA_ANALYSIS_DATA = {
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
          link: '/data-analysis/dashboard',
          i18n: 'menu.dashboard',
          icon: 'anticon-dashboard',
        },
        {
          text: '数据采集',
          i18n: 'menu.data-collect',
          icon: 'anticon-cloud-download',
          children: [
            {
              text: '采集任务',
              i18n: 'menu.data-collect.task',
              link: '/audit-management/data-collection-rask',
            },
            {
              text: '采集日志',
              i18n: 'menu.plan.daily',
              link: '/audit-management/data-collection-log',
            }
          ],
        },
        {
          text: '预警管理',
          i18n: 'menu.pre-warning-management',
          icon: 'anticon-area-chart',
          children: [
            {
              text: '预警模型',
              i18n: 'menu.pre-warning-management.model',
              link: '/data-analysis/pre-warning-management',
            },
            {
              text: '预警任务管理',
              i18n: 'menu.pre-warning-management.task',
              link: '/data-analysis/task-management',
            },
            {
              text: '预警结果管理',
              i18n: 'menu.pre-warning-management.result',
              link: '/data-analysis/experience-results',
            }
          ],
        },
        {
          text: '数据分析',
          i18n: 'menu.data-analysis',
          icon: 'anticon-database',
          children: [
            {
              text: '数据源管理',
              i18n: 'menu.data-analysis.management',
              link: '/data-analysis/data-source',
            },
            {
              text: '分析模型',
              i18n: 'menu.data-analysis.model',
              link: '/data-analysis/analysis-model',
            },
            {
              text: '自动SQL查询',
              i18n: 'menu.data-analysis.sql',
              link: '/data-analysis/sql-tool',
            }
          ],
        },
      ],
    },
  ],
};
