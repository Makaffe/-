import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { QueryOptions } from '@ng-mt-framework/api';
import { Observable } from 'rxjs/internal/Observable';
import { RectifyProblemTypeEditInfoDTO } from '../model/RectifyProblemTypeEditInfoDTO';
import { RectifyProblemTypeDTO } from '../model/RectifyProblemTypeDTO';
@Injectable({
  providedIn: 'root',
})
/**
 * 审计报告管理 Service
 * @Author 111
 * @Date 2021/11/1
 */
export class RectifyProblemTypeService {
  /**
   * API请求URL
   */
  private static URL = '/api/rectify/problem/type';

  constructor(private http: _HttpClient) {}

  /**
   * 创建问题类型
   * @param dto 问题类型DTO
   *
   */
  create(dto?: RectifyProblemTypeEditInfoDTO): Observable<RectifyProblemTypeDTO> {
    return this.http.post<RectifyProblemTypeDTO>(`${RectifyProblemTypeService.URL}/create`, dto);
  }

  /**
   * 删除问题类型
   * @param id 问题类型id
   *
   */
  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${RectifyProblemTypeService.URL}/delete/${id}`);
  }

  /**
   *
   */
  findAll(): Observable<Array<RectifyProblemTypeDTO>> {
    return this.http.get<Array<RectifyProblemTypeDTO>>(`${RectifyProblemTypeService.URL}/findAll`);
  }

  /**
   * 更新审计报告数据
   * @param id 审计报告ID
   * @param dto 审计报告DTO
   *
   */
  update(id: string, dto?: RectifyProblemTypeEditInfoDTO): Observable<RectifyProblemTypeDTO> {
    return this.http.put<RectifyProblemTypeDTO>(`${RectifyProblemTypeService.URL}/update/${id}`, dto);
  }

  /**
   * 根据ID查询审计报告数据
   * @param id 审计报告ID
   *
   */
  findById(id: string): Observable<RectifyProblemTypeDTO> {
    return this.http.get<RectifyProblemTypeDTO>(`${RectifyProblemTypeService.URL}/${id}`);
  }
}
