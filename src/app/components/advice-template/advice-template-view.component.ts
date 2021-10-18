import { Component, OnInit, ViewChild } from '@angular/core';
import { TreeUtil } from '@mt-framework-ng/util';
import { NzMessageService } from 'ng-zorro-antd';
import { AdviceTemplateDetailComponent } from './advice-template-detail.component';
import { AdviceTemplateListComponent } from './advice-template-list.component';
import { ProposalTemplateTypeDTO } from './model/ProposalTemplateTypeDTO';
import { ProposalTemplateTypeService } from './service/ProposalTemplateTypeService';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'advice-template-view',
  templateUrl: './advice-template-view.component.html',
  styles: [],
})
export class AdviceTemplateViewComponent implements OnInit {
  /**
   * 建议模板弹窗
   */
  @ViewChild('adviceTemplateDetailComponent', { static: false })
  adviceTemplateDetailComponent: AdviceTemplateDetailComponent;
  /**
   * 建议模板列表
   */
  @ViewChild('adviceTemplateListComponent', { static: false })
  adviceTemplateListComponent: AdviceTemplateListComponent;

  /**
   * 搜索条件
   */
  filter = {
    auditProposal: null,
    problemType: null,
    proposalTemplateType: null
  };
  /**
   * 建议模板类型弹窗确定按钮加载状态
   */
  loading = false;
  /**
   * 树区域加载状态
   */
  treeLoading = false;
  /**
   * 当前点击的树节点
   */
  currentProposalTypeNode = new ProposalTemplateTypeDTO();

  searchValue: string;

  isVisible = false;

  /*
   * 左侧宽度常量
   */
  LEFT_WIDTH = 300;

  /**
   * 左侧树宽度
   */
  leftSize = this.LEFT_WIDTH;

  /**
   * 当前编辑建议模板类型dto
   */
  proposalTemplateTypeDTO: ProposalTemplateTypeDTO = new ProposalTemplateTypeDTO();

  /**
   * 上级节点名称
   */
  parentName = null;
  nodes: any;

  constructor(private proposalTemplateTypeService: ProposalTemplateTypeService, private msg: NzMessageService) { }

  ngOnInit() {
    this.load();
  }
  /**
   * 初始化数据
   */
  load() {
    this.treeLoading = true;
    this.proposalTemplateTypeService.findAll().subscribe(data => {
      this.nodes = TreeUtil.populateTreeNodes(data, 'id', 'name', 'children');
      this.currentProposalTypeNode = new ProposalTemplateTypeDTO();
      this.parentName = null;
      this.filter.proposalTemplateType = null;
    }, () => { }, () => { this.treeLoading = false; });
  }
  /**
   * 新增建议模板类型
   */
  add() {
    this.loading = true;
    if (this.proposalTemplateTypeDTO.id) {
      this.proposalTemplateTypeDTO.parentId = this.proposalTemplateTypeDTO.parent ? this.proposalTemplateTypeDTO.parent.id : null;
      this.proposalTemplateTypeService.update(this.proposalTemplateTypeDTO.id, this.proposalTemplateTypeDTO).subscribe(data => {
        this.msg.success('修改成功');
        this.load();
      }, () => { }, () => { this.isVisible = false; this.loading = false; });
    } else {
      this.proposalTemplateTypeDTO.parentId = this.currentProposalTypeNode.id ? this.currentProposalTypeNode.id : null;
      this.proposalTemplateTypeService.create(this.proposalTemplateTypeDTO).subscribe(() => {
        this.msg.success('新增成功');
        this.load();
      }, () => { }, () => { this.isVisible = false; this.loading = false; });
    }
  }
  create() {
    this.adviceTemplateDetailComponent.edit(this.currentProposalTypeNode, null);
  }
  /**
   * 显示建议模板类型编辑弹窗
   */
  showTypeModal(isEdit: boolean) {
    this.proposalTemplateTypeDTO = isEdit ? this.currentProposalTypeNode : new ProposalTemplateTypeDTO();
    this.isVisible = true;
  }
  showModel(value: any) {
    this.adviceTemplateDetailComponent.edit(null, value);
  }

  edit() { }
  /**
   * 查找 刷新
   */
  search() {
    this.adviceTemplateListComponent.load();
  }
  /**
   * 删除树节点
   */
  delete() {
    this.proposalTemplateTypeService.delete(this.currentProposalTypeNode.id).subscribe(() => {
      this.msg.success('删除成功');
    }, () => { }, () => { this.load(); });
  }

  /**
   * 树节点点击事件
   */
  nodeClick($event) {
    this.currentProposalTypeNode = $event.keys.length > 0 ? $event.node.origin : new ProposalTemplateTypeDTO();
    this.filter.proposalTemplateType = this.currentProposalTypeNode;
    this.parentName = this.currentProposalTypeNode.id && this.currentProposalTypeNode.parent
      ? this.currentProposalTypeNode.parent.name : null;
    this.adviceTemplateListComponent.load();
  }

  /**
   * 重置搜索条件
   */
  clearCondition() {
    this.filter.auditProposal = null;
    this.filter.problemType = null;
  }
}
