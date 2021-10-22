import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { RectifyProblemService } from '../rectify-issue/service/RectifyProblemService';
import { RectifyMeasureReplyEditInfoDTO } from './model/RectifyMeasureReplyEditInfoDTO';
import { RectifyMeasureReplyService } from './service/RectifyMeasureReplyService';
import { RectifyMeasureService } from './service/RectifyMeasureService';

@Component({
  selector: 'app-rectify-measure-reply',
  templateUrl: './rectify-measure-reply.component.html',
  styles: [],
})
export class RectifyMeasureReplyComponent implements OnInit {
  isVisible = false;

  // 措施回复信息
  rectifyMeasureReply = this.initParams();

  // 整改问题id
  rectifyProblemId: string;

  @Output()
  saveRectifyMeasureReply = new EventEmitter();

  constructor(
    private rectifyMeasureReplyService: RectifyMeasureReplyService,
    private msg: NzMessageService,
    private rectifyMeasureService: RectifyMeasureService,
  ) {}

  ngOnInit(): void {}
  handleCancel() {
    this.isVisible = false;
  }

  // 保存措施回复
  save() {
    this.rectifyMeasureReplyService.add(this.rectifyMeasureReply).subscribe(
      data => {
        this.msg.success('保存成功！');
        this.handleCancel();
        this.changeReadStatus();
      },
      () => {},
      () => {},
    );
  }

  // 改变阅读状态
  changeReadStatus() {
    this.rectifyMeasureService.changeReadStatus(this.rectifyMeasureReply.rectifyMeasureId).subscribe(
      data => {
        this.handleCancel();
        this.saveRectifyMeasureReply.emit();
      },
      () => {},
      () => {},
    );
  }

  initParams(): RectifyMeasureReplyEditInfoDTO {
    return {
      replyContent: null,
      rectifyMeasureId: null,
    };
  }
}
