import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TreeUtil } from '@mt-framework-ng/util';
import { NzMessageService } from 'ng-zorro-antd';
import { RectifyPostTypeTreeEditComponent } from './rectify-post-type-tree-edit.component';
import { RectificationReportTypeService } from './service/RectificationReportTypeService';

@Component({
  // tslint:disable-next-line:component-selector
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
  /**
   * 当前选中审计知识类型所属分类
   */
  @Input()
  knowledgeType = 'LAW';

  /**
   * 搜索输入的内容
   */
  searchValue = '';

  /**
   * 树区域加载状态
   */
  spinning = false;

  // 左侧树节点数据
  nodes = [];

  constructor(private rectificationReportTypeService: RectificationReportTypeService, private msg: NzMessageService) { }

  ngOnInit(): void {
    this.loadTree();
  }

  /**
   * 新增树的类型
   */
  editTree(isEdit?: boolean) {
    this.knowledgeTypeTreeEditComponent.edit(isEdit);
  }

  nzClick(event: any) {
    if (event.keys && event.keys.length > 0 && event.node.origin.name !== '所有报告') {
      this.selectedNode = event.node.origin;
      this.selectNodeEvent.emit(this.selectedNode);
    } else {
      this.selectedNode = null;
      this.selectNodeEvent.emit(this.selectedNode);
    }
  }



  loadTree(): void {
    this.spinning = true;
    this.rectificationReportTypeService.findAll().subscribe(data => {
      if (data && data.length > 0) {
        this.nodes = TreeUtil.populateTreeNodes(data, 'id', 'name', 'children');
        this.nodes[0].isSelectable = false;
        this.selectedNode = null;
      }
    }, null, () => { this.spinning = false; });
  }

  nzSearch($event) { }

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
    this.rectificationReportTypeService.delete(this.selectedNode.id).subscribe(() => {
      this.msg.success('删除成功!');
      this.loadTree();
    });
  }
}
