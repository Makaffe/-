import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormUtil } from '@mt-framework-ng/util';
import { NzMessageService } from 'ng-zorro-antd';
import { RectifyProblemDTO } from './model/rectify-problem-dto';
import { TransferInfoDTO } from './model/TransferInfoDTO';
import { RectifyProblemService } from './service/RectifyProblemService';

@Component({
  selector: 'app-rectify-issue-transfer',
  templateUrl: './rectify-issue-transfer.component.html',
  styles: [],
})
export class RectifyIssueTransferComponent implements OnInit {
  constructor(private rectifyProblemService: RectifyProblemService, private msg: NzMessageService) {}

  /**
   * 表单
   */
  @ViewChild('form', { static: false })
  form: NgForm;

  /**
   * 当前对象
   */
  currentItem: TransferInfoDTO = this.initItem();

  /**
   * 数据改变通知事件
   */
  @Output()
  notification = new EventEmitter();

  /**
   * 整改问题ids
   */
  ids: Array<string> = [];

  /**
   * 只读
   */
  readOnly = false;

  /**
   * 文件
   */
  systemFiles = [];

  /**
   * 模态框是否可见
   */
  isVisible = false;

  /**
   * 后台请求标识
   */
  loading = false;

  ngOnInit() {}

  /**
   * 关闭
   */
  handleCancel() {
    this.isVisible = false;
    // FormUtil.resetForm(this.form.form);
  }

  /**
   * 保存
   */
  save() {
    this.loading = true;
    this.rectifyProblemService.rectifyProblemTransfer(this.ids, this.currentItem.transferCause).subscribe(
      data => {
        this.msg.success('移交纪检成功！');
        this.notification.emit();
        this.handleCancel();
      },
      () => {},
      () => {
        this.loading = false;
      },
    );
  }

  /**
   * 初始化编辑页面
   * @param problems 整改问题数据
   *
   */
  edit(problems: Array<RectifyProblemDTO>) {
    this.ids = [];
    problems.forEach(problem => {
      this.ids.push(problem.id);
    });
    this.ids = [...this.ids];
    this.isVisible = true;
  }

  /**
   * 初始化移交信息
   * @param item 移交信息
   * @returns 移交信息
   */
  initItem(item?: TransferInfoDTO): TransferInfoDTO {
    return {
      id: item && item.id ? item.id : null,
      transferCause: item && item.transferCause ? item.transferCause : null,
      processingResults: item && item.processingResults ? item.processingResults : null,
    };
  }
}
