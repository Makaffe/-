import { formatDate } from '@angular/common';
import { Component, Inject, Input, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CacheService } from '@delon/cache';
import { QueryOptions } from '@mt-framework-ng/core';
import { OrganizationService, SystemFileService } from '@ng-mt-framework/api';
import { TreeUtil } from '@ng-mt-framework/comp';
import { NzMessageService } from 'ng-zorro-antd';
import { RectifyIssueTransferComponent } from '../rectify-issue/rectify-issue-transfer.component';
import { RectifyProblemService } from '../rectify-issue/service/RectifyProblemService';
import { RectifyTrackDTO } from '../rectify-track/model/RectifyTrackDTO';
import { ChangeMsOrRp } from './model/ChangeMsOrRp';
import { RectifyMeasureDTO } from './model/RectifyMeasureDTO';
import { RectifyMeasureEditInfoDTO } from './model/RectifyMeasureEditInfoDTO';
import { RectifyDiaryComponent } from './rectify-diary.component';
import { RectifyEffectComponent } from './rectify-effect.component';
import { RectifyMeasureReplyComponent } from './rectify-measure-reply.component';
import { RectifyMeasureComponent } from './rectify-measure.component';
import { RectifyProblemSwitchComponent } from './rectify-problem-switch.component';
import { RectifyTimeLineComponent } from './rectify-time-line.component';
import { RectifyWorkbeachPutComponent } from './rectify-workbeach-put.component';
import { RectifyWorkbeachTableComponent } from './rectify-workbeach-table.component';
import { RectifyMeasureService } from './service/RectifyMeasureService';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rectify-workbeach-view',
  templateUrl: './rectify-workbeach-view.component.html',
  styles: [],
})
export class RectifyWorkbeachViewComponent implements OnInit {
  // 工作备忘录
  @ViewChild('rectifyDiaryComponent', { static: false })
  rectifyDiaryComponent: RectifyDiaryComponent;

  // 整改措施
  @ViewChild('rectifyMeasureComponent', { static: false })
  rectifyMeasureComponent: RectifyMeasureComponent;

  // 整改措施回复组件
  @ViewChild('rectifyMeasureReplyComponent', { static: false })
  rectifyMeasureReplyComponent: RectifyMeasureReplyComponent;

  // 移交纪检组件
  @ViewChild('rectifyIssueTransferComponent', { static: false })
  rectifyIssueTransferComponent: RectifyIssueTransferComponent;

  // 整改成效组件
  @ViewChild('rectifyEffectComponent', { static: false })
  rectifyEffectComponent: RectifyEffectComponent;

  // 问题切换组件
  @ViewChild('rectifyProblemSwitchComponent', { static: false })
  rectifyProblemSwitchComponent: RectifyProblemSwitchComponent;

  /**
   * 整改部门提交申请请求
   * 调用弹窗组件
   */
  @ViewChild('rectifyWorkbeachPutComponent', { static: false })
  rectifyWorkbeachPutComponent: RectifyWorkbeachPutComponent;

  /**
   * 审批人员同不同意，整改部门提交的申请
   * 调用列表弹窗组件
   */
  @ViewChild('rectifyWorkbeachTableComponent', { static: false })
  rectifyWorkbeachTableComponent: RectifyWorkbeachTableComponent;
  // 时间轴组件
  @ViewChild('rectifyTimeLineComponent', { static: false })
  rectifyTimeLineComponent: RectifyTimeLineComponent;

  // 分页参数
  private options: QueryOptions = {
    page: 0,
    size: 20,
    sort: 'id,asc',
  };

  date: Date;

  /**
   * 表格分页参数
   */
  pageInfo = {
    pageNo: 1,
    pageSize: 20,
    totalPages: 1,
    totalRecords: 20,
  };

  systemFiles = [];

  // 查询参数
  searchParam = this.searchParams();

  rectifyEndTime: Date;

  changeMsOrRp: ChangeMsOrRp;

  // 整改跟踪dto
  rectifyTrack = this.initRtParams();

  /**
   * 判断是否为整改部门
   */
  @Input()
  isRectify = false;

  // 折叠与展开
  isFold = true;

  demoValue = 20;

  // 是否无法整改
  radioValue = false;

  /**
   * 请求标识
   */
  loading = false;

  LEFT_WIDTH = 0;

  /**
   * 左侧树宽度
   */
  leftSize = this.LEFT_WIDTH;

  RIGHT_WIDTH = 100;

  /**
   * 右侧树冠宽
   */
  rightSize = this.RIGHT_WIDTH;

  // 时间轴按钮样式
  timeLineButtonType = 'right';

  /**
   * 整改部门树
   */
  organizationTree = [];

  mapOfExpandData: { [key: string]: boolean } = {};
  listOfData = [
    {
      notReadNum: 1,
      measureStatus: 'RECTIFY_CENTRE',
      measureType: '制度修改',
      measureContent: '整改措施',
      rectifyProgress: 10,
      systemFiles: [],
      rectifyCompleteTime: '2021-11-8',
    },
  ];

  // 反馈频率
  days = [];
  weeks = [];
  months = [];
  years = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private rectifyMeasureService: RectifyMeasureService,
    private msg: NzMessageService,
    private systemFileService: SystemFileService,
    private rectifyProblemService: RectifyProblemService,
    private organizationService: OrganizationService,
    private cacheService: CacheService,
    @Inject(LOCALE_ID) private locale: string,
  ) {}

  ngOnInit() {
    // this.resolveQueryParam();
    // this.organizationService.getOrganizationTreeOfEmployeeOrUser().subscribe(data => {
    //   this.organizationTree = TreeUtil.populateTreeNodes(data, 'id', 'name', 'children');
    // });
    // // this.loadData();
    // this.loadTimeOption();
    if (this.cacheService.get('__user', { mode: 'none' }).userType === 'AUDIT_DEPARTMENT') {
      this.isRectify = false;
    } else {
      this.isRectify = true;
    }
  }

  // 获取数据
  loadData() {
    this.loading = true;
    this.rectifyMeasureService
      .findOnePage(
        this.options,
        this.rectifyTrack.id,
        this.searchParam.rectifyBackFeedHz,
        this.searchParam.rectifyBackFeedHzUnit,
        this.searchParam.rectifyEndTime,
      )
      .subscribe(
        data => {
          if (data) {
            // this.listOfData = data.data;
            this.pageInfo.pageNo = data.pageNo + 1;
            this.pageInfo.pageSize = data.pageSize;
            this.pageInfo.totalPages = data.totalPages;
            this.pageInfo.totalRecords = Number(data.totalRecords);
            this.loading = false;
          }
        },
        () => {},
        () => {},
      );
  }

  /**
   * 处理路由参数
   */
  resolveQueryParam() {
    // 处理路由参数
    this.activatedRoute.queryParams.subscribe(queryParams => {
      if (queryParams.isRectify === 'true') {
        this.isRectify = true;
        this.rectifyTrack.id = '404664016171044864';
      } else {
        this.isRectify = false;
        this.rectifyTrack.id = queryParams.rectifyProblemId;
      }
      this.rectifyProblemService.rectifyTrackById(this.rectifyTrack.id).subscribe(data => {
        this.rectifyTrack = data;
        this.date = this.formatDate(data.rectifyEndTime);
      });
    });
  }

  /**
   * 每页条数改变的回调
   */
  pageSizeChange(pageSize: number) {
    this.options.size = pageSize;
    this.loadData();
  }

  /**
   * 	页码改变的回调
   */
  pageIndexChange(pageIndex: number) {
    this.options.page = pageIndex - 1;
    this.loadData();
  }

  /** 执行周期下拉数据 */
  loadTimeOption() {
    for (let i = 1; i <= 31; i++) {
      this.days.push(i);
    }
    for (let i = 1; i <= 4; i++) {
      this.weeks.push(i);
    }
    for (let i = 1; i <= 12; i++) {
      this.months.push(i);
    }
    for (let i = 1; i <= 50; i++) {
      this.years.push(i);
    }
  }

  formatterPercent = (value: number) => `${value} %`;

  // 跳转整改措施界面
  goRectifyEffect() {
    this.rectifyEffectComponent.isVisible = true;
  }

  clickFold() {
    this.isFold = !this.isFold;
  }

  openRectifyDiaryComponent() {
    this.rectifyDiaryComponent.rectifyProblemId = this.rectifyTrack.id;
    this.rectifyDiaryComponent.loadData();
  }

  chageRectifyProgress(id: string, rectifyProgress?: number, measureStatus?: string) {
    this.changeMsOrRp = this.resetChangeMsOrRp();
    this.changeMsOrRp.rectifyProgress = rectifyProgress;
    this.changeMsOrRp.measureStatus = measureStatus;
    this.rectifyMeasureService.updateMsOrRp(id, this.changeMsOrRp).subscribe(
      data => {
        if (data) {
          this.loadData();
        }
      },
      () => {},
      () => {},
    );
  }

  // 整改措施进度与整改状态参数
  resetChangeMsOrRp() {
    return {
      measureStatus: null,
      rectifyProgress: null,
    };
  }

  // 整改措施查询参数
  searchParams() {
    return {
      rectifyProblemId: null,
      rectifyBackFeedHz: null,
      rectifyBackFeedHzUnit: null,
      rectifyEndTime: null,
    };
  }

  formatDateFun(date: Date) {
    if (date) {
      return formatDate(date, 'yyyy-MM-dd', this.locale);
    } else {
      return '';
    }
  }

  formatDate(str: string) {
    if (str) {
      return new Date(str.replace(/-/g, '/'));
    } else {
      return null;
    }
  }

  onChangeRectifyEndTime(date: any) {
    if (date instanceof Date) {
      this.searchParam.rectifyEndTime = this.formatDateFun(date);
    } else {
      this.searchParam.rectifyEndTime = null;
    }
  }

  // 删除
  delete(rectifyMeasureDTO: RectifyMeasureDTO) {
    rectifyMeasureDTO.systemFiles.forEach(systemFile => {
      this.systemFileService.deleteFileById(systemFile.id).subscribe();
    });
    this.rectifyMeasureService.delete(rectifyMeasureDTO.id).subscribe(data => {
      this.msg.success('删除整改措施数据成功！');
      this.loadData();
    });
  }

  // 更新或新增
  update(item?: RectifyMeasureEditInfoDTO, isFile?: boolean, lookFile?: boolean) {
    if (isFile) {
      this.rectifyMeasureComponent.isFile = true;
      this.rectifyMeasureComponent.isWatch = lookFile;
    } else {
      this.rectifyMeasureComponent.isFile = false;
      this.rectifyMeasureComponent.isWatch = false;
    }
    this.rectifyMeasureComponent.edit(item);
  }

  create() {}

  // 查看
  watch(item: RectifyMeasureEditInfoDTO) {
    this.rectifyMeasureComponent.isWatch = true;
    this.rectifyMeasureComponent.isFile = false;
    this.rectifyMeasureComponent.edit(item);
  }

  // 整改措施回复
  rectifyMeasureReplyClick(rectifyMeasureId: string) {
    this.rectifyMeasureReplyComponent.isVisible = true;
    this.rectifyMeasureReplyComponent.rectifyMeasureReply.rectifyMeasureId = rectifyMeasureId;
  }

  // 修改阅读状态
  changeReadStates(data: any) {
    if (data.notReadNum !== 0) {
      this.rectifyMeasureService.changeReadStatus(data.id).subscribe(
        () => {},
        () => {},
        () => {},
      );
      data.notReadNum = 0;
    }
  }

  // 初始化整改跟踪
  initRtParams(item?: RectifyTrackDTO): RectifyTrackDTO {
    return {
      id: item ? item.id : null,
      rectifyEndTime: item ? item.rectifyEndTime : null,
      source: item ? item.source : null,
      remark: item ? item.remark : null,
      advice: item ? item.advice : null,
      rectifyDepartment: item ? item.rectifyDepartment : this.rd(),
      dutyUser: item ? item.dutyUser : this.du(),
    };
  }

  rd(): any {
    return {
      id: null,
      name: null,
    };
  }
  du(): any {
    return {
      id: null,
      name: null,
    };
  }

  /**
   * 移交纪检
   */
  transfer() {
    const arr = [];
    arr.push(this.rectifyTrack);
    this.rectifyIssueTransferComponent.edit(arr);
  }

  // 修改整改问题整改频率与截至时间
  saveProblem() {}

  // 隐藏或展示时间轴
  hideTimeLine() {
    if (this.timeLineButtonType === 'right') {
      this.timeLineButtonType = 'left';
      this.leftSize = 25;
      this.rightSize = 75;
    } else {
      this.timeLineButtonType = 'right';
      this.leftSize = 0;
      this.rightSize = 100;
    }
  }

  // 切换问题
  rectifySwitch() {
    this.rectifyProblemSwitchComponent.mapOfCheckedId[this.rectifyTrack.id] = true;
    this.rectifyProblemSwitchComponent.checkboxData = this.rectifyTrack;
    this.rectifyProblemSwitchComponent.isVisible = true;
  }

  chageRectify(rs: RectifyTrackDTO) {
    if (rs) {
      this.rectifyTrack = rs;
      this.loadData();
    }
  }

  onChangeStates(id: string): void {}

  /**
   * 整改部门进去
   * 申请延期方法
   */
  applicationExtension() {
    this.rectifyWorkbeachPutComponent.open();
  }

  /**
   * 整改部门登录进去
   * 延期申请记录
   */
  applicationRecord() {
    this.rectifyWorkbeachTableComponent.Open('批复人');
  }

  /**
   * 审计人员进去
   * 批不批准延期审批记录
   */
  delayApprove() {
    this.rectifyWorkbeachTableComponent.Open('申请人');
  }

  /**
   * 延期审批
   */
  delayExtension() {
    this.rectifyWorkbeachPutComponent.isWatchForTable = true;
    this.rectifyWorkbeachPutComponent.open();
  }
}
