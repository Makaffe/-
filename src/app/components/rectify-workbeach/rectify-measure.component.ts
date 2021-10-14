import { formatDate } from '@angular/common';
import { Component, EventEmitter, Inject, LOCALE_ID, OnInit, Output, ViewChild } from '@angular/core';
import { time } from 'console';
import { NzMessageService } from 'ng-zorro-antd';
import { AttachListComponent } from '../common/attach/attach-list.component';
import { RectifyMeasureEditInfoDTO } from './model/RectifyMeasureEditInfoDTO';
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

  // 整改问题id
  rectifyProblemId: string;

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

  edit(item: RectifyMeasureEditInfoDTO) {
    if (item && item.rectifyCompleteTime) {
      this.date = this.formatDate(item.rectifyCompleteTime);
    }

    this.rectifyMeasure = this.initItem(item);
    if (this.rectifyMeasure.measureStatus === null) {
      this.rectifyMeasure.measureStatus = 'NOT_SUBMITTED';
      this.rectifyMeasure.rectifyProgress = 0;
    }
    this.rectifyMeasure.rectifyProblemId = '123456';
    this.isVisible = true;
  }

  /**
   * 初始化项目任务
   */
  initItem(item?: RectifyMeasureEditInfoDTO): RectifyMeasureEditInfoDTO {
    return {
      id: item && item.id ? item.id : null,
      measureStatus: item && item.measureStatus ? item.measureStatus : null,
      rectifyProgress: item && item.rectifyProgress ? item.rectifyProgress : null,
      measureType: item && item.measureType ? item.measureType : null,
      measureContent: item && item.measureContent ? item.measureContent : null,
      rectifyCompleteTime: item && item.rectifyCompleteTime ? item.rectifyCompleteTime : null,
      rectifyProblemId: item && item.rectifyProblemId ? item.rectifyProblemId : null,
      systemFiles: item && item.systemFiles ? item.systemFiles : [],
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
    if (date instanceof Date) {
      this.rectifyMeasure.rectifyCompleteTime = this.formatDateFun(date);
    } else {
      this.rectifyMeasure.rectifyCompleteTime = null;
    }
  }

  // 保存整改措施
  save() {
    this.rectifyMeasureService.add(this.rectifyMeasure).subscribe(data => {
      this.msg.success('保存整改措施数据成功！');
      this.saveRectifyMeasure.emit();
      this.handleCancel();
    });
  }
}
