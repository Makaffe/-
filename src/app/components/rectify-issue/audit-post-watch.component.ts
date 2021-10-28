import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormUtil } from '@ng-mt-framework/util';
import { NzMessageService } from 'ng-zorro-antd';
import { AuditPostDTO } from '../audit-post/model/AuditPostDTO';
import { RectifyProblemDTO } from './model/rectify-problem-dto';

@Component({
  selector: 'app-audit-post-watch',
  templateUrl: './audit-post-watch.component.html',
})
export class AuditPostWatchComponent implements OnInit {
  /**
   * 表单组件
   */
  @ViewChild('auditPostForm', { static: false })
  auditPostForm: NgForm;

  /**
   * 当前对象
   */
  currentItem: AuditPostDTO = new AuditPostDTO();

  /**
   * 整改问题列表
   */
  rectifyProblemList: RectifyProblemDTO[] = [];

  /**
   * 审计报告弹窗可见性
   */
  isVisible = false;

  constructor(private msg: NzMessageService) {}

  ngOnInit() {}

  /**
   * 关闭审计报告模态框
   */
  handleCancel() {
    this.isVisible = false;
    FormUtil.resetForm(this.auditPostForm.form);
  }

  /**
   * 初始化查看页面
   * @param item 数据源dto
   */
  watch(item: AuditPostDTO): void {
    this.currentItem = new AuditPostDTO(item);
    this.isVisible = true;
  }
}
