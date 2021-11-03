import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { _HttpClient } from '@delon/theme';
import { FormUtil } from '@mt-framework-ng/util';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { AuditPostDTO } from '../audit-post/model/AuditPostDTO';
import { AuditPostService } from '../audit-post/service/AuditPostService';
import { RectificationReportDTO } from './model/RectificationReportDTO';
import { RectificationReportTypeDTO } from './model/RectificationReportTypeDTO';
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
   * 审计报告下拉
   */
  auditReportList: Array<AuditPostDTO>;

  /**
   * 当前编辑对象
   */
  currentItem: RectificationReportDTO = new RectificationReportDTO();

  /**
   * 当前左侧树点击的节点
   */
  @Input()
  currentClickNode: RectificationReportTypeDTO = new RectificationReportTypeDTO();

  /**
   *  组件是否可见
   */
  isVisible = false;

  /**
   * 整改统计时间
   */
  auditTime = [];


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

  /**
   * 审计报告
   */
  auditReport = null;

  /**
   * 整改单位
   */
  Unit = null;
  /**
   * 整改部门
   */
  rectifyDepartment = null;
  constructor(
    private rectificationReportService: RectificationReportService,
    private msg: NzMessageService,
    private router: Router,
    private modalService: NzModalService,
    private http: _HttpClient,
    private auditPostService: AuditPostService
  ) {
  }

  ngOnInit() {
    // 加载审计报告下拉
    this.auditPostService.findAll().subscribe(list => {
      this.auditReportList = list;
    });
    // 加载报告模板目录
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
    if (!this.currentItem.templateFile) {
      this.msg.warning(`请选择报告模板!`);
      return;
    }
    this.loading = true;
    this.currentItem.auditStartTime = this.auditTime && this.auditTime.length > 0
      ? formatDate(this.auditTime[0], 'yyyy-MM-dd', 'ZH') : null;
    this.currentItem.auditEndTime = this.auditTime && this.auditTime.length > 0 ? formatDate(this.auditTime[1], 'yyyy-MM-dd', 'ZH') : null;
    this.currentItem.templateFileId = this.currentItem.templateFile ? this.currentItem.templateFile.id : null;
    this.currentItem.rectificationReportTypeId = this.currentItem.rectificationReportType
      ? this.currentItem.rectificationReportType.id : this.currentItem.rectificationReportTypeId;
    // 生成文档的存储目录id
    const reportCategoryId = this.value ? this.allCategoryFold.filter(row => row.key === this.value)[0].id : null;
    // 这里的汇报规则还需要改 先测试
    this.currentItem.summaryRules =
      this.currentClickNode && this.currentClickNode.name === '按时间区间'
        || this.currentItem.rectificationReportType && this.currentItem.rectificationReportType.name === '按时间区间'
        ? 'ALL' : this.currentClickNode.name === '按审计报告'
          || this.currentItem.rectificationReportType && this.currentItem.rectificationReportType.name === '按审计报告'
          ? 'REPORT' : this.rectifyDepartment && this.rectifyDepartment.length > 0 ? 'DEPARTMENT' : 'UNIT';
    this.currentItem.rectificationReportDetailIds =
      this.currentItem.summaryRules === 'REPORT'
        ? [this.auditReport] : this.currentItem.summaryRules === 'UNIT'
          ? [this.Unit[0].id] : this.currentItem.summaryRules === 'DEPARTMENT'
            ? [this.rectifyDepartment[0].id] : null;
    // 修改-现在是做成不允许修改
    if (this.currentItem && this.currentItem.id) {
      this.rectificationReportService.update(this.currentItem.id, this.currentItem).subscribe(() => {
        this.msg.success('修改成功!');
        this.handleCancel();
        this.dataChange.emit();
      }, null, () => { this.loading = false; });
      // 新增
    } else {
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
    if (item) {
      this.rectificationReportService.findById(item.id).subscribe(data => {
        this.currentItem = new RectificationReportDTO(data);
        this.currentItem.rectificationReportTypeId = rectificationReportTypeId
          ? rectificationReportTypeId : this.currentItem.rectificationReportTypeId;
        this.auditTime = this.currentItem.auditStartTime && this.currentItem.auditEndTime ? [
          formatDate(this.currentItem.auditStartTime, 'yyyy-MM-dd', 'ZH'),
          formatDate(this.currentItem.auditEndTime, 'yyyy-MM-dd', 'ZH')
        ] : [];
        this.auditReport = this.currentItem.summaryRules === 'REPORT' ? this.currentItem.reportData[0].id : null;
        this.Unit = this.currentItem.summaryRules === 'UNIT' ? this.currentItem.reportData : null;
        if (this.currentItem.summaryRules === 'DEPARTMENT') {
          const unitId = this.currentItem.reportData ? this.currentItem.reportData[0].filterPath.split('-', 1)[0] : null;
          // tslint:disable-next-line: max-line-length
          this.http.get(`/api/organizations/${unitId}/children?deepLoad=true&exclusive=false&self=true&organizationType=UNIT`).subscribe(unit => {
            this.Unit = unit;
            setTimeout(() => {
              this.rectifyDepartment = this.currentItem.reportData;
            }, 100);
          });
        }
      });
    } else {
      this.currentItem = new RectificationReportDTO();
      this.currentItem.rectificationReportTypeId = this.currentClickNode.id;
    }

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
