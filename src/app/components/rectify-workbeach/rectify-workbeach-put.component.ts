import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-rectify-workbeach-put',
  templateUrl: './rectify-workbeach-put.component.html',
  styles: [],
})
export class RectifyWorkbeachPutComponent implements OnInit {
  constructor(private msg: NzMessageService) {}

  currentItem = {
    closingDate: null,
    applyReason: null,
    replyComments: null,
    systemFiles: [],
  };

  systemFiles = [];

  isWatchForTable = false;

  create = false;

  /**
   * 字段初始化
   */
  filter = {
    status: null,
    applyReason: null,
    delayEndTime: null,
    replyUser: null,
    replyTime: null,
    replyComments: null,
    beforeRectifyEndTime: null,
    rectifyProblem: null,
  };

  /**
   * 判断是否为整改部门
   */
  @Input()
  isRectify = null;

  /**
   * 用来控制跳窗是否打开
   */
  isVisible = false;

  ngOnInit(): void {}

  /**
   * 用来控制打开弹窗
   */
  open() {
    if (!this.isRectify) {
      this.currentItem = {
        closingDate: new Date(),
        applyReason:
          '申请原因申请原因申请原因申请原因申请原因申请原因申请原因申请原因申请原因申请原因申请原因申请原因申请原因',
        replyComments: null,
        systemFiles: [],
      };
    }
    this.isVisible = true;
  }
  /**
   * 关闭弹窗
   */
  handleCancel() {
    this.isVisible = false;
  }

  /**
   * 点击完成保存
   */
  saveData() {
    this.isVisible = false;
  }
}
