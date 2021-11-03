import { Component, Input, OnInit, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TreeUtil } from '@ng-mt-framework/comp';
import { ProblemTypeService } from './ProblemTypeService.service';
@Component({
  selector: 'app-problem-type-select',
  templateUrl: './problem-type-select.component.html',
  styles: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ProblemTypeSelectComponent,
      multi: true,
    },
  ],
})
export class ProblemTypeSelectComponent implements OnInit {
  expandKeys = ['100', '1001'];
  /**
   * 字典Code
   */
  @Input()
  dictCode: string = null;

  @Output()
  typeId: any;
  MaintypeId: any;

  /**
   * 提示
   */
  @Input()
  placeHolder = '';

  value: string;
  nodes = [
    {
      title: 'parent 1',
      key: '100',
      children: [
        {
          title: 'parent 1-0',
          key: '1001',
          children: [
            { title: 'leaf 1-0-0', key: '10010', isLeaf: true },
            { title: 'leaf 1-0-1', key: '10011', isLeaf: true },
          ],
        },
        {
          title: 'parent 1-1',
          key: '1002',
          children: [{ title: 'leaf 1-1-0', key: '10020', isLeaf: true }],
        },
      ],
    },
  ];

  onChange($event): void {
    console.log($event);
  }

  ngOnInit(): void {
    // this.nodes = [];
    // this.problemTypeService.findAllUsingGET().subscribe(data => {
    //   if (data) {
    //     this.nodes = TreeUtil.populateTreeNodes(data, 'id', 'name', 'children');
    //   }
    // });
  }

  constructor(private problemTypeService: ProblemTypeService) {}
}
