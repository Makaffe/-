import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumnTag } from '@delon/abc';
import { RectifyIssueOrderComponent } from './rectify-issue-order.component';
import { RectifyIssueSplitComponent } from './rectify-issue-split.component';
import { RectifyIssueTransferComponent } from './rectify-issue-transfer.component';
const TAG: STColumnTag = {
  未下发: { text: '未下发', color: 'grey' },
  已下发: { text: '已下发', color: '#008CEC' },
  待处理: { text: '待处理', color: '#F76A00' },
};
const situationTAG: STColumnTag = {
  未移交: { text: '未移交', color: '#D9001B' },
  已移交: { text: '已移交', color: 'green' },
};
@Component({
  selector: 'app-rectify-issue-list',
  templateUrl: './rectify-issue-list.component.html',
  styles: [],
})
export class RectifyIssueListComponent implements OnInit {
  @ViewChild('rectifyIssueSplitComponent', { static: false })
  rectifyIssueSplitComponent: RectifyIssueSplitComponent;
  @ViewChild('rectifyIssueTransferComponent', { static: false })
  rectifyIssueTransferComponent: RectifyIssueTransferComponent;
  @ViewChild('rectifyIssueOrderComponent', { static: false })
  rectifyIssueOrderComponent: RectifyIssueOrderComponent;
  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  listOfAllData: any[] = [];
  mapOfCheckedId: { [key: string]: boolean } = {};

  listOfMapData: any[] = [
    {
      key: 1,
      id: '1',
      status: '未下发',
      situation: '未移交',
      admitName: '审计报告2019',
      proName: '审计项目',
      proDes: '这是一个审计项目',
      proType: '审计整改函',
      department: '整改部门',
      person: '院长',
      suggest: '继续整改',
      proCome: '市医',
      oaSend: '已发送',
      checked: false,
      children: [
        {
          key: 11,
          id: '11',

          status: '未下发',
          situation: '未移交',
          admitName: '审计报告2019',
          proName: '审计项目',
          proDes: '这是一个审计项目',
          proType: '审计整改函',
          department: '整改部门',
          person: '院长',
          suggest: '继续整改',
          proCome: '市医',
          oaSend: '已发送',
          checked: false,
        },
        {
          key: 12,
          id: '12',

          status: '未下发',
          situation: '未移交',
          admitName: '审计报告2019',
          proName: '审计项目',
          proDes: '这是一个审计项目',
          proType: '审计整改函',
          department: '整改部门',
          person: '院长',
          suggest: '继续整改',
          proCome: '市医',
          oaSend: '已发送',
          checked: false,
          children: [
            {
              key: 121,
              id: '121',

              status: '未下发',
              situation: '未移交',
              admitName: '审计报告2019',
              proName: '审计项目',
              proDes: '这是一个审计项目',
              proType: '审计整改函',
              department: '整改部门',
              person: '院长',
              suggest: '继续整改',
              proCome: '市医',
              oaSend: '已发送',
              checked: false,
            },
          ],
        },
        {
          key: 13,
          id: '13',

          status: '未下发',
          situation: '已移交',
          admitName: '审计报告2019',
          proName: '审计项目',
          proDes: '这是一个审计项目',
          proType: '审计整改函',
          department: '整改部门',
          person: '院长',
          suggest: '继续整改',
          proCome: '市医',
          oaSend: '已发送',
          checked: false,
          children: [
            {
              key: 131,
              id: '131',

              status: '未下发',
              situation: '已移交',
              admitName: '审计报告2019',
              proName: '审计项目',
              proDes: '这是一个审计项目',
              proType: '审计整改函',
              department: '整改部门',
              person: '院长',
              suggest: '继续整改',
              proCome: '市医',
              oaSend: '已发送',
              checked: false,
              children: [
                {
                  key: 1311,
                  id: '1311',

                  status: '已下发',
                  situation: '已移交',
                  admitName: '审计报告2019',
                  proName: '审计项目',
                  proDes: '这是一个审计项目',
                  proType: '审计整改函',
                  department: '整改部门',
                  person: '院长',
                  suggest: '继续整改',
                  proCome: '市医',
                  oaSend: '已发送',
                  checked: false,
                },
                {
                  key: 1312,
                  id: '1312',

                  status: '待处理',
                  situation: '已移交',
                  admitName: '审计报告2019',
                  proName: '审计项目',
                  proDes: '这是一个审计项目',
                  proType: '审计整改函',
                  department: '整改部门',
                  person: '院长',
                  suggest: '继续整改',
                  proCome: '市医',
                  oaSend: '已发送',
                  checked: false,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      key: 2,
      id: '2',

      status: '待处理',
      situation: '已移交',
      admitName: '审计报告2019',
      proName: '审计项目',
      proDes: '这是一个审计项目',
      proType: '审计整改函',
      department: '整改部门',
      person: '院长',
      suggest: '继续整改',
      proCome: '市医',
      oaSend: '已发送',
      checked: false,
    },
  ];
  mapOfExpandedData: { [key: string]: any[] } = {};

  collapse(array: any[], data: any, $event: boolean): void {
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

  visitNode(node: any, hashMap: { [key: string]: boolean }, array: any[]): void {
    if (!hashMap[node.key]) {
      hashMap[node.key] = true;
      array.push(node);
    }
  }

  ngOnInit(): void {
    this.listOfMapData.forEach(item => {
      this.mapOfExpandedData[item.key] = this.convertTreeToList(item);
    });
  }

  splitIssue(row) {
    this.rectifyIssueSplitComponent.edit(row);
  }
  transfer(row) {
    this.rectifyIssueTransferComponent.edit();
  }
  order(row) {
    this.rectifyIssueOrderComponent.edit(row);
  }

  currentPageDataChange($event: any[]): void {
    this.listOfMapData = $event;
    this.refreshStatus();
  }

  refreshStatus(): void {
    this.isAllDisplayDataChecked = this.listOfMapData.every(item => this.mapOfCheckedId[item.key]);
    this.isIndeterminate =
      this.listOfMapData.some(item => this.mapOfCheckedId[item.key]) && !this.isAllDisplayDataChecked;
  }

  checkAll(value: boolean): void {
    this.listOfMapData.forEach(item => (this.mapOfCheckedId[item.key] = value));
    this.refreshStatus();
  }
}
