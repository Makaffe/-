import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzTreeNode } from 'ng-zorro-antd';
@Component({
  selector: 'app-advice-template-select',
  templateUrl: './advice-template-select.component.html',
  styles: [``],
})
export class AdviceTemplateSelectComponent implements OnInit {
  constructor() {}

  /**
   * 建议模板树
   */
  templateNodes = [
    {
      title: '建议模板类型1',
      key: '建议模板类型1',
      selectable: false,
      children: [
        {
          title: '建议模板1',
          key: '建议模板1',
          isLeaf: true,
        },
        {
          title: '建议模板2',
          key: '建议模板2',
          isLeaf: true,
        },
      ],
    },
  ];

  /**
   * 选择的建议模板
   */
  @Input()
  adviceTemplate = null;

  value = null;

  /**
   * Output事件，用于该组件的双向绑定
   */
  @Output()
  adviceTemplateChange = new EventEmitter<string>();

  ngOnInit() {}

  /**
   * 确认引用
   */
  confirmReference() {
    this.adviceTemplate = this.value;
    this.adviceTemplateChange.emit(this.adviceTemplate);
  }
}
