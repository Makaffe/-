import { Component, OnInit, ViewChild } from '@angular/core';
import { TransferInfoService } from 'src/app/components/rectify-issue/service/TransferInfoService';
import { SuperviseProcessFormComponent } from '../supervise-process-form/supervise-process-form.component';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'supervise-wait-tab',
  templateUrl: './supervise-wait-tab.component.html',
  styles: [],
})
export class SuperviseWaitTabComponent implements OnInit {
  @ViewChild('superviseProcessFormComponent', { static: false })
  superviseProcessFormComponent: SuperviseProcessFormComponent;

  constructor(private transferInfoService: TransferInfoService) {}

  mapOfExpandedData: { [id: string]: any[] } = {};
  listOfMapData: any[] = [
    {
      id: 1,
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
          id: 11,
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
      id: 2,
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
    this.loadTableData();
  }

  collapse(array: any[], data: any, $event: boolean): void {
    if ($event === false) {
      if (data.children) {
        data.children.forEach(d => {
          // tslint:disable-next-line:no-non-null-assertion
          const target = array.find(a => a.id === d.id)!;
          target.expand = false;
          this.collapse(array, target, false);
        });
      } else {
        return;
      }
    }
  }

  convertTreeToList(root: any): any[] {
    const stack: any[] = [];
    const array: any[] = [];
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

  visitNode(node: any, hashMap: { [id: string]: boolean }, array: any[]): void {
    if (!hashMap[node.id]) {
      hashMap[node.id] = true;
      array.push(node);
    }
  }

  process() {
    this.superviseProcessFormComponent.show(false);
  }

  show() {
    this.superviseProcessFormComponent.show(true);
  }

  loadTableData() {
    this.transferInfoService.findAll().subscribe(data => {
      this.listOfMapData = data;
      this.listOfMapData.forEach(item => {
        this.mapOfExpandedData[item.id] = this.convertTreeToList(item);
      });
    });
  }
}
