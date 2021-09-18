import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';

@Component({
  selector: 'audit-post-tree-edit',
  templateUrl: './audit-post-tree-edit.component.html',
  styles: [],
})
export class AuditPostTreeEditComponent implements OnInit {
  constructor(private msg: NzMessageService, private http: HttpClient) {}
  uploading = false;
  fileList: UploadFile[] = [];
  @ViewChild('form', { static: false })
  knowledgeTypeForm: NgForm;

  @Input()
  knowledgeType = null;

  currentItem = {};

  /**
   * 禁止全部输入空格正则匹配
   */
  PATTERN = '^(?!(\\s+)).*$';

  /**
   * 窗口是否可见
   */
  isVisible = false;

  item = {
    id: null,
    title: '',
    categories: '公司制度',
    unitName: '',
    unitNumber: '',
    version: '',
    date: '',
    content: '',
  };

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
  edit() {
    this.isVisible = true;
  }

  handleCancel() {
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
      titleName: item ? item.titleName : null,
      unitDate: item ? item.unitDate : null,
      subtitleName: item ? item.subtitleName : null,
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
}
