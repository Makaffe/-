import { formatDate } from '@angular/common';
import { Component, EventEmitter, Inject, LOCALE_ID, OnInit, Output, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { AttachListComponent } from '../common/attach/attach-list.component';
import { RectifyMeasureDTO } from './model/RectifyMeasureDTO';
import { RectifyMeasureService } from './service/RectifyMeasureService';

@Component({
  selector: 'app-rectify-measure',
  templateUrl: './rectify-measure.component.html',
  styles: [],
})
export class RectifyMeasureComponent implements OnInit {
  @ViewChild('attachListComponent', { static: false })
  attachListComponent: AttachListComponent;

  isVisible = false;
  isFile = false;

  isWatch = true;

  rectifyMeasure = this.initItem();

  date: Date;

  @Output()
  saveRectifyMeasure = new EventEmitter();

  measureTypes = [
    { id: '制度修改', name: '制度修改' },
    { id: '制度建立', name: '制度建立' },
    { id: '资金挽回', name: '资金挽回' },
  ];
  constructor(
    private rectifyMeasureService: RectifyMeasureService,
    private msg: NzMessageService,
    @Inject(LOCALE_ID) private locale: string,
  ) {}
  ngOnInit(): void {}

  handleCancel() {
    this.isVisible = false;
  }

  edit(item: RectifyMeasureDTO) {
    // if (item && item.rectifyCompleteTime) {
    //   this.date = this.formatDate(item.rectifyCompleteTime);
    // }
    // this.rectifyMeasure = this.initItem(item);
    // if (this.rectifyMeasure.measureStatus === null) {
    //   this.rectifyMeasure.measureStatus = 'NOT_SUBMITTED';
    //   this.rectifyMeasure.rectifyProgress = 0;
    // }
    // this.rectifyMeasure.rectifyProblemId = '404664016171044864';
    // this.isVisible = true;
  }

  /**
   * 初始化项目任务
   */
  initItem(item?: RectifyMeasureDTO): RectifyMeasureDTO {
    return {
      id: item && item.id ? item.id : null,
    };
  }

  formatDateFun(date: Date) {
    if (date) {
      return formatDate(date, 'yyyy-MM-dd', this.locale);
    } else {
      return '';
    }
  }

  formatDate(str: string) {
    if (str) {
      return new Date(str.replace(/-/g, '/'));
    } else {
      return null;
    }
  }

  onChangeRectifyEndTime(date: any) {
    // if (date instanceof Date) {
    //   this.rectifyMeasure.rectifyCompleteTime = this.formatDateFun(date);
    // } else {
    //   this.rectifyMeasure.rectifyCompleteTime = null;
    // }
  }

  // 保存整改措施
  save() {
    // this.rectifyMeasureService.add(this.rectifyMeasure).subscribe(data => {
    //   this.msg.success('保存整改措施数据成功！');
    //   this.saveRectifyMeasure.emit();
    //   this.handleCancel();
    // });
  }
}
