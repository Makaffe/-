import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-advice-template-select',
  templateUrl: './advice-template-select.component.html',
  styles: [``],
})
export class AdviceTemplateSelectComponent implements OnInit {
  constructor() {}
  /**
   * 判断建议还是oA
   */
  @Input()
  flag: boolean;
  /**
   * 建议模板树
   */
  @Input()
  templateNodes = [
    {
      title: '模板类型1',
      key: '模板类型1',
      selectable: false,
      children: [
        {
          title: '模板1',
          key: '模板1',
          isLeaf: true,
        },
        {
          title: '模板2',
          key: '模板2',
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

  /**
   * 是否禁用
   */
  @Input()
  disabled = false;

  ngOnInit() {
    if (this.flag === false) {
      this.templateNodes = [
        {
          title: 'OA消息模板',
          key: '建议模板类型1',
          selectable: false,
          children: [
            {
              title: '问题下发模板',
              key: '问题下发模板',
              isLeaf: true,
            },
            {
              title: '催办通知模板',
              key: '催办通知模板',
              isLeaf: true,
            },
          ],
        },
      ];
    }
  }

  /**
   * 确认引用
   */
  confirmReference() {
    this.adviceTemplate = this.value;
    this.adviceTemplateChange.emit(this.adviceTemplate);
  }
}
