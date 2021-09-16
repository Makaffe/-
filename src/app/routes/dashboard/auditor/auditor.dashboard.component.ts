import { Component, OnInit } from '@angular/core';
import { STColumn } from '@delon/abc';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-auditor-dashboard',
  templateUrl: './auditor.dashboard.component.html',
  styleUrls: ['./auditor.dashboard.component.less'],
})
export class AuditorDashboardComponent implements OnInit {
  cards: Array<{
    icon: string;
    value: number;
    title: string;
    className: string;
  }> = [];
  constructor() {}
  users: any[] = [];
  columns: STColumn[] = [
    {
      title: '编号',
      index: 'id',
      type: 'checkbox',
      selections: [
        {
          text: '小于25岁',
          select: data => data.forEach(item => (item.checked = item.age < 25)),
        },
        {
          text: '大于25岁',
          select: data => data.forEach(item => (item.checked = item.age >= 25)),
        },
      ],
    },
    {
      title: '姓名',
      index: 'name',
      sort: {
        compare: (a, b) => a.name.length - b.name.length,
      },
      filter: {
        type: 'keyword',
        fn: (filter, record) => !filter.value || record.name.indexOf(filter.value) !== -1,
      },
    },
    {
      title: '年龄',
      index: 'age',
      sort: {
        compare: (a, b) => a.age - b.age,
      },
      filter: {
        menus: [{ text: '20岁以下', value: [0, 20] }, { text: '20-25岁', value: [20, 25] }, { text: '25岁以上', value: [25, 100] }],
        fn: (filter, record) => record.age >= filter.value[0] && record.age <= filter.value[1],
        multiple: false,
      },
    },
    {
      title: '状态',
      type: 'badge',
      index: 'status',
      badge: {
        1: { text: 'Success', color: 'success' },
        2: { text: 'Error', color: 'error' },
        3: { text: 'Processing', color: 'processing' },
        4: { text: 'Default', color: 'default' },
        5: { text: 'Warning', color: 'warning' },
      },
    },
  ];
  ngOnInit() {
    this.cards = [
      {
        icon: 'audit',
        value: 1,
        title: '审计类型',
        className: 'bg-orange',
      },
      {
        icon: 'project',
        value: 2,
        title: '项目',
        className: 'bg-magenta',
      },
      {
        icon: 'bank',
        value: 3,
        title: '被审计单位',
        className: 'bg-primary',
      },
      {
        icon: 'exclamation-circle',
        value: 4,
        title: '发现问题类型',
        className: 'bg-volcano',
      },
      {
        icon: 'exception',
        value: 5,
        title: '发现问题',
        className: 'bg-purple',
      },
      {
        icon: 'file-done',
        value: 6,
        title: '已整改',
        className: 'bg-success',
      },
    ];
    of(
      Array(100)
        .fill({})
        .map((_item: any, idx: number) => {
          return {
            id: idx + 1,
            name: `name ${idx + 1}`,
            age: Math.ceil(Math.random() * 10) + 20,
            status: Math.floor(Math.random() * 5) + 1,
          };
        }),
    )
      .pipe(delay(500))
      .subscribe(res => (this.users = res));
  }
  
}
