import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { STColumn } from '@delon/abc';
import { QueryOptions } from '@ng-mt-framework/api';
import { TABLE_PARAMETER } from '@ng-mt-framework/comp';
import { ObjectUtil } from '@ng-mt-framework/util';
import { NzMessageService } from 'ng-zorro-antd';
import { ProblemTypeService } from '../../common/problem-type-select/ProblemTypeService.service';
import { RectifyProblemTypeService } from '../service/RectifyProblemTypeService';
import { ProblemTypeDetailComponent } from './problem-type-detail.component';
@Component({
  selector: 'app-problem-type-view',
  templateUrl: './problem-type-view.component.html',
  styles: [],
})
export class ProblemTypeViewComponent implements OnInit {
  constructor(private msg: NzMessageService, private rectifyProblemTypeService: RectifyProblemTypeService) {}
  /**
   * 模板类型详情组件
   */
  @ViewChild('problemTypeDetailComponent', { static: false })
  problemTypeDetailComponent: ProblemTypeDetailComponent;
  @Input()
  queryOptions: QueryOptions = {
    page: 0,
    size: 20,
    sort: 'id,desc',
  };

  TABLE_PARAMETER = ObjectUtil.deepClone(TABLE_PARAMETER);

  tableData = [];

  /**
   * 是否存在已启用的模板类型
   */
  hasStart = false;

  loading = false;

  /**
   * 左侧宽度常量
   */
  LEFT_WIDTH = 300;

  /**
   * 左侧树宽度
   */
  leftSize = this.LEFT_WIDTH;

  selectValue = null;

  /** 模板类型数据 */
  listData = [];

  /**
   *
   *  树形表格操作
   */
  mapOfExpandedData: { [id: string]: any[] } = {};

  delete(id: string) {
    this.rectifyProblemTypeService.delete(id).subscribe(data => {
      this.msg.success('删除成功');
      this.loadTableData();
    });
  }

  create() {}

  edit(item: any, isWatch: boolean, create: boolean) {
    if (item.parent != null) {
      item.parentId = item.parent.id;
    }
    this.problemTypeDetailComponent.edit(item, isWatch, create);
  }

  checkedItem() {}

  createDoc() {
    this.problemTypeDetailComponent.edit();
  }

  search() {
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
  templateChange() {}
  ngOnInit(): void {
    this.loadTableData();
  }

  loadTableData() {
    this.rectifyProblemTypeService.findAll().subscribe(data => {
      this.listData = data;
      this.listData.forEach(item => {
        this.mapOfExpandedData[item.id] = this.convertTreeToList(item);
      });
    });
  }
}
