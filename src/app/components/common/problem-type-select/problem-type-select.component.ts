import { Component, Input, OnInit } from '@angular/core';
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
  /**
   * 字典Code
   */
  @Input()
  dictCode: string = null;

  /**
   * 提示
   */
  @Input()
  placeHolder = '';

  value: string;
  nodes = [];

  onChange($event: string): void {
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
