import { OrganizationService } from '@ng-mt-framework/api';
import { deepCopy } from '@delon/util';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { QueryOptions } from '@mt-framework-ng/core';
import { RectifyProblemDTO } from './model/rectify-problem-dto';
import { RectifyIssueOrderComponent } from './rectify-issue-order.component';
import { RectifyIssueSplitComponent } from './rectify-issue-split.component';
import { RectifyIssueTransferComponent } from './rectify-issue-transfer.component';
import { RectifyProblemService } from './service/RectifyProblemService';
@Component({
  selector: 'app-rectify-issue-list',
  templateUrl: './rectify-issue-list.component.html',
  styles: [],
})
export class RectifyIssueListComponent implements OnInit {

  constructor(
    private rectifyProblemService: RectifyProblemService,
    private organizationService: OrganizationService,
    private router: Router) { }

  @ViewChild('rectifyIssueSplitComponent', { static: false })
  rectifyIssueSplitComponent: RectifyIssueSplitComponent;
  @ViewChild('rectifyIssueTransferComponent', { static: false })
  rectifyIssueTransferComponent: RectifyIssueTransferComponent;
  @ViewChild('rectifyIssueOrderComponent', { static: false })
  rectifyIssueOrderComponent: RectifyIssueOrderComponent;

  /**
   * 是否是统计分析（当为true是只有查看且没有checkbox）
   */
  @Input()
  isAnalysis = false;

  /**
   * 给模态框通知，关闭模态框
   */
  @Output()
  closeModal = new EventEmitter();

  /**
   * 树表格相关参数
   */
  mapOfCheckedId: { [id: string]: boolean } = {};
  /**
   * 列表数据
   */
  listOfMapData: any = [
    {
      id: '1',
      sendStatus: 'NOT_ISSUED',
      transferStatus: 'NOT_HANDED_OVER',
      trackStatus: 'NOT_RECTIFIED',
      auditReport: { name: '关于XXX部门审计报告测试' },
      name: '11-18XXXXX发现问题',
      rectifyProblemType: { name: '管理制度不完善' },
      level: 0,
      children: [
        {
          id: '1-1',
          sendStatus: 'NOT_ISSUED',
          transferStatus: 'NOT_HANDED_OVER',
          trackStatus: 'NOT_RECTIFIED',
          auditReport: { name: '关于XXX部门审计报告测试' },
          name: '拆分XXX问题1',
          rectifyProblemType: { name: '管理制度不完善' },
          level: 1,
          children: []
        },
        {
          id: '1-2',
          sendStatus: 'NOT_ISSUED',
          transferStatus: 'NOT_HANDED_OVER',
          trackStatus: 'NOT_RECTIFIED',
          auditReport: { name: '关于XXX部门审计报告测试' },
          name: '拆分XXX问题2',
          rectifyProblemType: { name: '管理制度不完善' },
          level: 1,
          children: []
        }
      ]
    },
    {
      id: '2',
      sendStatus: 'NOT_ISSUED',
      transferStatus: 'NOT_HANDED_OVER',
      trackStatus: 'NOT_RECTIFIED',
      auditReport: { name: '关于XXX部门审计报告测试' },
      name: '11-26XXXXX发现问题',
      rectifyProblemType: { name: '人员分配不合理' },
      level: 0,
      children: []
    },
  ];

  /**
   * 列表数据(父子平级，只存储没有子节点的数据，方便获取选中的数据和控制选中状态)
   */
  listOfMapDataPeers: Array<RectifyProblemDTO> = [];

  mapOfExpandedData: { [id: string]: any[] } = {};

  isAllDisplayDataChecked = false;

  isIndeterminate = false;

  /**
   * checkbox的Output
   */
  @Output()
  checkboxChange = new EventEmitter();

  /**
   * 请求标识
   */
  loading = false;

  /**
   * 分页参数
   */
  private queryOptions: QueryOptions = {
    page: 0,
    size: 20,
    sort: 'sendStatus,desc,id,desc',
  };

  /**
   * 树状表格分页参数
   */
  pageInfo = {
    pageNo: 1,
    pageSize: 20,
    totalPages: 1,
    totalRecords: 20,
  };

  /**
   * 过滤参数
   */
  @Input()
  params = {
    reportName: null,
    startTime: null,
    endTime: null,
    rectifyProblemId: null,
    rectifyProblemName: null,
    sendStatus: null,
    isAllot: null,
    rectifyObject: null,
    dutyUserName: null,
    trackStatus: null
  };

  /**
   * checkbox选中的数据
   */
  checkboxData = [];

  /**
   * 是否是工作台里的问题切换
   */
  @Input()
  isProblemSwich = false;

  organizationTreeMap: Map<string, string> = new Map<string, string>();

  ngOnInit(): void {
    this.loadOrg();
    // this.load();
    this.listOfMapData.forEach(item => {
      this.mapOfExpandedData[item.id] = this.convertTreeToList(item);
    });
  }

  /**
   * 加载表格数据
   */
  load() {
    this.loading = true;
    this.isProblemSwich
      ? (this.queryOptions.sort = 'sendStatus,asc,id,desc')
      : (this.queryOptions.sort = 'sendStatus,desc,id,desc');
    this.rectifyProblemService.findOnePage(this.queryOptions, this.params.reportName, this.params.startTime,
      this.params.endTime, this.params.rectifyProblemId, this.params.rectifyProblemName, this.params.sendStatus,
      this.params.isAllot, this.params.rectifyObject, this.params.dutyUserName, this.params.trackStatus)
      .subscribe(
        data => {
          if (data) {
            this.initDto(data.data);
            this.listOfMapData = [...data.data];
            this.pageInfo.pageNo = data.pageNo + 1;
            this.pageInfo.pageSize = data.pageSize;
            this.pageInfo.totalPages = data.totalPages;
            this.pageInfo.totalRecords = Number(data.totalRecords);
            this.listOfMapData.forEach(item => {
              this.mapOfExpandedData[item.id] = this.convertTreeToList(item);
            });
            this.fomatListOfMapDataPeers(data.data);
          }
        },
        () => { },
        () => {
          this.mapOfCheckedId = {};
          this.checkboxData = [];
          this.checkboxChange.emit([]);
          this.loading = false;
        },
    );
  }

  /**
   * 初始化表格数据
   */
  initDto(listData: Array<RectifyProblemDTO>) {
    listData.forEach(item => {
      let unitAndDepartment = '';
      // if (item.rectifyDepartment && item.rectifyUnit) {
      //   unitAndDepartment = item.rectifyUnit.name + '/' + item.rectifyDepartment.name;
      // }
      let orgs = item.orgLevel ? item.orgLevel.split(',') : [];
      orgs = orgs.slice(0, orgs.length - 2); // 只要不为空，长度肯定超过2
      orgs.forEach(org => {
        unitAndDepartment = unitAndDepartment + this.organizationTreeMap.get(org) + '/';
      });
      unitAndDepartment = unitAndDepartment.slice(0, unitAndDepartment.length - 1);
      Object.assign(item, { unitAndDepartment });
      if (item.children && item.children.length > 0) {
        this.initDto(item.children);
      }
    });
  }

  /**
   * 选中checkbox方法
   * @param item 参数
   * @param isCheck 是否选中
   */
  checked(item: RectifyProblemDTO, isCheck: boolean) {
    if (!this.isProblemSwich) {
      if (isCheck) {
        this.checkboxData.push(item);
      } else {
        this.checkboxData = this.checkboxData.filter(problem => problem.id !== item.id);
      }
    } else {
      if (isCheck) {
        if (this.checkboxData.length > 0) {
          this.mapOfCheckedId[this.checkboxData[0].id] = false;
        }
        this.checkboxData = [];
        this.checkboxData.push(item);
      } else {
        this.checkboxData = [];
      }
    }
    this.isAllDisplayDataChecked = this.listOfMapDataPeers.every(e => this.mapOfCheckedId[e.id]);
    this.isIndeterminate = this.listOfMapDataPeers.some(d => this.mapOfCheckedId[d.id]) && !this.isAllDisplayDataChecked;
    this.checkboxChange.emit(this.checkboxData);
  }

  checkAll(value: boolean) {
    this.listOfMapDataPeers.forEach(item => (this.mapOfCheckedId[item.id] = value));
    // this.checkData(this.listOfMapData, value);
    this.isAllDisplayDataChecked = value;
    this.isIndeterminate = this.listOfMapDataPeers.some(d => this.mapOfCheckedId[d.id]) && !this.isAllDisplayDataChecked;
    this.checkboxData = value ? deepCopy(this.listOfMapDataPeers) : [];
    this.checkboxChange.emit(this.checkboxData);
    console.log(this.checkboxData);
  }

  // checkData(data: Array<RectifyProblemDTO>, value: boolean) {
  //   data.forEach(d => {
  //     this.mapOfCheckedId[d.id] = value;
  //     if (d.children && d.children.length > 0) {
  //       this.checkData(d.children, value);
  //     }
  //   });
  // }

  fomatListOfMapDataPeers(data: Array<RectifyProblemDTO>) {
    data.forEach(d => {
      if (d.children && d.children.length > 0) {
        this.fomatListOfMapDataPeers(d.children);
      } else {
        this.listOfMapDataPeers.push(d);
      }
    });
  }


  /**
   * 每页条数改变的回调
   */
  pageSizeChange(pageSize: number) {
    this.queryOptions.size = pageSize;
    this.load();
  }

  /**
   * 	页码改变的回调
   */
  pageIndexChange(pageIndex: number) {
    this.queryOptions.page = pageIndex - 1;
    this.load();
  }

  /**
   * 拆分
   * @param item 整改问题数据
   */
  splitIssue(item: RectifyProblemDTO) {
    this.rectifyIssueSplitComponent.edit(item, false);
  }

  /**
   * 查看
   * @param item 整改问题数据
   */
  watch(item: RectifyProblemDTO) {
    this.rectifyIssueSplitComponent.edit(item, true);
    // if (!this.isProblemSwich) {
    //   if (item.sendStatus === '未下发') {
    //     this.rectifyIssueSplitComponent.edit(item, true);
    //   } else {
    //     if (this.isAnalysis) {
    //       this.closeModal.emit('关闭');
    //       setTimeout(() => {
    //         this.router.navigate(['/audit-rectify/rectify-workbeach'], {
    //           // queryParams: { rectifyProblemId: id, isWatch: true },
    //           queryParams: { isWatch: true },
    //         });
    //       }, 500);
    //     } else {
    //       this.router.navigate(['/audit-rectify/rectify-workbeach'], {
    //         // queryParams: { rectifyProblemId: id, isWatch: true },
    //         queryParams: { isWatch: true },
    //       });
    //     }
    //   }
    // }
  }

  /**
   * 移交
   * @param problems 整改问题数据
   */
  transfer(problems: Array<RectifyProblemDTO>) {
    this.rectifyIssueTransferComponent.edit(problems);
  }

  /**
   * 下发
   * @param problems 整改问题数据
   */
  order(problems: Array<RectifyProblemDTO>) {
    this.rectifyIssueOrderComponent.edit(problems);
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

  loadOrg() {
    this.organizationService.findUserTree().subscribe(data => {
      this.fomatData(data);
    });
  }

  fomatData(data?: Array<any>) {
    data = data.filter((row) => row.id > 0);
    data = [...data];
    data.forEach(item => {
      this.organizationTreeMap.set(item.id, item.name);
      item.children = item.userBaseDTOS && item.userBaseDTOS.length > 0 ? item.userBaseDTOS : item.children;
      if (item && item.children && item.children.length > 0) {
        this.fomatData(item.children);
      } else if (!item.organizationType || !item.children || item.children.length === 0) {
        item.isLeaf = true;
      }
    });
  }
}
