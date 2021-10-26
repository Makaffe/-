import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { RectifyProblemService } from '../rectify-issue/service/RectifyProblemService';

@Component({
  selector: 'app-rectify-time-line',
  templateUrl: './rectify-time-line.component.html',
  styles: [],
})
export class RectifyTimeLineComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private rectifyProblemService: RectifyProblemService,
    private msg: NzMessageService,
  ) {}

  ngOnInit(): void {}
}
