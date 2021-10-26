import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService, NzTreeNodeOptions } from 'ng-zorro-antd';
import { RectifyProblemService } from '../rectify-issue/service/RectifyProblemService';

@Component({
  selector: 'app-rectify-time-line',
  templateUrl: './rectify-time-line.component.html',
  styles: [
    `
      :host ::ng-deep tr {
        background-color: white !important;
        border: none !important;
        border-bottom: none !important;
      }
      :host ::ng-deep td {
        border: none !important;
        border-bottom: none !important;
      }

      :host ::ng-deep .ant-table-header tr:last-child th,
      nz-table .ant-table-content .ant-table-body tr:last-child th,
      nz-table .ant-table-content .ant-table-header tr:last-child td,
      nz-table .ant-table-content .ant-table-body tr:last-child td,
      nz-table .ant-table-content .ant-table-body tr:last-child td {
        border-bottom: none !important;
      }
      :host ::ng-deep nz-table .ant-table-content {
        border-bottom: none !important;
      }
    `,
  ],
})
export class RectifyTimeLineComponent implements OnInit {
  tableClickId: string;

  listOfMapData = [
    // {
    //   id: 1,
    //   name: '关于防护林资金使用问题',
    //   author: '广州市自然',
    //   time: '2021-10-20',
    //   timeLines: [],
    //   children: [
    //     {
    //       id: 11,
    //       name: '',
    //       author: '',
    //       time: '',
    //       timeLines: [
    //         {
    //           name: '问题下发',
    //           id: '1000',
    //           author: '审计人员',
    //           time: '2021-10-20',
    //           objectType: '1',
    //           active: true,
    //         },
    //         {
    //           name: '整改通知书发送到OA',
    //           id: '1001',
    //           author: '审计人员',
    //           time: '2021-10-21',
    //           active: true,
    //           objectType: '2',
    //         },
    //       ],
    //     },
    //   ],
    // },
    {
      id: 2,
      name: '关于防护林资金使用问题2',
      author: '广州市自然',
      time: '2021-10-20',
      timeLines: [],
      children: [
        {
          id: 21,
          name: '关于防护林资金使用问题21',
          author: '广州市自然',
          time: '2021-10-21',
          timeLines: [],
          children: [
            {
              id: 211,
              name: '',
              author: '',
              time: '',
              timeLines: [
                {
                  name: '问题下发',
                  id: '2000',
                  author: '审计人员',
                  time: '2021-10-20',
                  objectType: '1',
                },
                {
                  name: '整改通知书发送到OA',
                  id: '2001',
                  author: '审计人员',
                  time: '2021-10-21',
                  objectType: '2',
                },
              ],
            },
          ],
        },
        {
          id: 22,
          name: '关于防护林资金使用问题3',
          author: '广州市自然',
          time: '2021-10-21',
          timeLines: [],
          children: [
            {
              id: 221,
              name: '',
              author: '',
              time: '',
              timeLines: [
                {
                  name: '问题下发',
                  id: '2200',
                  author: '审计人员',
                  time: '2021-10-20',
                  objectType: '1',
                },
                {
                  name: '整改通知书发送到OA',
                  id: '2201',
                  author: '审计人员',
                  time: '2021-10-21',
                  objectType: '2',
                },
              ],
            },
          ],
        },
      ],
    },
  ];
  mapOfExpandedData: { [id: string]: any[] } = {};

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private rectifyProblemService: RectifyProblemService,
    private msg: NzMessageService,
  ) {}

  ngOnInit(): void {
    this.listOfMapData.forEach(item => {
      this.mapOfExpandedData[item.id] = this.convertTreeToList(item);
    });
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

  marginLeft(level: number) {
    const margin = level * 25;
    return margin + 'px';
  }

  tableClick(id: string) {
    this.tableClickId = id;
  }
}
