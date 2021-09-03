export const APP_ASSIGNMENT_DATA = {
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
          link: '/audit-work/dashboard',
          i18n: 'menu.dashboard',
          icon: 'anticon-dashboard',
        },
        {
          text: '审计项目',
          i18n: 'menu.project',
          icon: 'anticon-project',
          acl: [
            'EIA_AUDIT_PROJECT_RETRIEVE',
            'EIA_AUDIT_PROJECT_CREATE',
            'EIA_AUDIT_PROJECT_UPDATE',
            'EIA_AUDIT_PROJECT_DELETE',
            'EIA_AUDIT_PROJECT_START',
            'EIA_AUDIT_PROJECT_CANCEL',
            'EIA_AUDIT_PROJECT_SUBMIT',
            'EIA_AUDIT_PROJECT_APPROVE',
            'EIA_AUDIT_PROJECT_CLOSE',
            'EIA_AUDIT_PROJECT_ARCHIVE',
          ],
          children: [
            {
              text: '计划内项目',
              i18n: 'menu.project.planned',
              link: '/audit-work/project-planned/planned',
              acl: [
                'EIA_AUDIT_PROJECT_RETRIEVE',
                'EIA_AUDIT_PROJECT_CREATE',
                'EIA_AUDIT_PROJECT_UPDATE',
                'EIA_AUDIT_PROJECT_DELETE',
                'EIA_AUDIT_PROJECT_START',
                'EIA_AUDIT_PROJECT_CANCEL',
                'EIA_AUDIT_PROJECT_SUBMIT',
                'EIA_AUDIT_PROJECT_APPROVE',
                'EIA_AUDIT_PROJECT_CLOSE',
                'EIA_AUDIT_PROJECT_ARCHIVE',
              ],
            },
            {
              text: '计划外项目',
              i18n: 'menu.project.unplanned',
              link: '/audit-work/project-planned/unplanned',
              acl: [
                'EIA_AUDIT_PROJECT_RETRIEVE',
                'EIA_AUDIT_PROJECT_CREATE',
                'EIA_AUDIT_PROJECT_UPDATE',
                'EIA_AUDIT_PROJECT_DELETE',
                'EIA_AUDIT_PROJECT_START',
                'EIA_AUDIT_PROJECT_CANCEL',
                'EIA_AUDIT_PROJECT_SUBMIT',
                'EIA_AUDIT_PROJECT_APPROVE',
                'EIA_AUDIT_PROJECT_CLOSE',
                'EIA_AUDIT_PROJECT_ARCHIVE',
              ],
            },
            {
              text: '外部监督项目',
              i18n: 'menu.project.external',
              link: '/audit-work/project-external/false',
              acl: [
                'EIA_AUDIT_PROJECT_RETRIEVE',
                'EIA_AUDIT_PROJECT_CREATE',
                'EIA_AUDIT_PROJECT_UPDATE',
                'EIA_AUDIT_PROJECT_DELETE',
                'EIA_AUDIT_PROJECT_START',
                'EIA_AUDIT_PROJECT_CANCEL',
                'EIA_AUDIT_PROJECT_SUBMIT',
                'EIA_AUDIT_PROJECT_APPROVE',
                'EIA_AUDIT_PROJECT_CLOSE',
                'EIA_AUDIT_PROJECT_ARCHIVE',
              ],
            },
          ],
        },
        // {
        //   text: '审计项目工作台',
        //   i18n: 'menu.workbench',
        //   icon: 'anticon-filter',
        //   link: '/audit-work/workbench',
        //   // acl: [],
        // },
        {
          text: '审计疑点库',
          icon: 'anticon-exception',
          i18n: 'menu.workbench.implement.doubt',
          // link: '/audit-work/audit-doubt',
          // acl: [],
          children: [
            {
              text: '疑点列表',
              i18n: 'menu.workbench.implement.doubt.list',
              link: '/audit-work/audit-doubt/list',
              acl: [
                'EIA_AUDIT_DOUBTS_CREATE',
                'EIA_AUDIT_DOUBTS_UPDATE',
                'EIA_AUDIT_DOUBTS_DELETE',
                'EIA_AUDIT_DOUBTS_RETRIEVE',
                'EIA_AUDIT_DOUBTS_ASSIGN',
              ],
            },
            {
              text: '疑点核实',
              i18n: 'menu.workbench.implement.doubt.verify',
              link: '/audit-work/audit-doubt/verify',
              acl: [
                'EIA_AUDIT_DOUBTS_CREATE',
                'EIA_AUDIT_DOUBTS_UPDATE',
                'EIA_AUDIT_DOUBTS_DELETE',
                'EIA_AUDIT_DOUBTS_RETRIEVE',
                'EIA_AUDIT_DOUBTS_ASSIGN',
              ],
            },
          ],
        },
        {
          text: '审计发现',
          icon: 'anticon-file-search',
          i18n: 'menu.workbench.implement.find',
          link: '/audit-work/audit-find',
          // acl: [],
        },
        {
          text: '审计文书',
          icon: 'anticon-file-text',
          i18n: 'menu.workbench.implement.report',
          link: '/audit-work/audit-report',
          acl: [
            'EIA_PROJECT_DOCUMENT_CREATE',
            'EIA_PROJECT_DOCUMENT_UPDATE',
            'EIA_PROJECT_DOCUMENT_DELETE',
            'EIA_PROJECT_DOCUMENT_RETRIEVE',
          ],
        },
        {
          text: '审计底稿',
          icon: 'anticon-file',
          i18n: 'menu.workbench.implement.draft',
          link: '/audit-work/audit-draft',
          acl: [
            'EIA_AUDIT_DRAFT_CREATE',
            'EIA_AUDIT_DRAFT_UPDATE',
            'EIA_AUDIT_DRAFT_DELETE',
            'EIA_AUDIT_DRAFT_RETRIEVE',
          ],
        },
        {
          text: '审计整改',
          i18n: 'menu.rectify',
          icon: 'anticon-profile',
          link: '/audit-work/audit-rectify',
          acl: [
            'EIA_AUDIT_RECTIFY_RETRIEVE',
            'EIA_AUDIT_RECTIFY_CREATE',
            'EIA_AUDIT_RECTIFY_UPDATE',
            'EIA_AUDIT_RECTIFY_DELETE',
            'EIA_AUDIT_RECTIFY_SUBMIT',
            'EIA_AUDIT_RECTIFY_APPROVE',
          ],
        },
        {
          text: '后续审计跟踪',
          i18n: 'menu.follow-up.tail',
          icon: 'anticon-audit',
          link: '/audit-work/follow-up-audit',
          acl: [
            'EIA_FOLLOW_UP_AUDIT_RETRIEVE',
            'EIA_FOLLOW_UP_AUDIT_CREATE',
            'EIA_FOLLOW_UP_AUDIT_UPDATE',
            'EIA_FOLLOW_UP_AUDIT_DELETE',
          ],
          // children: [
          //   {
          //     text: '后续审计跟踪',
          //     i18n: 'menu.follow-up.tail',
          //     link: '/audit-work/follow-up-audit',
          //     // acl: [],
          //   },
          // ],
        },
        {
          text: '项目归档',
          i18n: 'menu.archive',
          icon: 'anticon-folder',
          link: '/audit-work/project-archive',
          acl: [
            'EIA_AUDIT_PROJECT_RETRIEVE',
            'EIA_AUDIT_PROJECT_CREATE',
            'EIA_AUDIT_PROJECT_UPDATE',
            'EIA_AUDIT_PROJECT_DELETE',
            'EIA_AUDIT_PROJECT_START',
            'EIA_AUDIT_PROJECT_CANCEL',
            'EIA_AUDIT_PROJECT_SUBMIT',
            'EIA_AUDIT_PROJECT_APPROVE',
            'EIA_AUDIT_PROJECT_CLOSE',
            'EIA_AUDIT_PROJECT_ARCHIVE',
          ],
        },
      ],
    },
  ],
};
