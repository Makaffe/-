import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs/internal/Observable';
import { RectifyEffectDTO } from '../model/RectifyEffectDTO';
@Injectable({
  providedIn: 'root',
})
/**
 * 整改成效 Service
 * @Author chenzhongde
 * @Date 2021/11/3
 */
export class RectifyEffectService {
  /**
   * API请求URL
   */
  private static URL = '/api/rectify/effect';

  constructor(private http: _HttpClient) {}

  /**
   * 新增整改成效信息
   * @param dto 待整改成效信息
   *
   */
  create(dto: RectifyEffectDTO): Observable<RectifyEffectDTO> {
    return this.http.post<RectifyEffectDTO>(`${RectifyEffectService.URL}/create`, dto);
  }

  /**
   * 删除整改成效信息
   * @param id 待删除整改成效编码
   *
   */
  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${RectifyEffectService.URL}/delete/${id}`);
  }

  /**
   * 获取所有整改成效信息
   *
   */
  findAll(): Observable<Array<RectifyEffectDTO>> {
    return this.http.get<Array<RectifyEffectDTO>>(`${RectifyEffectService.URL}/findAll`);
  }

  /**
   * 获取根据所有整改成效信息
   * @param rectifyProblemId 整改问题编码
   *
   */
  findByRectifyEffectById(rectifyProblemId: string): Observable<Array<RectifyEffectDTO>> {
    return this.http.get<Array<RectifyEffectDTO>>(
      `${RectifyEffectService.URL}/findByRectifyEffectById/${rectifyProblemId}`,
    );
  }

  /**
   * 修改整改成效信息
   * @param id 待修改整改成效编码
   * @param dto 修改后的整改成效信息
   *
   */
  update(id: string, dto: RectifyEffectDTO): Observable<RectifyEffectDTO> {
    return this.http.put<RectifyEffectDTO>(`${RectifyEffectService.URL}/update/${id}`, dto);
  }

  /**
   * 获取单一整改成效信息
   * @param id 待查询整改成效编码
   *
   */
  findById(id: string): Observable<RectifyEffectDTO> {
    return this.http.get<RectifyEffectDTO>(`${RectifyEffectService.URL}`);
  }
}
