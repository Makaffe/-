import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs/internal/Observable';
import { RectifyProblemDelayApplyDTO } from '../model/RectifyProblemDelayApplyDTO';
@Injectable({
  providedIn: 'root',
})
/**
 * 整改问题延期申请 Service
 * @Author chenzhongde
 * @Date 2021/11/3
 */
export class RectifyProblemDelayApplyService {
  /**
   * API请求URL
   */
  private static URL = '/api/rectify/problem/delay/apply';

  constructor(private http: _HttpClient) {}

  /**
   * 新增整改问题延期申请信息
   * @param dto 待整改问题延期申请信息
   *
   */
  create(dto: RectifyProblemDelayApplyDTO): Observable<RectifyProblemDelayApplyDTO> {
    return this.http.post<RectifyProblemDelayApplyDTO>(`${RectifyProblemDelayApplyService.URL}/create`, dto);
  }

  /**
   * 删除整改问题延期申请信息
   * @param id 待删除整改问题延期申请编码
   *
   */
  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${RectifyProblemDelayApplyService.URL}/delete/${id}`);
  }

  /**
   * 获取所有整改问题延期申请信息
   *
   */
  findAll(): Observable<Array<RectifyProblemDelayApplyDTO>> {
    return this.http.get<Array<RectifyProblemDelayApplyDTO>>(`${RectifyProblemDelayApplyService.URL}/findAll`);
  }

  /**
   * 获取所有整改问题延期申请信息
   * @param rectifyProblemId 整改问题编码
   *
   */
  findByRectifyProblemDelayApplyById(rectifyProblemId: string): Observable<Array<RectifyProblemDelayApplyDTO>> {
    return this.http.get<Array<RectifyProblemDelayApplyDTO>>(
      `${RectifyProblemDelayApplyService.URL}/findByRectifyProblemDelayApplyById/${rectifyProblemId}`,
    );
  }

  /**
   * 修改整改问题延期申请信息
   * @param id 待修改整改问题延期申请编码
   * @param dto 修改后的整改问题延期申请信息
   *
   */
  update(id: string, dto: RectifyProblemDelayApplyDTO): Observable<RectifyProblemDelayApplyDTO> {
    return this.http.put<RectifyProblemDelayApplyDTO>(`${RectifyProblemDelayApplyService.URL}/update/${id}`, dto);
  }

  /**
   * 获取单一整改问题延期申请信息
   * @param id 待查询整改问题延期申请编码
   *
   */
  findById(id: string): Observable<RectifyProblemDelayApplyDTO> {
    return this.http.get<RectifyProblemDelayApplyDTO>(`${RectifyProblemDelayApplyService.URL}`);
  }
}
