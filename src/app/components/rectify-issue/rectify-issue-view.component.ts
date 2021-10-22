import { Component, OnInit, ViewChild } from '@angular/core';
import { TreeUtil } from '@mt-framework-ng/util';
import { OrganizationService } from '@ng-mt-framework/api';
import { RectifyProblemDTO } from './model/rectify-problem-dto';
import { RectifyIssueListComponent } from './rectify-issue-list.component';

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
      rectifyProblemName: null,
      rectifyDepartmentId: null,
      sendStatus: null,
      transferStatus: null,
    };
  }

  /**
   * 获取整改表格checkbox选中的数据
   * @param datas checkbox选中的数据
   */
  getCheckboxData(datas: Array<RectifyProblemDTO>) {
    this.checkboxData = [];
    datas.forEach(problem => {
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
}
