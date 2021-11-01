import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { AttachListComponent } from 'src/app/components/common/attach/attach-list.component';
import { AuditPostWatchComponent } from 'src/app/components/rectify-issue/audit-post-watch.component';

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

  /**
   * 左侧宽度
   */
  leftSize = 40;

  /**
   * 右侧宽度
   */
  rightSize = 60;
  disabled = false;
  currentItem = {
    reportName: '经济责任报告',
    problemName: '有关于财政支出问题',
    rectifyChargeName: 'jack',
    number: '42388',
    problemType: 'jack',
  };
  constructor() {}
  isVisible = false;
  date = new Date();
  radioLetterValue: any = 'A';
  radioDisciplineValue: any = 'A';
  editCache: { [key: string]: { edit: boolean; data: ItemData } } = {};
  listOfData: ItemData[] = [];

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
}
