import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { _HttpClient } from '@delon/theme';
import { FormUtil } from '@mt-framework-ng/util';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { RectificationReportDTO } from './model/RectificationReportDTO';
import { RectificationReportService } from './service/RectificationReportService';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rectify-generate-report-detail',
  templateUrl: './rectify-generate-report-detail.component.html',
  styles: []
})
export class RectifyGenerateReportDetailComponent implements OnInit {

  /**
   * 表单
   */
  @ViewChild('form', { static: false })
  form: NgForm;

  /**
   *  组件是否可见
   */
  isVisible = false;

  /**
   * 确定按钮加载状态
   */
  loading = false;

  /**
   * 生成报告成功事件
   */
  @Output()
  generateReportEvent = new EventEmitter<any>();

  /**
   * 当前编辑整改报告
   */
  @Input()
  rectifyReport: RectificationReportDTO = new RectificationReportDTO();

  /**
   * 关联报告生成存储目录下拉树
   */
  categoryFold = [];

  /**
   * 关联报告生成存储目录下拉（平级）
   */
  allCategoryFold = [];

  /**
   * 报告名称
   */
  reportName = null;

  /**
   * 当前选中的目录key
   */
  value = null;

  constructor(
    private http: _HttpClient,
    private msg: NzMessageService,
    private rectificationReportService: RectificationReportService,
    private modalService: NzModalService,
  ) { }

  ngOnInit() {
    this.http.get<any>('/api/comm/categories/tree/SPECIAL_REPORT?searchType=0&keyword=&isSearchResource=FALSE').subscribe(data => {
      this.categoryFold = data;
      this.tramsform(this.categoryFold, 100);
      this.getAllNodes(this.categoryFold, this.allCategoryFold);
    });
  }

  /**
   *
   * @param data 关联报告生成存储目录下拉树
   * @param level 最顶级父节点level值
   */
  tramsform(data: Array<any>, level: number): void {
    let counter = 0;
    data.forEach(item => {
      item.expanded = true;
      item.title = item.name;
      item.key = `${level + counter}`;
      counter++;
      if (item.children && item.children.length > 0) {
        this.tramsform(item.children, level * 10 + Math.random());
      }
    });
  }

  /***
   * 递归获取节点
   */
  getAllNodes(tree: Array<any>, array: Array<any>) {
    for (const node of tree) {
      array.push(node);
      if (node.children && node.children.length > 0) {
        this.getAllNodes(node.children, array);
      }
    }
  }

  /**
   * 保存
   */
  save() {
    if (!FormUtil.validateForm(this.form.form)) {
      this.msg.warning(`请填写所有星号信息!`);
      return;
    }
    if (!this.rectifyReport.templateFile) {
      this.msg.warning(`请先选择模板!`);
      return;
    }
    this.loading = true;
    const reportCategoryId = this.allCategoryFold.filter(row => row.key === this.value)[0].id;
    if (this.rectifyReport && this.rectifyReport.id) {
      this.rectificationReportService.generateReport(
        this.rectifyReport.id,
        this.rectifyReport.templateFile.id,
        reportCategoryId,
        this.reportName,
        true
      ).subscribe(data => {
        this.msg.success('生成成功!');
        this.generateReportEvent.emit(data);
        this.handleCancel();
      }, null, () => { this.loading = false; });
    } else {
      this.modalService.confirm({
        nzTitle: '当前整改报告未保存，将会自动保存并生成文书报告',
        nzOnOk: () => {
          this.rectifyReport.auditReportStatus = 'CREATED';
          this.rectificationReportService.create(this.rectifyReport).subscribe((data) => {
            this.rectifyReport = data;
            this.rectificationReportService.generateReport(
              this.rectifyReport.id,
              this.rectifyReport.templateFile.id,
              reportCategoryId,
              this.reportName,
              true
            ).subscribe(row => {
              this.msg.success('生成成功!');
              this.generateReportEvent.emit(row);
              this.handleCancel();
            }, null, () => { this.loading = false; });
          });
        }
      });
    }
  }
  /**
   * 关闭弹窗
   */
  handleCancel(): void {
    FormUtil.resetForm(this.form.form);
    this.isVisible = false;
  }

}
