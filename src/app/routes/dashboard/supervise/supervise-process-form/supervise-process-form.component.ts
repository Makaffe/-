import { Component, OnInit, ViewChild } from '@angular/core';
import { AttachListComponent } from 'src/app/components/common/attach/attach-list.component';

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
export class SuperviseProcessFormComponent implements OnInit {
  @ViewChild('attachListComponent', { static: false })
  attachListComponent: AttachListComponent;

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
  constructor() { }
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

  ngOnInit(): void { }

  handleCancel() {
    this.isVisible = false;
  }

  show(isWatch: boolean = false) {
    this.disabled = isWatch;
    this.isVisible = true;
    if (this.disabled) {
      this.updateEditCache(false);
    }
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
}
