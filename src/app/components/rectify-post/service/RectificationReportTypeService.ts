import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs/internal/Observable';
import { RectificationReportTypeDTO } from '../model/RectificationReportTypeDTO';
@Injectable({
  providedIn: 'root',
})
/**
 * 整改报告类型 Service
 * @Author gyl
 * @Date 2021/10/19
 */
export class RectificationReportTypeService {
  /**
   * API请求URL
   */
  private static URL = '/api/rectificationReportType';

  constructor(private http: _HttpClient) { }


  /**
   * 新增整改报告类型信息
   * @param dto 待新增后的整改报告类型信息
   *
   */
  create(
    dto: RectificationReportTypeDTO,

  ): Observable<RectificationReportTypeDTO> {

    return this.http.post<RectificationReportTypeDTO>(`${RectificationReportTypeService.URL}/create`, dto);
  }

  /**
   * 删除整改报告类型信息
   * @param id 待删除整改报告类型编码
   *
   */
  delete(
    id: string,

  ): Observable<any> {

    return this.http.delete<any>(`${RectificationReportTypeService.URL}/delete/${id}`);
  }

  /**
   * 获取所有整改报告类型信息
   *
   */
  findAll(

  ): Observable<Array<RectificationReportTypeDTO>> {

    return this.http.get<Array<RectificationReportTypeDTO>>(`${RectificationReportTypeService.URL}/findAll`);
  }

  /**
   * 修改整改报告类型信息
   * @param id 待修改整改报告类型编码
   * @param dto 修改后的整改报告信息
   *
   */
  update(
    id: string,
    dto: RectificationReportTypeDTO,

  ): Observable<RectificationReportTypeDTO> {

    return this.http.put<RectificationReportTypeDTO>(`${RectificationReportTypeService.URL}/update/${id} `, dto);
  }

  /**
   * 获取单一整改报告类型信息
   * @param id 待查询整改报告类型编码
   *
   */
  findById(
    id: string,

  ): Observable<RectificationReportTypeDTO> {

    return this.http.get<RectificationReportTypeDTO>(`${RectificationReportTypeService.URL}`);
  }
}
