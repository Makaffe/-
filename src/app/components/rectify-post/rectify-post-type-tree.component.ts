import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { RectifyPostTypeTreeEditComponent } from './rectify-post-type-tree-edit.component';

@Component({
  selector: 'rectify-post-type-tree',
  templateUrl: './rectify-post-type-tree.component.html',
  styleUrls: ['./rectify-post-type-tree.component.less'],
})
export class RectifyPostTypeTreeComponent implements OnInit {
  @ViewChild('knowledgeTypeTreeEditComponent', { static: false })
  knowledgeTypeTreeEditComponent: RectifyPostTypeTreeEditComponent;
  /**
   * 在法规索引引用时不显示操作按钮
   */
  @Input()
  isShowIndexButton = true;
  /**
   * 左侧宽度常量
   */
  ORGANIZATION_TREE_WIDTH = 250;

  /**
   * 左侧组织机构树宽度
   */
  leftSize = this.ORGANIZATION_TREE_WIDTH;
  /**
   * 选中节点事件
   * @param 节点点击事件 发送审计知识类型节点Id
   */
  @Output()
  selectNodeEvent = new EventEmitter<any>();
  /**
   * 当前选中审计知识类型节点Id
   */
  @Input()
  selectedNode: any = null;
  @Output()
  selectedNodeChange = new EventEmitter<any>();
  /**
   * 当前选中审计知识类型所属分类
   */
  @Input()
  knowledgeType = 'LAW';

  /**
   * 搜索输入的内容
   */
  searchValue = '';

  constructor() {}

  // 左侧树节点数据
  nodes = [];

  /**
   * 新增树的类型
   */
  openTree() {
    this.knowledgeTypeTreeEditComponent.edit();
  }
  editTree() {
    this.knowledgeTypeTreeEditComponent.edit();
  }

  nzClick(event: any) {
    if (event.keys && event.keys.length > 0) {
      this.selectedNode = event.node.origin;
      this.selectNodeEvent.emit(this.selectedNode);
      this.selectedNode = event.node.origin;
      this.selectedNodeChange.emit(this.selectedNode);
    } else {
      this.selectedNode = null;
      this.selectNodeEvent.emit(this.selectedNode);
      this.selectedNodeChange.emit(this.selectedNode);
    }
  }

  ngOnInit(): void {
    this.loadTree();
  }

  loadTree(): void {
    // tslint:disable-next-line: deprecation
  }

  nzSearch($event) {}

  tramsform(data: any[], level: number): void {
    let counter = 0;
    data.forEach(item => {
      item.title = item.name;
      item.key = `${level + counter}`;
      counter++;
      if (item.children && item.children.length > 0) {
        this.tramsform(item.children, level * 10);
      }
    });
  }

  deleteNode(): void {
    // tslint:disable-next-line: deprecation
  }
}
