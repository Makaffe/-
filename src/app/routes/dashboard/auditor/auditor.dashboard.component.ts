import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { STColumn, STColumnTag } from '@delon/abc';

const TAG: STColumnTag = {
  'name 1': { text: '未开始', color: 'grey' },
  'name 2': { text: '整改中', color: '#008CEC' },
  'name 3': { text: '整改完成', color: '#F76A00' },
  'name 4': { text: '无法整改', color: '#A4A4A4' },
};
const situationTAG: STColumnTag = {
  'name 1': { text: '未移交', color: '#D9001B' },
  'name 2': { text: '已移交', color: 'green' },
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

  pageInfo = {
    pageNo: 1,
    pageSize: 20,
    totalPages: 1,
    totalRecords: 20,
  };

  option1 = null;

  constructor(private router: Router) {}

  msdData: any[] = [];

  rectifyIssuecolumns: STColumn[] = [
    {
      title: '排名',
      index: 'id',
      width: '50px',
    },
    {
      title: '审计报告',
      index: 'name',
      width: '10%',
    },
    {
      title: '整改部门',
      index: 'name',
      width: '10%',
    },
    {
      title: '整改单位',
      index: 'name',
      width: '10%',
    },
    {
      title: '整改问题名称',
      index: 'age',
      width: '20%',
    },
    {
      title: '整改反馈进度',
      index: 'age',
      render: 'process',
      width: '20%',
    },
    {
      title: '整改截止时间',
      index: 'age',
      width: '10%',
    },
    {
      title: '剩余整改天数',
      index: 'age',
      width: '10%',
    },
  ];

  rectifyProcesscolumns: STColumn[] = [
    {
      title: '序号',
      index: 'id',
      width: '50px',
    },
    {
      title: '下发状态',
      index: 'name',
      width: '80px',
      render: 'status',
      className: 'text-center',
      type: 'tag',
      tag: TAG,
    },
    {
      title: '移交情况',
      index: 'name',
      width: '80px',
      render: 'situation',
      className: 'text-center',
      type: 'tag',
      tag: situationTAG,
    },
    {
      title: '是否逾期',
      index: 'age',
      width: '80px',
    },
    {
      title: '是否延期',
      index: 'age',
      width: '80px',
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
      width: '100px',
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
    // 柱体颜色数组
    const colorList = ['#4572A7', '#AA4643', '#89A54E', '#71588F', '#4198AF', '#DB843D', '#93A9CF'];
    this.cards = [
      {
        icon: 'info-circle',
        value: 1,
        title: '报告总数:3',
        className: 'bg-primary',
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
        className: 'bg-red ',
      },
    ];
    this.msdData = [
      {
        name: '待办事项1',
        count: 10,
      },
      {
        name: '待办事项2',
        count: 5,
      },
      {
        name: '待办事项3',
        count: 15,
      },
      {
        name: '待办事项4',
        count: 1,
      },
      {
        name: '待办事项5',
        count: 3,
      },
      {
        name: '待办事项6',
        count: 8,
      },
      {
        name: '待办事项7',
        count: 108,
      },
    ];

    this.option1 = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        // left: '3%',
        // right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        name: '个数',
        type: 'value',
        boundaryGap: [0, 0.01],
      },
      yAxis: {
        type: 'category',
        data: ['跟进中整改问题', '已下发整改问题', '已完成整改问题', '已回复整改反馈', '已完成整改报告'],
      },
      series: [
        {
          name: '',
          type: 'bar',
          data: [5, 5, 3, 4, 3],
          itemStyle: {
            color(params) {
              return colorList[params.dataIndex % colorList.length];
            },
          },
        },
      ],
    };
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

  onChartClick(event: any) {}
}
