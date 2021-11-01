import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics-broken-line',
  templateUrl: './statistics-broken-line.component.html',
  styles: [],
})
export class StatisticsBrokenLineComponent implements OnInit {
  /**
   * 接收传进来的类型
   */
  @Input() option: any;

  isVisible = false;

  /**
   * 折线图
   */
  optionCreaseLine = null;

  listOfOption = [];
  listOfSelectedValue = [];
  map: Map<string, Array<number>> = new Map<string, Array<number>>();

  constructor() {}
  ngOnInit(): void {
    for (let index = 1; index <= 20; index++) {
      const name = '类型' + index;
      this.listOfOption.push(name);
      this.map.set(name, this.seriesData());
    }
    this.listOfSelectedValue = this.listOfOption;
    this.loadOption();
  }

  loadOption() {
    const series = [];
    this.listOfSelectedValue.forEach(type => {
      series.push({
        name: type,
        type: 'line',
        data: this.map.get(type),
      });
    });
    this.optionCreaseLine = {
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['2017', '2018', '2019', '2020', '2021'],
      },
      yAxis: {
        name: '问题个数',
        type: 'value',
      },
      series,
    };
  }

  typeChange() {
    this.loadOption();
  }

  /**
   * 随机生成整数
   * @param min 最小值
   * @param max 最大值
   * @returns 随机整数
   */
  random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  seriesData() {
    const randomData = [];
    for (let index = 0; index < 20; index++) {
      randomData.push(this.random(0, 50));
    }
    return randomData;
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
