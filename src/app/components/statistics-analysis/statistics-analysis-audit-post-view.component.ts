import { Component, OnInit, ViewChild } from '@angular/core';
import { StatisticsAnalysisDeatilComponent } from './statistics-analysis-detail.component';

@Component({
  selector: 'app-statistics-analysis-audit-post-view',
  templateUrl: './statistics-analysis-audit-post-view.component.html',
  styles: [
    `
      nz-select {
        width: 200px;
      }
    `,
  ],
})
export class StatisticsAnalysisAuditPostViewComponent implements OnInit {
  @ViewChild('statisticsAnalysisDeatilComponent', { static: false })
  statisticsAnalysisDeatilComponent: StatisticsAnalysisDeatilComponent;

  currentDate = new Date();

  /**
   * 传给子的类型
   */
  option: any;
  /**
   * 选择年度参数
   */
  selectedValue = '2020';
  /**
   * 选择角度统计
   */
  selectedtotal = 'audit';

  /**
   * 审计报告完成情况饼图
   */
  option1 = {
    color: ['#5470C6', '#91CC75', '#FAC858'],
    // title: {
    //   text: '审计报告整改完成情况',
    //   subtext: '统计分析',
    //   left: 'center',
    // },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      x: 'right',
    },
    series: [
      {
        name: '审计报告整改完成情况',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 8, name: '整改中' },
          { value: 10, name: '已整改' },
          { value: 7, name: '未开始整改' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  /**
   * 审计来源统计分析
   */
  option2 = {
    // color: ['#5470C6', '#91CC75', '#FAC858'],
    color: ['#FE6F6F', '#73C0DE', '#FAC858'],
    // title: {
    //   text: '审计报告来源',
    //   subtext: '统计分析',
    //   left: 'center',
    // },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'right',
    },
    series: [
      {
        name: '审计报告来源',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 10, name: '迎审报告' },
          { value: 5, name: '内审报告' },
          { value: 7, name: '外聘报告' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  /**
   * 审计报告历年变化
   */
  option3 = {
    color: ['#5470C6'],
    // title: {
    //   text: '审计报告历年变化',
    //   subtext: '变化分析',
    //   left: 'center',
    // },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: ['2018', '2019', '2020', '2021'],
    },
    yAxis: {
      name: '个数',
      data: [0, 5, 10, 15, 20],
      type: 'value',
    },
    series: [
      {
        data: [8, 15, 12, 18],
        type: 'line',
      },
    ],
  };

  /**
   * 审计报告整改情况
   */
  option4 = {
    barCategoryGap: '150',
    color: ['#5470C6', '#91CC75', '#FAC858', '#FE6F6F'],

    // title: {
    //   text: '审计报告整改情况',
    //   subtext: '数量分析',
    //   left: 'center',
    // },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // Use axis to trigger tooltip
        type: 'shadow', // 'shadow' as default; can also be 'line' or 'shadow'
      },
    },
    legend: {
      orient: 'horizontal',
      left: 'right',
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    yAxis: {
      name: '问题整改数',
      type: 'value',
    },
    xAxis: {
      type: 'category',
      data: ['审计报告1', '审计报告2', '审计报告3', '审计报告4', '审计报告5', '审计报告6', '审计报告7'],
    },
    series: [
      {
        name: '整改中',
        type: 'bar',
        stack: 'total',
        label: {
          show: true,
        },
        emphasis: {
          focus: 'series',
        },
        data: [30, 12, 10, 8, 6, 4, 2],
      },
      {
        name: '已整改',
        type: 'bar',
        stack: 'total',
        label: {
          show: true,
        },
        emphasis: {
          focus: 'series',
        },
        data: [60, 56, 51, 42, 38, 25, 10],
      },
      {
        name: '无法整改',
        type: 'bar',
        stack: 'total',
        label: {
          show: true,
        },
        emphasis: {
          focus: 'series',
        },
        data: [90, 80, 66, 57, 49, 24, 10],
      },
      {
        name: '未开始整改',
        type: 'bar',
        stack: 'total',
        label: {
          show: true,
        },
        emphasis: {
          focus: 'series',
        },
        data: [3, 3, 2, 4, 5, 6, 4],
      },
    ],
  };

  /**
   * 涉及金额角度
   */
  option5 = {
    barCategoryGap: '150',
    color: ['#FAC858'],

    // title: {
    //   text: '审计报告涉及金额统计情况',
    //   subtext: '金额分析',
    //   left: 'center',
    // },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // Use axis to trigger tooltip
        type: 'shadow', // 'shadow' as default; can also be 'line' or 'shadow'
      },
    },
    legend: {
      orient: 'horizontal',
      left: 'left',
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: ['审计报告1', '审计报告2', '审计报告3', '审计报告4', '审计报告5', '审计报告6', '审计报告7'],
    },
    yAxis: {
      name: '金额（元）',
      type: 'value',
    },
    series: [
      {
        data: [40000, 32000, 25000, 20000, 15000, 10000, 5000],
        type: 'bar',
        label: {
          show: true,
        },
      },
    ],
  };
  ngOnInit(): void {
    // this.sortMoneyOption();
  }

  onChartClick(option: string) {
    this.option = option;
    this.statisticsAnalysisDeatilComponent.showModal();
  }

  // 日期处理
  onChangeDateYear(ev: any) {}
}
