import { Component, OnInit } from '@angular/core';
// interface any {
//   id: string;
//   proName: string;
//   proDes: string;
//   proType: string;
//   department: string;
//   person: string;
//   suggest: string;
//   children?: any[];
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
  listOfData: any[] = [];
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
