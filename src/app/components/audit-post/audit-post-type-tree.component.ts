import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { QueryOptions } from '@ng-mt-framework/api';
import { TreeUtil } from '@ng-mt-framework/comp';
import { NzDropdownContextComponent, NzMessageService, NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd';

import { AuditPostTreeEditComponent } from './audit-post-tree-edit.component';
import { AuditPostTypeService } from './service/AuditPostTypeService';

@Component({
  selector: 'audit-post-type-tree',
  templateUrl: './audit-post-type-tree.component.html',
  styleUrls: ['./audit-post-type-tree.component.less'],
})
export class AuditPostTypeTreeComponent implements OnInit {
  @ViewChild('knowledgeTypeTreeEditComponent', { static: false })
  knowledgeTypeTreeEditComponent: AuditPostTreeEditComponent;
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
   * 后台请求标志
   */
  loading = false;

  /**
   * 右键存放节点
   */
  contextItem: NzTreeNode;

  checkable = false;
  /**
   * 右键菜单组件
   */
  dropdown: NzDropdownContextComponent;

  private options: QueryOptions = {
    page: 0,
    size: 20,
    sort: 'id,asc',
  };

  /**
   * 搜索输入的内容
   */
  searchValue = '';
  fileMap: any;

  constructor(private auditPostTypeService: AuditPostTypeService, private msg: NzMessageService) {}

  // 左侧树节点数据
  nodes = [];

  /**
   * 新增树的类型
   */
  openTree(item?: any) {
    if (item) {
      this.auditPostTypeService.findByIdUsingGET(item.id).subscribe(data => {
        this.knowledgeTypeTreeEditComponent.edit(data, true);
      });
    } else {
      this.knowledgeTypeTreeEditComponent.edit();
    }
  }
  editTree(item: any) {
    this.auditPostTypeService.findByIdUsingGET(item.id).subscribe(data => {
      this.knowledgeTypeTreeEditComponent.edit(data, false);
    });
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
    this.getNode();
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

  deleteNode(item?: any): void {
    this.auditPostTypeService.deleteUsingDELETE(item.id).subscribe(() => {
      this.msg.success('删除成功!');
      this.selectedNode = null;
      this.getNode();
    });
    // tslint:disable-next-line: deprecation
  }

  getNode() {
    this.nodes = [];
    this.auditPostTypeService.findAllUsingGET().subscribe(data => {
      // const nodes = [];
      // const objIds = new Set<any>();
      // const letterMap = new Map<string, any>();
      // data.forEach(item => {
      //   objIds.add(item.id);
      // });
      // objIds.forEach(objId => {
      //   let objName = '';
      //   const letterNodes = [];
      //   data.forEach(item => {
      //     if (item.id === objId) {
      //       objName = item.name;
      //       letterNodes.push({ title: item.name, key: item.id, children: letterMap.get(item.id) });
      //     }
      //   });
      //   nodes.push({ title: objName, key: objId, children: letterNodes });
      // });
      // this.nodes = nodes;
      if (data) {
        this.nodes = TreeUtil.populateTreeNodes(data, 'id', 'name', 'children');
      }
    });
  }
}
