import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { RectifyProblemDTO } from './model/rectify-problem-dto';
import { RectifyProblemService } from './service/RectifyProblemService';

@Component({
  selector: 'app-rectify-issue-transfer',
  templateUrl: './rectify-issue-transfer.component.html',
  styles: [],
})
export class RectifyIssueTransferComponent implements OnInit {
  constructor(private rectifyProblemService: RectifyProblemService, private msg: NzMessageService) {}

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
  isReadOnly: any;

  /**
   * 只读
   */
  createDate: any;

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

  ngOnInit() {
    this.isReadOnly = false;
    this.createDate = true;
  }

  /**
   * 关闭
   */
  handleCancel() {
    this.isVisible = false;
  }

  /**
   * 保存
   */
  save() {
    this.loading = true;
    this.rectifyProblemService.rectifyProblemTransfer(this.ids).subscribe(
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
}
