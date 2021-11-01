import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { STColumn, STPage } from '@delon/abc';
import { ECharts } from 'echarts';
import { StatisticsAnalysisDeatilComponent } from '../statistics-analysis-detail.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'statistics-analysis-rectify-department',
  templateUrl: './statistics-analysis-rectify-department.component.html',
  styles: [` :host ::ng-deep .ant-card-extra{
    padding: 0;
  }`]
})
export class StatisticsAnalysisRectifyDepartmentComponent implements OnInit {
  @ViewChild('statisticsAnalysisDeatilComponent', { static: false })
  statisticsAnalysisDeatilComponent: StatisticsAnalysisDeatilComponent;
  page: STPage = {
    show: false,
  };

  tableData = [
    {
      id: '1',
      departmentName: '部门一',
      amount: 10,
    },
    {
      id: '2',
      departmentName: '部门二',
      amount: 9,
    },
    {
      id: '3',
      departmentName: '部门三',
      amount: 8,
    },
    {
      id: '4',
      departmentName: '部门四',
      amount: 7,
    },
    {
      id: '5',
      departmentName: '部门五',
      amount: 6,
    },
    {
      id: '6',
      departmentName: '部门六',
      amount: 5,
    },
    {
      id: '7',
      departmentName: '部门七',
      amount: 4,
    },
    {
      id: '8',
      departmentName: '部门八',
      amount: 3,
    },
    {
      id: '9',
      departmentName: '部门九',
      amount: 2,
    },
    {
      id: '10',
      departmentName: '部门十',
      amount: 1,
    }
  ];

  columns: STColumn[] = [
    { title: '排名', width: '50px', render: 'number', className: 'text-center' },
    {
      title: '部门名称',
      index: 'departmentName',
      width: '60%',
    },
    {
      title: '多发问题数量',
      index: 'amount',
      className: 'text-right',
      width: '30%',
    },
  ];

  listOfData = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ];
  option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    legend: {
      // selectedMode: false, // 取消图例上的点击事件
      x: 'right', // 右对齐
      padding: [10, 40, 0, 0],
      data: ['已整改', '整改中', '无法整改'],
    },
    grid: {
      // left: '5px',
      // right: '4%',
      bottom: '45px',
      containLabel: true,
    },
    xAxis: [
      {
        name: '部门',
        type: 'category',
        triggerEvent: 'true',
        data: ['部门一', '部门二', '部门三', '部门四', '部门五', '部门六', '部门七'],
      },
    ],
    yAxis: [
      {
        name: '整改问题数（单位：个）',
        type: 'value',
        axisLabel: {
          formatter: '{value}',
        },
      },
    ],
    // dataZoom: [
    //   {
    //     xAxisIndex: [0],
    //     // tslint:disable-next-line:max-line-length
    //     handleIcon:
    //       // tslint:disable-next-line:max-line-length
    // tslint:disable-next-line:max-line-length
    //       'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
    //   },
    // ],
    series: [
      {
        name: '已整改',
        type: 'bar',
        stack: '饱和度',
        color: '#98d87d',
        data: [30, 18, 11, 23, 29, 33, 30],
      },
      {
        name: '整改中',
        type: 'bar',
        stack: '饱和度',
        color: '#49a9ee',
        data: [20, 18, 19, 23, 29, 33, 31],
      },
      {
        name: '无法整改',
        type: 'bar',
        stack: '饱和度',
        color: '#ffd86e',
        barMaxWidth: 50, // 柱子的宽度
        data: [21, 11, 23, 15, 30, 23, 10],
      },
    ],
  };
  option1 = {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      selectedMode: false, // 取消图例上的点击事件
      type: 'scroll',
      orient: 'horizontal',
      // right: 0,
      width: '90%',
      height: '100',
      data: ['部门一', '部门二', '部门三', '部门四', '部门五']
    },
    grid: {
      // left: '3%',
      // right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      name: '年份',
      type: 'category',
      boundaryGap: false,
      data: ['2017', '2018', '2019', '2020', '2021'],
    },
    yAxis: {
      name: '问题数量（单位：个）',
      type: 'value',
      // boundaryGap: [0, '100%'],
    },
    series: [
      {
        name: '部门一',
        type: 'line',
        stack: 'Total',
        data: [120, 132, 101, 134, 90],
      },
      {
        name: '部门二',
        type: 'line',
        stack: 'Total',
        data: [220, 182, 191, 234, 290],
      },
      {
        name: '部门三',
        type: 'line',
        stack: 'Total',
        data: [150, 232, 201, 154, 190],
      },
      {
        name: '部门四',
        type: 'line',
        stack: 'Total',
        data: [320, 332, 301, 334, 390],
      },
      {
        name: '部门五',
        type: 'line',
        stack: 'Total',
        data: [820, 932, 901, 934, 6290],
      },
    ],
  };
  option2 = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    xAxis: {
      name: '部门',
      type: 'category',
      triggerEvent: 'true',
      data: ['部门一', '部门二', '部门三', '部门四', '部门五', '部门六', '部门七']
    },
    yAxis: {
      name: '涉及金额（单位：元）',
      type: 'value'
    },
    series: [{
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      barWidth: '50'
    }]
  };

  constructor(private router: Router) { }

  ngOnInit() { }

  /**
   * 部门整改情况图表 y轴名称点击事件
   */
  departmentSituation($event) {
    if ($event.componentType === 'xAxis') {
      this.router.navigate(['/audit-rectify/department-draw']);
    } else if ($event.componentType === 'series') {
      this.statisticsAnalysisDeatilComponent.showModal();
    }

  }

  /**
   * 部门整改问题涉及金额图表 y轴名称点击事件
   */
  departmentFigure($event) {
    if ($event.componentType === 'xAxis') {
      this.router.navigate(['/audit-rectify/department-draw']);
    } else if ($event.componentType === 'series') {
      this.statisticsAnalysisDeatilComponent.showModal();
    }
  }

  /**
   * 部门问题数量 legend点击事件
   */
  departmentProblemNumber($event) {
  }

  /**
   * ３年多发问题数量部门排行TOP10  表格事件
   */
  change($event) {
    // 双击事件
    if ($event.type === 'dblClick') {
      this.statisticsAnalysisDeatilComponent.showModal();
    }

    if ($event.type === 'click') {
      this.statisticsAnalysisDeatilComponent.showModal();
    }
  }
}
