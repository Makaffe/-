export const APP_AUDIT_RECTIFICATION_DATA = {
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
          link: '/rectify-sys/rectification-summary',
          i18n: 'menu.dashboard',
          icon: 'anticon-dashboard',
        },
        {
          text: '整改任务管理',
          i18n: 'menu.after-rectification',
          icon: 'anticon-audit',
          // acl: [],
          children: [
            {
              text: '审计报告',
              i18n: 'menu.after-rectification.audit-report',
              link: '/rectify-sys/ars-audit-report',
              // acl: [],
            },
            {
              text: '整改任务',
              i18n: 'menu.after-rectification.task',
              link: '/rectify-sys/rectification-task',
              // acl: [],
            },
            {
              text: '整改工作台',
              i18n: 'menu.after-rectification.workbench',
              link: '/rectify-sys/rectify-workbench',
              // acl: [],
            },
          ],
        },
        {
          text: '整改立项',
          i18n: 'menu.rectification-project',
          icon: 'anticon-build',
          // link: '/audit-management/plan-make',
          // acl: [],
        },
        {
          text: '整改情况一览表',
          i18n: 'menu.rectification-summary.list',
          icon: 'anticon-table',
          link: '/rectify-sys/rectification-summary/list',
          // acl: [],
        },
        // {
        //   text: '整改情况',
        //   i18n: 'menu.rectification-summary',
        //   icon: 'anticon-table',
        //   // acl: [],
        //   children: [
        //     {
        //       text: '整改情况一览表',
        //       i18n: 'menu.rectification-summary.list',
        //       link: '/rectify-sys/rectification-summary/list',
        //       // acl: [],
        //     },
        //     {
        //       text: '整改情况汇总',
        //       i18n: 'menu.rectification-summary.summary',
        //       link: '/rectify-sys/rectification-summary',
        //       // acl: [],
        //     },
        //   ],
        // },
        {
          text: '部门整改台账',
          i18n: 'menu.rectification-ledger.department',
          icon: 'anticon-apartment',
          // acl: [],
          link: '/rectify-sys/rectification-ledger/department',
        },
        {
          text: '项目整改台账',
          i18n: 'menu.rectification-ledger.project',
          icon: 'anticon-project',
          // acl: [],
          link: '/rectify-sys/rectification-ledger/project',
        },
      ],
    },
  ],
};
