import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { RectifyMeasureReplyDTO } from './model/RectifyMeasureReplyDTO';
import { RectifyMeasureReplyService } from './service/RectifyMeasureReplyService';
import { RectifyMeasureService } from './service/RectifyMeasureService';

@Component({
  selector: 'app-rectify-measure-reply',
  templateUrl: './rectify-measure-reply.component.html',
  styles: [],
})
export class RectifyMeasureReplyComponent implements OnInit {
  /**
   * 附件
   */
  systemFiles = [];

  // 措施回复信息
  rectifyMeasureReply = this.initParams();

  @Output()
  saveRectifyMeasureReply = new EventEmitter();

  @Output()
  rectifyMeasureReplyBoolean = new EventEmitter();

  constructor(
    private rectifyMeasureReplyService: RectifyMeasureReplyService,
    private msg: NzMessageService,
    private rectifyMeasureService: RectifyMeasureService,
  ) {}

  ngOnInit(): void {}
  handleCancel() {
    this.rectifyMeasureReplyBoolean.emit();
  }

  // 保存措施回复
  save() {
    this.rectifyMeasureReply.attachFiles.forEach(systemFile => {
      this.rectifyMeasureReply.attachFileIds.push(systemFile.id);
    });
    this.rectifyMeasureReply.attachFiles = null;
    this.rectifyMeasureReplyService.create(this.rectifyMeasureReply).subscribe(
      data => {
        this.msg.success('保存成功！');
        this.handleCancel();
      },
      () => {},
      () => {},
    );
  }
  edit(rectifyMeasureId: string, isAudit: boolean) {
    this.rectifyMeasureReply = this.initParams();
    this.rectifyMeasureReply.rectifyMeasureId = rectifyMeasureId;
    this.rectifyMeasureReply.isAudit = isAudit;
  }

  // 改变阅读状态
  changeReadStatus() {
    // this.rectifyMeasureService.changeReadStatus(this.rectifyMeasureReply.rectifyMeasureId).subscribe(
    //   data => {
    //     this.handleCancel();
    //     this.saveRectifyMeasureReply.emit();
    //   },
    //   () => {},
    //   () => {},
    // );
  }

  initParams(): RectifyMeasureReplyDTO {
    return {
      replyContent: null,

      /**
       * 是否审计部门回复： true : 审计部  false : 整改部门
       */
      isAudit: null,

      /**
       * 关联文件
       */
      attachFiles: [],

      /**
       * 关联附件编码集合
       */
      attachFileIds: [],

      /**
       * 整改措施id
       */
      rectifyMeasureId: null,
    };
  }
}
