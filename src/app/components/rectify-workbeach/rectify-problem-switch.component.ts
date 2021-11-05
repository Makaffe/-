import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { RectifyProblemDTO } from '@mt-rectify-framework/comp/rectify-issue';
import { RectifyIssueViewComponent } from '../rectify-issue/rectify-issue-view.component';

@Component({
  selector: 'app-rectify-problem-switch',
  templateUrl: './rectify-problem-switch.component.html',
  styles: [],
})
export class RectifyProblemSwitchComponent implements OnInit {
  constructor() {}

  /**
   * 问题列表组件
   */
  @ViewChild('rectifyIssueViewComponent', { static: false })
  rectifyIssueViewComponent: RectifyIssueViewComponent;

  /**
   * 控制模态框展示
   */
  isVisible = false;

  /**
   * 后台请求标识
   */
  loading = false;

  /**
   * 问题切换Output
   */
  @Output()
  rectifyProblemChange = new EventEmitter<any>();

  /**
   * checkbox选中的数据
   */
  checkboxData: any;

  ngOnInit() {}

  /**
   * 关闭模态框
   */
  handleCancel() {
    this.rectifyIssueViewComponent.rectifyIssueListComponent.mapOfCheckedId = {};
    this.rectifyIssueViewComponent.rectifyIssueListComponent.checkboxData = [];
    this.isVisible = false;
  }

  /**
   * 保存
   */
  save() {
    this.handleCancel();
    this.rectifyProblemChange.emit(this.checkboxData);
  }

  /**
   * 获取选择的整改问题
   * @param problem 整改问题数据
   */
  getCheckProblem(problem: RectifyProblemDTO) {
    this.checkboxData = problem;
  }
}
