import { Component, OnInit, ViewChild } from '@angular/core';
import { TreeUtil } from '@mt-framework-ng/util';
import { OrganizationService } from '@ng-mt-framework/api';
import { RectifyProblemDTO } from './model/rectify-problem-dto';
import { RectifyIssueListComponent } from './rectify-issue-list.component';
import { RectifyIssueNoticeComponent } from './rectify-issue-notice.component';

@Component({
  selector: 'app-rectify-issue-view',
  templateUrl: './rectify-issue-view.component.html',
  styles: [],
})
export class RectifyIssueViewComponent implements OnInit {
  constructor(private organizationService: OrganizationService) {}

  /**
   * 列表组件
   */
  @ViewChild('rectifyIssueListComponent', { static: false })
  rectifyIssueListComponent: RectifyIssueListComponent;
  @ViewChild('rectifyIssueNoticeComponent', { static: false })
  rectifyIssueNoticeComponent: RectifyIssueNoticeComponent;

  /**
   * 过滤参数
   */
  params = {
    auditPostName: null, // 报告名称
    importAuditPostStartTime: null, // 导入报告开始时间
    importAuditPostEndTime: null, // 导入报告开始时间
    problemType: null, // 问题类型
    problemName: null, // 问题名称
    isDistribute: null, // 是否已分配
    isSend: null, // 是否已下发
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
      label: '下发中',
      value: 'ISSUING',
    },
    {
      label: '已下发',
      value: 'ISSUED',
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
      label: '未移交中',
      value: 'HANDING_OVER',
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
    this.rectifyIssueListComponent.rectifyIssueTransferComponent.edit(this.checkboxData);
  }

  /**
   * 问题下发
   */
  send() {
    this.rectifyIssueListComponent.rectifyIssueOrderComponent.edit(this.checkboxData);
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
      auditPostName: null, // 报告名称
      importAuditPostStartTime: null, // 导入报告开始时间
      importAuditPostEndTime: null, // 导入报告开始时间
      problemType: null, // 问题类型
      problemName: null, // 问题名称
      isDistribute: null, // 是否已分配
      isSend: null, // 是否已下发
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
    this.checkboxData = [];
    data.forEach(problem => {
      if (!problem.children || problem.children.length === 0) {
        this.checkboxData.push(problem);
      }
    });
    this.checkboxData = [...this.checkboxData];
  }

  /**
   * 问题下发或移交纪检按钮disabled判断
   * @param index 0：问题下发，1：移交纪检
   * @returns Boolean
   */
  disabledButton(index: number) {
    if (this.checkboxData.length > 0) {
      let flag = false;
      this.checkboxData.forEach((data: RectifyProblemDTO) => {
        switch (index) {
          case 0:
            if (data.sendStatus !== '未下发') {
              flag = true;
            }
            break;
          case 1:
            if (data.transferStatus !== '未移交') {
              flag = true;
            }
            break;
        }
      });
      return flag;
    } else {
      return true;
    }
  }

  /**
   * 禁用开始时间
   */
  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue || !this.params.importAuditPostEndTime) {
      return false;
    }
    return startValue.getTime() > new Date(this.params.importAuditPostEndTime).getTime();
    // tslint:disable-next-line: semicolon
  };

  /**
   * 禁用结束时间
   */
  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.params.importAuditPostStartTime) {
      return false;
    }
    return endValue.getTime() <= new Date(this.params.importAuditPostStartTime).getTime();
    // tslint:disable-next-line: semicolon
  };

  /**
   * 自动提醒模态框
   */
  notice() {
    this.rectifyIssueNoticeComponent.isVisible = true;
  }
}
