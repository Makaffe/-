import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs/internal/Observable';
import { RectifyTimeLineDTO } from '../model/RectifyTimeLineDTO';
@Injectable({
  providedIn: 'root',
})
/**
 * 整改时间轴管理 Service
 * @Author chenzhongde
 * @Date 2021/11/3
 */
export class RectifyTimeLineService {
  /**
   * API请求URL
   */
  private static URL = '/api/rectify/time/line';

  constructor(private http: _HttpClient) {}

  /**
   * 根据整改清单ID查询整改时间轴
   * @param rectifyProblemId 整改清单ID
   *
   */
  queryByRectifyProblemId(rectifyProblemId: string): Observable<Array<RectifyTimeLineDTO>> {
    return this.http.get<Array<RectifyTimeLineDTO>>(`${RectifyTimeLineService.URL}/query/${rectifyProblemId}`);
  }

  /**
   * 根据ID查询整改时间轴
   * @param id 整改延时申请ID
   *
   */
  findById(id: string): Observable<RectifyTimeLineDTO> {
    return this.http.get<RectifyTimeLineDTO>(`${RectifyTimeLineService.URL}`);
  }
}
