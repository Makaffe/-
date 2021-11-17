import { AuditReportDTO } from './../audit-post/newmodel/AuditReportDTO';
import { AuditReportService } from './../audit-post/newservice/AuditReportService';
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
  currentItem = this.initItem();

  /**
   * 整改问题列表
   */
  rectifyProblemList: RectifyProblemDTO[] = [];

  /**
   * 审计报告弹窗可见性
   */
  isVisible = false;

  constructor(private msg: NzMessageService, private auditReportService: AuditReportService) { }

  ngOnInit() { }

  edit(auditPostId: string) {
    this.auditReportService.findById(auditPostId).subscribe(data => {
      this.currentItem = this.initItem(data);
      console.log(this.currentItem);
      this.isVisible = true;
    });
  }

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

  initItem(item?: AuditReportDTO): any {
    return {
      name: item && item.name ? item.name : null,
      auditName: item && item.auditName ? item.auditName : null,
      auditTime: item ? item.auditStartTime.slice(0, 10) + ' ~ ' + item.auditEndTime.slice(0, 10) : null,
      auditSource: item && item.auditSource ? item.auditSource : null,
      auditTarget: item && item.auditTarget ? item.auditTarget : null,
      systemFiles: item && item.systemFileDTOS ? item.systemFileDTOS : [],
      auditReportFile: item && item.auditReportFileDTO ? [item.auditReportFileDTO] : []
    };
  }
}
