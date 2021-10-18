import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TreeUtil } from '@ng-mt-framework/comp';
import { FormUtil } from '@ng-mt-framework/util';
import { NzMessageService } from 'ng-zorro-antd';
import { AdviceTemplateDetailComponent } from './advice-template-detail.component';
import { ProposalTemplateTypeDTO } from './model/ProposalTemplateTypeDTO';
import { ProposalTemplateTypeService } from './service/ProposalTemplateTypeService';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'advice-template-view',
  templateUrl: './advice-template-view.component.html',
  styles: [],
})
export class AdviceTemplateViewComponent implements OnInit {
  @ViewChild('adviceTemplateDetailComponent', { static: false })
  adviceTemplateDetailComponent: AdviceTemplateDetailComponent;
  @ViewChild('form', { static: false })
  form: NgForm;

  /**
   * 选中节点事件
   * @param 节点点击事件 发送审计知识类型节点Id
   */
  @Output()
  selectNodeEvent = new EventEmitter<any>();
  /**
   * 树节点选中事件
   */
  @Output()
  selectedNodeChange = new EventEmitter<any>();
  /**
   * 当前选中审计知识类型节点Id
   */
  @Input()
  selectedNode: any = null;
  searchValue: string;

  isVisible = false;

  /*
   * 左侧宽度常量
   */
  LEFT_WIDTH = 300;

  /**
   * 判断是否为增加或修改
   */
  created: boolean;
  /**
   * 左侧树宽度
   */
  leftSize = this.LEFT_WIDTH;

  /**
   * 初始化参数
   */
  currentItem: ProposalTemplateTypeDTO = this.initDTO();

  /**
   * 树节点
   */
  nodes = [];

  /**
   * 父节点名称
   *
   */
  parentName = '';

  /**
   * 父节点id
   *
   */
  parentId = '';

  constructor(private proposalTemplateTypeService: ProposalTemplateTypeService, private msg: NzMessageService) {}

  ngOnInit() {
    this.load();
  }

  create(item: any) {}

  save() {
    if (!this.validate() || !this.currentItem.name) {
      this.msg.warning('请补全星号的必填信息项');
      return;
    }
    if (this.currentItem.id) {
      this.proposalTemplateTypeService
        .updateUsingPUT(this.currentItem.id, this.currentItem)
        .subscribe(() => this.afterCompleted(), null);
    } else {
      this.proposalTemplateTypeService.addUsingPOST(this.currentItem).subscribe(() => this.afterCompleted(), null);
    }
  }
  /**
   * 验证表单
   */
  private validate() {
    return FormUtil.validateForm(this.form.form);
  }

  /**
   *
   * 保存后执行
   */
  afterCompleted() {
    this.cancel();
    this.msg.success('操作成功！');
    this.load();
  }

  /**
   *
   * 取消执行
   */

  cancel() {
    this.currentItem = this.initDTO();
    this.parentName = '';
    this.isVisible = false;
  }

  showModel(value: any) {
    if (value.edit) {
      this.adviceTemplateDetailComponent.edit();
      this.adviceTemplateDetailComponent.disabled = false;
    } else {
      this.adviceTemplateDetailComponent.disabled = false;
    }
  }
  /* 设置读取树节点 */
  load() {
    this.nodes = [];
    this.proposalTemplateTypeService.findAllUsingGET().subscribe(data => {
      if (data) {
        this.nodes = TreeUtil.populateTreeNodes(data, 'id', 'name', 'children');
      }
    });
  }

  /* 设置 */
  nzClick(event: any) {
    if (event.keys && event.keys.length > 0) {
      this.selectedNode = event.node.origin;
      this.selectNodeEvent.emit(this.selectedNode);
      this.selectedNode = event.node.origin;
      this.selectedNodeChange.emit(this.selectedNode);
      // this.typeId = this.selectedNode.id;
      // this.loadList(this.typeId);
    } else {
      this.selectedNode = null;
      this.selectNodeEvent.emit(this.selectedNode);
      this.selectedNodeChange.emit(this.selectedNode);
      // this.loadAll();
    }
  }
  /**
   *
   * @param created 判断是否为增加
   * @param item 树节点值
   */
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
        this.proposalTemplateTypeService.findByIdUsingGET(item.parent.id).subscribe(data => {
          this.parentName = data.name;
        });
      }
    }
    this.isVisible = true;
  }

  /**
   *
   * 删除节点
   */
  deleteNode(item) {
    this.proposalTemplateTypeService.deleteUsingDELETE(item.id).subscribe(() => {
      this.msg.success('删除成功!');
      this.selectedNode = null;
      this.load();
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

  delete() {}
}
