import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'issue-assign-form',
  templateUrl: './issue-assign-form.component.html',
  styles: [],
})
export class IssueAssignFormComponent implements OnInit {
  listOfData = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
  ];
  isVisible = false;

  radioValue = false;
  constructor() {}

  ngOnInit() {}

  handleCancel() {
    this.isVisible = false;
  }

  show() {
    this.isVisible = true;
  }

  addRow() {
    this.listOfData.push({
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    });
    this.listOfData = [...this.listOfData];
  }
}
