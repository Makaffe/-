import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReuseTabService } from '@delon/abc';
import { NzMessageService } from 'ng-zorro-antd';
import { RectificationReportDTO } from './model/RectificationReportDTO';
import { RectifyGenerateReportDetailComponent } from './rectify-generate-report-detail.component';
import { RectificationReportService } from './service/RectificationReportService';
import { TempalteSelectComponent } from './tempalte-select.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rectify-post-detail',
  templateUrl: './rectify-post-detail.component.html',
  styleUrls: ['./rectify-post-detail.component.less'],
})
export class RectifyPostDetailComponent implements OnInit {
  /**
   * 引用模板弹窗
   */
  @ViewChild('tempalteSelectComponent', { static: false })
  tempalteSelectComponent: TempalteSelectComponent;

  /**
   * 生成报告弹窗
   */
  @ViewChild('rectifyGenerateReportDetailComponent', { static: false })
  rectifyGenerateReportDetailComponent: RectifyGenerateReportDetailComponent;

  /**
   * 左侧宽度常量
   */
  LEFT_WIDTH = 300;

  /**
   * 左侧宽度常量
   */
  TOP_HIGHT = 50;
  /**
   * 左侧组织机构树宽度
   */
  leftSize = this.LEFT_WIDTH;
  /**
   * 左侧组织机构树上部分高度
   */
  topSize = this.TOP_HIGHT;

  /**
   * 当前编辑对象
   */
  currentItem: RectificationReportDTO = new RectificationReportDTO();

  /**
   * 当前选中的模板
   */
  template = null;
  /**
   * 整改统计时间
   */
  auditTime = null;

  /**
   * 步骤条进度
   */
  current = 0;
  /**
   * 判断是否只读
   */
  readFlag1: boolean;
  readFlag2: boolean;
  visabled = false;

  /**
   * 是否查看状态
   */
  isWatch = false;

  /**
   * 完成按钮加载状态
   */
  loading = false;

  listOfData = [];

  constructor(
    private rectificationReportService: RectificationReportService,
    private msg: NzMessageService,
    private reuseService: ReuseTabService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    // 处理路由
    this.activatedRoute.params.subscribe(data => {
      this.isWatch = data.isWatch;
      this.currentItem.rectificationReportTypeId = data && data.rectificationReportTypeId ? data.rectificationReportTypeId : null;
      if (data && data.rectificationReportId && data.rectificationReportId !== 'null') {
        this.rectificationReportService.findById(data.rectificationReportId).subscribe(item => {
          this.currentItem = new RectificationReportDTO(item);
          this.auditTime = [
            formatDate(this.currentItem.auditStartTime, 'yyyy-MM-dd', 'ZH'),
            formatDate(this.currentItem.auditEndTime, 'yyyy-MM-dd', 'ZH')
          ];
          this.template = this.currentItem.templateFile;
          this.listOfData = [{
            name: this.currentItem.templateFile ? this.currentItem.templateFile.templateName : null,
            reportName: this.currentItem.reportFile ? this.currentItem.reportFile.reportName : null
          }];
        });
      }
    });
  }

  ngOnInit() { }
  pre(): void {
    this.current -= 1;
    this.changeContent();
  }

  next(): void {
    this.current += 1;
    this.visabled = true;
    this.changeContent();
  }

  /**
   * 完成
   */
  done(): void {
    this.loading = true;
    this.currentItem.auditStartTime = formatDate(this.auditTime[0], 'yyyy-MM-dd', 'ZH');
    this.currentItem.auditEndTime = formatDate(this.auditTime[1], 'yyyy-MM-dd', 'ZH');
    this.currentItem.templateFileId = this.template ? this.template.id : null;
    this.currentItem.rectificationReportTypeId = this.currentItem.rectificationReportType
      ? this.currentItem.rectificationReportType.id : this.currentItem.rectificationReportTypeId;

    // 修改
    if (this.currentItem && this.currentItem.id) {
      this.rectificationReportService.update(this.currentItem.id, this.currentItem).subscribe(() => {
        this.msg.success('修改成功!');
        this.closeTab(
          `/audit-rectify/rectify-post-detail/${this.isWatch}/${this.currentItem.rectificationReportTypeId}/${this.currentItem.id}`,
          `http://localhost:4200/#/audit-rectify/rectify-post`,
          this.reuseService,
          this.router
        );
      }, null, () => { this.loading = false; });
      // 新增
    } else {
      this.currentItem.auditReportStatus = 'NO_CREATE';
      this.rectificationReportService.create(this.currentItem).subscribe(() => {
        this.msg.success('新增成功!');
        this.closeTab(
          `/audit-rectify/rectify-post-detail/${this.currentItem.rectificationReportTypeId}/${this.currentItem.id}`,
          `http://localhost:4200/#/audit-rectify/rectify-post`,
          this.reuseService,
          this.router
        );
      }, null, () => { this.loading = false; });
    }



  }

  changeContent(): void {
    switch (this.current) {
      case 0: {
        this.readFlag1 = false;
        this.readFlag2 = true;
        break;
      }
      case 1: {
        this.readFlag1 = true;
        this.readFlag2 = false;
        break;
      }
      default: {
        this.readFlag1 = true;
        this.readFlag1 = false;
      }
    }
  }

  /**
   * 引用模板
   */
  referenceTempl(): void {
    this.tempalteSelectComponent.show();
  }

  /**
   * 生成报告
   */
  generate() {
    this.rectifyGenerateReportDetailComponent.isVisible = true;
  }

  /**
   * 生成报告成功事件
   */
  generateReportEvent($event: RectificationReportDTO) {
    this.currentItem = $event;
    console.log('item', this.currentItem);
    this.auditTime = [
      formatDate(this.currentItem.auditStartTime, 'yyyy-MM-dd', 'ZH'),
      formatDate(this.currentItem.auditEndTime, 'yyyy-MM-dd', 'ZH')
    ];
    this.listOfData = [{ name: $event.templateFile.templateName, reportName: $event.reportFile.reportName }];
  }

  /**
   * 模板选中事件
   */
  selectTmpl($event) {
    this.currentItem.templateFile = $event;
    this.template = $event;
    this.listOfData = [{ name: $event.name, reportName: null }];

    this.currentItem.auditStartTime = formatDate(this.auditTime[0], 'yyyy-MM-dd', 'ZH');
    this.currentItem.auditEndTime = formatDate(this.auditTime[1], 'yyyy-MM-dd', 'ZH');
    this.currentItem.templateFileId = this.template ? this.template.id : null;
    this.currentItem.rectificationReportTypeId = this.currentItem.rectificationReportType
      ? this.currentItem.rectificationReportType.id : this.currentItem.rectificationReportTypeId;

  }

  /**
   * 关闭tab路由标签
   * @param closeLink 待关闭的路由路径
   * @param openLink 无法关闭时，新打开的路由路径
   * @param reuseService 路由复用service ReuseTabService
   * @param route 路由跳转service Router
   */
  closeTab(closeLink: string, openLink: string, reuseService?: ReuseTabService, route?: Router) {
    // reuse-tab不支持全部关闭，必须保留一个选项卡
    if (reuseService.items.length > 0) {
      reuseService.close(closeLink);
    } else {
      route.navigate([openLink]);
    }
  }
}
