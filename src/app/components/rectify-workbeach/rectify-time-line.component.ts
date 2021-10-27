import { Component, OnInit, ViewChild } from '@angular/core';
import { NzCollapseComponent } from 'ng-zorro-antd';

@Component({
  selector: 'app-rectify-time-line',
  templateUrl: './rectify-time-line.component.html',
  styles: [
    `
      :host ::ng-deep .ant-collapse > .ant-collapse-item {
        border-bottom: none;
      }

      .select-item {
        background: #acd6ff;
      }
      :host ::ng-deep .ant-collapse > .ant-collapse-item {
        border-bottom: none;
      }

      :host ::ng-deep .ant-timeline-item-last > .ant-timeline-item-content {
        min-height: 0;
      }

      :host ::ng-deep .ant-collapse-content > .ant-collapse-content-box {
        padding-bottom: 0px;
      }

      :host ::ng-deep .ant-collapse > .ant-collapse-item > .ant-collapse-header {
        padding: 4px 16px 4px 40px;
      }

      :host ::ng-deep .ant-timeline-item {
        padding: 0 0 10px !important;
      }
    `,
  ],
})
export class RectifyTimeLineComponent implements OnInit {
  @ViewChild('abcde', { static: false })
  abcde: NzCollapseComponent;
  clickKey = null;
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
      children: [],
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

  ActiveChange(value: any) {
    this.clickKey = value.key;
    console.log(value);
  }

  // 时间轴颜色
  lineColor(objectType: string) {
    if (objectType === '1') {
      return 'green';
    } else if (objectType === '2') {
      return 'red';
    } else if (objectType === '3') {
      return 'gray';
    } else if (objectType === '4') {
      return 'red';
    }
  }
}
