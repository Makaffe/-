import { Component, OnInit } from '@angular/core';
import { ItemData } from './rectify-issue-list.component';
// interface ItemData {
//   id: string;
//   proName: string;
//   proDes: string;
//   proType: string;
//   department: string;
//   person: string;
//   suggest: string;
//   children?: ItemData[];
// }
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rectify-issue-order',
  templateUrl: './rectify-issue-order.component.html',
  styles: [],
})
export class RectifyIssueOrderComponent implements OnInit {
  isVisible = false;
  loading = false;
  listOfData: ItemData[] = [];
  constructor() {}

  ngOnInit() {}
  handleCancel() {
    this.listOfData = [];
    this.isVisible = false;
  }
  save() {
    this.listOfData = [];
    this.isVisible = false;
  }
  edit(item?: any) {
    if (item) {
      this.listOfData = [...this.listOfData, item];
    }
    this.isVisible = true;
  }
}
