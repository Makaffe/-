import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { AttachListComponent } from 'src/app/components/common/attach/attach-list.component';
import { AuditPostWatchComponent } from 'src/app/components/rectify-issue/audit-post-watch.component';
import { TransferDisposeDTO } from 'src/app/components/rectify-issue/model/TransferDisposeDTO';
import { TransferInfoDTO } from 'src/app/components/rectify-issue/model/TransferInfoDTO';
import { TransferRecordDTO } from 'src/app/components/rectify-issue/model/TransferRecordDTO';
import { TransferInfoService } from 'src/app/components/rectify-issue/service/TransferInfoService';

interface ItemData {
  id: string;
  name: string;
  age: number;
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'supervise-process-form',
  templateUrl: './supervise-process-form.component.html',
  styleUrls: [],
})
export class SuperviseProcessFormComponent implements OnInit, AfterViewInit {
  @ViewChild('attachListComponent', { static: false })
  attachListComponent: AttachListComponent;
  height = '700px';
  /**
   * 审计报告详情弹窗
   */
  @ViewChild('auditPostWatchComponent', { static: false })
  auditPostWatchComponent: AuditPostWatchComponent;

  @Output()
  notication = new EventEmitter();

  /**
   * 左侧宽度
   */
  leftSize = 40;

  /**
   * 右侧宽度
   */
  rightSize = 60;

  /**
   * 是否只读
   */
  disabled = false;

  /**
   * 初始化移交处理
   */
  currentItem = this.initTransferDispose();

  /**
   * 初始化移交处分
   */
  paramsItem = this.initTransferRecord();

  /**
   * 日期
   */
  date = new Date();

  isVisible = false;
  radioLetterValue: any = 'A';
  radioDisciplineValue: any = 'A';
  editCache: { [key: string]: { edit: boolean; data: ItemData } } = {};
  listOfData: ItemData[] = [];

  constructor(private transferInfoService: TransferInfoService, private msg: NzMessageService) {}

  updateEditCache(edit: boolean): void {
    this.listOfData.forEach(item => {
      this.editCache[item.id] = {
        edit,
        data: { ...item },
      };
    });
  }

  ngOnInit(): void {}

  handleCancel() {
    this.isVisible = false;
  }

  show(isWatch: boolean = false) {
    this.disabled = isWatch;
    this.isVisible = true;
    if (this.disabled) {
      this.updateEditCache(false);
    }
    setTimeout(() => {
      this.setTabContentHeight();
    }, 300);
  }

  addRow() {
    this.listOfData.push({
      id: this.listOfData.length.toString(),
      name: `sss`,
      age: 22,
    });
    this.listOfData = [...this.listOfData];
    this.updateEditCache(true);
  }

  deletePunishment(id: any) {
    this.listOfData = this.listOfData.filter(data => data.id !== id);
  }

  /**
   * 折叠或展开问题详情
   */
  fold() {
    if (this.leftSize === 0) {
      this.leftSize = 40;
      this.rightSize = 60;
    } else {
      this.leftSize = 0;
      this.rightSize = 100;
    }
  }

  /**
   * 查看报告
   */
  viewReport() {
    this.auditPostWatchComponent.watch(null);
  }

  ngAfterViewInit() {
    // this.setTabContentHeight();
  }

  @HostListener('window:resize', ['$event'])
  onResize($event) {
    this.setTabContentHeight();
  }

  /**
   * 设置弹窗高度
   */
  private setTabContentHeight() {
    // 浏览器内容区高度
    const tabContentHeight = document.body.clientHeight;
    this.height = tabContentHeight * 0.8 + 'px';
  }

  /**
   * 初始化移交参数
   */
  initTransferDispose(item?: TransferDisposeDTO) {
    return {
      sendLetterTime: item ? item.sendLetterTime : null,
      isSendLetter: item ? item.isSendLetter : null,
      punishTime: item ? item.punishTime : null,
      isPunish: item ? item.isPunish : null,
      transferDescription: item ? item.transferDescription : null,
      transferInfo: item ? item.transferInfo : null,
      attachFiles: item ? item.attachFiles : [],
      transferInfoId: item ? item.transferInfoId : null,
      attachFileIds: item ? item.attachFileIds : [],
    };
  }

  /**
   * 初始化处分参数
   */
  initTransferRecord(item?: TransferRecordDTO) {
    return {
      id: item ? item.id : null,
      mainPunishType: item ? item.mainPunishType : null,
      punishType: item ? item.punishType : null,
      transferDisposeId: item ? item.transferDispose : null,
    };
  }

  /**
   * 点击完成后执行的方法
   */
  handleOk() {
    this.transferInfoService.create(this.currentItem).subscribe(data => {
      this.msg.success('已处理');
      this.notication.emit();
    });
  }
}
