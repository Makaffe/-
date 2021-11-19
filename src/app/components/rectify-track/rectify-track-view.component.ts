import { RectifyProblemDTO } from 'src/app/components/rectify-issue/model/rectify-problem-dto';
import { ProblemTypeService } from './../common/problem-type-select/ProblemTypeService.service';
import { DatePipe, formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { OrganizationService } from '@ng-mt-framework/api';
import { TreeUtil } from '@ng-mt-framework/comp';
import { RectifyTrackListComponent } from './rectify-track-list.component';

@Component({
  selector: 'app-rectify-track-view',
  templateUrl: './rectify-track-view.component.html',
  styles: [],
})
export class RectifyTrackViewComponent implements OnInit {
  /**
   * 列表组件
   */
  @ViewChild('rectifyTrackListComponent', { static: false })
  rectifyTrackListComponent: RectifyTrackListComponent;

  /**
   *
   * 查询参数
   */
  filter = this.initFilter();

  /**
   * 整改部门树
   */
  organizationTree = [];

  /**
   * 是否显示所有查询条件
   */
  showAllCond = false;
  isCollapse = true;

  /** 审计时间 */
  auditDateRange = [];

  /** 问题类型 */
  problemTypeNodes = [];

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

  constructor(
    private organizationService: OrganizationService,
    private problemTypeService: ProblemTypeService,
    private datePipe: DatePipe,
  ) { }

  ngOnInit() {
    this.loadProblemTypeTree();
    // this.organizationService.getOrganizationTreeOfEmployeeOrUser().subscribe(data => {
    //   this.organizationTree = TreeUtil.populateTreeNodes(data, 'id', 'name', 'children');
    // });
  }

  /**
   * 加载问题类型
   */
  loadProblemTypeTree() {
    this.problemTypeService.findAllUsingGET().subscribe(data => {
      if (data) {
        this.problemTypeNodes = TreeUtil.populateTreeNodes(data, 'id', 'name', 'children');
      }
    });
  }

  /**
   * 初始化查询参数
   */
  initFilter() {
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
      trackStatus: null,
      transferStatus: null
    };
  }

  search(): void {
    this.rectifyTrackListComponent.load();
  }

  /**
   * 清空查询条件
   */
  clear() {
    this.filter = this.initFilter();
    this.auditDateRange = [];
  }

  /**
   * 选中checkbox方法
   * @param item 参数
   * @param isCheck 是否选中
   */
  checked(item: RectifyProblemDTO, isCheck: boolean) {
    // if (!this.isProblemSwich) {
    //   if (isCheck) {
    //     this.checkboxData.push(item);
    //   } else {
    //     this.checkboxData = this.checkboxData.filter(problem => problem.id !== item.id);
    //   }
    // } else {
    //   if (isCheck) {
    //     if (this.checkboxData.length > 0) {
    //       this.mapOfCheckedId[this.checkboxData[0].id] = false;
    //     }
    //     this.checkboxData = [];
    //     this.checkboxData.push(item);
    //   } else {
    //     this.checkboxData = [];
    //   }
    // }
    // this.isAllDisplayDataChecked = this.listOfMapDataPeers.every(e => this.mapOfCheckedId[e.id]);
    // this.isIndeterminate = this.listOfMapDataPeers.some(d => this.mapOfCheckedId[d.id]) && !this.isAllDisplayDataChecked;
    // this.checkboxChange.emit(this.checkboxData);
  }

  selectDateRange($event) {
    this.filter.startTime = this.datePipe.transform($event[0], 'yyyy-MM-dd');
    this.filter.endTime = this.datePipe.transform($event[1], 'yyyy-MM-dd');
  }

  toggleCollapse(): void {
    this.isCollapse = !this.isCollapse;
    this.showAllCond = !this.showAllCond;
  }
}
