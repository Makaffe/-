import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { STColumn } from '@delon/abc';
import { RectifyProblemDTO } from 'src/app/components/rectify-issue/model/rectify-problem-dto';
import { RectifyIssueSplitComponent } from 'src/app/components/rectify-issue/rectify-issue-split.component';
import { IssueAssignFormComponent } from './issue-assign-form/issue-assign-form.component';
export interface TreeNodeInterface {
  id: number;
  name: string;
  age?: number;
  level?: number;
  expand?: boolean;
  address?: string;
  children?: TreeNodeInterface[];
  parent?: TreeNodeInterface;
}
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
   * 左边宽度
   */
  leftSize = 80;

  /**
   * 右边宽度
   */
  rightSize = 20;

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

  listOfMapData = [
    {
      id: '1',
      status: '整改中',
      transferStatus: '未移交',
      problemSources: '外部审计',
      name: '餐饮费用超过规定标准',
      type: '',
      principal: '李明',
      specific: '王力',
      rectifyMeasureCount: 1,
      rectifyMeasureCountComplete: 1,
      rectifyEndTime: '2021-12-13',
      lastModifiedTime: '2021-12-10',
      residueDayNum: '3',
      feedbackResidueDayNum: '1',
      children: [
        {
          id: '2',
          status: '整改中',
          transferStatus: '未移交',
          problemSources: '外部审计',
          name: '餐饮费用超过规定标准子问题',
          type: '',
          principal: '王力',
          specific: '刘汉',
          rectifyMeasureCount: 1,
          rectifyMeasureCountComplete: 1,
          rectifyEndTime: '2021-12-13',
          lastModifiedTime: '2021-12-10',
          residueDayNum: '3',
          feedbackResidueDayNum: '1',
        },
      ],
    },
  ];

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
  optionPie = {
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
        data: [
          { value: 44, name: '无法整改' },
          { value: 18, name: '正在整改' },
          { value: 6, name: '已完成整改' },
        ],
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

  mapOfExpandedData: { [id: string]: any[] } = {};

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

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.listOfMapData.forEach(item => {
      this.mapOfExpandedData[item.id] = this.convertTreeToList(item);
    });
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
