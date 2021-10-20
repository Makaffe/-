import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormUtil } from '@mt-framework-ng/util';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import { RectificationReportTypeDTO } from './model/RectificationReportTypeDTO';
import { RectificationReportTypeService } from './service/RectificationReportTypeService';

@Component({
  selector: 'rectify-post-type-tree-edit',
  templateUrl: './rectify-post-type-tree-edit.component.html',
  styles: []
})
export class RectifyPostTypeTreeEditComponent implements OnInit {

  uploading = false;
  fileList: UploadFile[] = [];
  @ViewChild('form', { static: false })
  form: NgForm;

  @Input()
  selectNode = null;

  /**
   * 禁止全部输入空格正则匹配
   */
  PATTERN = '^(?!(\\s+)).*$';

  /**
   * 窗口是否可见
   */
  isVisible = false;

  /**
   * 当前编辑对象
   */
  currentItem: RectificationReportTypeDTO = new RectificationReportTypeDTO();
  /**
   * 父级名称
   */
  parentName = null;
  @Output()
  dataChange = new EventEmitter();
  /**
   * 是否处于查看状态
   */
  isWatch = false;

  /**
   * 保存按钮请求标志
   */
  loading = false;

  constructor(
    private msg: NzMessageService,
    private http: HttpClient,
    private rectificationReportTypeService: RectificationReportTypeService) { }

  ngOnInit() { }
  /**
   * 创建或修改数据
   *
   * @param item 需要编辑的数据，item为null表示创建新数据
   * @param isWatch 是否处于预览状态
   */
  edit(isEdit) {
    if (isEdit) {
      this.currentItem = this.selectNode;
      this.parentName = this.currentItem.parent ? this.currentItem.parent.name : null;
    } else {
      this.currentItem = new RectificationReportTypeDTO();
      this.parentName = this.selectNode ? this.selectNode.name : null;
    }
    this.isVisible = true;
  }

  handleCancel() {
    this.isVisible = false;
  }


  /**
   * 保存
   */
  save() {
    if (!FormUtil.validateForm(this.form.form)) {
      this.msg.warning('请补全标星号信息！');
      return;
    }
    this.loading = true;
    if (this.currentItem.id) {
      this.currentItem.parentId = this.currentItem.parent ? this.currentItem.parent.id : null;
      this.rectificationReportTypeService.update(this.currentItem.id, this.currentItem).subscribe(() => {
        this.msg.success('修改成功!');
        this.dataChange.emit();
        this.handleCancel();
      }, null, () => { this.loading = false; });
    } else {
      this.currentItem.parentId = this.selectNode ? this.selectNode.id : null;
      this.rectificationReportTypeService.create(this.currentItem).subscribe(() => {
        this.msg.success('新增成功!');
        this.dataChange.emit();
        this.handleCancel();
      }, null, () => { this.loading = false; });
    }
  }
}
