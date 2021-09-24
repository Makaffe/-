import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IssueAssignFormComponent } from './issue-assign-form/issue-assign-form.component';
export interface TreeNodeInterface {
  key: number;
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

  listOfMapData: TreeNodeInterface[] = [
    {
      key: 1,
      name: 'John Brown sr.',
      age: 60,
      address: 'New York No. 1 Lake Park',
      children: [
        {
          key: 11,
          name: 'John Brown',
          age: 42,
          address: 'New York No. 2 Lake Park',
        },
        {
          key: 12,
          name: 'John Brown jr.',
          age: 30,
          address: 'New York No. 3 Lake Park',
          children: [
            {
              key: 121,
              name: 'Jimmy Brown',
              age: 16,
              address: 'New York No. 3 Lake Park',
            },
          ],
        },
        {
          key: 13,
          name: 'Jim Green sr.',
          age: 72,
          address: 'London No. 1 Lake Park',
          children: [
            {
              key: 131,
              name: 'Jim Green',
              age: 42,
              address: 'London No. 2 Lake Park',
              children: [
                {
                  key: 1311,
                  name: 'Jim Green jr.',
                  age: 25,
                  address: 'London No. 3 Lake Park',
                },
                {
                  key: 1312,
                  name: 'Jimmy Green sr.',
                  age: 18,
                  address: 'London No. 4 Lake Park',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      key: 2,
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ];

  mapOfExpandedData: { [key: string]: TreeNodeInterface[] } = {};

  collapse(array: TreeNodeInterface[], data: TreeNodeInterface, $event: boolean): void {
    if ($event === false) {
      if (data.children) {
        data.children.forEach(d => {
          const target = array.find(a => a.key === d.key)!;
          target.expand = false;
          this.collapse(array, target, false);
        });
      } else {
        return;
      }
    }
  }

  convertTreeToList(root: TreeNodeInterface): TreeNodeInterface[] {
    const stack: TreeNodeInterface[] = [];
    const array: TreeNodeInterface[] = [];
    const hashMap = {};
    stack.push({ ...root, level: 0, expand: false });

    while (stack.length !== 0) {
      const node = stack.pop()!;
      this.visitNode(node, hashMap, array);
      if (node.children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          stack.push({ ...node.children[i], level: node.level! + 1, expand: false, parent: node });
        }
      }
    }

    return array;
  }

  visitNode(node: TreeNodeInterface, hashMap: { [key: string]: boolean }, array: TreeNodeInterface[]): void {
    if (!hashMap[node.key]) {
      hashMap[node.key] = true;
      array.push(node);
    }
  }

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.listOfMapData.forEach(item => {
      this.mapOfExpandedData[item.key] = this.convertTreeToList(item);
    });
  }

  assignIssue() {
    this.issueAssignFormComponent.show();
  }

  workbench() {
    this.router.navigate(['audit-rectify/rectify-workbeach'], {});
  }
}
