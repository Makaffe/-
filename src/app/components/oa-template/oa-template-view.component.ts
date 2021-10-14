import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TreeUtil } from '@ng-mt-framework/comp';
import { FormUtil } from '@ng-mt-framework/util';
import { NzDropdownContextComponent, NzFormatEmitEvent, NzMessageService, NzTreeNode } from 'ng-zorro-antd';
import { OASendTemplateTypeDTO } from './model/OASendTemplateTypeDTO';
import { OaTemplateDetailComponent } from './oa-template-detail.component';
import { OASendTemplateTypeService } from './service/OASendTemplateTypeService';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'oa-template-view',
  templateUrl: './oa-template-view.component.html',
  styles: [],
})
export class OaTemplateViewComponent implements OnInit {
  @ViewChild('oaTemplateDetailComponent', { static: false })
  oaTemplateDetailComponent: OaTemplateDetailComponent;
  @ViewChild('form', { static: false })
  form: NgForm;

  searchValue = '';

  isVisible = false;

  parentName = '';

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

  @Output()
  notification = new EventEmitter();

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
  /*
   * 左侧宽度常量
   */
  LEFT_WIDTH = 300;

  currentItem: OASendTemplateTypeDTO = this.initDTO();

  /**
   * 左侧树宽度
   */
  leftSize = this.LEFT_WIDTH;

  nodes = [];

  constructor(private oASendTemplateTypeService: OASendTemplateTypeService, private msg: NzMessageService) {}

  ngOnInit() {
    this.loadTree();
  }
  nzSearch($event) {}

  create() {
    this.oaTemplateDetailComponent.edit();
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

  loadTree() {
    this.nodes = [];
    this.oASendTemplateTypeService.findAllUsingGET().subscribe(data => {
      if (data) {
        this.nodes = TreeUtil.populateTreeNodes(data, 'id', 'name', 'children');
      }
    });
  }

  editNode(created: boolean, item?: any) {
    if (created) {
      if (item) {
        const parentId = item.id;
        this.parentName = item.name;
        this.currentItem.parentId = parentId;
      } else {
        this.parentName = '';
      }
    } else {
      this.currentItem = this.initDTO(item);
      if (!this.currentItem.parent) {
        this.parentName = '';
      } else {
        this.oASendTemplateTypeService.findByIdUsingGET(item.parent.id).subscribe(data => {
          this.parentName = data.name;
        });
      }
    }
    this.isVisible = true;
  }

  deleteNode(item) {
    this.oASendTemplateTypeService.deleteUsingDELETE(item.id).subscribe(() => {
      this.msg.success('删除成功!');
      this.selectedNode = null;
      this.loadTree();
    });
  }

  /**
   * 初始化
   */
  initDTO(item?: any): any {
    return {
      id: item ? item.id : null,
      name: item ? item.name : null,
      parentId: item ? item.parentId : null,
      parent: item ? item.parent : null,
      remark: item ? item.remark : null,
    };
  }

  cancel() {
    this.currentItem = this.initDTO();
    this.parentName = '';
    this.isVisible = false;
  }

  save() {
    if (!this.validate() || !this.currentItem.name) {
      this.msg.warning('请补全星号的必填信息项');
      return;
    }
    if (this.currentItem.id) {
      this.oASendTemplateTypeService.updateUsingPUT(this.currentItem.id, this.currentItem).subscribe(
        () => this.afterCompleted(),
        null,
        () => (this.loading = false),
      );
    } else {
      this.oASendTemplateTypeService.addUsingPOST(this.currentItem).subscribe(
        () => this.afterCompleted(),
        null,
        () => (this.loading = false),
      );
    }
  }

  afterCompleted() {
    this.cancel();
    this.msg.success('操作成功！');
    this.loadTree();
  }

  /**
   * 验证表单
   */
  private validate() {
    return FormUtil.validateForm(this.form.form);
  }
}
