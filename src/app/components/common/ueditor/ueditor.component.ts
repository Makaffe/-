import { Component, OnInit, Input, EventEmitter, Output, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { UEditorComponent } from 'ngx-ueditor';
@Component({
  selector: 'app-ueditor',
  templateUrl: './ueditor.component.html',
  styleUrls: ['./ueditor.component.less'],
})
export class UeditorComponent implements OnInit {
  /**
   * 是否禁用
   */
  @Input()
  disabled = false;

  @Input()
  html = '';
  @Output()
  htmlChange = new EventEmitter();
  @Input()
  ueModel;
  @Output()
  ueModelChange = new EventEmitter();

  // ue对象
  @ViewChild('ue', { static: false })
  ue: UEditorComponent;

  config = {
    initialFrameWidth: null,
    initialFrameHeight: 350,
    autoHeightEnabled: false,
    autoFloatEnabled: false,
    scaleEnabled: false,
    enableContextMenu: true,
    elementPathEnabled: false,
    wordCount: false,
    maximumWords: 1000000,
    serverUrl: '',
    toolbars: [
      [
        'source',
        '|',
        'undo',
        'redo',
        '|',
        'bold',
        'italic',
        'underline',
        'strikethrough',
        'superscript',
        'subscript',
        'removeformat',
        'formatmatch',
        'blockquote',
        'pasteplain',
        '|',
        'forecolor',
        'backcolor',
        '|',
        'paragraph',
        'fontfamily',
        'fontsize',
        '|',
        'justifyleft',
        'justifycenter',
        'justifyright',
        'justifyjustify',
        '|',
        'link',
        'unlink',
        'inserttable',
        'deletetable',
        'insertparagraphbeforetable',
        'insertrow',
        'deleterow',
        'insertcol',
        'deletecol',
        // tslint:disable-next-line:max-line-length
        'mergecells',
        'mergeright',
        'mergedown',
        'splittocells',
        'splittorows',
        'splittocols',
        '|',
        'insertorderedlist',
        'insertunorderedlist',
        '|',
        'rowspacingtop',
        'rowspacingbottom',
        'lineheight',
        '|',
        'horizontal',
        'date',
        'time',
        'spechars',
        '|',
      ],
    ],
    lineheight: ['0.5', '0.75', '1', '1.15', '1.5', '1.75', '2', '3', '4', '5'],
    initialStyle: `
      *::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      *::-webkit-scrollbar-thumb {
        background: #d9d9d9;
        cursor: pointer;
        border-radius: 8px;
      }
      // body.view[contenteditable]{
      //   box-shadow: 1px 1px 8px #666;
      // }
    `,
    whitList: {
      // xss过滤白名单
      a: ['target', 'href', 'title', 'class', 'style'],
      abbr: ['title', 'class', 'style'],
      address: ['class', 'style'],
      area: ['shape', 'coords', 'href', 'alt'],
      article: [],
      aside: [],
      audio: ['autoplay', 'controls', 'loop', 'preload', 'src', 'class', 'style'],
      b: ['class', 'style'],
      bdi: ['dir'],
      bdo: ['dir'],
      big: [],
      blockquote: ['cite', 'class', 'style'],
      br: [],
      caption: ['class', 'style'],
      center: [],
      cite: [],
      code: ['class', 'style'],
      col: ['align', 'valign', 'span', 'width', 'class', 'style'],
      colgroup: ['align', 'valign', 'span', 'width', 'class', 'style'],
      dd: ['class', 'style'],
      del: ['datetime'],
      details: ['open'],
      div: ['class', 'style'],
      dl: ['class', 'style'],
      dt: ['class', 'style'],
      em: ['class', 'style'],
      font: ['color', 'size', 'face'],
      footer: [],
      h1: ['class', 'style'],
      h2: ['class', 'style'],
      h3: ['class', 'style'],
      h4: ['class', 'style'],
      h5: ['class', 'style'],
      h6: ['class', 'style'],
      header: [],
      hr: [],
      i: ['class', 'style'],
      img: ['src', 'alt', 'title', 'width', 'height', 'id', '_src', 'loadingclass', 'class', 'data-latex', 'code'], // 扩展
      ins: ['datetime'],
      li: ['class', 'style'],
      mark: [],
      nav: [],
      ol: ['class', 'style'],
      p: ['class', 'style'],
      pre: ['class', 'style'],
      s: [],
      section: [],
      small: [],
      span: ['class', 'style', 'code', 'contenteditable', 'title', 'col-id'], // 扩展
      sub: ['class', 'style'],
      sup: ['class', 'style'],
      strong: ['class', 'style'],
      table: ['width', 'border', 'align', 'valign', 'class', 'style', 'code', 'title'], // 扩展
      tbody: ['align', 'valign', 'class', 'style'],
      td: ['width', 'rowspan', 'colspan', 'align', 'valign', 'class', 'style'],
      tfoot: ['align', 'valign', 'class', 'style'],
      th: ['width', 'rowspan', 'colspan', 'align', 'valign', 'class', 'style'],
      thead: ['align', 'valign', 'class', 'style'],
      tr: ['rowspan', 'a   lign', 'valign', 'class', 'style'],
      tt: [],
      u: [],
      ul: ['class', 'style'],
      video: ['autoplay', 'controls', 'loop', 'preload', 'src', 'height', 'width', 'class', 'style'],
    },
  };

  ngOnInit() {
  }

  htmlChangeHandle() {
    this.htmlChange.emit(this.html);
  }

  /**
   * 获取内容
   */
  getAllHtml(): string {
    return this.ue.Instance.getAllHtml();
  }

  /**
   * 设置内容
   */
  setContent(content: any) {
    this.html = content;
    this.ue.Instance.setContent(content);
  }

  /**
   * 校验方法
   */
  validate() {
    return this.html && this.html.trim() !== '';
  }

  /**
   * 编辑器准备就绪后会触发该事件，并会传递 UEditorComponent 当前实例对象，可用于后续操作。
   */
  _ready(event: UEditorComponent) {
    if (event && event.Instance) {
      if (this.disabled) {
        event.Instance.setDisabled();
      } else {
        event.Instance.setEnabled();
      }
    }
  }
}
