import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STPage } from '@delon/abc';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { SuperviseProcessFormComponent } from './supervise-process-form/supervise-process-form.component';

@Component({
  selector: 'app-supervise-dashboard',
  templateUrl: './supervise.dashboard.component.html',
  styles: [``],
})
export class SuperviseDashboardComponent implements OnInit {
  page: STPage = {
    front: false,
    show: false,
  };
  value1 = '5';
  value2 = '10';
  value3 = '5';
  value4 = '2';

  messages: any[] = [
    {
      name: '消息1',
      count: '2',
    },
    {
      name: '消息2',
      count: '4',
    },
    {
      name: '消息3',
      count: '2',
    },
    {
      name: '消息4',
      count: '1',
    },
    {
      name: '消息1',
      count: '4',
    },
    {
      name: '消息2',
      count: '5',
    },
    {
      name: '消息3',
      count: '2',
    },
    {
      name: '消息4',
      count: '0',
    },
    {
      name: '消息1',
      count: '1',
    },
    {
      name: '消息2',
      count: '3',
    },
    {
      name: '消息3',
      count: '1',
    },
    {
      name: '消息4',
      count: '2',
    },
    {
      name: '消息4',
      count: '3',
    },
    {
      name: '消息1',
      count: '4',
    },
    {
      name: '消息2',
      count: '5',
    },
    {
      name: '消息3',
      count: '6',
    },
    {
      name: '消息n',
      count: '2',
    },
  ];

  Reminderscolumns: STColumn[] = [
    {
      title: '消息通知',
      render: 'name',
      width: '100%',
    },
  ];

  labelRight = {
    position: 'right',
  };

  option = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    legend: {
      left: 'center',
      data: ['未处理', '已逾期', '整改中', '问题总数'],
    },
    series: [
      {
        name: '问题统计',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: [
          { value: 3, name: '未处理' },
          { value: 2, name: '已逾期' },
          { value: 5, name: '整改中' },
          { value: 10, name: '问题总数' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };
  format1 = (percent: string): string => this.value1;
  format2 = (percent: string): string => this.value2;
  format3 = (percent: string): string => this.value3;
  format4 = (percent: string): string => this.value4;

  ngOnInit(): void {}
}
