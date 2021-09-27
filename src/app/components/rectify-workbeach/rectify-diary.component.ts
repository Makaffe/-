import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UeditorComponent } from '../common/ueditor/ueditor.component';

@Component({
  selector: 'app-rectify-diary',
  templateUrl: './rectify-diary.component.html',
  styles: [],
})
export class RectifyDiaryComponent implements OnInit {
  // 富文本
  @ViewChild('ueComp', { static: false })
  ueComp: UeditorComponent;

  isVisible = false;
  content: any;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {}
  handleCancel() {
    this.isVisible = false;
  }
}
