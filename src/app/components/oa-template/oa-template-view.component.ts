import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TreeUtil } from '@ng-mt-framework/comp';
import { FormUtil } from '@ng-mt-framework/util';
import { NzDropdownContextComponent, NzFormatEmitEvent, NzMessageService, NzTreeNode } from 'ng-zorro-antd';
import { OASendTemplateTypeDTO } from './model/OASendTemplateTypeDTO';
import { OaTemplateDetailComponent } from './oa-template-detail.component';
import { OaTemplateListComponent } from './oa-template-list.component';
import { OASendTemplateTypeService } from './service/OASendTemplateTypeService';
import { OASendTemplateEditInfoDTO } from './model/OASendTemplateEditInfoDTO';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'oa-template-view',
  templateUrl: './oa-template-view.component.html',
  styles: [],
})
export class OaTemplateViewComponent implements OnInit {
  @ViewChild('oaTemplateListComponent', { static: false })
  oaTemplateListComponent: OaTemplateListComponent;
  @ViewChild('form', { static: false })
  form: NgForm;

  /**
   * 搜索节点
   */
  searchValue = '';

  /**
   * 弹窗是否可见
   */
  isVisible = false;

  /**
   * 上级节点的名字
   */
  parentName = '';

  /**
   * 选中节点事件
   * @param 节点点击事件 发送审计知识类型节点Id
   */
  @Output()
  selectNodeEvent = new EventEmitter<OASendTemplateTypeDTO>();
  /**
   * 当前选中OA节点
   */
  selectedNode: any = null;

  /**
   * 监测列表数据的更改
   */
  @Output()
  notification = new EventEmitter();

  /**
   * 后台请求标志
   */
  loading = false;

  /**
   * 类型ID
   */
  typeId: string;

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

  /**
   * 弹窗数据
   */
  currentItem: OASendTemplateTypeDTO = this.initDTO();

  /**
   * 左侧树宽度
   */
  leftSize = this.LEFT_WIDTH;

  /**
   * 获取左侧树节点
   */
  nodes = [];

  // 搜索内容
  templateName: null;
  templateContent: null;

  constructor(private oASendTemplateTypeService: OASendTemplateTypeService, private msg: NzMessageService) {}

  /**
   * 初始化时加载数
   */
  ngOnInit() {
    this.loadTree();
  }

  /**
   *
   * @param item 右侧表格的新增
   */
  create(item: any) {
    this.currentItem = this.initDTO(item);
    this.oaTemplateListComponent.oaTemplateDetailComponent.edit(item, true);
    this.oaTemplateListComponent.loadAll();
  }

  /**
   * 点击事件方法
   * @param event 获取的点击节点
   */
  nzClick(event: any) {
    if (event.keys && event.keys.length > 0) {
      console.log(event);
      this.selectedNode = event.node.origin;
      this.selectNodeEvent.emit(this.selectedNode);
      this.oaTemplateListComponent.selectedNode = this.selectedNode;
      this.oaTemplateListComponent.load(this.selectedNode.id);
      // this.loadList(this.typeId);
    } else {
      this.selectedNode = null;
      this.oaTemplateListComponent.selectedNode = this.selectedNode;
      this.selectNodeEvent.emit(this.selectedNode);
      this.oaTemplateListComponent.load();
      // this.loadAll();
    }
  }

  /**
   * 加载左侧节点
   */
  loadTree() {
    this.oASendTemplateTypeService.findAllUsingGET().subscribe(data => {
      console.log(data);

      if (data) {
        this.selectedNode = null;

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

  /**
   * 删除节点
   * @param item 传入需要删除节点的位置参数
   */
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
      content: item ? item.content : null,
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

  loadList(id?: string) {
    // if (this.selectedNode) {
    //   if (id) {
    //     this.oaTemplateListComponent.load(id, this.templateName, this.templateContent);


    //   } else {
    //     this.oaTemplateListComponent.load(this.typeId, this.templateName, this.templateContent);

    //   }
    // } else {
    //   this.loadAll();
    // }

    this.oaTemplateListComponent.load(id, this.templateName, this.templateContent);
  }

  clear() {
    this.templateName = null;
    this.templateContent = null;
    this.oaTemplateListComponent.loadAll();
  }
  /**
   * 验证表单
   */
  private validate() {
    return FormUtil.validateForm(this.form.form);
  }

  loadAll() {
    this.oaTemplateListComponent.load(this.templateName, this.templateContent);
  }
}
