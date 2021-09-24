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
  styles: [],
})
export class SuperviseProcessFormComponent implements OnInit {
  @ViewChild('attachListComponent', { static: false })
  attachListComponent: AttachListComponent;

  disabled = false;

  constructor() {}
  isVisible = false;
  date = new Date();
  radioLetterValue: any;
  radioDisciplineValue: any;
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

  show() {
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
}
