import { Component, OnInit } from '@angular/core';

interface ItemData {
  id: string;
  name: string;
  age: number;
}
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'issue-assign-table',
  templateUrl: './issue-assign-table.component.html',
  styles: [],
})
export class IssueAssignTableComponent implements OnInit {
  isVisible = false;
  disabled = false;
  radioValue: any;
  date = null;
  editCache: { [key: string]: { edit: boolean; data: ItemData } } = {};
  listOfData: ItemData[] = [];

  constructor() {}

  ngOnInit() {}

  handleCancel() {
    this.isVisible = false;
  }

  show() {
    this.isVisible = true;
  }

  updateEditCache(edit: boolean): void {
    this.listOfData.forEach(item => {
      this.editCache[item.id] = {
        edit,
        data: { ...item },
      };
    });
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
