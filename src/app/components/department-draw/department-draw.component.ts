import { Component, OnInit, ViewChild } from '@angular/core';
import { StatisticsAnalysisDeatilComponent } from '../statistics-analysis/statistics-analysis-detail.component';

@Component({
  selector: 'app-department-draw',
  templateUrl: './department-draw.component.html',
  styleUrls: ['./department-draw.component.less'],
})
export class DepartmentDrawComponent implements OnInit {
  constructor() {}

  @ViewChild('statisticsAnalysisDeatilComponent', { static: false })
  statisticsAnalysisDeatilComponent: StatisticsAnalysisDeatilComponent;

  /**
   * 传给子的类型
   */
  type: string;

  /**
   * 年份
   */
  currentDate = new Date();
  selectYear = new Date().getFullYear();

  option1 = null;
  option2 = null;
  option3 = null;
  option4 = null;
  option5 = null;
  option6 = null;
  option7 = null;

  ngOnInit() {
    this.loadOption();
  }

  /**
   * 选择年份
   * @param event 日期参数
   */
  onChange(event: Date) {
    this.selectYear = event.getFullYear();
  }

  loadOption() {
    // 柱体颜色数组
    const colorList = ['#4572A7', '#AA4643', '#89A54E', '#71588F', '#4198AF', '#DB843D', '#93A9CF'];

    this.option1 = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      series: [
        {
          name: '整改问题数',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 26, name: '已完成整改' },
            { value: 3, name: '正在整改' },
            { value: 3, name: '无法整改' },
          ],
          itemStyle: {
            color(params) {
              console.log(params);
              let color = '';
              switch (params.dataIndex) {
                case 0:
                  color = '#89A54E';
                  break;
                case 1:
                  color = '#4572A7';
                  break;
                case 2:
                  color = '#AA4643';
                  break;
              }
              return color;
            },
          },
        },
      ],
    };

    this.option2 = {
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
          data: ['整改逾期问题数', '未完成整改问题数', '移交纪检问题数'],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          type: 'bar',
          barWidth: '40',
          data: [5, 12, 3],
          itemStyle: {
            color(params) {
              return colorList[params.dataIndex % colorList.length];
            },
          },
        },
      ],
    };
    this.option3 = {
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
        data: ['2017', '2018', '2019', '2020', '2021'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [30, 45, 51, 23, 45],
          type: 'line',
          color: '#ffc105',
        },
      ],
    };

    this.option4 = {
      title: {
        text: '部门1问题类型分布',
        left: 'center',
      },
      tooltip: {},
      radar: {
        radius: '70%', // 大小
        nameGap: 1, // 图中工艺等字距离图的距离
        center: ['50%', '50%'], // 图的位置
        name: {
          textStyle: {
            color: 'black',
          },
          formatter(name) {
            return name;
          },
        },
        indicator: [
          { name: '三重一大', max: 5 },
          { name: '金融管理', max: 5 },
          { name: '违规违纪', max: 5 },
          { name: '资金管理', max: 5 },
          { name: '资产管理', max: 5 },
          { name: '账外账', max: 5 },
          { name: '财会核算', max: 5 },
          { name: '物业管理', max: 5 },
          { name: '担保', max: 5 },
          { name: '投资项目管理', max: 5 },
          { name: '投资管理', max: 5 },
          { name: '房地产', max: 5 },
          { name: '战略规划', max: 5 },
          { name: '工程建设', max: 5 },
          { name: '小金库', max: 5 },
          { name: '内部控制', max: 5 },
          { name: '会计信息', max: 5 },
          { name: '人力资源管理', max: 5 },
        ],
      },
      series: [
        {
          name: '问题类型分布',
          type: 'radar',
          data: [
            {
              value: [5, 4, 3, 3, 4, 5, 5, 4, 3, 3, 4, 5, 2, 4, 4, 3, 4, 3],
            },
          ],
          lineStyle: {
            color: 'rgba(84, 122, 198, 1)',
            width: 2,
          },
        },
      ],
    };

    this.option5 = {
      title: {
        text: '部门1问题类型TOP 5',
        left: 'center',
      },
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
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01],
      },
      yAxis: {
        type: 'category',
        data: ['问题类型5', '问题类型4', '问题类型3', '问题类型2', '问题类型1'],
      },
      series: [
        {
          name: '2011',
          type: 'bar',
          data: [10, 12, 15, 17, 20],
          itemStyle: {
            color(params) {
              return colorList[params.dataIndex % colorList.length];
            },
          },
        },
      ],
    };

    this.option6 = {
      title: {
        text: '部门1三年重复多发问题',
        left: 'center',
      },
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
          data: ['子类一', '子类二', '子类三', '子类四', '子类五'],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          type: 'bar',
          barWidth: '40',
          data: [10, 12, 15, 17, 20],
          itemStyle: {
            color(params) {
              return colorList[params.dataIndex % colorList.length];
            },
          },
        },
      ],
    };

    this.option6 = {
      title: {
        text: '部门1三年重复多发问题',
        left: 'center',
      },
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
          data: ['子类一', '子类二', '子类三', '子类四', '子类五'],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          type: 'bar',
          barWidth: '40',
          data: [10, 12, 15, 17, 20],
          itemStyle: {
            color(params) {
              return colorList[params.dataIndex % colorList.length];
            },
          },
        },
      ],
    };

    this.option7 = {
      title: {
        text: '部门1问题类型涉及金额',
        left: 'center',
      },
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
          data: ['类型一', '类型二', '类型三', '类型四', '类型五', '类型六', '类型七'],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          type: 'bar',
          barWidth: '40',
          data: [11, 9, 7, 8, 9, 6, 5],
          itemStyle: {
            color(params) {
              return colorList[params.dataIndex % colorList.length];
            },
          },
        },
      ],
    };
  }

  /**
   * 饼图点击
   * @param type 弹窗类型
   */
  onChartClick(type: string) {
    this.type = type;
    this.statisticsAnalysisDeatilComponent.showModal();
  }
}
