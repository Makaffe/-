import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormUtil, TreeUtil } from '@mt-framework-ng/util';
import { NzMessageService } from 'ng-zorro-antd';
import { ProblemTypeService } from '../common/problem-type-select/ProblemTypeService.service';
import { ProposalTemplateDTO } from './model/ProposalTemplateDTO';
import { ProposalTemplateTypeDTO } from './model/ProposalTemplateTypeDTO';
import { ProposalTemplateService } from './service/ProposalTemplateService';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'advice-template-detail',
  templateUrl: './advice-template-detail.component.html',
  styles: [],
})
export class AdviceTemplateDetailComponent implements OnInit {
  @ViewChild('form', { static: false })
  form: NgForm;

  /**
   * 当前编辑建议模板对象
   */
  currentProposalTemplate = new ProposalTemplateDTO();
  /**
   * 数据变更事件  -> 列表刷新
   */
  @Output()
  refresh = new EventEmitter<any>();
  /**
   * 确定按钮加载状态
   */
  loading = false;
  isVisible = false;

  isWatch = false;

  problemTypeNodes = [];

  constructor(
    private problemTypeService: ProblemTypeService,
    private proposalTemplateService: ProposalTemplateService,
    private msg: NzMessageService) { }

  ngOnInit() {
    this.loadProblemTypeTree();
   }

  loadProblemTypeTree() {
    this.problemTypeService.findAllUsingGET().subscribe(data => {
      if (data) {
        this.problemTypeNodes = TreeUtil.populateTreeNodes(data, 'id', 'name', 'children');
      }
    });
  }

  handleCancel() {
    this.isVisible = false;
    FormUtil.resetForm(this.form.form);
  }

  edit(node?: ProposalTemplateTypeDTO, item?: any) {
    if (item) {
      this.currentProposalTemplate = new ProposalTemplateDTO(item.item);
      this.currentProposalTemplate.proposalTemplateTypeId = this.currentProposalTemplate.proposalTemplateType.id;
      this.isWatch = item.isWatch;
      console.log(this.currentProposalTemplate);
    } else {
      this.currentProposalTemplate = new ProposalTemplateDTO();
      this.currentProposalTemplate.proposalTemplateTypeId = node.id;
      this.isWatch = false;
    }
    this.isVisible = true;
  }
  /**
   * 弹窗确定按钮
   */
  save() {
    if (!FormUtil.validateForm(this.form.form)) {
      this.msg.warning('请补全标星号信息！');
      return;
    }
    this.loading = true;
    this.proposalTemplateService.create(this.currentProposalTemplate).subscribe(() => {
      this.msg.success('新增成功');
      this.refresh.emit();
    }, () => { }, () => { this.loading = false; this.handleCancel(); });
  }
}
