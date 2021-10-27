import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rectify-time-line',
  templateUrl: './rectify-time-line.component.html',
  styles: [
    `
      :host ::ng-deep .ant-collapse > .ant-collapse-item {
        border-bottom: none;
      }
    `,
  ],
})
export class RectifyTimeLineComponent implements OnInit {
  panels = [
    {
      title: '报告1 2015-08-02',
      key: '100',
      author: 'NG ZORRO',
      objectType: '11111',
      active: false,
      disabled: false,
      timeLines: [
        {
          title: '审计人员：问题下发 2015-09-01',
          key: '1000',
          author: 'NG ZORRO',
          objectType: '1',
          active: false,
          disabled: false,
        },
        {
          title: '审计人员：整改通知书OA发送 2015-09-01',
          key: '1001',
          author: 'NG ZORRO',
          objectType: '2',
          active: false,
          disabled: false,
        },
        {
          title: '张三：提交整改措施 2015-09-01',
          key: '1002',
          author: 'NG ZORRO',
          objectType: '3',
          active: false,
          disabled: false,
        },
        {
          title: '审计人员：回复张三2015-09-01',
          key: '1003',
          author: 'NG ZORRO',
          objectType: '4',
          active: false,
          disabled: false,
        },
      ],
    },
    {
      title: '报告XXX2 2015-08-02',
      key: '200',
      author: 'NG ZORRO',
      objectType: '11111',
      active: false,
      disabled: false,
      children: [
        {
          title: '报告XXX2 2015-08-02',
          key: '210',
          author: 'NG ZORRO',
          objectType: '11111',
          active: false,
          disabled: false,
          timeLines: [
            {
              title: '审计人员：问题下发 2015-09-01',
              key: '2100',
              author: 'NG ZORRO',
              objectType: '1',
            },
            {
              title: '审计人员：整改通知书OA发送 2015-09-01',
              key: '2001',
              author: 'NG ZORRO',
              objectType: '2',
            },
            {
              title: '张三：提交整改措施 2015-09-01',
              key: '2102',
              author: 'NG ZORRO',
              objectType: '3',
            },
            {
              title: '审计人员：回复张三2015-09-01',
              key: '2103',
              author: 'NG ZORRO',
              objectType: '4',
            },
          ],
        },
      ],
    },
  ];

  ngOnInit(): void {}

  ActiveChange() {}
}
