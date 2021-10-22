import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReuseTabService } from '@delon/abc/reuse-tab';
import { QueryOptions } from '@mt-framework-ng/core';
import { RectifyProblemService } from '@mt-rectify-framework/comp/rectify-issue';
import { RectifyTrackDTO } from '../rectify-track/model/RectifyTrackDTO';
import { RectifyMeasureService } from './service/RectifyMeasureService';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rectify-effect',
  templateUrl: './rectify-effect.component.html',
  styles: [
    `
      tr {
        background-color: white !important;
      }
    `,
  ],
})
export class RectifyEffectComponent implements OnInit {
  date: Date;
  // 分页参数
  private options: QueryOptions = {
    page: 0,
    size: 100,
    sort: 'id,asc',
  };

  // 整改问题id
  rectifyProblemId: string;

  // 整改跟踪dto
  rectifyTrack = this.initRtParams();

  listOfData = [];
  constructor(
    private router: Router,
    private reuseTabService: ReuseTabService,
    private activatedRoute: ActivatedRoute,
    private rectifyProblemService: RectifyProblemService,
    private rectifyMeasureService: RectifyMeasureService,
  ) {}

  ngOnInit() {
    this.resolveQueryParam();
    this.loadRpAndRt();
  }

  /**
   * 处理路由参数
   */
  resolveQueryParam() {
    // 处理路由参数
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.rectifyProblemId = queryParams.rectifyProblemId;
    });
  }

  // 获取整改问题与整改措施
  loadRpAndRt() {
    this.rectifyProblemService.rectifyTrackById(this.rectifyProblemId).subscribe(data => {
      this.rectifyTrack = data;
      this.date = this.formatDate(data.rectifyEndTime);
    });
    this.rectifyMeasureService.findOnePage(this.options, this.rectifyProblemId).subscribe(data => {
      this.listOfData = data.data;
    });
  }

  close() {}
  save() {}

  /**
   * 关闭
   */
  onReturn() {
    this.reuseTabService.close(this.router.url);
  }

  // 初始化整改跟踪
  initRtParams(item?: RectifyTrackDTO): RectifyTrackDTO {
    return {
      id: item ? item.id : null,
      rectifyEndTime: item ? item.rectifyEndTime : null,
      source: item ? item.source : null,
      remark: item ? item.remark : null,
      advice: item ? item.advice : null,
    };
  }

  // 格式话时间
  formatDate(str: string) {
    if (str) {
      return new Date(str.replace(/-/g, '/'));
    } else {
      return null;
    }
  }
}
