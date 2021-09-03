import { _HttpClient } from '@delon/theme';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiSimpleData } from '@ng-mt-framework/api';

@Injectable({
  providedIn: 'root'
})
export class SyncADService {
  private static URL = '/api/ad';

  constructor(private http: _HttpClient) { }

  syncUnitDeptEmp(): Observable<ApiSimpleData<string>> {
    return this.http.get<ApiSimpleData<string>>(`${SyncADService.URL}/sync/unit-dept-emp`);
  }

  syncOutEmp(): Observable<ApiSimpleData<string>> {
    return this.http.get<ApiSimpleData<string>>(`${SyncADService.URL}/sync/out-emp`);
  }
}
