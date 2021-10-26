export const APP_DATA = {
  app: {
    name: 'Matech',
    description: '审计整改前端框架',
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
          link: '/audit-rectify/auditor-dashboard',
          i18n: 'menu.dashboard',
          icon: 'anticon-dashboard',
        },
        {
          text: '审计报告',
          // i18n: 'audit-recitfy-test',
          icon: 'anticon-edit',
          // acl: [],
          children: [
            {
              text: '审计报告管理',
              link: '/audit-rectify/audit-post',
              i18n: '',
              // acl: [],
            },
          ],
        },
        {
          text: '审计整改',
          // i18n: 'audit-recitfy-test',
          icon: 'anticon-line-chart',
          // acl: [],
          children: [
            {
              text: '整改问题清单',
              link: '/audit-rectify/rectify-issue',
              i18n: '',
              // acl: [],
            },
            {
              text: '整改跟踪台账',
              link: '/audit-rectify/rectify-track',
              i18n: '',
              // acl: [],
            },
            {
              text: '整改汇报',
              link: '/audit-rectify/rectify-post',
              i18n: '',
              // acl: [],
            },
          ],
        },
        {
          text: '文档模板',
          // i18n: 'audit-recitfy-test',
          icon: 'anticon-file-text',
          // acl: [],
          children: [
            {
              text: 'OA发文模板',
              link: '/audit-rectify/oa-template',
              i18n: '',
              // acl: [],
            },
            {
              text: '文书模板',
              link: '',
              i18n: '',
              children: [
                {
                  text: '模板管理',
                  // i18n: '',
                  icon: 'anticon-file-excel',
                  link: '/audit-rectify/template-info',
                  // acl: [],
                },
                {
                  text: '报告管理',
                  // i18n: '',
                  icon: 'anticon-file-excel',
                  link: '/audit-rectify/report-info',
                  // acl: [],
                },
              ],
              // acl: [],
            },
            {
              text: '建议模板',
              link: '/audit-rectify/advice-template',
              i18n: '',
              // acl: [],
            },
          ],
        },
        {
          text: '统计分析',
          // i18n: 'audit-recitfy-test',
          icon: 'anticon-bar-chart',
          // acl: [],
          children: [
            {
              text: '审计问题',
              link: '/audit-rectify/audit-issue-analysis',
              i18n: '',
              // acl: [],
            },
            {
              text: '整改成果',
              link: '/audit-rectify/rectify-result-analysis',
              i18n: '',
              // acl: [],
            },
          ],
        },
        {
          text: '系统管理',
          // i18n: 'audit-recitfy-test',
          icon: 'anticon-setting',
          // acl: [],
          children: [
            {
              text: '组织管理',
              i18n: 'menu.organization',
              icon: 'anticon-apartment',
              acl: [
                'UNIT_CREATE',
                'UNIT_UPDATE',
                'UNIT_DELETE',
                'DEPARTMENT_CREATE',
                'DEPARTMENT_UPDATE',
                'DEPARTMENT_DELETE',
                'POSITION_CREATE',
                'POSITION_UPDATE',
                'POSITION_DELETE',
                'EMPLOYEE_CREATE',
                'EMPLOYEE_UPDATE',
                'EMPLOYEE_DELETE',
              ],
              children: [
                {
                  text: '单位管理',
                  link: '/organization/units',
                  i18n: 'menu.organization.unit',
                  acl: ['UNIT_CREATE', 'UNIT_UPDATE', 'UNIT_DELETE'],
                },
                {
                  text: '部门管理',
                  link: '/organization/department',
                  i18n: 'menu.organization.department',
                  acl: ['DEPARTMENT_CREATE', 'DEPARTMENT_UPDATE', 'DEPARTMENT_DELETE'],
                },
                {
                  text: '岗位管理',
                  link: '/organization/position',
                  i18n: 'menu.organization.position',
                  acl: ['POSITION_CREATE', 'POSITION_UPDATE', 'POSITION_DELETE'],
                },
                {
                  text: '员工管理',
                  link: '/organization/employees',
                  i18n: 'menu.organization.employe',
                  acl: ['EMPLOYEE_CREATE', 'EMPLOYEE_UPDATE', 'EMPLOYEE_DELETE'],
                },
              ],
            },
            {
              text: '权限管理',
              i18n: 'menu.security',
              icon: 'anticon-safety',
              // acl: [
              //   'AUTHORITY_CREATE',
              //   'AUTHORITY_UPDATE',
              //   'AUTHORITY_DELETE',
              //   'ROLE_CREATE',
              //   'ROLE_UPDATE',
              //   'ROLE_DELETE',
              //   'USER_CREATE',
              //   'USER_UPDATE',
              //   'USER_DELETE',
              // ],
              children: [
                {
                  text: '角色管理',
                  link: '/security/roles',
                  i18n: 'menu.security.roles',
                  // acl: ['ROLE_CREATE', 'ROLE_UPDATE', 'ROLE_DELETE'],
                },
                {
                  text: '用户管理',
                  link: '/security/users',
                  i18n: 'menu.security.users',
                  // acl: ['USER_CREATE', 'USER_UPDATE', 'USER_DELETE'],
                },
              ],
            },
            {
              text: '基础数据',
              i18n: 'menu.base-data',
              icon: 'anticon-database',
              children: [
                {
                  text: '全局参数管理',
                  link: '/base-data/configurations',
                  i18n: 'menu.base-data.configurations',
                  // acl: ['CONFIGURATION_CREATE', 'CONFIGURATION_UPDATE', 'CONFIGURATION_DELETE'],
                },
                {
                  text: '字典管理',
                  link: '/base-data/dictionaries',
                  i18n: 'menu.base-data.dictionaries',
                  // acl: [
                  //   'DICTIONARY_CREATE',
                  //   'DICTIONARY_UPDATE',
                  //   'DICTIONARY_DELETE',
                  //   'DICTIONARY_VALUE_CREATE',
                  //   'DICTIONARY_VALUE_UPDATE',
                  //   'DICTIONARY_VALUE_DELETE',
                  // ],
                },
                {
                  text: '地区管理',
                  link: '/base-data/districts',
                  i18n: 'menu.base.data.district',
                  // acl: ['DISTRICT_CREATE', 'DISTRICT_UPDATE', 'DISTRICT_DELETE'],
                },
                {
                  text: '菜单管理',
                  link: '/base-data/menus',
                  i18n: 'menu.menu.management',
                  // acl: ['CONFIGURATION_CREATE', 'CONFIGURATION_UPDATE', 'CONFIGURATION_DELETE'],
                },
              ],
            },
            {
              text: '公告管理',
              i18n: 'menu.notice',
              icon: 'anticon-bell',
              acl: ['NOTICE_CREATE', 'NOTICE_UPDATE', 'NOTICE_DELETE'],
              children: [
                {
                  text: '公告管理',
                  link: '/notice/management',
                  i18n: 'menu.notice.management',
                  acl: ['NOTICE_CREATE', 'NOTICE_UPDATE', 'NOTICE_DELETE'],
                },
              ],
            },
            {
              text: '系统日志',
              icon: 'anticon-bug',
              i18n: 'menu.security.logs',
              // acl: ['LOG_RETRIEVE'],
              children: [
                {
                  text: '系统日志',
                  link: '/security/logs',
                  i18n: '',
                  acl: ['NOTICE_CREATE', 'NOTICE_UPDATE', 'NOTICE_DELETE'],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
