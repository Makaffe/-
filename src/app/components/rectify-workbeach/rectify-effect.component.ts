import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { QueryOptions } from '@mt-framework-ng/core';
import { FormUtil } from '@mt-framework-ng/util';
import { NzMessageService } from 'ng-zorro-antd';
import { RectifyEffectDTO } from './model/RectifyEffectDTO';
import { RectifyEffectService } from './service/RectifyEffectService';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-rectify-effect',
  templateUrl: './rectify-effect.component.html',
  styles: [
    `
      tr {
        background-color: white !important;
      }
    `,
  ],
})
export class RectifyEffectComponent implements OnInit {
  /**
   * 表单组件
   */
  @ViewChild('form', { static: false })
  form: NgForm;

  date: Date;
  // 分页参数
  private options: QueryOptions = {
    page: 0,
    size: 100,
    sort: 'id,asc',
  };

  /**
   * 只读
   */
  isWatch: boolean;

  /**
   * 弹窗可见性
   */
  isVisible = false;

  /**
   * 是否为新增
   */
  isCreate = true;

  // 整改跟踪dto
  rectifyEffect = this.initRtParams();

  constructor(
    private msg: NzMessageService,
    private activatedRoute: ActivatedRoute,
    private rectifyEffectService: RectifyEffectService,
  ) {}

  ngOnInit() {}

  // 获取整改问题与整改措施
  loadData() {
    if (this.rectifyEffect.rectifyProblemId) {
      this.rectifyEffectService.findByRectifyEffectById(this.rectifyEffect.rectifyProblemId).subscribe(data => {
        if (data) {
          this.rectifyEffect = this.initRtParams(data);
          this.isCreate = false;
        } else {
          this.isCreate = true;
        }
        this.isVisible = true;
      });
    }
  }

  edit(isWatch: boolean, rectifyProblemId: string) {
    this.rectifyEffect = this.initRtParams();
    this.rectifyEffect.rectifyProblemId = rectifyProblemId;
    this.loadData();
    this.isWatch = isWatch;
  }

  // 初始化整改跟踪
  initRtParams(item?: RectifyEffectDTO): RectifyEffectDTO {
    return {
      id: item ? item.id : null,
      auditRecoveryAmount: item ? item.auditRecoveryAmount : null,
      recoveredAmount: item ? item.recoveredAmount : null,
      financialTransactionAmount: item ? item.financialTransactionAmount : null,
      promoteSavingsAmount: item ? item.promoteSavingsAmount : null,
      managementProposalCount: item ? item.managementProposalCount : null,
      violateDisciplinesAmount: item ? item.violateDisciplinesAmount : null,
      perfectRegulationCount: item ? item.perfectRegulationCount : null,
      efficiencyGainsAmount: item ? item.efficiencyGainsAmount : null,
      status: item ? item.status : null,
      auditOpinionCount: item ? item.auditOpinionCount : null,
      adviceCount: item ? item.adviceCount : null,
      rectifyProblemId: item ? item.rectifyProblemId : null,
    };
  }

  /**
   * 取消
   */
  handleCancel() {
    this.isVisible = false;
    FormUtil.resetForm(this.form.form);
  }

  /**
   * 保存
   */
  saveData() {
    if (!this.validate()) {
      this.msg.warning('请补全标星号的必填信息项！');
      return;
    }
    if (this.isCreate) {
      this.rectifyEffectService.create(this.rectifyEffect).subscribe(data => {
        this.msg.success('新增成功！');
      });
    } else {
      this.rectifyEffectService.update(this.rectifyEffect.id, this.rectifyEffect).subscribe(data => {
        this.msg.success('修改成功！');
      });
    }

    this.handleCancel();
  }

  /**
   * 验证表单
   */
  private validate() {
    return FormUtil.validateForm(this.form.form);
  }
}
