import { CommonUtil } from './../common/utils/common-util';
import { RectifyProblemService } from 'src/app/components/rectify-issue/service/RectifyProblemService';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TreeUtil } from '@mt-framework-ng/util';
import { OrganizationService, QueryOptions } from '@ng-mt-framework/api';
import { RectifyProblemDTO } from './model/rectify-problem-dto';
import { RectifyIssueListComponent } from './rectify-issue-list.component';
import { RectifyIssueNoticeComponent } from './rectify-issue-notice.component';
import { ProblemTypeService } from '../common/problem-type-select/ProblemTypeService.service';

@Component({
  selector: 'app-rectify-issue-view',
  templateUrl: './rectify-issue-view.component.html',
  styles: [],
})
export class RectifyIssueViewComponent implements OnInit {

  constructor(
    private organizationService: OrganizationService,
    private datePipe: DatePipe, private msg: NzMessageService,
    private problemTypeService: ProblemTypeService,
    private rectifyProblemService: RectifyProblemService) { }

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
  params = this.initParms();

  queryOptions: QueryOptions = {
    page: 0,
    size: 20,
    sort: 'id,desc',
  };


  /** 审计时间 */
  auditDateRange = [];

  /** 问题类型 */
  problemTypeNodes = [];

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
   * 整改状态
   */
  trackStatusList = [
    {
      label: '未整改',
      value: 'NOT_RECTIFIED',
    },
    {
      label: '无法整改',
      value: 'UNABLE_RECTIFY',
    },
    {
      label: '整改中',
      value: 'RECTIFYING',
    },
    {
      label: '已完成',
      value: 'COMPLETED',
    },
  ];

  /**
   * 整改表格checkbox选中的数据
   */
  checkboxData = [];

  /**
   * 是否是工作台里的问题切换
   */
  @Input()
  isProblemSwich = false;

  /**
   * 工作台问题切换的Output
   */
  @Output()
  problemSwichOutput = new EventEmitter();

  /**
   * 是否显示所有查询条件
   */
  showAllCond = false;

  isCollapse = true;

  ngOnInit() {
    this.organizationService.getOrganizationTreeOfEmployeeOrUser().subscribe(data => {
      this.organizationTree = TreeUtil.populateTreeNodes(data, 'id', 'name', 'children');
    });
    this.loadProblemTypeTree();
  }

  loadProblemTypeTree() {
    this.problemTypeService.findAllUsingGET().subscribe(data => {
      if (data) {
        this.problemTypeNodes = TreeUtil.populateTreeNodes(data, 'id', 'name', 'children');
      }
    });
  }

  selectDateRange($event) {
    this.params.startTime = this.datePipe.transform($event[0], 'yyyy-MM-dd');
    this.params.endTime = this.datePipe.transform($event[1], 'yyyy-MM-dd');
  }

  /**
   * 移交纪检
   */
  transfer() {
    if (!this.verify()) {
      this.msg.warning('选中的数据中含有未填写完成的整改问题，请完成填写后再移交！');
      return;
    }
    if (!this.repeatVerify(1)) {
      this.msg.warning('选中的数据中含有已经移交过的整改问题！');
      return;
    }
    this.rectifyIssueListComponent.rectifyIssueTransferComponent.edit(this.checkboxData);
  }

  /**
   * 问题下发
   */
  send() {
    // if (!this.verify()) {
    //   this.msg.warning('选中的数据中含有未填写完成的整改问题，请完成填写后再移交！');
    //   return;
    // }
    // if (!this.repeatVerify(0)) {
    //   this.msg.warning('选中的数据中含有已经下发过的整改问题！');
    //   return;
    // }
    this.rectifyIssueListComponent.rectifyIssueOrderComponent.edit(this.checkboxData);
  }

  verify(): boolean {
    let flag = true;
    this.checkboxData.forEach(data => {
      if (!data.dutyUser) {
        flag = false;
      }
    });
    return flag;
  }

  /**
   * 校验
   * @param index 索引 0表示下发 1表示移交
   */
  repeatVerify(index: number): boolean {
    let sendflag = true;
    let transferFlag = true;
    this.checkboxData.forEach(data => {
      if (data.sendStatus !== 'NOT_ISSUED') {
        sendflag = false;
      }
      if (data.transferStatus !== 'NOT_HANDED_OVER') {
        transferFlag = false;
      }
    });

    return index === 0 ? sendflag : transferFlag;
  }

  /**
   * 查询
   */
  search() {
    this.rectifyIssueListComponent.params = this.params;
    this.rectifyIssueListComponent.load();
  }

  /**
   * 清空查询条件
   */
  clear() {
    this.auditDateRange = [];
    this.params = this.initParms();
  }

  initParms(): any {
    return {
      reportName: null,
      startTime: null,
      endTime: null,
      rectifyProblemId: null,
      rectifyProblemName: null,
      sendStatus: null,
      isAllot: null,
      rectifyObject: null,
      dutyUserName: null,
      trackStatus: null
    };
  }

  /**
   * 获取整改表格checkbox选中的数据
   * @param data checkbox选中的数据
   */
  getCheckboxData(data: Array<RectifyProblemDTO>) {
    this.checkboxData = [];
    data.forEach(problem => {
      this.checkboxData.push(problem);
    });
    this.checkboxData = [...this.checkboxData];
    if (this.isProblemSwich && this.checkboxData.length > 0) {
      this.problemSwichOutput.emit(this.checkboxData[0]);
    }
  }

  /**
   * 自动提醒模态框
   */
  notice() {
    this.rectifyIssueNoticeComponent.isVisible = true;
  }

  toggleCollapse(): void {
    this.isCollapse = !this.isCollapse;
    this.showAllCond = !this.showAllCond;
  }

  export() {
    this.rectifyProblemService.export(this.queryOptions, this.params.reportName,
      this.params.startTime, this.params.endTime, this.params.rectifyProblemId,
      this.params.rectifyProblemName, this.params.sendStatus, this.params.isAllot,
      this.params.rectifyObject, this.params.dutyUserName, this.params.trackStatus, true)
      .subscribe(result => {
        CommonUtil.createDownload(result, '整改问题清单' + '.xls');
      });
  }

}
