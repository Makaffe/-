import { Component, OnInit } from '@angular/core';

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
  constructor() {}

  ngOnInit() {
    this.loadOption();
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
      //   backgroundColor: '#050e31',
      color,
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
              color: 'rgba(255,255,255,0.5)',
              fontSize: 10,
            },
            value: {
              color: 'rgba(255,255,255,0.5)',
              fontSize: 10,
            },
            rate: {
              color: 'rgba(255,255,255,0.9)',
              fontSize: 10,
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
}
