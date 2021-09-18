import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rectify-effect',
  templateUrl: './rectify-effect.component.html',
  styles: [],
})
export class RectifyEffectComponent implements OnInit {
  listOfData = [
    {
      id: '1',
      type: '类型一',
      measure: '开除',
    },
    {
      id: '2',
      type: '类型二',
      measure: '罚款',
    },
  ];
  constructor() {}

  ngOnInit() {}
}
