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
  messages: any[] = [
    {
      name: '消息1',
      count: '99'
    },
    {
      name: '消息2',
      count: '99'
    },
    {
      name: '消息3',
      count: '99'
    },
    {
      name: '消息4',
      count: '99'
    },
    {
      name: '消息1',
      count: '99'
    },
    {
      name: '消息2',
      count: '99'
    },
    {
      name: '消息3',
      count: '99'
    },
    {
      name: '消息4',
      count: '99'
    },
    {
      name: '消息1',
      count: '99'
    },
    {
      name: '消息2',
      count: '99'
    },
    {
      name: '消息3',
      count: '99'
    },
    {
      name: '消息4',
      count: '99'
    },
    {
      name: '消息4',
      count: '99'
    },
    {
      name: '消息1',
      count: '99'
    },
    {
      name: '消息2',
      count: '99'
    },
    {
      name: '消息3',
      count: '99'
    },
    {
      name: '消息n',
      count: '99'
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
    position: 'right'
  };

  option = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      left: 'center',
      data: ['未处理', '已逾期', '整改中', '问题总数']
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
          { value: 10, name: '问题总数' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  ngOnInit(): void {
  }

}
