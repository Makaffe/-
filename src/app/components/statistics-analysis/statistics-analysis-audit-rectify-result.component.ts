import { Component, OnInit } from '@angular/core';
import { STColumn, STPage } from '@delon/abc';
import * as echarts from 'echarts';
@Component({
  selector: 'app-statistics-analysis-audit-rectify-result',
  templateUrl: './statistics-analysis-audit-rectify-result.component.html',
  styleUrls: ['./statistics-analysis-audit-rectify-result.component.less'],
})
export class StatisticsAnalysisAuditRectifyResultComponent implements OnInit {
  /**
   * 年份
   */
  currentDate = new Date();
  selectYear = new Date().getFullYear();

  option = null;

  page: STPage = {
    show: false,
  };
  option01 = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    // title: {
    //   text: '整改及时率统计',
    // },
    xAxis: {
      type: 'category',
      data: ['部门二', '部门三', '部门一', '部门四', '部门五'],
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        show: true,
        interval: 'auto',
        formatter: '{value} %',
      },
    },
    series: [
      {
        data: [100, 60, 55, 38, 29],
        type: 'bar',
        itemStyle: {
          normal: {
            color: function (params) {
              var colorList = ['#61a', '#c23531', '#91c7ac', '#2f4', '#d48265', '#749f83', '#00CA69'];
              return colorList[params.dataIndex];
            },
          },
        },
      },
    ],
  };
  optionData1 = null;
  optionData2 = null;

  optionData3 = null;

  lastOption = null;

  tableData = [
    {
      a: '部门一',
      b: 35,
      c: 10,
    },
    {
      a: '部门二',
      b: 25,
      c: 10,
    },
    {
      a: '部门三',
      b: 25,
      c: -10,
    },
  ];
  columns: STColumn[] = [
    { title: '排名', width: '50px', render: 'number', className: 'text-center' },
    {
      title: '部门',
      index: 'a',
      width: '35%',
    },
    {
      title: '问题占比',
      render: 'b',
      width: '40%',
    },
    {
      title: '问题增长率',
      render: 'c',
      width: '25%',
    },
  ];
  constructor() { }

  money1 = {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      // type: 'scroll',
      // orient: 'horizontal',
      // // right: 0,
      // width: '95%',
      // height: '100',
      data: ['审计挽回资金', '上缴（追回）资金', '财务处理资金', '管理效益提升'],
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
      data: ['2018', '2019', '2020', '2021'],
    },
    yAxis: {
      name: '金额（元）',
      type: 'value',
    },
    series: [
      {
        name: '审计挽回资金',
        type: 'line',
        data: [12, 13, 10, 13],
      },
      {
        name: '上缴（追回）资金',
        type: 'line',
        data: [22, 18, 19, 23],
      },
      {
        name: '财务处理资金',
        type: 'line',
        data: [15, 23, 20, 38],
      },
      {
        name: '管理效益提升',
        type: 'line',
        data: [32, 33, 30, 33],
      },
    ],
  };

  money2 = {
    title: {
      text: '',
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['提出管理建议', '完善管理制度'],
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
      data: ['2018', '2019', '2020', '2021'],
    },
    yAxis: {
      name: '条数',
      type: 'value',
    },
    series: [
      {
        name: '提出管理建议',
        type: 'line',
        data: [12, 13, 10, 13],
      },
      {
        name: '完善管理制度',
        type: 'line',
        data: [22, 18, 19, 23],
      },
    ],
  };
  money3 = {
    title: {
      text: '',
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['提出审计意见', '提出审计建议'],
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
      data: ['2018', '2019', '2020', '2021'],
    },
    yAxis: {
      name: '条数',
      type: 'value',
    },
    series: [
      {
        name: '提出审计意见',
        type: 'line',
        data: [12, 13, 10, 13],
      },
      {
        name: '提出审计建议',
        type: 'line',
        data: [22, 18, 19, 23],
      },
    ],
  };
  option003 = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    // title: {
    //   text: '整改完成率统计',
    // },
    xAxis: {
      type: 'category',
      data: ['部门二', '部门三', '部门一', '部门四', '部门五'],
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        show: true,
        interval: 'auto',
        formatter: '{value} %',
      },
    },
    // grid: {
    //   // left: '3%',
    //   // right: '4%',
    //   top: '20%',
    //   containLabel: true,
    // },
    series: [
      {
        data: [100, 65, 50, 40, 30],
        type: 'bar',
        itemStyle: {
          normal: {
            color(params) {
              // tslint:disable-next-line:prefer-const
              const colorList = ['#c23531', '#2f4', '#61a', '#d48265', '#91c7ac', '#749f83', '#00CA69'];
              return colorList[params.dataIndex];
            },
          },
        },
      },
    ],
  };

  ngOnInit() {
    this.loadOption();
    this.loadOptionData1();
    this.loadOptionData2();
    this.loadOptionData3();
    this.loadLastOption();
  }

  loadOption() {
    const color = ['#0CD2E6', '#3751E6', '#FFC722', '#886EFF', '#008DEC', '#114C90', '#00BFA5'];
    const legend = ['A需求类型', 'B需求类型', 'C需求类型', 'D需求类型', 'E需求类型', '其他'];

    const seriesData = [
      { name: 'A需求类型', value: 30 },
      { name: 'B需求类型', value: 10 },
      { name: 'C需求类型', value: 15 },
      { name: 'D需求类型', value: 23 },
      { name: 'E需求类型', value: 10 },
      { name: '其他', value: 12 },
    ];
    this.option = {
      color,
      title: {
        top: 20,
        textStyle: {
          fontSize: 20,
          color: '#DDEEFF',
        },
      },
      grid: {
        top: '15%',
        left: 0,
        right: '1%',
        bottom: 5,
        containLabel: true,
      },
      legend: {
        orient: 'vertical',
        top: 'center',
        right: 50,
        textStyle: {
          align: 'left',
          verticalAlign: 'middle',
          rich: {
            name: {
              color: 'rgba(0,0,0,0.5)',
              fontSize: 12,
            },
            value: {
              color: 'rgba(0,0,0,0.5)',
              fontSize: 12,
            },
            rate: {
              color: 'rgba(255,255,255,0.5)',
              fontSize: 12,
            },
          },
        },
        data: legend,
        formatter: name => {
          if (seriesData.length) {
            // tslint:disable-next-line:no-shadowed-variable
            const item = seriesData.filter(item => item.name === name)[0];
            return `{name|${name}：}{value| ${item.value}} {rate| ${item.value}%}`;
          }
        },
      },
      series: [
        {
          name: '需求类型占比',
          type: 'pie',
          center: ['30%', '50%'],
          radius: ['45%', '65%'],
          label: {
            normal: {
              show: false,
              position: 'center',
              formatter: '{value|{c}}\n{label|{b}}',
              rich: {
                value: {
                  padding: 5,
                  align: 'center',
                  verticalAlign: 'middle',
                  fontSize: 32,
                },
                label: {
                  align: 'center',
                  verticalAlign: 'middle',
                  fontSize: 16,
                },
              },
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '12',
              },
            },
          },
          labelLine: {
            show: false,
            length: 0,
            length2: 0,
          },
          data: seriesData,
        },
      ],
    };
  }

  loadOptionData1() {
    const color = ['#0090FF', '#FFC005', '#36CE9E', '#FF515A', '#8B5CFF', '#00CA69'];

    const xAxisData = ['1月', '2月', '3月', '4月', '5月', '', ''];

    const yAxisData1 = [100, 138, 350, 173, 180, 150, 178];

    const hexToRgba = (hex, opacity) => {
      let rgbaColor = '';
      const reg = /^#[\da-f]{6}$/i;
      if (reg.test(hex)) {
        // tslint:disable-next-line:max-line-length
        // tslint:disable-next-line:radix
        rgbaColor = `rgba(${parseInt('0x' + hex.slice(1, 3))},${parseInt('0x' + hex.slice(3, 5))},${parseInt(
          '0x' + hex.slice(5, 7),
        )},${opacity})`;
      }
      return rgbaColor;
    };
    const lineStyle = index => {
      return {
        normal: {
          color: color[index],
          shadowColor: hexToRgba(color[index], 0.5),
          shadowBlur: 3,
          shadowOffsetY: 8,
        },
      };
    };
    const areaStyle = index => {
      return {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: hexToRgba(color[index], 0.3),
            },
            {
              offset: 1,
              color: hexToRgba(color[index], 0.1),
            },
          ]),
          shadowColor: hexToRgba(color[index], 0.1),
          shadowBlur: 10,
        },
      };
    };

    this.optionData1 = {
      backgroundColor: '#fff',
      color,
      // grid: {
      //   top: 100,
      //   left: 100,
      //   right: 100,
      //   bottom: 100,
      // },
      legend: {
        icon: 'rect',
        itemHeight: 12,
        itemWidth: 12,
        top: 10,
        left: 10,
        textStyle: {
          fontSize: 12,
          color: '#567',
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
        },
      },
      xAxis: {
        data: xAxisData,
        show: true,
      },
      yAxis: {
        show: false,
      },
      series: [
        {
          type: 'line',
          data: yAxisData1,
          smooth: true,
          symbolSize: 6,
          lineStyle: lineStyle(0),
          areaStyle: areaStyle(0),
        },
      ],
    };
  }
  loadOptionData2() {
    const color = ['#0090FF', '#FFC005', '#36CE9E', '#FF515A', '#8B5CFF', '#00CA69'];

    const xAxisData = ['1月', '2月', '3月', '4月', '5月', '', ''];

    const yAxisData2 = [50, 60, 90, 80, 60, 50, 70];

    const hexToRgba = (hex, opacity) => {
      let rgbaColor = '';
      const reg = /^#[\da-f]{6}$/i;
      if (reg.test(hex)) {
        // tslint:disable-next-line:max-line-length
        // tslint:disable-next-line:radix
        rgbaColor = `rgba(${parseInt('0x' + hex.slice(1, 3))},${parseInt('0x' + hex.slice(3, 5))},${parseInt(
          '0x' + hex.slice(5, 7),
        )},${opacity})`;
      }
      return rgbaColor;
    };
    const lineStyle = index => {
      return {
        normal: {
          color: color[index],
          shadowColor: hexToRgba(color[index], 0.5),
          shadowBlur: 3,
          shadowOffsetY: 8,
        },
      };
    };
    const areaStyle = index => {
      return {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: hexToRgba(color[index], 0.3),
            },
            {
              offset: 1,
              color: hexToRgba(color[index], 0.1),
            },
          ]),
          shadowColor: hexToRgba(color[index], 0.1),
          shadowBlur: 10,
        },
      };
    };

    this.optionData2 = {
      backgroundColor: '#fff',
      color,
      // grid: {
      //   top: 100,
      //   left: 100,
      //   right: 100,
      //   bottom: 100,
      // },
      legend: {
        icon: 'rect',
        itemHeight: 12,
        itemWidth: 12,
        top: 10,
        left: 10,
        textStyle: {
          fontSize: 12,
          color: '#567',
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
        },
      },
      xAxis: {
        data: xAxisData,
        show: true,
      },
      yAxis: {
        show: false,
      },
      series: [
        {
          type: 'line',
          data: yAxisData2,
          smooth: true,
          symbolSize: 6,
          lineStyle: lineStyle(1),
          areaStyle: areaStyle(1),
        },
      ],
    };
  }
  loadOptionData3() {
    const color = ['#0090FF', '#FFC005', '#36CE9E', '#FF515A', '#8B5CFF', '#00CA69'];

    const xAxisData = ['1月', '2月', '3月', '4月', '5月'];

    const yAxisData3 = [233, 201, 182, 198, 234, 210, 230];

    const hexToRgba = (hex, opacity) => {
      let rgbaColor = '';
      const reg = /^#[\da-f]{6}$/i;
      if (reg.test(hex)) {
        // tslint:disable-next-line:max-line-length
        // tslint:disable-next-line:radix
        rgbaColor = `rgba(${parseInt('0x' + hex.slice(1, 3))},${parseInt('0x' + hex.slice(3, 5))},${parseInt(
          '0x' + hex.slice(5, 7),
        )},${opacity})`;
      }
      return rgbaColor;
    };
    const lineStyle = index => {
      return {
        normal: {
          color: color[index],
          shadowColor: hexToRgba(color[index], 0.5),
          shadowBlur: 3,
          shadowOffsetY: 8,
        },
      };
    };
    const areaStyle = index => {
      return {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: hexToRgba(color[index], 0.3),
            },
            {
              offset: 1,
              color: hexToRgba(color[index], 0.1),
            },
          ]),
          shadowColor: hexToRgba(color[index], 0.1),
          shadowBlur: 10,
        },
      };
    };

    this.optionData3 = {
      backgroundColor: '#fff',
      color,
      // grid: {
      //   top: 100,
      //   left: 100,
      //   right: 100,
      //   bottom: 100,
      // },
      legend: {
        icon: 'rect',
        itemHeight: 12,
        itemWidth: 12,
        top: 10,
        left: 10,
        textStyle: {
          fontSize: 12,
          color: '#567',
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
        },
      },
      xAxis: {
        data: xAxisData,
        show: true,
      },
      yAxis: {
        show: false,
      },
      series: [
        {
          type: 'line',
          data: yAxisData3,
          smooth: true,
          symbolSize: 6,
          lineStyle: lineStyle(2),
          areaStyle: areaStyle(2),
        },
      ],
    };
  }
  loadLastOption() {
    this.lastOption = {
      backgroundColor: '#fff',
      title: [
        {
          text: '80%',
          textStyle: {
            color: '#22ac38',
            fontSize: 30,
          },
          itemGap: 20,
          left: '15%',
          top: '45%',
        },
        {
          text: '同比偏高40%',
          textStyle: {
            color: '#444444',
            fontSize: 12,
            fontWeight: 'normal',
          },
          itemGap: 20,
          left: '15%',
          top: '60%',
        },
      ],
      grid: [
        {
          top: '10%',
          width: '50%',
          left: '45%',
          containLabel: true,
        },
      ],
      angleAxis: {
        polarIndex: 0,
        min: 0,
        max: 100,
        show: false,
        boundaryGap: ['40%', '40%'],
        startAngle: 90,
      },
      radiusAxis: {
        type: 'category',
        show: true,
        axisLabel: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
      },
      polar: [
        {
          center: ['22%', '50%'], // 中心点位置
          radius: '80%', // 图形大小
        },
      ],
      xAxis: {
        show: true,
        type: 'value',
      },
      yAxis: [
        {
          type: 'category',
          inverse: true,
          axisLabel: {
            show: false,
            textStyle: {
              color: '#444444',
            },
          },
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          data: ['完善制度', '管理效益', '上缴（追回）资金'],
        },
        {
          type: 'category',
          inverse: true,
          axisTick: 'none',
          axisLine: 'none',
          show: true,
          axisLabel: {
            textStyle: {
              color: '#444444',
              fontSize: '12',
            },
            formatter(value) {
              return value + '%';
            },
          },
          data: [10, 10, 60],
        },
      ],
      series: [
        {
          name: '完成率',
          type: 'bar',
          zlevel: 1,
          silent: false,
          label: {
            normal: {
              color: '#444444',
              show: true,
              position: [0, '-24px'],
              textStyle: {
                fontSize: 16,
              },
              formatter(a, b) {
                return a.name;
              },
            },
          },
          itemStyle: {
            normal: {
              barBorderRadius: 30,
              color: '#14d88e',
            },
          },
          barWidth: 20,
          data: [10, 10, 60],
        },
        {
          name: '背景',
          type: 'bar',
          barWidth: 20,
          barGap: '-100%',
          data: [100, 100, 100],
          itemStyle: {
            normal: {
              color: '#f3f3f7',
              barBorderRadius: 30,
            },
          },
        },
        {
          type: 'bar',
          z: 10,
          name: '完成度',
          data: [80],
          showBackground: false,
          backgroundStyle: {
            borderWidth: 10,
            width: 10,
          },
          coordinateSystem: 'polar',
          roundCap: true,
          barWidth: 25, // 大的占比环
          itemStyle: {
            normal: {
              opacity: 1,
              color: '#14d88e',
            },
          },
        },
        {
          type: 'pie',
          name: '内层细圆环',
          radius: ['46%', '34%'],
          center: ['22%', '50%'], // 中心点位置
          startAngle: 90,
          hoverAnimation: false,
          clockWise: true,
          silent: true,
          itemStyle: {
            normal: {
              color: '#f3f3f7',
              shadowBlur: 0,
              shadowColor: '#66666a',
            },
          },
          tooltip: {
            show: false,
          },
          label: {
            show: false,
          },
          data: [100],
        },
      ],
    };
  }

  onChange(event: Date) {
    this.selectYear = event.getFullYear();
  }
}
