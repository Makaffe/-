import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RectifyDiaryComponent } from './rectify-diary.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rectify-workbeach-view',
  templateUrl: './rectify-workbeach-view.component.html',
  styles: [],
})
export class RectifyWorkbeachViewComponent implements OnInit {
  @ViewChild('rectifyDiaryComponent', { static: false })
  rectifyDiaryComponent: RectifyDiaryComponent;

  // 判断是否为整改部门
  isRectify = false;

  // 折叠与展开
  isFold = false;

  demoValue = 20;

  mapOfExpandData: { [key: string]: boolean } = {};
  listOfData = [
    {
      id: 1,
      name: 'John Brown',
      age: 32,
      expand: false,
      address: 'New York No. 1 Lake Park',
      description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
      id: 2,
      name: 'Jim Green',
      age: 42,
      expand: false,
      address: 'London No. 1 Lake Park',
      description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
    },
    {
      id: 3,
      name: 'Joe Black',
      age: 32,
      expand: false,
      address: 'Sidney No. 1 Lake Park',
      description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
    },
  ];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.resolveQueryParam();
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
}
