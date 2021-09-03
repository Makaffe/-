import { link } from 'fs';

export const APP_SYSTEM_DATA = {
  app: {
    name: 'MIAS',
    description: 'Matech Investment Auditing System',
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
          link: '/sys-dashboard',
          i18n: 'menu.dashboard',
          icon: 'anticon-dashboard',
        },
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
          icon: 'anticon-bars',
          link: '/security/logs',
          i18n: 'menu.security.logs',
          // acl: ['LOG_RETRIEVE'],
        },

      ],
    },
  ],
};
