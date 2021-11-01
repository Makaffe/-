import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STPage } from '@delon/abc';
import * as echarts from 'echarts';
import { StatisticsAnalysisDeatilComponent } from './statistics-analysis-detail.component';
import { StatisticsBrokenLineComponent } from './statistics-broken-line.component';
type EchartsOption = echarts.EChartOption;

@Component({
  selector: 'app-statistics-analysis-audit-issue-view',
  templateUrl: './statistics-analysis-audit-issue-view.component.html',
  styles: [],
})
export class StatisticsAnalysisAuditIssueViewComponent implements OnInit {
  /**
   * 穿透组件
   */
  @ViewChild('statisticsAnalysisDeatilComponent', { static: false })
  statisticsAnalysisDeatilComponent: StatisticsAnalysisDeatilComponent;

  @ViewChild('statisticsBrokenLineComponent', { static: false })
  statisticsBrokenLineComponent: StatisticsBrokenLineComponent;

  // page: STPage = {
  //   show: false,
  // };

  // tableData = [
  //   {
  //     a: '部门一',
  //     b: 35,
  //     c: 10,
  //   },
  //   {
  //     a: '部门二',
  //     b: 25,
  //     c: 10,
  //   },
  //   {
  //     a: '部门三',
  //     b: 25,
  //     c: -10,
  //   },
  // ];

  // columns: STColumn[] = [
  //   { title: '排名', width: '50px', render: 'number', className: 'text-center' },
  //   {
  //     title: '部门',
  //     index: 'a',
  //     width: '40%',
  //   },
  //   {
  //     title: '问题占比',
  //     render: 'b',
  //     width: '40%',
  //   },
  //   {
  //     title: '问题增长率',
  //     render: 'c',
  //     width: '20%',
  //   },
  // ];

  // listOfData = [
  //   {
  //     key: '1',
  //     name: 'John Brown',
  //     age: 32,
  //     address: 'New York No. 1 Lake Park',
  //   },
  //   {
  //     key: '2',
  //     name: 'Jim Green',
  //     age: 42,
  //     address: 'London No. 1 Lake Park',
  //   },
  //   {
  //     key: '3',
  //     name: 'Joe Black',
  //     age: 32,
  //     address: 'Sidney No. 1 Lake Park',
  //   },
  // ];
  // option = {
  //   tooltip: {
  //     trigger: 'axis',
  //     axisPointer: {
  //       // 坐标轴指示器，坐标轴触发有效
  //       type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
  //     },
  //     formatter(params) {
  //       // 自动提示工具
  //       let params0Value = params[0].value + '%';
  //       const params1Value = params[0].value + '%';
  //       const params2Value = params[0].value + '%';
  //       if (params[0].value <= 0) {
  //         params0Value = params[0].value;
  //       }
  //       if (params[1].value <= 0) {
  //         params0Value = params[1].value;
  //       }
  //       if (params[2].value <= 0) {
  //         params0Value = params[2].value;
  //       }
  //       // tslint:disable-next-line:max-line-length
  //       return (
  //         params[0].axisValue +
  //         '<br />' +
  //         params[0].marker +
  //         '初始量：' +
  //         params0Value +
  //         '<br />' +
  //         params[1].marker +
  //         '已确认量：' +
  //         params1Value +
  //         '<br />' +
  //         params[2].marker +
  //         '草稿/待确认：' +
  //         params2Value
  //       );
  //     },
  //   },
  //   legend: {
  //     selectedMode: false, // 取消图例上的点击事件
  //     x: 'right', // 右对齐
  //     padding: [10, 40, 0, 0],
  //     data: ['已逾期', '已整改', '整改中', '未整改'],
  //   },
  //   grid: {
  //     left: '5px',
  //     right: '4%',
  //     bottom: '45px',
  //     containLabel: true,
  //   },
  //   xAxis: [
  //     {
  //       type: 'category',
  //       data: ['部门一', '部门二', '部门三', '部门四', '部门五', '部门六', '部门七'],
  //     },
  //   ],
  //   yAxis: [
  //     {
  //       type: 'value',
  //       axisLabel: {
  //         formatter: '{value}%',
  //       },
  //     },
  //   ],
  //   // dataZoom: [
  //   //   {
  //   //     xAxisIndex: [0],
  //   //     // tslint:disable-next-line:max-line-length
  //   //     handleIcon:
  //   //       // tslint:disable-next-line:max-line-length
  //   //   },
  //   // ],
  //   series: [
  //     {
  //       name: '整改中',
  //       type: 'bar',
  //       stack: '饱和度',
  //       color: '#98d87d',
  //       data: [30, 18, 11, 23, 29, 33, 30],
  //     },
  //     {
  //       name: '已整改',
  //       type: 'bar',
  //       stack: '饱和度',
  //       color: '#49a9ee',
  //       data: [20, 18, 19, 23, 29, 33, 31],
  //     },
  //     {
  //       name: '未整改',
  //       type: 'bar',
  //       stack: '饱和度',
  //       color: '#ffd86e',
  //       barMaxWidth: 30, // 柱子的宽度
  //       data: [21, 11, 23, 15, 30, 23, 10],
  //     },
  //     {
  //       name: '已逾期',
  //       type: 'bar',
  //       stack: '饱和度',
  //       color: '#d9001b',
  //       data: [10, 13, 11, 13, 30, 23, 21],
  //     },
  //   ],
  // };
  // option01 = {
  //   tooltip: {
  //     trigger: 'axis',
  //   },
  //   grid: {
  //     left: '3%',
  //     right: '4%',
  //     bottom: '3%',
  //     containLabel: true,
  //   },
  //   xAxis: {
  //     type: 'category',
  //     boundaryGap: false,
  //     data: ['问题类型1', '问题类型2', '问题类型3', '问题类型4', '问题类型5', '问题类型6', '问题类型7'],
  //   },
  //   yAxis: {
  //     type: 'value',
  //     boundaryGap: [0, '100%'],
  //   },
  //   series: [
  //     {
  //       name: '部门1',
  //       type: 'line',
  //       stack: 'Total',
  //       data: [120, 132, 101, 134, 90, 230, 210],
  //     },
  //     {
  //       name: '部门2',
  //       type: 'line',
  //       stack: 'Total',
  //       data: [220, 182, 191, 234, 290, 330, 310],
  //     },
  //     {
  //       name: '部门3',
  //       type: 'line',
  //       stack: 'Total',
  //       data: [150, 232, 201, 154, 190, 330, 410],
  //     },
  //     {
  //       name: '部门4',
  //       type: 'line',
  //       stack: 'Total',
  //       data: [320, 332, 301, 334, 390, 330, 320],
  //     },
  //     {
  //       name: '部门5',
  //       type: 'line',
  //       stack: 'Total',
  //       data: [820, 932, 901, 934, 1290, 1330, 1320],
  //     },
  //   ],
  // };
  // option02 = {
  //   legend: {
  //     data: ['未发函', '未处分', '已发函', '已处分'],
  //   },
  //   radar: {
  //     // shape: 'circle',
  //     indicator: [{ name: '部门一' }, { name: '部门二' }, { name: '部门三' }, { name: '部门四' }, { name: '部门五' }],
  //   },
  //   series: [
  //     {
  //       type: 'radar',
  //       data: [
  //         {
  //           value: [1, 4, 2, 5, 3, 6],
  //           name: '未发函',
  //         },
  //         {
  //           value: [2, 6, 3, 2, 1, 5],
  //           name: '未处分',
  //         },
  //         {
  //           value: [4, 2, 4, 5, 3, 2],
  //           name: '已发函',
  //         },
  //         {
  //           value: [1, 2, 1, 1, 1, 0],
  //           name: '已处分',
  //         },
  //       ],
  //     },
  //   ],
  // };
  // option03 = {
  //   tooltip: {
  //     trigger: 'axis',
  //     axisPointer: {
  //       type: 'line',
  //     },
  //     extraCssText: 'font-size:14px;line-height:24px;color:#567;background:#fff;box-shadow:0 0 3px rgba(0, 0, 0, 0.2)',
  //     formatter(params) {
  //       let html = '';
  //       params.forEach(v => {
  //         console.log(v);
  //         // tslint:disable-next-line:max-line-length
  //       });
  //       return html;
  //     },
  //   },
  //   xAxis: {
  //     type: 'category',
  //     boundaryGap: false,
  //     data: ['2017', '2018', '2017', '2018', '2019', '2020', '2021'],
  //   },
  //   yAxis: {
  //     type: 'value',
  //   },
  //   series: [
  //     {
  //       name: '问题增长数',
  //       data: [820, 932, 901, 934, 1290, 1330, 1320],
  //       type: 'line',
  //       areaStyle: {
  //         normal: {
  //           color: '#18dbff',
  //           shadowBlur: 10,
  //         },
  //       },
  //       lineStyle: {
  //         normal: {
  //           color: '#49a9ee',
  //         },
  //       },
  //     },
  //   ],
  // };

  /**
   * 日期
   */
  dateYear: Date;

  option: null;

  /**
   * 饼图数据
   */
  optionPie = {
    title: {
      // text: '整改问题数',
      // left: 'center',
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: '数量',
        type: 'pie',
        radius: '50%',
        itemStyle: {
          normal: {
            // 好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
            color(params) {
              // build a color map as your need.
              const colorList = [
                '#B5C334',
                '#FCCE10',
                '#27727B',

                '#FE8463',
                '#9BCA63',
                '#FAD860',
                '#F3A43B',
                '#60C0DD',

                '#D7504B',
                '#C6E579',
                '#F4E001',
                '#F0805A',
                '#26C0C0',
              ];

              return colorList[params.dataIndex];
            },
            // 以下为是否显示，显示位置和显示格式的设置了
            label: {
              show: true,

              position: 'top',

              //                             formatter: '{c}'

              formatter: '{b}\n{c}',
            },
          },
        },
        data: [
          { value: 3, name: '无法整改' },
          { value: 4, name: '已完成整改' },
          { value: 3, name: '未开始整改' },
          { value: 3, name: '整改进行中' },
        ],
      },
    ],
  };

  /**
   * 柱状图问题统计
   */
  optionColumnarPS = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
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
        data: ['逾期已完成整改', '逾期未完成整改', '移交纪检问题数', '跨年整改问题数量'],
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        name: '问题个数',
        type: 'value',
      },
    ],
    series: [
      {
        type: 'bar',
        barWidth: '40',
        data: [12, 6, 5, 3],
        itemStyle: {
          color(params) {
            const colorList = ['#4572A7', '#AA4643', '#89A54E', '#71588F', '#4198AF', '#DB843D', '#93A9CF'];
            return colorList[params.dataIndex % colorList.length];
          },
        },
      },
    ],
  };

  /**
   * 各类问题数量
   */
  optionColumnarPS1 = {
    title: {
      // text: '各类问题数量',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    xAxis: {
      type: 'category',
      data: [
        '类型一',
        '类型二',
        '类型三',
        '类型四',
        '类型五',
        '类型六',
        '类型七',
        '类型八',
        '类型九',
        '类型十',
        '类型十一',
        '类型十二',
        '类型十三',
        '类型十四',
        '类型十五',
        '类型十六',
      ],
    },
    yAxis: {
      name: '问题个数',
      type: 'value',
    },
    series: [
      {
        data: [30, 30, 21, 21, 19, 18, 15, 12, 11, 10, 8, 8, 7, 5, 2, 1],
        type: 'bar',
        itemStyle: {
          normal: {
            // 好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
            color(params) {
              // build a color map as your need.
              // const colorList = ['#E87C25', '#FAD860'];

              // return colorList[params.dataIndex];
              return '#26C0C0';
            },
            // 以下为是否显示，显示位置和显示格式的设置了
            //   label: {
            //     show: true,

            //     position: 'top',

            //     //                             formatter: '{c}'

            //     formatter: '{b}\n{c}',
            //   },
          },
        },
        // 设置柱的宽度，要是数据太少，柱子太宽不美观~
        barWidth: 40,
      },
    ],
  };

  /**
   * 问题类型涉及金额
   */
  optionColumnarPS2 = {
    title: {
      // text: '问题类型涉及金额',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    xAxis: {
      type: 'category',
      data: [
        '类型一',
        '类型二',
        '类型三',
        '类型四',
        '类型五',
        '类型六',
        '类型七',
        '类型八',
        '类型九',
        '类型十',
        '类型十一',
        '类型十二',
        '类型十三',
        '类型十四',
        '类型十五',
        '类型十六',
      ],
    },
    yAxis: {
      name: '金额（元）',
      type: 'value',
    },
    series: [
      {
        data: [100, 80, 75, 75, 72, 70, 68, 65, 62, 60, 59, 55, 40, 38, 35, 20],
        type: 'bar',
        itemStyle: {
          normal: {
            // 好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
            color(params) {
              // build a color map as your need.
              // const colorList = [ '#9BCA63', '#26C0C0'];

              // return colorList[params.dataIndex];
              return '#26C0C0';
            },
            // 以下为是否显示，显示位置和显示格式的设置了
            // label: {
            //   show: true,

            //   position: 'top',

            //   //                             formatter: '{c}'

            //   formatter: '{b}\n{c}',
            // },
          },
        },
        // 设置柱的宽度，要是数据太少，柱子太宽不美观~
        barWidth: 40,
      },
    ],
  };

  /**
   * 折线图
   */
  optionCreaseLine = {
    // title: {
    //   text: '问题数据历史变化',
    //   left: 'center',
    // },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: ['2017', '2018', '2019', '2020', '2021'],
    },
    yAxis: {
      name: '问题个数',
      type: 'value',
    },
    series: [
      {
        data: [24, 30, 20, 24, 12],
        type: 'line',
        color: ['orange'],
      },
    ],
  };

  datas = [
    { name: '人力资源管理', value: 30 },
    { name: '重大经营事项及风险', value: 28 },
    { name: '重大经营事项', value: 24 },
    { name: '内部控制方面', value: 23 },
    { name: '人力资源管理', value: 8 },
    { name: '重大经营事项及风险', value: 7 },
    { name: '重大经营事项', value: 6 },
    { name: '内部控制方面', value: 5 },
    { name: '人力资源管理', value: 4 },
    { name: '重大经营事项及风险', value: 3 },
    { name: '重大经营事项', value: 2 },
    { name: '内部控制方面', value: 1 },
  ];

  optionHotWord = {
    tooltip: {
      show: true,
      position: 'top',
      textStyle: {
        fontSize: 30,
      },
    },
    series: [
      {
        type: 'wordCloud',
        // 网格大小，各项之间间距
        gridSize: 30,
        // 形状 circle 圆，cardioid  心， diamond 菱形，
        // triangle-forward 、triangle 三角，star五角星
        shape: 'circle',
        // 字体大小范围
        sizeRange: [20, 50],
        // 文字旋转角度范围
        rotationRange: [0, 0],
        // 旋转步值
        rotationStep: 0,
        // 自定义图形
        // maskImage: maskImage,
        left: 'center',
        top: 'center',
        right: null,
        bottom: null,
        // 画布宽
        width: '80%',
        // 画布高
        height: '80%',
        // 是否渲染超出画布的文字
        drawOutOfBound: false,
        textStyle: {
          normal: {
            color() {
              return (
                'rgb(' +
                [
                  Math.round(Math.random() * 200 + 55),
                  Math.round(Math.random() * 200 + 55),
                  Math.round(Math.random() * 200 + 55),
                ].join(',') +
                ')'
              );
            },
          },
          emphasis: {
            shadowBlur: 10,
            shadowColor: '#2ac',
          },
        },
        data: this.datas,
      },
    ],
  };

  constructor() {}

  ngOnInit() {}

  onChartClickPie(ev: any) {
    this.statisticsAnalysisDeatilComponent.option = '整改问题';
    this.statisticsAnalysisDeatilComponent.isVisible = true;
  }

  onChartClick(ev: any) {
    this.statisticsAnalysisDeatilComponent.option = '审计报告';
    this.statisticsAnalysisDeatilComponent.isVisible = true;
  }

  onChartClickCreaseLin(ev: any) {
    this.statisticsBrokenLineComponent.isVisible = true;
  }

  onChangeDateYear(ev: any) {}
}
