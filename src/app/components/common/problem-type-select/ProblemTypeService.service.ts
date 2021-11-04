import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs/internal/Observable';
import { ProblemTypeDTO } from './ProblemTypeDTO';
@Injectable({
  providedIn: 'root',
})
/**
 * 审计报告类型管理 Service
 * @Author jdiosajdoisajdas
 * @Date 2021/10/12
 */
export class ProblemTypeService {
  private static URL = '/api/rectify/problem/type';

  constructor(private http: _HttpClient) {}

  /**
   * 查询所有审计报告类型数据
   *
   */
  findAllUsingGET(): Observable<Array<ProblemTypeDTO>> {
    return this.http.get<Array<ProblemTypeDTO>>(`${ProblemTypeService.URL}/findAll`);
  }
}
