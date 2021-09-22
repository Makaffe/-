import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'supervise-process-form',
  templateUrl: './supervise-process-form.component.html',
  styles: []
})
export class SuperviseProcessFormComponent implements OnInit {

  isVisible = false;
  constructor() {}

  ngOnInit() {}

  handleCancel() {
    this.isVisible = false;
  }

  show() {
    this.isVisible = true;
  }

}
