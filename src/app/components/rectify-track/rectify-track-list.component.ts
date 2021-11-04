import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TABLE_PARAMETER } from '@mt-framework-ng/core';
import { OrganizationService } from '@ng-mt-framework/api';
import { QueryOptions } from '@ng-mt-framework/api/lib/model/common/query-options';
import { ObjectUtil } from '@ng-mt-framework/util';
import { NzMessageService } from 'ng-zorro-antd';
import { RectifyIssueTransferComponent } from '../rectify-issue/rectify-issue-transfer.component';
import { RectifyProblemService } from '../rectify-issue/service/RectifyProblemService';
import { RectifyTrackDTO } from './model/RectifyTrackDTO';

@Component({
  selector: 'app-rectify-track-list',
  templateUrl: './rectify-track-list.component.html',
  styles: [],
})
export class RectifyTrackListComponent implements OnInit {
  /**
   * 纪检组件
   */
  @ViewChild('rectifyIssueTransferComponent', { static: false })
  rectifyIssueTransferComponent: RectifyIssueTransferComponent;

  constructor(
    private router: Router,
    private msg: NzMessageService,
    private rectifyProblemService: RectifyProblemService,
    private organizationService: OrganizationService,
  ) {}

  /**
   * 表格title
   */
  @Input()
  title = '';

  /**
   * 表格高度
   */
  @Input()
  tableHeight = '100%';

  /**
   * 树表格相关参数
   */
  listOfMapData = [];
  mapOfExpandedData: { [id: string]: any[] } = {};

  @Output()
  tableOperations = new EventEmitter<any>();

  /**
   * 搜索条件
   */
  @Input()
  filter = {
    rectifyProblemName: null,
    rectifyDepartmentId: null,
    sendStatus: null,
    transferStatus: null,
    startTime: null,
    endTime: null,
  };

  /**
   * 列表加载状态
   */
  loading = false;

  /**
   * 列表数据
   */
  tableData: Array<RectifyTrackDTO> = [];

  /**
   * 列表参数
   */
  tableParameter = ObjectUtil.deepClone(TABLE_PARAMETER);

  /**
   * 分页，排序参数
   */
  @Input()
  queryOptions: QueryOptions = {
    page: 0,
    size: 20,
    sort: 'id,desc',
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

  ngOnInit() {
    this.load();
    this.listOfMapData.forEach(item => {
      this.mapOfExpandedData[item.id] = this.convertTreeToList(item);
    });
  }

  /**
   * 加载列表
   *
   */
  load() {
    this.loading = true;
    this.rectifyProblemService
      .findOnePageUsingGET(
        this.queryOptions,
        this.filter.rectifyProblemName,
        this.filter.rectifyDepartmentId,
        this.filter.sendStatus ? this.filter.sendStatus : 'ISSUED',
        this.filter.transferStatus,
        this.filter.startTime,
        this.filter.endTime,
      )
      .subscribe(
        data => {
          if (data) {
            this.listOfMapData = data.data;
            this.pageInfo.pageNo = data.pageNo + 1;
            this.pageInfo.pageSize = data.pageSize;
            this.pageInfo.totalPages = data.totalPages;
            this.pageInfo.totalRecords = Number(data.totalRecords);
            this.listOfMapData.forEach(item => {
              this.mapOfExpandedData[item.id] = this.convertTreeToList(item);
            });
          }
        },
        () => {},
        () => {
          this.loading = false;
        },
      );
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

  checkTransferResult() {
    this.router.navigate(['/audit-rectify/transfer-result']);
  }
  // 跳转工作台
  goWorkBeach(id: string) {
    this.router.navigate(['/audit-rectify/rectify-workbeach'], { queryParams: { rectifyProblemId: id } });
  }

  /**
   * 移交纪检
   */
  transfer(item: any, isLook: boolean) {
    const arr = [];
    arr.push(item);
    if (isLook) {
      this.rectifyIssueTransferComponent.isReadOnly = true;
      this.rectifyIssueTransferComponent.createDate = false;
    } else {
      this.rectifyIssueTransferComponent.isReadOnly = false;
      this.rectifyIssueTransferComponent.createDate = true;
    }

    this.rectifyIssueTransferComponent.edit(arr);
  }
}
