import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rectify-issue-split',
  templateUrl: './rectify-issue-split.component.html',
  styles: [],
})
export class RectifyIssueSplitComponent implements OnInit {
  listOfData = []
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
}
