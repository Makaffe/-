import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NzTreeSelectComponent } from 'ng-zorro-antd';
@Component({
  selector: 'app-problem-type-select',
  templateUrl: './problem-type-select.component.html',
  styles: [],
})
export class ProblemTypeSelectComponent implements OnInit {
  /**
   * 树选择component
   */
  @ViewChild('problemtypeselect', { static: false })
  problemtypeselect: NzTreeSelectComponent;

  /**
   * 双向绑定value
   */
  @Output()
  type = null;

  /**
   * Output事件，用于该组件的双向绑定
   */
  @Output()
  typeChange = new EventEmitter<any>();

  /**
   * 提示
   */
  @Input()
  placeHolder = '请选择问题类型';

  /**
   * 是否禁用
   */
  @Input()
  disabled = false;

  /**
   * 树
   */
  @Input()
  nodes = [];

  /**
   * 树点击
   * @param event treenode
   */
  onChange(event: any): void {
    const treeNodeList = this.problemtypeselect.getSelectedNodeList();
    if (treeNodeList.length > 0) {
      this.typeChange.emit(treeNodeList[0]);
    }
  }

  ngOnInit(): void {}

  constructor() {}
}
