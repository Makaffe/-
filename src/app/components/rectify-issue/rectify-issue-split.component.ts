import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rectify-issue-split',
  templateUrl: './rectify-issue-split.component.html',
  styles: [],
})
export class RectifyIssueSplitComponent implements OnInit {
  listOfData = [{ order: 0 }];
  isVisible = false;
  handleCancel() {
    this.isVisible = false;
  }
  save() {
    this.isVisible = false;
  }
  edit() {
    this.isVisible = true;
  }
  constructor() {}

  ngOnInit() {}

  addRow() {
    if (this.listOfData.length > 0) {
      this.listOfData.push({ order: this.listOfData[this.listOfData.length - 1].order + 1 });
    } else {
      this.listOfData.push({ order: 1 });
    }
    this.listOfData = [...this.listOfData];
  }
  deletRow(data) {
    this.listOfData = [...this.listOfData.filter(item => item.order !== data.order)];
  }
}
