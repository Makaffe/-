import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { RectificationReportDTO } from './model/RectificationReportDTO';
import { RectificationReportTypeDTO } from './model/RectificationReportTypeDTO';
import { RectifyPostListComponent } from './rectify-post-list.component';
import { RectificationReportService } from './service/RectificationReportService';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rectify-post-view',
  templateUrl: './rectify-post-view.component.html',
  styles: []
})
export class RectifyPostViewComponent implements OnInit {

  /**
   * 整改报告列表
   */
  @ViewChild('rectifyPostListComponent', { static: false })
  rectifyPostListComponent: RectifyPostListComponent;

  /**
   * 搜索条件
   */
  filter = {
    name: null,
    auditTime: null,
    year: null
  };

  /**
   * 当前左侧树点击的节点
   */
  currentClickNode: RectificationReportTypeDTO = new RectificationReportTypeDTO();

  /**
   * 当前列表单选框选中的数据
   */
  @Input()
  selectedData: RectificationReportDTO = null;

  /**
   * 左侧宽度常量
   */
  LEFT_WIDTH = 180;

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
  constructor(
    private router: Router,
    private msg: NzMessageService,
    private modalService: NzModalService,
    private rectificationReportService: RectificationReportService,

  ) { }

  ngOnInit() {
  }

  /**
   * 查找
   */
  search() {
    this.rectifyPostListComponent.load();
  }


  /**
   * 情况搜索条件
   */
  clearCondition() {
    this.filter.auditTime = null;
    this.filter.name = null;
  }

  /**
   * 新增整改报告
   */
  create() {
    this.rectifyPostListComponent.edit(null, false, this.currentClickNode.id);
  }


  /**
   * 生成文档
   */
  generate() {
    if (!this.selectedData || !this.selectedData.id) {
      this.msg.warning('请选择一条数据！');
      return;
    }
    if (this.selectedData && this.selectedData.reportFile) {
      this.modalService.confirm({
        nzTitle: '当前已生成报告，是否重新生成，旧报告将会被删除！',
        nzOnOk: () => {
          this.rectificationReportService.generateReport(
            this.selectedData.id,
            this.selectedData.templateFile.id,
            // 这个是报告生成的存放目录id，现在暂时写死，因为后台在重新设计，以前整改报告dto是没有这个字段的
            '404950811093897216',
            this.selectedData.name,
            true
          ).subscribe(data => {
            this.msg.success('生成成功！');
            this.rectifyPostListComponent.load();
            this.router.navigate([
              // tslint:disable-next-line:max-line-length
              `/insight/special-report/report-edit/${data.reportFile.id}/manager?templateName=${data.reportFile.reportName}&reportName=文件`,
            ]);
          });
        }
      });
    } else {
      this.rectificationReportService.generateReport(
        this.selectedData.id,
        this.selectedData.templateFile.id,
        // 这个是报告生成的存放目录id，现在暂时写死，因为后台在重新设计，以前整改报告dto是没有这个字段的
        '404950811093897216',
        this.selectedData.name,
        true
      ).subscribe(data => {
        data.rectificationReportTypeId = data.rectificationReportType.id;
        data.templateFileId = data.templateFile.id;
        this.rectificationReportService.update(data.id, data).subscribe(() => {
          this.msg.success('生成成功！');
          this.rectifyPostListComponent.load();
          this.router.navigate([
            // tslint:disable-next-line:max-line-length
            `/insight/special-report/report-edit/${data.reportFile.id}/manager?templateName=${data.reportFile.reportName}&reportName=文件`,
          ]);
        });
      });
    }

  }

  /**
   * 查看生成文档
   */
  viewGenerateDoc() {
    if (!this.selectedData || !this.selectedData.id) {
      this.msg.warning('请选择一条数据！');
      return;
    }
    if (!this.selectedData.reportFile || !this.selectedData.reportFile.id) {
      this.msg.warning('当前没有生成报告！');
      return;
    }
    this.router.navigate([
      // tslint:disable-next-line:max-line-length
      `/insight/special-report/report-edit/${this.selectedData.reportFile.id}/manager?templateName=${this.selectedData.reportFile.reportName}&reportName=文件`,
    ]);
  }

  /**
   * 编辑模板
   */
  templEdit(): void {
    if (!this.selectedData) {
      this.msg.warning(`请选择一条数据`);
      return;
    }
    if (!this.selectedData.templateFile) {
      this.msg.warning(`当前数据不存在文书模板`);
      return;
    }
    this.router.navigate([`/insight/special-report/template-edit/${this.selectedData.templateFile.id}`]);
  }

  /**
   * 左侧树点击事件
   */
  selectNode($event) {
    this.currentClickNode = $event;
    if ($event) {
      setTimeout(() => {
        this.rectifyPostListComponent.load();
      }, 100);
    }
  }
}
