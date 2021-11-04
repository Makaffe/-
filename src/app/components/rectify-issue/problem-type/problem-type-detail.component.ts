import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormUtil } from '@ng-mt-framework/util';
import { NzMessageService } from 'ng-zorro-antd';
import { ProblemTypeService } from '../../common/problem-type-select/ProblemTypeService.service';
import { RectifyProblemTypeEditInfoDTO } from '../model/RectifyProblemTypeEditInfoDTO';
import { RectifyProblemTypeService } from '../service/RectifyProblemTypeService';
@Component({
  selector: 'app-problem-type-detail',
  templateUrl: './problem-type-detail.component.html',
  styles: [],
})
export class ProblemTypeDetailComponent implements OnInit {
  /**
   * 表单组件
   */
  @ViewChild('form', { static: false })
  form: NgForm;

  /**
   * 发送通知
   */
  @Output()
  notification = new EventEmitter<any>();

  /**
   * 显示模态框
   */
  isVisible: boolean;

  /**
   * 是否查看
   */
  isWatch: boolean;

  /**
   * 加载loading
   */
  loading: boolean;

  /**
   * 类型参数
   */
  currentItem = this.initRectifyProblemType();

  /**
   * 是否展示父节点
   */
  showParent: boolean;

  /**
   * 父节点名称
   */
  parentName: string;

  /**
   * 关闭模态框
   */
  handleCancel() {
    this.form.reset('form');
    this.isVisible = false;
    FormUtil.resetForm(this.form.form);
  }

  /**
   * 点击确认的方法
   */
  save() {
    if (this.currentItem.id != null) {
      this.rectifyProblemTypeService.update(this.currentItem.id, this.currentItem).subscribe(data => {
        this.notification.emit();
        this.msg.success('更新成功');
      });
    } else {
      this.rectifyProblemTypeService.create(this.currentItem).subscribe(data => {
        this.notification.emit();
        this.msg.success('新增成功');
      });
    }
    this.handleCancel();
  }

  /**
   *
   * @param item 编辑问题类型
   *
   */
  edit(item?: RectifyProblemTypeEditInfoDTO, isWatch?: boolean, created?: boolean) {
    if (item) {
      if (item.parent != null && item.parent) {
        this.parentName = item.parent.name;
        this.currentItem.parentId = item.parent.id;
      } else {
        this.parentName = item.name;
      }
      if (created === true) {
        this.currentItem = this.initRectifyProblemType();
        this.currentItem.parentId = item.id;
      } else {
        this.currentItem = this.initRectifyProblemType(item);
      }
      this.showParent = true;
    } else {
      this.currentItem = this.initRectifyProblemType();
      this.showParent = false;
    }
    this.isWatch = isWatch;
    this.isVisible = true;
  }

  /**
   *
   * @param item 初始化问题类型参数
   * @returns 问题类型
   */
  initRectifyProblemType(item?: RectifyProblemTypeEditInfoDTO) {
    return {
      id: item ? item.id : null,
      name: item ? item.name : null,
      remark: item ? item.remark : null,
      parentId: item ? item.parentId : null,
    };
  }

  constructor(private rectifyProblemTypeService: RectifyProblemTypeService, private msg: NzMessageService) {}
  ngOnInit(): void {}
}
