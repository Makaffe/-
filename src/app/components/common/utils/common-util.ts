import { SystemFileService } from '@ng-mt-framework/api';
import { Injectable, ElementRef, Renderer2 } from '@angular/core';
import * as htmlDocx from 'html-docx-js/dist/html-docx.js';
import { UeditorComponent } from '../ueditor/ueditor.component';

/**
 * 通用工具类
 */
@Injectable({
  providedIn: 'root',
})
export class CommonUtil {
  constructor(private systemFileService: SystemFileService) {
    CommonUtil.systemFileServiceImpl = this.systemFileService;
  }
  /**
   * 系统文件Service
   */
  private static systemFileServiceImpl: SystemFileService;

  /**
   * 附件下载方法
   * @param id 文件Id
   * @param fileNname 文件保存名称
   */
  static downLoadAttachFile(id: string, fileName?: string) {
    CommonUtil.systemFileServiceImpl.downloadFileContentById(id).subscribe(blob => {
      CommonUtil.createDownload(blob, fileName);
    });
  }

  /**
   * 触发浏览器下载
   * @param blob 二进制文件流
   * @param fileName 下载文件名
   */
  public static createDownload(blob, fileName: string) {
    const uA = window.navigator.userAgent; // 判断浏览器内核
    const isIE =
      /msie\s|trident\/|edge\//i.test(uA) &&
      !!(
        'uniqueID' in document ||
        'documentMode' in document ||
        'ActiveXObject' in window ||
        'MSInputMethodContext' in window
      );
    const binaryData = [];
    binaryData.push(blob.body);
    const objectUrl = window.URL.createObjectURL(new Blob(binaryData, { type: blob.body.type }));
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.href = objectUrl;
    a.download = fileName ? fileName : '';
    if (isIE) {
      // 兼容IE11无法触发下载的问题
      navigator.msSaveBlob(new Blob(binaryData), a.download);
    } else {
      a.click();
    }
    a.remove();
  }

  public static downloadFileBlob(data: any, fileName: string) {
    const blob = new Blob([data.body], { type: 'text/csv' });
    const link = document.createElement('a');
    console.log(window.URL.createObjectURL(data.body));
    link.setAttribute('href', window.URL.createObjectURL(data.body));
    link.setAttribute('download', fileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    const dataURL = window.URL.createObjectURL(blob);
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob);
      return;
    }
    setTimeout(() => {
      // For Firefox it is necessary to delay revoking the ObjectURL
      window.URL.revokeObjectURL(dataURL);
    }, 100);
  }

  /**
   * 计算日期间隔天数
   * @param startDay 开始日期
   * @param endDay 结束日期
   */
  static countDays(startDay: string, endDay: string): number {
    const startTime = new Date(startDay);
    const endTime = new Date(endDay);
    const usedTime = endTime.getTime() - startTime.getTime();
    const days = Math.floor(usedTime / (24 * 3600 * 1000));
    return days;
  }

  /**
   * 预览
   */
  static preview(id: string, fileNname?: string) {
    let name = fileNname;
    if (fileNname && fileNname.lastIndexOf('.') !== -1) {
      name = fileNname.substring(0, fileNname.lastIndexOf('.'));
    }

    const fileType = 'png,jpg,jpeg,PNG,JPG,JPEG';
    const suffix = fileNname.slice(fileNname.lastIndexOf('.') + 1);

    if (fileType.includes(suffix)) {
      // 预览图片
      this.systemFileServiceImpl.getFileContentById(id).subscribe(
        blob => {
          const binaryData = [];
          binaryData.push(blob.body);
          const objectUrl = window.URL.createObjectURL(new Blob(binaryData, { type: blob.body.type }));
          const win = window.open(objectUrl);
          setTimeout(() => {
            win.document.title = name;
          }, 100);
        },
        () => {},
        null,
      );
    } else {
      this.systemFileServiceImpl.previewFileById(id).subscribe(
        blob => {
          const uA = window.navigator.userAgent; // 判断浏览器内核
          const isIE =
            /msie\s|trident\/|edge\//i.test(uA) &&
            !!(
              'uniqueID' in document ||
              'documentMode' in document ||
              'ActiveXObject' in window ||
              'MSInputMethodContext' in window
            );
          const binaryData = [];
          binaryData.push(blob.body);
          const objectUrl = window.URL.createObjectURL(new Blob(binaryData, { type: blob.body.type }));
          const win = window.open(objectUrl);
          setTimeout(() => {
            win.document.title = name;
          }, 100);
        },
        () => {},
        null,
      );
    }
  }

  /**
   * 是否可以预览
   * @param fileName 文件名
   */
  static checkFileType(fileName: string): boolean {
    const fileType =
      'png,jpg,jpeg,PNG,JPG,JPEG,doc,docx,xls,xlsx,ppt,pptx,pdf,txt,wps,DOC,DOCX,XLS,XLSX,PPT,PPTX,PDF,TXT,WPS';

    const suffix = fileName.slice(fileName.lastIndexOf('.') + 1);

    return fileType.includes(suffix);
  }

  /**
   * 文书模板html导出word
   * @param templateName 文书模板名称
   * @param ueComp ueditor实例
   * @param htmlString html字符串(可以直接传html字符串无需ueditor实例)
   */
  static templateHtml2Word(templateName: string, ueComp: UeditorComponent, htmlString?: string) {
    const fileName = templateName + new Date().getTime();
    let html: string;
    if (ueComp) {
      html = ueComp.getAllHtml();
    } else {
      html = htmlString;
    }
    html = html
      .replace('<body', '<body class="view"') // 给Body还原上样式
      .replace('<head>', '<head><meta charset="utf-8">'); // 设置编码
    // html += '<style>td,th{border: 1px solid}</style>'; // 加边框
    const blob = htmlDocx.asBlob(html);
    CommonUtil.createDownload({ body: blob }, fileName);
  }

  /**
   *  nz-input-number 组件是否可以输入，金额格式化，在上个元素中靠右
   * @param type 是否可以输入
   */
  nzInputNumberIsinput(type: boolean, el: ElementRef, render2: Renderer2) {
    if (!type) {
      el.nativeElement.querySelectorAll('textarea').forEach(element => {
        render2.addClass(element, 'no-input');
      });
      el.nativeElement.querySelectorAll('app-nz-input-number-my').forEach(element => {
        setTimeout(() => {
          render2.addClass(element, 'input-display');
          const e = render2.createElement('span');
          const num = element.childNodes[0].getAttribute('myvalue') ? element.childNodes[0].getAttribute('myvalue') : 0;
          const text = render2.createText(this.splitThousandSeparator(num));
          render2.appendChild(e, text);
          render2.appendChild(element.parentElement, e);
          render2.addClass(element.parentElement, 'account-span-right');
        }, 1);
      });
    } else {
      el.nativeElement.querySelectorAll('textarea').forEach(element => {
        render2.removeClass(element, 'no-input');
      });
      el.nativeElement.querySelectorAll('app-nz-input-number-my').forEach(element => {
        setTimeout(() => {
          render2.removeClass(element, 'input-display');
          render2.removeChild(render2.parentNode(element), render2.nextSibling(element));
        }, 1);
      });
    }
  }

  /**
   * 数字金额分离
   * @param num 数字
   */
  splitThousandSeparator(num: number): string {
    let prefix = '';
    if (num < 0) {
      num *= -1;
      prefix = '-';
    }
    const DIGIT_PATTERN = /(^|\s)\d+(?=\.?\d*($|\s))/g;
    const MILI_PATTERN = /(?=(?!\b)(\d{3})+\.?\b)/g;
    const str: string = num.toString().replace(DIGIT_PATTERN, m => m.replace(MILI_PATTERN, ','));
    return prefix + str;
  }
}
