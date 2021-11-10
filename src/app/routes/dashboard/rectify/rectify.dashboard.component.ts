import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { STColumn } from '@delon/abc';
import { QueryOptions } from '@ng-mt-framework/api';
import { NzMessageService } from 'ng-zorro-antd';
import { RectifyProblemDTO } from 'src/app/components/rectify-issue/model/rectify-problem-dto';
import { RectifyIssueSplitComponent } from 'src/app/components/rectify-issue/rectify-issue-split.component';
import { RectifyProblemService } from 'src/app/components/rectify-issue/service/RectifyProblemService';
import { IssueAssignFormComponent } from './issue-assign-form/issue-assign-form.component';

@Component({
  selector: 'app-rectify-dashboard',
  templateUrl: './rectify.dashboard.component.html',
  styleUrls: ['./rectify.dashboard.component.less'],
})
export class RectifyDashboardComponent implements OnInit {
  @ViewChild('issueAssignFormComponent', { static: false })
  issueAssignFormComponent: IssueAssignFormComponent;

  @ViewChild('rectifyIssueSplitComponent', { static: false })
  rectifyIssueSplitComponent: RectifyIssueSplitComponent;

  /**
   * 树形表格
   */
  mapOfExpandedData: { [id: string]: any[] } = {};

  /**
   * 左边宽度
   */
  leftSize = 80;

  /**
   * 加载表格
   */
  loading: boolean;

  /**
   * 问题类型map
   */
  problemTypeMap: Map<string, string> = new Map<string, string>();

  /**
   * 右边宽度
   */
  rightSize = 20;

  /**
   * 分页查询参数
   */
  queryOptions: QueryOptions = {
    page: 0,
    size: 20,
    sort: 'id,desc',
  };
  /**
   * 树状表格分页参数
   */
  pageInfo = {
    pageNo: 1,
    pageSize: 20,
    totalPages: 1,
    totalRecords: 20,
  };

  /**
   * 查询参数
   */
  filter = {
    reportName: null,
    rectifyProblemName: null,
    rectifyUnitId: null,
    rectifyDepartmentId: null,
    rectifyUserId: null,
    sendStatus: [],
    transferStatus: null,
    trackStatus: null,
    startTime: null,
    endTime: null,
    dutyUserId: null,
  };

  option = {
    color: ['#8A2BE2'],
    grid: {
      left: '0',
      right: '0',
      bottom: '0',
      containLabel: false,
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255,255,255,0.7)',
      textStyle: {
        fontSize: '14px',
        color: '#666',
      },
      formatter: '{b}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{c}',
      padding: [8, 10, 8, 10],
      confine: true,
      axisPointer: {
        type: 'none',
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['2018-10-11', '2018-10-12', '2018-10-13', '2018-10-14', '2018-10-15', '2018-10-16', '2018-10-17'],
    },
    yAxis: {
      show: false,
      type: 'value',
    },
    series: [
      {
        data: [4, 3, 5, 4, 6, 8, 7],
        type: 'line',
        areaStyle: { opacity: 1 },
        showSymbol: false,
        smooth: true,
      },
    ],
  };

  data1 = [132, 324, 327, 452, 365];
  xData = ['9:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00', '13:00-14:00'];

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

  listOfMapData = [];

  /**
   * 消息
   */
  Reminderscolumns: STColumn[] = [
    {
      title: '消息',
      render: 'message',
      index: 'message',
      width: '100%',
    },
  ];

  msdData = [
    {
      name: '消息1',
      count: '99',
    },
    {
      name: '消息2',
      count: '99',
    },
    {
      name: '消息3',
      count: '99',
    },
    {
      name: '消息4',
      count: '99',
    },
    {
      name: '消息5',
      count: '99',
    },
    {
      name: '消息6',
      count: '99',
    },
    {
      name: '消息7',
      count: '99',
    },
    {
      name: '消息8',
      count: '99',
    },
    {
      name: '消息9',
      count: '99',
    },
    {
      name: '消息10',
      count: '99',
    },
    {
      name: '消息11',
      count: '99',
    },
    {
      name: '消息12',
      count: '99',
    },
    {
      name: '消息13',
      count: '99',
    },
    {
      name: '消息14',
      count: '99',
    },
    {
      name: '消息15',
      count: '99',
    },
    {
      name: '消息3',
      count: '99',
    },
    {
      name: '消息n',
      count: '99',
    },
  ];

  /**
   * 饼图数据
   */
  optionPie = null;
  loadecharts() {
    const series = [];
    this.optionPie = {
      color: ['#5470C6', '#91CC75', '#FAC858'],
      title: {},
      tooltip: {
        // trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        x: 'right',
      },
      series: [
        {
          name: '问题',
          type: 'pie',
          radius: '50%',
          // data: [
          //   { value: 0, name: '无法整改' },
          //   { value: 0, name: '正在整改' },
          //   { value: 0, name: '已完成整改' },
          // ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(90, 10, 5, 0.5)',
            },
          },
        },
      ],
    };
  }

  collapse(array: any[], data: any, $event: boolean): void {
    if ($event === false) {
      if (data.children) {
        data.children.forEach(d => {
          // tslint:disable-next-line:no-non-null-assertion
          const target = array.find(a => a.id === d.id)!;
          target.expand = false;
          this.collapse(array, target, false);
        });
      } else {
        return;
      }
    }
  }

  convertTreeToList(root: any): any[] {
    const stack: any[] = [];
    const array: any[] = [];
    const hashMap = {};
    stack.push({ ...root, level: 0, expand: false });

    while (stack.length !== 0) {
      // tslint:disable-next-line:no-non-null-assertion
      const node = stack.pop()!;
      this.visitNode(node, hashMap, array);
      if (node.children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          // tslint:disable-next-line:no-non-null-assertion
          stack.push({ ...node.children[i], level: node.level! + 1, expand: false, parent: node });
        }
      }
    }

    return array;
  }

  visitNode(node: any, hashMap: { [id: string]: boolean }, array: any[]): void {
    if (!hashMap[node.id]) {
      hashMap[node.id] = true;
      array.push(node);
    }
  }

  /**
   * 问题类型回显
   * @param id 问题类型id
   * @returns 问题类型name
   */
  convertProblemType(id: string) {
    if (id) {
      return this.problemTypeMap.get(id);
    }
  }

  constructor(
    private router: Router,
    private msg: NzMessageService,
    private rectifyProblemService: RectifyProblemService,
  ) {}

  ngOnInit(): void {
    this.load();
  }
  /**
   * 加载列表
   *
   */
  load(finish?: boolean) {
    if (finish) {
      this.filter.trackStatus = '已整改';
    } else {
      this.filter.trackStatus = '未整改,整改中';
    }
    this.loading = true;
    this.rectifyProblemService
      .findOnePage2Track(
        this.queryOptions,
        this.filter.reportName,
        this.filter.rectifyProblemName,
        this.filter.rectifyUnitId,
        this.filter.rectifyDepartmentId,
        this.filter.rectifyUserId,
        this.filter.sendStatus.toLocaleString(),
        this.filter.transferStatus,
        this.filter.trackStatus,
        this.filter.startTime,
        this.filter.endTime,
        this.filter.dutyUserId,
      )
      .subscribe(
        data => {
          if (data) {
            for (const i of data.data) {
              if (i.trackStatus === '已整改') {
                this.optionPie.series[0].data[0].value++;
              } else if (i.trackStatus === '整改中') {
                this.optionPie.series[0].data[1].value++;
              } else {
                this.optionPie.series[0].data[2].value++;
              }
            }
            this.loadecharts();
            this.listOfMapData = data.data;
            this.pageInfo.pageNo = data.pageNo + 1;
            this.pageInfo.pageSize = data.pageSize;
            this.pageInfo.totalPages = data.totalPages;
            this.pageInfo.totalRecords = Number(data.totalRecords);
            this.listOfMapData.forEach(item => {
              this.mapOfExpandedData[item.id] = this.convertTreeToList(item);
            });
          }
        },
        () => {},
        () => {
          this.loading = false;
        },
      );
  }

  /**
   * 拆分
   * @param item 整改问题数据
   */
  splitIssue(item: RectifyProblemDTO) {
    this.rectifyIssueSplitComponent.edit(item, false);
  }

  workbench() {
    this.router.navigate(['audit-rectify/rectify-workbeach'], {
      queryParams: {
        isRectify: true,
      },
    });
  }
}
