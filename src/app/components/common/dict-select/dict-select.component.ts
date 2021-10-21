import {
  Component,
  OnInit,
  OnChanges,
  Input,
  ViewChild,
  Output,
  EventEmitter,
  Inject,
  ChangeDetectorRef,
  Optional,
  SimpleChanges,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, NgModel, NG_VALIDATORS, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { ElementBase } from '@ng-mt-framework/core';
import { DictionaryValueDTO, DictionaryService } from '@ng-mt-framework/api';
import { NzSelectComponent } from 'ng-zorro-antd';
import { MapUtil } from '@ng-mt-framework/util';

@Component({
  selector: 'app-dict-select',
  templateUrl: './dict-select.component.html',
  styles: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DictSelectComponent,
      multi: true,
    },
  ],
})
export class DictSelectComponent extends ElementBase<any> implements OnInit {
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

  /**
   * unit的数据，ID做key，用于快速查找
   */
  private dicts: Map<string, DictionaryValueDTO> = new Map<string, DictionaryValueDTO>();

  /**
   * 输入的字典key
   */
  selectedValue: any = null;

  /**
   * 控件具体的多选的值
   */
  @Input()
  multiple = 'default';

  /**
   * NzSelect的实例
   */
  @ViewChild('dictSelect', { static: false })
  dictSelect: NzSelectComponent;

  /**
   * 是否禁用控件
   */
  @Input()
  disabled = false;

  /**
   * model的实例
   */
  @ViewChild(NgModel, { static: false })
  model: NgModel;

  /**
   * 结点点击事件
   */
  @Output()
  nodeClicked = new EventEmitter<string>();

  /**
   * 单选显示搜索框
   */
  @Input()
  showSearch = true;

  /**
   * 字典值列表
   */
  dictValues: Array<DictionaryValueDTO> = [];

  /**
   * 设置loading显示
   */
  isLoading = false;

  constructor(
    @Optional() @Inject(NG_VALIDATORS) validators: Array<any>,
    @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<any>,
    private dictionaryService: DictionaryService,
    private cdr: ChangeDetectorRef,
  ) {
    super(validators, asyncValidators);
  }

  /**
   * debounceTime（）防止用户连续输入导致重复请求，停止输入后0.5s检查一次
   */
  ngOnInit() {
    this.loadData();
  }
  /**
   * 点击节点时调用
   * @param $event 节点信息
   */
  clicked($event: Array<any> | string): void {
    console.log(this.selectedValue);
    if (!$event) {
      this.value = null;
    }
    if (typeof $event === 'string') {
      this.value = $event;
    } else {
      if ($event) {
        if ($event.length > 0) {
          this.value = $event;
        }
      }
    }
    // this.value = [...$event];
    this.nodeClicked.emit(this.value);
  }

  /**
   * 查询字典值数据
   */
  loadData() {
    this.dictionaryService.findByCode(this.dictCode).subscribe(data => {
      if (data) {
        this.dictValues = data.dictionaryValues;
        this.dicts = MapUtil.arrayToMap(data.dictionaryValues);
        if (data.dictionaryValues.length === 0) {
          this.clicked(null);
        }
        this.convertTreeModel();
        if (this.selectedValue) {
          this.cdr.detectChanges();
        }
        this.isLoading = false;
      }
    });
  }

  /**
   * 当数据更改时，重新生成关联的树结点的选中信息
   * 因为外部使用时使用OrganizationDTO数据，而树控件使用的是string
   *
   * @param value 当前值
   */
  writeValue(value: string) {
    super.writeValue(value);
    this.convertTreeModel();
  }

  /**
   * 设置数据
   */
  private convertTreeModel() {
    if (!this.value) {
      this.selectedValue = null;
      return;
    } else {
      // tslint:disable-next-line:no-string-literal
      this.selectedValue = this.value;
      // tslint:disable-next-line:no-string-literal
      this.dictSelect.value = this.value;
    }
  }
}
