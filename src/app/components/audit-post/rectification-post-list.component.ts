import { Component, OnInit, ViewChild } from '@angular/core';
import { AuditPostWatchComponent } from '../rectify-issue/audit-post-watch.component';
import { RectifyIssueSplitComponent } from '../rectify-issue/rectify-issue-split.component';
@Component({
  selector: 'app-rectification-post-list',
  templateUrl: './rectification-post-list.component.html',
}) // <!-- 报告名称/问题名称/涉及金额/进度/截止日期/整改负责人/操作 -->
export class RectificationPostListComponent implements OnInit {
  @ViewChild('auditPostWatchComponent', { static: false })
  auditPostWatchComponent: AuditPostWatchComponent;
  @ViewChild('rectifyIssueSplitComponent', { static: false })
  rectifyIssueSplitComponent: RectifyIssueSplitComponent;

  listOfMapData = [
    {
      id: 1,
      auditname: '审计报告一',
      money: 60000,
      process: 95,
      dutyUser: '张伟',
      auditEndTime: '2020-10-27',
      children: [
        {
          id: 11,
          name: '工作分配不均',
          type: '人力资源管理',
          remark: '长期不在岗职工清理不到位人员提升未履行审批手续',
          advice: '继续整改',
          source: '内部控制方面	',
          money: 59000,
          process: 100,
          auditEndTime: '2020-10-27',
          dutyUser: '李四',
          auditPost: {
            name: '审计报告一',
            money: 60000,
            process: 95,
            dutyUser: '张伟',
            auditEndTime: '2020-10-27',
          },
        },
        {
          id: 12,
          name: '任务分配不均',
          type: '人力资源管理',
          advice: '继续整改',
          remark: '长期不在岗职工清理不到位人员提升未履行审批手续',
          source: '内部控制方面	',
          money: 1000,
          process: 50,
          auditEndTime: '2020-10-27',
          dutyUser: '李四',
          auditPost: {
            name: '审计报告一',
            money: 60000,
            process: 95,
            dutyUser: '张伟',
            auditEndTime: '2020-10-27',
          },
          children: [
            {
              id: 121,
              name: '人手不够',
              advice: '继续整改',
              remark: '长期不在岗职工清理不到位人员提升未履行审批手续',
              type: '人力资源管理',
              source: '内部控制方面	',
              money: 1000,
              process: 10,
              auditEndTime: '2020-10-27',
              dutyUser: '王五',
              auditPost: {
                name: '审计报告一',
                money: 60000,
                process: 95,
                dutyUser: '张伟',
                auditEndTime: '2020-10-27',
              },
            },
          ],
        },
      ],
    },
  ];
  mapOfExpandedData: { [id: string]: any[] } = {};

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
  ngOnInit(): void {
    this.listOfMapData.forEach(item => {
      this.mapOfExpandedData[item.id] = this.convertTreeToList(item);
    });
  }

  /**
   * 调用查看审计报告接口
   */
  watch(item: any) {
    if (item.id < 10) {
      this.auditPostWatchComponent.watch(item);
    } else {
      this.rectifyIssueSplitComponent.edit(item, true);
    }
  }
}
