import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
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
  constructor(private rectifyProblemService: RectifyProblemService) {}

  @ViewChild('rectifyIssueSplitComponent', { static: false })
  rectifyIssueSplitComponent: RectifyIssueSplitComponent;
  @ViewChild('rectifyIssueTransferComponent', { static: false })
  rectifyIssueTransferComponent: RectifyIssueTransferComponent;
  @ViewChild('rectifyIssueOrderComponent', { static: false })
  rectifyIssueOrderComponent: RectifyIssueOrderComponent;

  /**
   * 树表格相关参数
   */
  mapOfCheckedId: { [id: string]: boolean } = {};
  listOfMapData = [];
  mapOfExpandedData: { [id: string]: any[] } = {};

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
    rectifyProblemName: null,
    rectifyDepartmentId: null,
    sendStatus: null,
    transferStatus: null,
  };

  /**
   * checkbox选中的数据
   */
  checkboxDatas = [];

  ngOnInit(): void {
    this.load();
  }

  /**
   * 加载表格数据
   */
  load() {
    this.loading = true;
    this.rectifyProblemService
      .findOnePage(
        this.queryOptions,
        this.params.rectifyProblemName,
        this.params.rectifyDepartmentId,
        this.params.sendStatus,
        this.params.transferStatus,
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
          this.mapOfCheckedId = {};
          this.checkboxDatas = [];
          this.checkboxChange.emit([]);
          this.loading = false;
        },
      );
  }

  /**
   * 选中checkbox方法
   * @param item 参数
   * @param isCheck 是否选中
   */
  checked(item: RectifyProblemDTO, isCheck: boolean) {
    if (isCheck) {
      this.checkboxDatas.push(item);
    } else {
      this.checkboxDatas = this.checkboxDatas.filter(problem => problem.id !== item.id);
    }
    this.checkboxChange.emit(this.checkboxDatas);
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
    this.rectifyIssueSplitComponent.edit(item);
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
}
