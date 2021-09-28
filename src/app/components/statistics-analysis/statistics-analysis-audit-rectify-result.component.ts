import { Component, OnInit } from '@angular/core';
import { STColumn } from '@delon/abc';
import { TABLE_PARAMETER } from '@ng-mt-framework/comp';
import { ObjectUtil } from '@ng-mt-framework/util';
import * as echarts from 'echarts';
@Component({
  selector: 'app-statistics-analysis-audit-rectify-result',
  templateUrl: './statistics-analysis-audit-rectify-result.component.html',
  styles: [],
})
export class StatisticsAnalysisAuditRectifyResultComponent implements OnInit {
  option = null;
  option01 = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
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
  constructor() {}

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

    const xAxisData = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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
      grid: {
        top: 100,
        left: 100,
        right: 100,
        bottom: 100,
      },
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
        show: false,
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

    const xAxisData = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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
      grid: {
        top: 100,
        left: 100,
        right: 100,
        bottom: 100,
      },
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
        show: false,
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

    const xAxisData = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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
      grid: {
        top: 100,
        left: 100,
        right: 100,
        bottom: 100,
      },
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
        show: false,
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
        show: false,
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
}
