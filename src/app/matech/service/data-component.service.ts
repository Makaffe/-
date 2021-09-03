import { Injectable } from '@angular/core';
import { STColumn } from '@delon/abc';
import { Broadcaster } from './broadcaster';

export interface TagData {
  /**
   * 数据类型, 例如：财政等
   */
  dataType: string;

  /**
   * 查看数据的组件路由
   */
  route: string;

  /**
   * 是否是表格数据
   */
  isList: boolean;

  /**
   * 列定义
   */
  columns: STColumn[];

  /**
   * 数据内容搞要，用于全文检查的简易显示, 使用数组形式保存，每条数据必须含有id, name。
   * 由于数据形式多种多样，可以归纳为：单数据，主从数据
   *
   * 格式示例：
   * {
   *  id: string
   *  name: string
   *  fields: {
   *    '名称': '这是测试的数据',
   *    '其他字段': '其他值',
   *    '从数据名称':[
   *      { fields: {}}, { fields: {}}
   *    ]
   *  }
   * }
   */
  data: Array<any>;
}
export interface DataComponent {
  getDataForSpecialPurpose(): TagData;
}

@Injectable({
  providedIn: 'root',
})
export class DataComponentService {
  private map = new Map();

  constructor(private broadcaster: Broadcaster) {}

  addComponent(component: any) {
    const name = component.__proto__.constructor.name;
    this.map.set(name, component);
    this.activeComponent(name);
  }

  removeComponent(component: any) {
    const name = component.__proto__.constructor.name;
    this.map.set(name, null);
  }

  activeComponent(name: string) {
    // 有时组件还没有添加，所以采用延时方式处理
    setTimeout(() => {
      const component = this.getComponent(name);
      if (component) {
        const comp = component.__proto__.getDataForSpecialPurpose ? component : null;
        this.broadcaster.broadcast('data-tag-component', comp);
      }
    }, 100);
  }

  getComponent(name: string): any {
    const comp = this.map.get(name);
    return comp ? comp : null;
  }
}
