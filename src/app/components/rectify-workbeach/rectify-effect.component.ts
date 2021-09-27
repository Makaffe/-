import { Component, OnInit } from '@angular/core';

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
  date = new Date();

  listOfData = [
    {
      key: '1',
      name: '修改制度',
      age: '1111',
    },
    {
      key: '2',
      name: '新建制度',
      age: '2222',
    },
  ];
  constructor() {}

  ngOnInit() {}

  close() {}
  save() {}
}
