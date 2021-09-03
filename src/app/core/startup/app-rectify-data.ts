export const APP_RECTIFY_DATA = {
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
          text: '审计整改测试',
          i18n: 'audit-recitfy-test',
          icon: 'anticon-windows',
          // acl: [],
          children: [
            {
              text: '测试组件',
              link: '/audit-rectify/home',
              i18n: '',
              // acl: [],
            }
          ],
        },
      ],
    },
  ],
};
