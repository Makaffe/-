import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { RectifyProblemDelayApplyDTO } from '../model/RectifyProblemDelayApplyDTO.';
import { RectifyProblemDelayApplyEditInfoDTO } from '../model/RectifyProblemDelayApplyEditInfoDTO';

@Injectable({
  providedIn: 'root',
})

/**
 * 整改问题延期申请服务方法
 */
export class RectifyProblemDelayApplyService {
  /**
   * API请求URL
   */
  private static URL = '/api/rectify/problem/delay/apply';

  constructor(private http: _HttpClient) {}

  /**
   * 获取单一整改问题延期申请信息
   */
  delayedRectification(id: string): Observable<any> {
    const prams = {};
    Object.assign(prams, {id});
    return this.http.get<any>(`${RectifyProblemDelayApplyService.URL}/${id}`);
  }

  /**
   * 新增整改问题延期申请信息
   */
  addDelayRectify(dto: RectifyProblemDelayApplyEditInfoDTO): Observable<any> {
    return this.http.post<any>(`${RectifyProblemDelayApplyService.URL}/create`, dto);
  }

  /**
   * 删除整改问题延期申请信息
   */
  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${RectifyProblemDelayApplyService.URL}/delete/${id}`);
  }

  /**
   * 获取所有整改问题延期申请信息
   */
  findAll(): Observable<RectifyProblemDelayApplyDTO> {
    return this.http.get<RectifyProblemDelayApplyDTO>(`${RectifyProblemDelayApplyService.URL}/findAll`);
  }

  /**
   * 获取所有整改问题延期申请信息
   */
  findByRectifyProblem(rectifyProblemId: string): Observable<Array<RectifyProblemDelayApplyDTO>> {

    // tslint:disable-next-line:max-line-length
    return this.http.get<Array<RectifyProblemDelayApplyDTO>>(`${RectifyProblemDelayApplyService.URL}/findByRectifyProblemDelayApplyById/${rectifyProblemId}`);
  }

  /**
   * 修改整改问题延期申请信息
   */
   updateProblem(id: string, dto: RectifyProblemDelayApplyEditInfoDTO): Observable<RectifyProblemDelayApplyDTO> {
     return this.http.put<RectifyProblemDelayApplyDTO>(`${RectifyProblemDelayApplyService.URL}/update/${id}`, dto);
   }
}
