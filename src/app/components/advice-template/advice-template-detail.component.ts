import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
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

  constructor(private proposalTemplateService: ProposalTemplateService, private msg: NzMessageService) { }

  ngOnInit() { }
  handleCancel() {
    this.isVisible = false;
  }

  edit(node?: ProposalTemplateTypeDTO) {
    this.currentProposalTemplate.name = '空';
    this.currentProposalTemplate.proposalTemplateTypeId = node.id;
    this.isVisible = true;
  }
  /**
   * 弹窗确定按钮
   */
  save() {
    this.loading = true;
    this.proposalTemplateService.create(this.currentProposalTemplate).subscribe(() => {
      this.msg.success('新增成功');
      this.refresh.emit();
    }, () => { }, () => { this.loading = false; this.isVisible = false; });
  }
}
