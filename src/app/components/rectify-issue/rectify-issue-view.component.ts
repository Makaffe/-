import { Component, OnInit, ViewChild } from '@angular/core';
import { TreeUtil } from '@mt-framework-ng/util';
import { OrganizationService } from '@ng-mt-framework/api';
import { RectifyProblemDTO } from './model/rectify-problem-dto';
import { RectifyIssueListComponent } from './rectify-issue-list.component';
import { RectifyIssueOrderComponent } from './rectify-issue-order.component';
import { RectifyIssueSplitComponent } from './rectify-issue-split.component';
import { RectifyIssueTransferComponent } from './rectify-issue-transfer.component';

@Component({
  selector: 'app-rectify-issue-view',
  templateUrl: './rectify-issue-view.component.html',
  styles: [],
})
export class RectifyIssueViewComponent implements OnInit {
  constructor(private organizationService: OrganizationService) {}
  @ViewChild('rectifyIssueSplitComponent', { static: false })
  rectifyIssueTransferComponent: RectifyIssueTransferComponent;
  @ViewChild('rectifyIssueOrderComponent', { static: false })
  rectifyIssueOrderComponent: RectifyIssueOrderComponent;
  @ViewChild('rectifyIssueListComponent', { static: false })
  rectifyIssueListComponent: RectifyIssueListComponent;
  listOfOption: string[] = ['未下发', '已下发', '未移交'];
  listOfSelectedValue = [];

  /**
   * 过滤参数
   */
  params = {
    rectifyProblemName: null,
    rectifyDepartmentId: null,
    sendStatus: null,
    transferStatus: null,
  };

  /**
   * 整改部门树
   */
  organizationTree = [];

  /**
   * 下发状态
   */
  sendStatusList = [
    {
      label: '未下发',
      value: 'NOT_ISSUED',
    },
    {
      label: '待整改',
      value: 'TO_BE_RECTIFIED',
    },
    {
      label: '整改中',
      value: 'RECTIFYING',
    },
    {
      label: '反馈逾期',
      value: 'FEEDBACK_OVERDUE',
    },
    {
      label: '整改逾期',
      value: 'RECTIFY_OVERDUE',
    },
    {
      label: '已完成',
      value: 'COMPLETE',
    },
  ];

  /**
   * 移交状态
   */
  transferStatusList = [
    {
      label: '未移交',
      value: 'NOT_HANDED_OVER',
    },
    {
      label: '已移交',
      value: 'HANDED_OVER',
    },
  ];

  /**
   * 整改表格checkbox选中的数据
   */
  checkboxData = [];

  ngOnInit() {
    this.organizationService.getOrganizationTreeOfEmployeeOrUser().subscribe(data => {
      this.organizationTree = TreeUtil.populateTreeNodes(data, 'id', 'name', 'children');
    });
  }

  /**
   * 移交纪检
   */
  transfer() {
    this.rectifyIssueTransferComponent.edit();
  }

  /**
   * 问题下发
   */
  order() {
    this.rectifyIssueOrderComponent.edit();
  }

  /**
   * 查询
   */
  search() {
    this.rectifyIssueListComponent.load();
  }

  /**
   * 清空查询条件
   */
  clear() {
    this.params = {
      rectifyProblemName: null,
      rectifyDepartmentId: null,
      sendStatus: null,
      transferStatus: null,
    };
  }

  /**
   * 获取整改表格checkbox选中的数据
   * @param data checkbox选中的数据
   */
  getCheckboxData(data: Array<RectifyProblemDTO>) {
    this.checkboxData = data;
  }
}
