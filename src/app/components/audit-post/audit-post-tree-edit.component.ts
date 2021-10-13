import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormUtil } from '@ng-mt-framework/util';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import { AuditPostTypeDTO } from './model/AuditPostTypeDTO';
import { AuditPostTypeService } from './service/AuditPostTypeService';

@Component({
  selector: 'audit-post-tree-edit',
  templateUrl: './audit-post-tree-edit.component.html',
  styles: [],
})
export class AuditPostTreeEditComponent implements OnInit {
  constructor(
    private msg: NzMessageService,
    private http: HttpClient,
    private auditPostTypeService: AuditPostTypeService,
  ) {}
  uploading = false;
  fileList: UploadFile[] = [];
  @ViewChild('form', { static: false })
  form: NgForm;

  @Input()
  knowledgeType = null;

  /**
   * 数据更改通知事件
   */
  @Output()
  notification = new EventEmitter();

  currentItem: AuditPostTypeDTO = this.initDTO();

  parentName = '';
  /**
   * 禁止全部输入空格正则匹配
   */
  PATTERN = '^(?!(\\s+)).*$';

  /**
   * 窗口是否可见
   */
  isVisible = false;

  @Output()
  dataChange = new EventEmitter();
  /**
   * 是否处于查看状态
   */
  isWatch = false;

  /**
   * 数据请求标志
   */
  loading = false;

  /**
   * 创建或修改数据
   *
   * @param item 需要编辑的数据，item为null表示创建新数据
   * @param isWatch 是否处于预览状态
   */
  edit(item?: any, created?: boolean) {
    if (created === false) {
      this.currentItem = this.initDTO(item);
      if (!this.currentItem.parent) {
        this.parentName = '';
      } else {
        this.auditPostTypeService.findByIdUsingGET(item.parent.id).subscribe(data => {
          this.parentName = data.name;
        });
      }
    } else {
      if (item) {
        const parentId = item.id;
        this.parentName = item.name;
        this.currentItem.parent.id = parentId;
      } else {
        this.parentName = '';
      }
    }
    this.isVisible = true;
  }

  handleCancel() {
    this.currentItem = this.initDTO();
    this.isVisible = false;
  }

  /**
   * 创建或修改数据树
   *
   * @param item 需要编辑的数据，item为null表示创建新数据
   * @param isWatch 是否处于预览状态
   */
  editTree(node?: any, isWatch: boolean = false) {
    this.loading = false;
    this.isWatch = isWatch;

    this.isVisible = true;
  }

  genderChange($event): void {}

  /**
   * 初始化
   */
  initDTO(item?: any): any {
    return {
      id: item ? item.id : null,
      name: item ? item.name : null,
      parent: item ? item.parent : null,
      remark: item ? item.remark : null,
    };
  }

  /**
   * 初始化树
   */
  initDTOTree(node?: any): any {
    return {
      author: node ? node.author : null,
      children: node ? node.children : null,
      key: node ? node.key : null,
      title: node ? node.title : null,
    };
  }

  ngOnInit() {}
  /**
   * 验证表单
   */
  private validate() {
    return FormUtil.validateForm(this.form.form);
  }

  save() {
    if (!this.validate() || !this.currentItem.name) {
      this.msg.warning('请补全星号的必填信息项');
      return;
    }
    this.loading = true;
    if (this.currentItem.id) {
      this.auditPostTypeService.updateUsingPUT(this.currentItem.id, this.currentItem).subscribe(
        () => this.afterCompleted(),
        null,
        () => (this.loading = false),
      );
    } else {
      this.auditPostTypeService.addUsingPOST(this.currentItem).subscribe(
        () => this.afterCompleted(),
        null,
        () => (this.loading = false),
      );
    }
  }
  /**
   * 新增或修改请求后调用
   */
  afterCompleted() {
    this.handleCancel();
    this.msg.success('操作成功！');
    this.notification.emit();
  }
}
