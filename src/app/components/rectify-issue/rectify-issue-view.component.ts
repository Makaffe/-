import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rectify-issue-view',
  templateUrl: './rectify-issue-view.component.html',
  styles: [],
})
export class RectifyIssueViewComponent implements OnInit {
  listOfOption: string[] = ['未下发', '已下发', '未移交'];
  listOfSelectedValue = ['未下发'];
  constructor() {}

  ngOnInit() {}
}
