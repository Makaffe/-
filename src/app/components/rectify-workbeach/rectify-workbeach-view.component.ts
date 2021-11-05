import { formatDate } from '@angular/common';
import { Component, Inject, Input, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CacheService } from '@delon/cache';
import { QueryOptions } from '@mt-framework-ng/core';
import { TreeUtil } from '@mt-framework-ng/util';
import { OrganizationService, SystemFileService } from '@ng-mt-framework/api';
import { NzMessageService } from 'ng-zorro-antd';
import { RectifyIssueTransferComponent } from '../rectify-issue/rectify-issue-transfer.component';
import { RectifyProblemService } from '../rectify-issue/service/RectifyProblemService';
import { RectifyTrackDTO } from '../rectify-track/model/RectifyTrackDTO';
import { ChangeMsOrRp } from './model/ChangeMsOrRp';
import { RectifyMeasureDTO } from './model/RectifyMeasureDTO';
import { RectifyDiaryComponent } from './rectify-diary.component';
import { RectifyEffectComponent } from './rectify-effect.component';
import { RectifyFeedbackRemindComponent } from './rectify-feedback-remind.component';
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

  /**
   * 催办通知醒组件
   */
  @ViewChild('rectifyFeedbackRemindComponent', { static: false })
  rectifyFeedbackRemindComponent: RectifyFeedbackRemindComponent;

  /**
   * 判断是否为整改部门
   */
  @Input()
  isRectify = false;

  /**
   * 判断是否查看，如果是查看，隐藏部分按钮
   */
  isWatch = false;

  /**
   * 整改部门树
   */
  organizationTree = [];

  /**
   * 回复判断
   */
  isRectifyMeasureReply = true;

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
  // rectifyTrack = this.initRtParams();
  rectifyTrack: any;

  // 折叠与展开
  isFold = true;

  demoValue: any;

  /**
   * 请求标识
   */
  loading = false;

  LEFT_WIDTH = 25;

  /**
   * 左侧树宽度
   */
  leftSize = this.LEFT_WIDTH;

  RIGHT_WIDTH = 75;

  /**
   * 右侧树冠宽
   */
  rightSize = this.RIGHT_WIDTH;

  // 时间轴按钮样式
  timeLineButtonType = 'left';

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
      rectifyMeasureReplys: [
        {
          name: '小明 2021-10-11',
          replyContent: '关于xxx整改措施补充',
          systemFiles: [{ name: '整改措施文件', originalName: '整改措施文件', size: '10', type: 'other' }],
        },
        {
          name: '王成 2021-10-16',
          replyContent: '已收到关于xxx整改措施补充',
          systemFiles: [{ name: '整改措施文件2', originalName: '整改措施文件2', size: '10', type: 'other' }],
        },
        {
          name: '小明 2021-10-17',
          replyContent: '问题整改过程中出现了。。。',
          systemFiles: [],
        },
      ],
    },
  ];

  /**
   * 模板选择值
   */
  templateValue: any;

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
  ) { }

  ngOnInit() {
    // 加载整改负责人级联选择
    this.organizationService.findUserTree().subscribe(data => {
      this.fomatCascadeData(data);
      this.organizationTree = [...data];
    });

    if (this.cacheService.get('__user', { mode: 'none' }).userType === 'AUDIT_DEPARTMENT') {
      this.isRectify = false;
    } else {
      this.isRectify = true;
    }
    this.resolveQueryParam();
    this.loadRectifyProblemData();
    this.loadMeasureData();
  }

  // 获取整改问题数据
  loadRectifyProblemData() {
    this.rectifyProblemService.rectifyTrackById(this.searchParam.rectifyProblemId).subscribe(data => {
      this.rectifyTrack = data;
      this.date = this.formatDate(data.rectifyCompleteTime);
    });
  }
  loadData() {

  }
  // 获取整改措施数据
  loadMeasureData() {
    this.loading = true;
    this.rectifyMeasureService
      .findOnePage(
        this.options,
        this.searchParam.rectifyProblemId,
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
        () => { },
        () => { },
      );
  }

  /**
   * 处理路由参数
   */
  // resolveQueryParam() {
  //   // 处理路由参数
  //   this.activatedRoute.queryParams.subscribe(queryParams => {
  //     if (queryParams.isRectify === 'true') {
  //       this.isRectify = true;
  //       this.rectifyTrack.id = '404664016171044864';
  //     } else {
  //       this.isRectify = false;
  //       this.rectifyTrack.id = queryParams.rectifyProblemId;
  //     }
  //     this.rectifyProblemService.rectifyTrackById(this.rectifyTrack.id).subscribe(data => {
  //       this.rectifyTrack = data;
  //       this.date = this.formatDate(data.rectifyEndTime);
  //     });
  //   });
  // }
  resolveQueryParam() {
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.isWatch = queryParams.isWatch === 'true' ? true : false;
      this.searchParam.rectifyProblemId = queryParams.rectifyProblemId;
    });
  }

  /**
   * 每页条数改变的回调
   */
  pageSizeChange(pageSize: number) {
    this.options.size = pageSize;
    this.loadMeasureData();
  }

  /**
   * 	页码改变的回调
   */
  pageIndexChange(pageIndex: number) {
    this.options.page = pageIndex - 1;
    this.loadMeasureData();
  }

  formatterPercent = (value: number) => `${value} %`;

  // 跳转整改措施界面
  goRectifyEffect() {
    this.rectifyEffectComponent.edit(this.isWatch, this.searchParam.rectifyProblemId);
  }

  clickFold() {
    this.isFold = !this.isFold;
  }

  openRectifyDiaryComponent() {
    this.rectifyDiaryComponent.rectifyProblemId = this.searchParam.rectifyProblemId;
    this.rectifyDiaryComponent.loadData();
  }

  chageRectifyProgress(id: string, rectifyProgress?: number, measureStatus?: string) {
    this.changeMsOrRp = this.resetChangeMsOrRp();
    this.changeMsOrRp.rectifyProgress = rectifyProgress;
    this.changeMsOrRp.measureStatus = measureStatus;
    this.rectifyMeasureService.updateMsOrRp(id, this.changeMsOrRp).subscribe(
      data => {
        if (data) {
          this.loadMeasureData();
        }
      },
      () => { },
      () => { },
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
    // rectifyMeasureDTO.systemFiles.forEach(systemFile => {
    //   this.systemFileService.deleteFileById(systemFile.id).subscribe();
    // });
    // this.rectifyMeasureService.delete(rectifyMeasureDTO.id).subscribe(data => {
    //   this.msg.success('删除整改措施数据成功！');
    //   this.loadData();
    // });
  }

  // 更新或新增
  update(item?: RectifyMeasureDTO, isFile?: boolean, lookFile?: boolean) {
    if (isFile) {
      this.rectifyMeasureComponent.isFile = true;
      this.rectifyMeasureComponent.isWatch = lookFile;
    } else {
      this.rectifyMeasureComponent.isFile = false;
      this.rectifyMeasureComponent.isWatch = false;
    }
    this.rectifyMeasureComponent.edit(item ? item.id : this.searchParam.rectifyProblemId, item);
  }

  create() { }

  // 查看
  watch(item: RectifyMeasureDTO) {
    this.rectifyMeasureComponent.isWatch = true;
    this.rectifyMeasureComponent.isFile = false;
    this.rectifyMeasureComponent.edit(item.id, item);
  }

  // 整改措施回复
  rectifyMeasureReplyClick(rectifyMeasureId?: string) {
    this.isRectifyMeasureReply = false;
    this.rectifyMeasureReplyComponent.edit(rectifyMeasureId, this.isRectify);
  }

  // 修改阅读状态
  changeReadStates(data: any) {
    if (data.notReadNum !== 0) {
      // this.rectifyMeasureService.changeReadStatus(data.id).subscribe(
      //   () => {},
      //   () => {},
      //   () => {},
      // );
      // data.notReadNum = 0;
    }
  }

  /**
   * 移交纪检
   */
  transfer(turnOver: boolean) {
    const arr = [];
    arr.push(this.rectifyTrack);
    this.rectifyIssueTransferComponent.readOnly = turnOver;
    this.rectifyIssueTransferComponent.edit(arr);
  }

  // 修改整改问题整改频率与截至时间
  saveProblem() { }

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
    this.rectifyProblemSwitchComponent.mapOfCheckedId[this.searchParam.rectifyProblemId] = true;
    this.rectifyProblemSwitchComponent.checkboxData = this.rectifyTrack;
    this.rectifyProblemSwitchComponent.isVisible = true;
  }

  chageRectify(rs: any) {
    if (rs) {
      this.rectifyTrack = rs;
      // this.loadData();
    }
  }

  onChangeStates(id: string): void { }

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
    this.rectifyWorkbeachTableComponent.Open();
  }

  /**
   * 审计人员进去
   * 批不批准延期审批记录
   */
  delayApprove() {
    this.rectifyWorkbeachTableComponent.Open();
  }

  /**
   * 延期审批
   */
  delayExtension() {
    this.rectifyWorkbeachPutComponent.isWatchForTable = true;
    this.rectifyWorkbeachPutComponent.open();
  }

  /**
   * 回复切换
   */
  clickRectifyMeasureReply() {
    this.isRectifyMeasureReply = true;
  }

  /**
   * 查看附件
   */
  lookFile(systemFiles: any) {
    this.rectifyMeasureComponent.isWatch = true;
    this.rectifyMeasureComponent.isFile = true;
    // this.rectifyMeasureComponent.rectifyMeasure.systemFiles = systemFiles;
    this.rectifyMeasureComponent.isVisible = true;
  }

  /**
   * 模板值处理
   */
  templateChange(eve: any) { }

  /**
   * 反馈提醒
   */
  rectifyFeedbackRemind() {
    this.rectifyFeedbackRemindComponent.isVisible = true;
  }

  /**
   * 格式成级联选择数据
   */
  fomatCascadeData(data?: Array<any>) {
    data.forEach(item => {
      item.value = item.id;
      item.label = item.name;
      item.children = item.userBaseDTOS && item.userBaseDTOS.length > 0 ? item.userBaseDTOS : item.children;
      if (item && item.children && item.children.length > 0) {
        this.fomatCascadeData(item.children);
      } else if (!item.organizationType) {
        item.isLeaf = true;
      }
    });
  }
}
