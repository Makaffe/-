import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rectify-issue-notice',
  templateUrl: './rectify-issue-notice.component.html',
  styles: [],
})
export class RectifyIssueNoticeComponent implements OnInit {
  constructor() {}

  rectifyBackFeedHzUnit: any;
  demoValue: any;

  /**
   * 日期
   */
  date: any;

  /**
   * 截止前几天
   */
  day: any;

  /**
   * 模态框显示
   */
  isVisible: boolean;

  /**
   * 建议模板树
   */
  nodes = [
    {
      title: '催办通知模板',
      key: '建议模板1',
      isLeaf: false,
      children: [
        { title: '整改问题催办模板', key: '建议模板2', isLeaf: true },
        { title: '问题下发通知模板', key: '建议模板3', isLeaf: true },
      ],
    },
  ];

  /**
   * 模板选择值
   */
  templateValue: any;

  /**
   * 模板值处理
   */
  templateChange(eve: any) {}

  ngOnInit(): void {}

  handleCancel() {
    this.isVisible = false;
  }
  handleOk() {
    this.handleCancel();
  }
}
