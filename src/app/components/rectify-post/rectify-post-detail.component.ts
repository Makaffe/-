import { formatDate } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { _HttpClient } from '@delon/theme';
import { FormUtil } from '@mt-framework-ng/util';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { RectificationReportDTO } from './model/RectificationReportDTO';
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
   * 表单
   */
  @ViewChild('form', { static: false })
  form: NgForm;

  /**
   * 数据变更事件
   */
  @Output()
  dataChange = new EventEmitter<any>();

  /**
   * 当前编辑对象
   */
  currentItem: RectificationReportDTO = new RectificationReportDTO();

  /**
   *  组件是否可见
   */
  isVisible = false;

  /**
   * 整改统计时间
   */
  auditTime = null;


  /**
   * 确定按钮加载状态
   */
  loading = false;

  /**
   * 步骤条进度
   */
  current = 0;

  /**
   * 是否查看状态
   */
  isWatch = false;


  /**
   * 关联报告生成存储目录下拉树
   */
  categoryFold = [];

  /**
   * 关联报告生成存储目录下拉（平级）
   */
  allCategoryFold = [];

  /**
   * 当前选中的报告存储目录key
   */
  value = null;

  constructor(
    private rectificationReportService: RectificationReportService,
    private msg: NzMessageService,
    private router: Router,
    private modalService: NzModalService,
    private http: _HttpClient,
  ) {
  }

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
   * 完成
   */
  save(): void {
    if (!FormUtil.validateForm(this.form.form)) {
      this.msg.warning(`请填写所有星号信息!`);
      return;
    }
    this.loading = true;
    this.currentItem.auditStartTime = formatDate(this.auditTime[0], 'yyyy-MM-dd', 'ZH');
    this.currentItem.auditEndTime = formatDate(this.auditTime[1], 'yyyy-MM-dd', 'ZH');
    this.currentItem.templateFileId = this.currentItem.templateFile ? this.currentItem.templateFile.id : null;
    this.currentItem.rectificationReportTypeId = this.currentItem.rectificationReportType
      ? this.currentItem.rectificationReportType.id : this.currentItem.rectificationReportTypeId;
    // 生成文档的存储目录id
    const reportCategoryId = this.value ? this.allCategoryFold.filter(row => row.key === this.value)[0].id : null;

    // 修改
    if (this.currentItem && this.currentItem.id) {
      this.rectificationReportService.update(this.currentItem.id, this.currentItem).subscribe(() => {
        this.msg.success('修改成功!');
        this.handleCancel();
        this.dataChange.emit();
      }, null, () => { this.loading = false; });
      // 新增
    } else {
      this.currentItem.auditReportStatus = 'NO_CREATE';
      this.rectificationReportService.create(this.currentItem).subscribe(() => {
        this.msg.success('新增成功!');
        this.handleCancel();
        this.dataChange.emit();
      }, null, () => { this.loading = false; });
    }



  }

  /**
   * 引用模板
   */
  referenceTempl(): void {
    this.tempalteSelectComponent.show();
  }

  /**
   * 模板选中事件
   */
  selectTmpl($event) {
    this.currentItem.templateFile = $event;
    this.currentItem.templateFileId = this.currentItem.templateFile ? this.currentItem.templateFile.id : null;
  }

  /**
   * 打开弹窗
   */
  openModal(item: RectificationReportDTO, isWatch: boolean = false, rectificationReportTypeId?: string) {
    this.currentItem = new RectificationReportDTO(item);
    this.currentItem.rectificationReportTypeId = rectificationReportTypeId
      ? rectificationReportTypeId : this.currentItem.rectificationReportTypeId;
    this.auditTime = this.currentItem.auditStartTime && this.currentItem.auditEndTime ? [
      formatDate(this.currentItem.auditStartTime, 'yyyy-MM-dd', 'ZH'),
      formatDate(this.currentItem.auditEndTime, 'yyyy-MM-dd', 'ZH')
    ] : [];
    this.isWatch = isWatch;
    this.isVisible = true;
  }

  /**
   * 关闭弹窗
   */
  handleCancel(): void {
    FormUtil.resetForm(this.form.form);
    this.isVisible = false;
  }

  /**
   * tag模板点击事件
   */
  tagClick() {
    // this.router.navigate([`/insight/special-report/template-edit/${this.currentItem.templateFile.id}`]);
  }
}
