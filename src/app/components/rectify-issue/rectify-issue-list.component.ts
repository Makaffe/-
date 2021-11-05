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
  constructor(private rectifyProblemService: RectifyProblemService, private router: Router) { }

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
  listOfMapData: Array<RectifyProblemDTO> = [];

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
  checkboxData = [];

  ngOnInit(): void {
    this.load();
    // this.listOfMapData.forEach(item => {
    //   this.mapOfExpandedData[item.id] = this.convertTreeToList(item);
    // });
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
            this.initDto(data.data);
            console.log('initlistOfMapData', this.listOfMapData);
            this.listOfMapData = [...data.data];
            this.pageInfo.pageNo = data.pageNo + 1;
            this.pageInfo.pageSize = data.pageSize;
            this.pageInfo.totalPages = data.totalPages;
            this.pageInfo.totalRecords = Number(data.totalRecords);
            this.listOfMapData.forEach(item => {
              this.mapOfExpandedData[item.id] = this.convertTreeToList(item);
            });
            console.log('listOfMapData', this.listOfMapData);
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
      if (item.rectifyDepartment && item.rectifyUnit) {
        unitAndDepartment = item.rectifyUnit.name + '/' + item.rectifyDepartment.name;
      }
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
    if (isCheck) {
      this.checkboxData.push(item);
    } else {
      this.checkboxData = this.checkboxData.filter(problem => problem.id !== item.id);
    }
    this.checkboxChange.emit(this.checkboxData);
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
    if (item.sendStatus === '未下发') {
      this.rectifyIssueSplitComponent.edit(item, true);
    } else {
      if (this.isAnalysis) {
        this.closeModal.emit('关闭');
        setTimeout(() => {
          this.router.navigate(['/audit-rectify/rectify-workbeach'], {
            // queryParams: { rectifyProblemId: id, isWatch: true },
            queryParams: { isWatch: true },
          });
        }, 500);
      } else {
        this.router.navigate(['/audit-rectify/rectify-workbeach'], {
          // queryParams: { rectifyProblemId: id, isWatch: true },
          queryParams: { isWatch: true },
        });
      }
    }
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
    console.log('problems22', problems);
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
