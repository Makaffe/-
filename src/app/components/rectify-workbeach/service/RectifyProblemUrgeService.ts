import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs/internal/Observable';
import { RectifyProblemUrgeDTO } from '../model/RectifyProblemUrgeDTO';
@Injectable({
  providedIn: 'root',
})
/**
 * 问题整改催办 Service
 * @Author chenzhongde
 * @Date 2021/11/3
 */
export class RectifyProblemUrgeService {
  /**
   * API请求URL
   */
  private static URL = '/api/rectify/problem/urge';

  constructor(private http: _HttpClient) {}

  /**
   * 获取所有整改催办信息
   *
   */
  findAll(): Observable<Array<RectifyProblemUrgeDTO>> {
    return this.http.get<Array<RectifyProblemUrgeDTO>>(`${RectifyProblemUrgeService.URL}`);
  }

  /**
   * 获取指定整改问题的催办信息
   * @param rectifyProblemId 整改问题编码
   *
   */
  findRectifyProblemUrgeById(rectifyProblemId: string): Observable<Array<RectifyProblemUrgeDTO>> {
    return this.http.get<Array<RectifyProblemUrgeDTO>>(
      `${RectifyProblemUrgeService.URL}/findRectifyProblemUrgeById/${rectifyProblemId}`,
    );
  }
}
