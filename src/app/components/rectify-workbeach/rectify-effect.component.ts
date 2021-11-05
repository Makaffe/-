import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormUtil } from '@mt-framework-ng/util';
import { NzMessageService } from 'ng-zorro-antd';
import { RectifyEffectDTO } from './model/RectifyEffectDTO';
import { RectifyEffectService } from './service/RectifyEffectService';
@Component({
  selector: 'app-rectify-effect',
  templateUrl: './rectify-effect.component.html',
  styles: [],
})
export class RectifyEffectComponent implements OnInit {
  /**
   * 表单组件
   */
  @ViewChild('form', { static: false })
  form: NgForm;

  /**
   * 只读
   */
  isWatch: boolean;

  /**
   * 弹窗可见性
   */
  isVisible = false;

  /**
   * 后台请求标识
   */
  loading = false;

  /**
   * 整改跟踪dto
   */
  rectifyEffect = this.initRtParams();

  constructor(private msg: NzMessageService, private rectifyEffectService: RectifyEffectService) {}

  ngOnInit() {}

  /**
   * 初始化编辑页面
   * @param isWatch 是否只读
   * @param rectifyProblemId 整改问题id
   */
  edit(isWatch: boolean, rectifyProblemId: string) {
    this.rectifyEffectService.findByRectifyEffectById(rectifyProblemId).subscribe(data => {
      this.rectifyEffect = this.initRtParams(data);
      this.rectifyEffect.rectifyProblemId = rectifyProblemId;
      this.isVisible = true;
      this.isWatch = isWatch;
    });
  }

  /**
   * 初始化整改成效
   * @param item 整改成效
   * @returns 整改成效
   */
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
    if (this.rectifyEffect.id) {
      this.rectifyEffectService.update(this.rectifyEffect.id, this.rectifyEffect).subscribe(
        data => {
          this.msg.success('修改成功！');
          this.handleCancel();
        },
        () => {},
        () => {
          this.loading = false;
        },
      );
    } else {
      this.rectifyEffectService.create(this.rectifyEffect).subscribe(
        data => {
          this.msg.success('新增成功！');
          this.handleCancel();
        },
        () => {},
        () => {
          this.loading = false;
        },
      );
    }
  }

  /**
   * 验证表单
   */
  private validate() {
    return FormUtil.validateForm(this.form.form);
  }
}
