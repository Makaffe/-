import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { STColumn, STColumnTag } from '@delon/abc';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

const TAG: STColumnTag = {
  'name 1': { text: '未开始', color: 'grey' },
  'name 2': { text: '整改中', color: '#008CEC' },
  'name 3': { text: '已逾期', color: '#F76A00' },
};
const situationTAG: STColumnTag = {
  21: { text: '未移交', color: '#D9001B' },
  27: { text: '已移交', color: 'green' },
};
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
      render: 'process',
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
      render: 'status',
      className: 'text-center',
      type: 'tag',
      tag: TAG,
    },
    {
      title: '移交情况',
      index: 'age',
      width: '100px',
      render: 'situation',
      className: 'text-center',
      type: 'tag',
      tag: situationTAG,
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
      width: '130px',
    },
    {
      title: '整改反馈进度',
      index: '500px',
      render: 'process',
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
      render: 'remain',
      index: 'name',
      width: '100%',
    },
  ];

  ngOnInit() {
    this.cards = [
      {
        icon: 'info-circle',
        value: 1,
        title: '报告总数:3',
        className: 'bg-orange',
      },
      {
        icon: 'warning',
        value: 2,
        title: '问题总数:3',
        className: 'bg-magenta',
      },
      {
        icon: 'check-circle',
        value: 3,
        title: '已整改:3',
        className: 'bg-success',
      },
      {
        icon: 'hourglass',
        value: 4,
        title: '整改中:3',
        className: 'bg-volcano',
      },
      {
        icon: 'swap',
        value: 5,
        title: '移交纪检:3',
        className: 'bg-purple',
      },
      {
        icon: 'clock-circle',
        value: 6,
        title: '未整改:3',
        className: 'bg-primary',
      },
    ];
    of(
      Array(100)
        .fill({})
        // tslint:disable-next-line:variable-name
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
