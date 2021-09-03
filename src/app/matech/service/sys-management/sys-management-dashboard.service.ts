import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { SystemStatisticsDTO } from '../../model/sys-management/system-statistic-dto';
@Injectable({
  providedIn: 'root',
})
export class SysManagementDashboardService {
  /**
   * API请求URL
   */
  private static URL = '/api/dashboard/system-management';

  constructor(private http: _HttpClient) {}

  /**
   * 统计CPU利用率、内存使用率、程序CPU利用率、日志空间(M)
   */
  findStatistic(): Observable<SystemStatisticsDTO> {
    return this.http.get<SystemStatisticsDTO>(`${SysManagementDashboardService.URL}/statistics`);
  }
}
