import { DatePipe, formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QueryOptions } from '@mt-framework-ng/core';
import { SystemFileService } from '@ng-mt-framework/api';
import { TABLE_PARAMETER } from '@ng-mt-framework/comp';
import { ObjectUtil } from '@ng-mt-framework/util';
import { NzMessageService } from 'ng-zorro-antd';
import { ChangeMsOrRp } from './model/ChangeMsOrRp';
import { RectifyMeasureDTO } from './model/RectifyMeasureDTO';
import { RectifyMeasureEditInfoDTO } from './model/RectifyMeasureEditInfoDTO';
import { RectifyDiaryComponent } from './rectify-diary.component';
import { RectifyMeasureReplyComponent } from './rectify-measure-reply.component';
import { RectifyMeasureComponent } from './rectify-measure.component';
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

  @ViewChild('rectifyMeasureReplyComponent', { static: false })
  rectifyMeasureReplyComponent: RectifyMeasureReplyComponent;

  // 分页参数
  private options: QueryOptions = {
    page: 0,
    size: 20,
    sort: 'id,asc',
  };

  /**
   * 表格分页参数
   */
  pageInfo = {
    pageNo: 1,
    pageSize: 20,
    totalPages: 1,
    totalRecords: 20,
  };

  // 查询参数
  searchParam = this.searchParams();

  rectifyEndTime: Date;

  changeMsOrRp: ChangeMsOrRp;

  // 整改问题id
  rectifyProblemId: string;

  // 判断是否为整改部门
  isRectify = false;

  // 折叠与展开
  isFold = false;

  demoValue = 20;

  /**
   * 请求标识
   */
  loading = false;

  mapOfExpandData: { [key: string]: boolean } = {};
  listOfData = [];

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
    @Inject(LOCALE_ID) private locale: string,
  ) {}

  ngOnInit() {
    this.resolveQueryParam();
    this.loadData();
    this.loadTimeOption();
  }

  // 获取数据
  loadData() {
    this.rectifyProblemId = '123456';
    this.loading = true;
    this.rectifyMeasureService
      .findOnePage(
        this.options,
        this.rectifyProblemId,
        this.searchParam.rectifyBackFeedHz,
        this.searchParam.rectifyBackFeedHzUnit,
        this.searchParam.rectifyEndTime,
      )
      .subscribe(
        data => {
          if (data) {
            this.listOfData = data.data;
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
      } else {
        this.isRectify = false;
      }
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

  goRectifyEffect() {
    this.router.navigate(['/audit-rectify/rectify-effect']);
  }

  clickFold() {
    this.isFold = !this.isFold;
  }

  openRectifyDiaryComponent() {
    this.rectifyDiaryComponent.rectifyProblemId = '123456';
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
}
