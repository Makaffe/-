import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumnTag } from '@delon/abc';
import { TABLE_PARAMETER } from '@mt-framework-ng/core';
import { ObjectUtil } from '@ng-mt-framework/util';
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
// <th nzWidth="100px">序号</th>
//     <th nzWidth="100px">状态</th>
//     <th nzWidth="100px">移交情况</th>
//     <th nzWidth="100px">审计报告名称</th>
//     <th nzWidth="150px">问题名称</th>
//     <th nzWidth="150px">问题描述</th>
//     <th nzWidth="150px">问题类型</th>
//     <th nzWidth="150px">整改部门</th>
//     <th nzWidth="150px">整改负责人</th>
//     <th nzWidth="150px">审计建议</th>
//     <th nzWidth="150px">问题来源</th>
//     <th nzWidth="150px">OA发送情况</th>
export interface ItemData {
  key: number;
  id: string;
  status: string;
  situation: string;
  admitName: string;
  proName: string;
  proDes: string;
  proType: string;
  department: string;
  person: string;
  suggest: string;
  proCome: string;
  oaSend: string;
  level?: number;
  checked: boolean;
  expand?: boolean;
  children?: ItemData[];
  parent?: ItemData;
}
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rectify-issue-list',
  templateUrl: './rectify-issue-list.component.html',
  styles: [],
})
export class RectifyIssueListComponent implements OnInit {
  @ViewChild('rectifyIssueSplitComponent', { static: false })
  rectifyIssueSplitComponent: RectifyIssueSplitComponent;
  @ViewChild('rectifyIssueTransferComponent', { static: false })
  rectifyIssueTransferComponent: RectifyIssueTransferComponent;
  // /**
  //  * 列表数据
  //  */
  // tableData: Array<any> = [
  //   {
  //     state: '未下发',
  //     postName: '2021-09审计报告',
  //     situation: '未移交',
  //     unitName: '审计一部',
  //     time: '2021-10-12',
  //     issueAmount: '33',
  //   },
  // ];
  // /**
  //  * 列表参数
  //  */
  // tableParameter = ObjectUtil.deepClone(TABLE_PARAMETER);
  // columns = [
  //   { title: '序号', width: '50px', className: 'text-center', type: 'checkbox', fixed: 'left' },
  //   { title: '序号', render: 'number', width: '100px', className: 'text-center', type: 'radio', fixed: 'left' },
  //   {
  //     title: '状态',
  //     index: 'state',
  //     width: '100px',
  //     sort: this.tableParameter.sortDef,
  //     fixed: 'left',
  //     className: 'text-center',
  //     type: 'tag',
  //     tag: TAG,
  //   },
  //   {
  //     title: '移交情况',
  //     index: 'situation',
  //     width: '150px',
  //     sort: this.tableParameter.sortDef,
  //     className: 'text-center',
  //     type: 'tag',
  //     tag: situationTAG,
  //   },
  //   {
  //     title: '审计报告名称',
  //     index: 'postName',
  //     width: '150px',
  //     sort: this.tableParameter.sortDef,
  //     className: 'text-center',
  //   },
  //   {
  //     title: '问题名称',
  //     index: 'unitName',
  //     width: '150px',
  //     sort: this.tableParameter.sortDef,
  //     className: 'text-left',
  //   },
  //   {
  //     title: '问题描述',
  //     index: 'unitName',
  //     width: '150px',
  //     sort: this.tableParameter.sortDef,
  //     className: 'text-left',
  //   },
  //   {
  //     title: '问题类型',
  //     index: 'unitName',
  //     width: '150px',
  //     sort: this.tableParameter.sortDef,
  //     className: 'text-left',
  //   },
  //   {
  //     title: '整改部门',
  //     index: 'unitName',
  //     width: '150px',
  //     sort: this.tableParameter.sortDef,
  //     className: 'text-left',
  //   },
  //   {
  //     title: '整改负责人',
  //     index: 'unitName',
  //     width: '150px',
  //     sort: this.tableParameter.sortDef,
  //     className: 'text-left',
  //   },
  //   {
  //     title: '审计建议',
  //     index: 'unitName',
  //     width: '150px',
  //     sort: this.tableParameter.sortDef,
  //     className: 'text-left',
  //   },
  //   {
  //     title: '问题来源',
  //     index: 'unitName',
  //     width: '150px',
  //     sort: this.tableParameter.sortDef,
  //     className: 'text-left',
  //   },
  //   {
  //     title: 'OA发送情况',
  //     index: 'unitName',
  //     width: '150px',
  //     sort: this.tableParameter.sortDef,
  //     className: 'text-left',
  //   },
  //   { title: '操作', render: 'operations', width: '150px', className: 'text-center', fixed: 'right' },
  // ];
  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  listOfAllData: ItemData[] = [];
  mapOfCheckedId: { [key: string]: boolean } = {};

  listOfMapData: ItemData[] = [
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
  mapOfExpandedData: { [key: string]: ItemData[] } = {};

  collapse(array: ItemData[], data: ItemData, $event: boolean): void {
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

  convertTreeToList(root: ItemData): ItemData[] {
    const stack: ItemData[] = [];
    const array: ItemData[] = [];
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

  visitNode(node: ItemData, hashMap: { [key: string]: boolean }, array: ItemData[]): void {
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

  currentPageDataChange($event: ItemData[]): void {
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
