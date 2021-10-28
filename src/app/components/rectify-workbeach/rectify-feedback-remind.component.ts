import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { UeditorComponent } from '../common/ueditor/ueditor.component';
import { RectifyProblemService } from '../rectify-issue/service/RectifyProblemService';

@Component({
  selector: 'app-rectify-feedback-remind',
  templateUrl: './rectify-feedback-remind.component.html',
  styles: [],
})
export class RectifyFeedbackRemindComponent implements OnInit {
  isVisible = false;
  advice: any;

  // 整改问题id
  rectifyProblemId: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private rectifyProblemService: RectifyProblemService,
    private msg: NzMessageService,
  ) {}

  ngOnInit(): void {}
  handleCancel() {
    this.isVisible = false;
  }

  // 查询备忘录
  loadData() {}

  // 保存备忘录
  save() {}
}
