import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  date = null;
  data1 = [132, 324, 327];
  xData = ['9:00-10:00', '10:00-11:00', '11:00-12:00'];

  option1 = {
    color: ['#3398DB'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: this.xData,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        show: false,
      },
    ],
    yAxis: [
      {
        type: 'value',
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        show: false,
      },
    ],
    series: [
      {
        name: '直接访问',
        type: 'bar',
        barWidth: '40%',
        data: this.data1,
      },
    ],
  };
  constructor(private router: Router) {}
  users: any[] = [];
  rectifyIssuecolumns: STColumn[] = [
    {
      title: '排名',
      index: 'id',
      width: '100px',
    },
    {
      title: '整改部门',
      index: 'name',
      width: '10%',
    },
    {
      title: '整改问题',
      index: 'age',
      width: '20%',
    },
    {
      title: '整改反馈进度',
      index: 'age',
      width: '40%',
    },
    {
      title: '整改截止时间',
      index: 'age',
      width: '15%',
    },
    {
      title: '剩余整改天数',
      index: 'age',
      width: '15%',
    },
  ];
  rectifyProcesscolumns: STColumn[] = [
    {
      title: '序号',
      index: 'id',
      width: '50px',
    },
    {
      title: '状态',
      index: 'name',
      width: '100px',
    },
    {
      title: '移交情况',
      index: 'age',
      width: '100px',
    },
    {
      title: '问题名称',
      index: 'age',
      width: '100px',
    },
    {
      title: '整改部门',
      index: 'age',
      width: '100px',
    },
    {
      title: '整改负责人',
      index: 'age',
      width: '100px',
    },
    {
      title: '整改具体负责人',
      index: 'age',
      width: '100px',
    },
    {
      title: '整改反馈进度',
      index: '500px',
    },
    {
      title: '操作',
      render: 'operations',
      width: '150px',
    },
  ];

  Reminderscolumns: STColumn[] = [
    {
      title: '待办事项',
      index: 'name',
      width: '100%',
    },
  ];

  ngOnInit() {
    this.cards = [
      {
        icon: 'info-circle',
        value: 1,
        title: '报告总数:',
        className: 'bg-orange',
      },
      {
        icon: 'warning',
        value: 2,
        title: '问题总数:',
        className: 'bg-magenta',
      },
      {
        icon: 'check-circle',
        value: 3,
        title: '已整改:',
        className: 'bg-primary',
      },
      {
        icon: 'hourglass',
        value: 4,
        title: '整改中:',
        className: 'bg-volcano',
      },
      {
        icon: 'swap',
        value: 5,
        title: '移交纪检:',
        className: 'bg-purple',
      },
      {
        icon: 'clock-circle',
        value: 6,
        title: '未整改:',
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
  goDepartmentDraw() {
    this.router.navigate(['/audit-rectify/department-draw']);
  }
  goWorkBeach() {
    this.router.navigate(['/audit-rectify/rectify-workbeach']);
  }
  onChange(result: Date): void {
    console.log('onChange: ', result);
  }
}
