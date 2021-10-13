import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QueryOptions } from '@mt-framework-ng/core';
import { TABLE_PARAMETER } from '@ng-mt-framework/comp';
import { ObjectUtil } from '@ng-mt-framework/util';
import { ChangeMsOrRp } from './model/ChangeMsOrRp';
import { RectifyDiaryComponent } from './rectify-diary.component';
import { RectifyMeasureService } from './service/RectifyMeasureService';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rectify-workbeach-view',
  templateUrl: './rectify-workbeach-view.component.html',
  styles: [],
})
export class RectifyWorkbeachViewComponent implements OnInit {
  @ViewChild('rectifyDiaryComponent', { static: false })
  rectifyDiaryComponent: RectifyDiaryComponent;

  private options: QueryOptions = {
    page: 0,
    size: 20,
    sort: 'id,asc',
  };

  TABLE_PARAMETER = ObjectUtil.deepClone(TABLE_PARAMETER);

  // 整改问题清单id
  rectifyProblemId: string;

  changeMsOrRp: ChangeMsOrRp;

  // 判断是否为整改部门
  isRectify = false;

  // 折叠与展开
  isFold = false;

  demoValue = 20;

  mapOfExpandData: { [key: string]: boolean } = {};
  listOfData = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private rectifyMeasureService: RectifyMeasureService,
    private datePipe: DatePipe,
  ) {}

  ngOnInit() {
    this.resolveQueryParam();
    this.loadData();
  }

  loadData() {
    this.rectifyMeasureService.findOnePage(this.options, '123456').subscribe(
      data => {
        if (data) {
          this.listOfData = data.data;
          this.TABLE_PARAMETER.pi = data.pageNo + 1;
          this.TABLE_PARAMETER.page.total = data.totalRecords;
        }
      },
      () => {},
      () => {},
    );
  }

  /**
   * 处理路由参数
   */
  resolveQueryParam() {
    // 处理路由参数
    this.activatedRoute.queryParams.subscribe(queryParams => {
      if (queryParams.isRectify === 'true') {
        this.isRectify = true;
      } else {
        this.isRectify = false;
      }
    });
  }

  formatterPercent = (value: number) => `${value} %`;

  goRectifyEffect() {
    this.router.navigate(['/audit-rectify/rectify-effect']);
  }

  clickFold() {
    this.isFold = !this.isFold;
  }

  openRectifyDiaryComponent() {
    this.rectifyDiaryComponent.isVisible = true;
  }

  chageRectifyProgress(id: string, rectifyProgress?: number, measureStatus?: string) {
    this.changeMsOrRp = this.resetChangeMsOrRp();
    this.changeMsOrRp.rectifyProgress = rectifyProgress;
    this.changeMsOrRp.measureStatus = measureStatus;
    this.rectifyMeasureService.updateMsOrRp(id, this.changeMsOrRp).subscribe(
      data => {
        if (data) {
          this.loadData();
        }
      },
      () => {},
      () => {},
    );
  }

  resetChangeMsOrRp() {
    return {
      measureStatus: null,
      rectifyProgress: null,
    };
  }

  formatDate(time: Date) {
    return this.datePipe.transform(time, 'yyyy-MM-dd');
  }
}
