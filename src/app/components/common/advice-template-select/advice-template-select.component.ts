import { NzSelectComponent } from 'ng-zorro-antd';
import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ProposalTemplateService } from '../../advice-template/service/ProposalTemplateService';
@Component({
  selector: 'app-advice-template-select',
  templateUrl: './advice-template-select.component.html',
  styles: [``],
})
export class AdviceTemplateSelectComponent implements OnInit, OnChanges {

  /**
   * 问题类型
   */
  @Input()
  problemTypeId = null;

  /**
   * Output事件，用于该组件的双向绑定
   */
  @Output()
  adviceTemplateChange = new EventEmitter<string>();

  /**
   * 是否禁用
   */
  @Input()
  disabled = false;

  /**
   * 建议模板(全量)
   */
  proposalTemplateAll = [];

  /**
   * 根据问题类型筛选的模板
   */
  proposalTemplates = [];

  @Input()
  proposalTemplateId = null;

  /** 审计建议 */
  tempAdvice = null;

  constructor(private proposalTemplateService: ProposalTemplateService) { }

  ngOnInit() {
    this.loadProposalTemplates();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.problemTypeId) {
      this.getProposalTemplates(changes.problemTypeId.currentValue);
    }
    if (changes && changes.proposalTemplateId) {
      this.proposalTemplateId = changes.problemTypeId.currentValue;
    }
  }

  loadProposalTemplates() {
    this.proposalTemplateService.findAll().subscribe(result => {
      if (result) {
        this.proposalTemplateAll = result;
      }
    });
  }

  /**
   * 根据问题类型筛选模板
   */
  getProposalTemplates(problemTypeId: string) {
    this.problemTypeId = null;
    this.proposalTemplates = [];
    if (problemTypeId) {
      this.proposalTemplateAll.forEach(data => {
        if (problemTypeId === data.rectifyProblemType.id) {
          this.proposalTemplates.push(data);
        }
      });
    }
    this.proposalTemplates = [...this.proposalTemplates];
  }

  /**
   * 选择模板
   */
  proposalTemplateChange(event: string) {
    this.tempAdvice = null;
    if (event) {
      this.proposalTemplateAll.forEach(data => {
        if (data.id === event) {
          this.tempAdvice = data.auditProposal;
        }
      });
    }
  }

  /**
   * 确认引用
   */
  confirmReference() {
    this.adviceTemplateChange.emit(this.tempAdvice);
  }
}
