import { Component, OnInit, ViewChild } from '@angular/core';
import { SuperviseProcessFormComponent } from '../supervise-process-form/supervise-process-form.component';

export interface TreeNodeInterface {
  key: number;
  status: string;
  source?: string;
  problemName?: string;
  type?: string;
  rectifyDepartment?: string;
  leader?: string;
  time?: string;
  children?: TreeNodeInterface[];
  reason?: string;
  level?: number;
  expand?: boolean;
  parent?: TreeNodeInterface;
}
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'supervise-wait-tab',
  templateUrl: './supervise-wait-tab.component.html',
  styles: []
})
export class SuperviseWaitTabComponent implements OnInit {
  @ViewChild('superviseProcessFormComponent', { static: false })
  superviseProcessFormComponent: SuperviseProcessFormComponent;

  constructor() { }

  mapOfExpandedData: { [key: string]: TreeNodeInterface[] } = {};
  listOfMapData: TreeNodeInterface[] = [
    {
      key: 1,
      status: '未处理',
      source: '审计报告',
      problemName: '有关于财政的',
      type: '财政收入',
      rectifyDepartment: '财务部',
      leader: '郭鑫',
      time: '2021-1-4',
      reason: '主要因为不太规范',
      children: [
        {
          key: 11,
          status: '未处理',
          source: '审计报告',
          problemName: '有关于财政的',
          type: '财政收入',
          rectifyDepartment: '财务部',
          leader: '郭鑫',
          time: '2021-1-4',
          reason: '主要因为不太规范',
        },
      ],
    },
    {
      key: 2,
      status: '未处理',
      source: '审计报告',
      problemName: '有关于财政的',
      type: '财政收入',
      rectifyDepartment: '财务部',
      leader: '郭鑫',
      time: '2021-1-4',
      reason: '主要因为不太规范',
    },
  ];

  ngOnInit() {
    this.listOfMapData.forEach(item => {
      this.mapOfExpandedData[item.key] = this.convertTreeToList(item);
    });
  }

  collapse(array: TreeNodeInterface[], data: TreeNodeInterface, $event: boolean): void {
    if ($event === false) {
      if (data.children) {
        data.children.forEach(d => {
          // tslint:disable-next-line:no-non-null-assertion
          const target = array.find(a => a.key === d.key)!;
          target.expand = false;
          this.collapse(array, target, false);
        });
      } else {
        return;
      }
    }
  }

  convertTreeToList(root: TreeNodeInterface): TreeNodeInterface[] {
    const stack: TreeNodeInterface[] = [];
    const array: TreeNodeInterface[] = [];
    const hashMap = {};
    stack.push({ ...root, level: 0, expand: false });

    while (stack.length !== 0) {
      // tslint:disable-next-line:no-non-null-assertion
      const node = stack.pop()!;
      this.visitNode(node, hashMap, array);
      if (node.children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          // tslint:disable-next-line:no-non-null-assertion
          stack.push({ ...node.children[i], level: node.level! + 1, expand: false, parent: node });
        }
      }
    }

    return array;
  }


  visitNode(node: TreeNodeInterface, hashMap: { [key: string]: boolean }, array: TreeNodeInterface[]): void {
    if (!hashMap[node.key]) {
      hashMap[node.key] = true;
      array.push(node);
    }
  }


  process() {
    this.superviseProcessFormComponent.show(false);
  }

  show() {
    this.superviseProcessFormComponent.show(true);
  }

}
