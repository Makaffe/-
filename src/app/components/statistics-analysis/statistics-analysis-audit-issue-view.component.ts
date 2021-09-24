import { Component, OnInit } from '@angular/core';
import { STColumn } from '@delon/abc';

@Component({
  selector: 'app-statistics-analysis-audit-issue-view',
  templateUrl: './statistics-analysis-audit-issue-view.component.html',
  styles: [],
})
export class StatisticsAnalysisAuditIssueViewComponent implements OnInit {
  tableData = [
    {
      a: '部门一',
      b: 'xxx',
      c: 'xxx',
    },
  ];

  columns: STColumn[] = [
    { title: '排名', width: '50px', render: 'number', className: 'text-center' },
    {
      title: '部门',
      index: 'a',
      width: '30%',
    },
    {
      title: '问题占比',
      index: 'b',
      width: '40%',
    },
    {
      title: '问题增长率',
      index: 'c',
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
      formatter(params) {
        // 自动提示工具
        let params0Value = params[0].value + '%';
        const params1Value = params[0].value + '%';
        const params2Value = params[0].value + '%';
        if (params[0].value <= 0) {
          params0Value = params[0].value;
        }
        if (params[1].value <= 0) {
          params0Value = params[1].value;
        }
        if (params[2].value <= 0) {
          params0Value = params[2].value;
        }
        // tslint:disable-next-line:max-line-length
        return (
          params[0].axisValue +
          '<br />' +
          params[0].marker +
          '初始量：' +
          params0Value +
          '<br />' +
          params[1].marker +
          '已确认量：' +
          params1Value +
          '<br />' +
          params[2].marker +
          '草稿/待确认：' +
          params2Value
        );
      },
    },
    legend: {
      selectedMode: false, // 取消图例上的点击事件
      data: ['已逾期', '已整改', '整改中', '未整改'],
    },
    grid: {
      left: '5px',
      right: '4%',
      bottom: '45px',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: ['部门一', '部门二', '部门三', '部门四', '部门五', '部门六', '部门七'],
      },
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          formatter: '{value}%',
        },
      },
    ],
    dataZoom: [
      {
        xAxisIndex: [0],
        // tslint:disable-next-line:max-line-length
        handleIcon:
          // tslint:disable-next-line:max-line-length
          'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
      },
    ],
    series: [
      {
        name: '整改中',
        type: 'bar',
        stack: '饱和度',
        color: '#98d87d',
        data: [30, 18, 11, 23, 29, 33, 30],
      },
      {
        name: '已整改',
        type: 'bar',
        stack: '饱和度',
        color: '#49a9ee',
        data: [20, 18, 19, 23, 29, 33, 31],
      },
      {
        name: '未整改',
        type: 'bar',
        stack: '饱和度',
        color: '#ffd86e',
        barMaxWidth: 30, // 柱子的宽度
        data: [21, 11, 23, 15, 30, 23, 10],
      },
      {
        name: '已逾期',
        type: 'bar',
        stack: '饱和度',
        color: '#d9001b',
        data: [10, 13, 11, 13, 30, 23, 21],
      },
    ],
  };
  option01 = {
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['问题类型1', '问题类型2', '问题类型3', '问题类型4', '问题类型5', '问题类型6', '问题类型7'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '部门1',
        type: 'line',
        stack: 'Total',
        data: [120, 132, 101, 134, 90, 230, 210],
      },
      {
        name: '部门2',
        type: 'line',
        stack: 'Total',
        data: [220, 182, 191, 234, 290, 330, 310],
      },
      {
        name: '部门3',
        type: 'line',
        stack: 'Total',
        data: [150, 232, 201, 154, 190, 330, 410],
      },
      {
        name: '部门4',
        type: 'line',
        stack: 'Total',
        data: [320, 332, 301, 334, 390, 330, 320],
      },
      {
        name: '部门5',
        type: 'line',
        stack: 'Total',
        data: [820, 932, 901, 934, 1290, 1330, 1320],
      },
    ],
  };
  option02 = {
    legend: {
      data: ['未发函', '未处分', '已发函', '已处分'],
    },
    radar: {
      // shape: 'circle',
      indicator: [{ name: '部门一' }, { name: '部门二' }, { name: '部门三' }, { name: '部门四' }, { name: '部门五' }],
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: [1, 4, 2, 5, 3, 6],
            name: '未发函',
          },
          {
            value: [2, 6, 3, 2, 1, 5],
            name: '未处分',
          },
          {
            value: [4, 2, 4, 5, 3, 2],
            name: '已发函',
          },
          {
            value: [1, 2, 1, 1, 1, 0],
            name: '已处分',
          },
        ],
      },
    ],
  };
  option03 = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line'
      },
      extraCssText: 'font-size:14px;line-height:24px;color:#567;background:#fff;box-shadow:0 0 3px rgba(0, 0, 0, 0.2)',
      formatter(params) {
        let html = '';
        params.forEach(v => {
          console.log(v);
          // tslint:disable-next-line:max-line-length
          html += `<div><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#0090FF};"></span>${v.seriesName}<span style="color:#FFC005};font-size:18px;font-weight:700">${v.value}</span>`;
        });
        return html;
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['2017', '2018', '2017', '2018', '2019', '2020', '2021'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '问题增长数',
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        areaStyle: {
          normal: {
            color: '#18dbff',
            shadowBlur: 10
          }
        },
        lineStyle: {
          normal: {
            color: '#49a9ee',
          }
        },

      },
    ],
  };
  constructor() { }

  ngOnInit() { }
}
