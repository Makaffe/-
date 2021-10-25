import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { UeditorComponent } from '../common/ueditor/ueditor.component';
import { RectifyProblemService } from '../rectify-issue/service/RectifyProblemService';

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
  memo: any;

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
  loadData() {
    this.rectifyProblemService.findMome(this.rectifyProblemId).subscribe(
      data => {
        this.memo = data.data;
        this.isVisible = true;
      },
      () => {},
      () => {},
    );
  }

  // 保存备忘录
  save() {
    this.rectifyProblemService.sevaMome(this.rectifyProblemId, this.memo).subscribe(
      data => {
        this.memo = data;
        this.msg.success('保存成功！');
        this.handleCancel();
      },
      () => {},
      () => {},
    );
  }
}
