export const APP_INTERNAL_CONTROL_DATA = {
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
          link: '/internal-control/dashboard',
          i18n: 'menu.dashboard',
          icon: 'anticon-dashboard',
        },
        {
          text: '风险评估',
          i18n: 'menu.risk.assessment',
          icon: 'anticon-audit',
          children: [
            {
              text: '评估方案',
              i18n: 'menu.assessment.scheme',
              link: '/internal-control/evaluation-scheme',
            },
            {
              text: '评估指引',
              i18n: 'menu.assessment.guidelines',
              link: '/internal-control/assessment-guidelines',
            },
            {
              text: '评估模板',
              i18n: 'menu.assessment.evaluation-template',
              link: '/internal-control/evaluation-template',
            },
            {
              text: '评估项目',
              i18n: 'menu.assessment.project',
              link: '/internal-control/evaluate-project',
            },
          ],
        },
      ],
    },
  ],
};
