import { Pipe, PipeTransform, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DictionaryService, DictionaryDTO } from '@ng-mt-framework/api';

@Pipe({
  name: 'dictTransform',
})
export class DictPipe implements PipeTransform {
  constructor(private dictionaryService: DictionaryService) {}

  transform(value: string, dictCode: string): Observable<string> {
    if (!value) {
      const observableDictValue = of('');
      return observableDictValue.pipe(
        map((dictValue: string) => {
          return dictValue;
        }),
      );
    } else {
      return this.dictionaryService.findByCode(dictCode).pipe(
        map((dictionary: DictionaryDTO) => {
          const dictValue = dictionary.dictionaryValues.filter(item => item.key === value)[0];
          return dictValue ? dictValue.value : 'Error Dict Key';
        }),
      );
    }
  }
}
