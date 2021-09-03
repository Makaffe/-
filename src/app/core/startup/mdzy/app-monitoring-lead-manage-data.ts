export const APP_MONITORING_LEAD_MANAGE_DATA = {
  app: {
    name: 'menu',
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
          link: '/monitoring-lead/dashboard',
          i18n: 'menu.dashboard',
          icon: 'anticon-dashboard',
        },
        {
          text: '监察线索',
          link: '/monitoring-lead/monitoring-clues',
          i18n: 'menu.monitoring-clues',
          icon: 'anticon-schedule',
          // acl: [],
        },
        {
          text: '任务分配',
          i18n: 'menu.task.allocation',
          icon: 'anticon-compass',
          children: [
            {
              text: '任务指派',
              i18n: 'menu.task.assign',
              link: '/monitoring-lead/task-allocation',
              // acl: [],
            },
            {
              text: '跟踪处理',
              i18n: 'menu.track.process',
              link: '/monitoring-lead/track-processing',
              // acl: [],
            },
          ],
        },
      ],
    },
  ],
};
