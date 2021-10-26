

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rectify-workbeach-put',
  templateUrl: './rectify-workbeach-put.component.html',
  styles: [],
})
export class RectifyWorkbeachPutComponent implements OnInit {

  constructor(private msg: NzMessageService) {

  }

  systemFiles = [];

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

  // 判断是否为整改部门

  isRectify = null;

  /**
   * 用来控制跳窗是否打开
   */
  isVisible = false;

  ngOnInit(): void {

  }

  /**
   * 用来控制打开弹窗
   */
  open() {

    this.isVisible = true;
  }
  /**
   * 关闭弹窗
   */
  handleCancel() {
    this.msg.info('关闭窗口');
    this.isVisible = false;
  }

  /**
   * 点击完成保存
   */
  saveData() {
    this.msg.info('申请延期成功');
    this.isVisible = false;
  }


}
