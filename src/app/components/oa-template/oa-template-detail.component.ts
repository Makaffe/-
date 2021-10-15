import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormUtil } from '@ng-mt-framework/util';
import { NzMessageService } from 'ng-zorro-antd';
import { OASendTemplateDTO } from './model/OASendTemplateDTO';
import { OASendTemplateEditInfoDTO } from './model/OASendTemplateEditInfoDTO';
import { OASendTemplateTypeDTO } from './model/OASendTemplateTypeDTO';
import { OASendTemplateService } from './service/OASendTemplateService';
import { OASendTemplateTypeService } from './service/OASendTemplateTypeService';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'oa-template-detail',
  templateUrl: './oa-template-detail.component.html',
  styles: [],
})
export class OaTemplateDetailComponent implements OnInit {
  @ViewChild('form', { static: false })
  form: NgForm;

  /**
   * 数据更改通知事件
   */
  @Output()
  notification = new EventEmitter();
  // 初始化参数
  currentItem: OASendTemplateEditInfoDTO = this.InitDTO();

  //
  loading = false;

  typeName: string;

  isVisible = false;
  disabled = false;
  constructor(
    private oASendTemplateService: OASendTemplateService,
    private oASendTemplateTypeService: OASendTemplateTypeService,
    private msg: NzMessageService,
  ) {}

  ngOnInit() {}
  handleCancel() {
    this.isVisible = false;
  }

  edit(item: any, created: boolean) {
    if (created === true) {
      this.typeName = item.name;
      this.currentItem.oaSendTemplateTypeId = item.id;
    } else {
      this.typeName = item.oaSendTemplateType.name;
      this.currentItem = this.InitDTO(item);
    }
    this.isVisible = true;
  }

  save() {
    if (!this.validate() || !this.currentItem.name) {
      this.msg.warning('请补全星号的必填信息项');
      return;
    }
    if (this.currentItem.id) {
      this.oASendTemplateService.updateUsingPUT(this.currentItem.id, this.currentItem).subscribe(
        () => this.afterCompleted(),
        null,
        () => (this.loading = false),
      );
    } else {
      this.oASendTemplateService.addUsingPOST(this.currentItem).subscribe(
        () => this.afterCompleted(),
        null,
        () => (this.loading = false),
      );
    }
  }

  // 确认后执行
  afterCompleted() {
    this.handleCancel();
    this.msg.success('操作成功！');
    this.notification.emit();
  }

  /**
   * 验证表单
   */
  private validate() {
    return FormUtil.validateForm(this.form.form);
  }

  InitDTO(item?: any): any {
    return {
      id: item ? item.id : null,
      name: item ? item.name : null,
      content: item ? item.content : null,
      oaSendTemplateTypeId: item ? item.oaSendTemplateTypeId : null,
    };
  }
}
