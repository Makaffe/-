import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { ApiPagedData } from '@mt-framework-ng/core';
import { Observable } from 'rxjs/internal/Observable';
import { RectificationReportDetailDTO } from '../model/RectificationReportDetailDTO';
@Injectable({
  providedIn: 'root',
})
/**
 * 整改报告 Service
 * @Author gyl
 * @Date 2021/10/20
 */
export class RectificationReportService {
  /**
   * API请求URL
   */
  private static URL = '/api/rectificationReportDetail';

  constructor(private http: _HttpClient) { }


  /**
   * 新增整改报告信息
   * @param dto 待新增后的整改报告信息
   *
   */
  create(
    dto: RectificationReportDetailDTO,

  ): Observable<RectificationReportDetailDTO> {

    return this.http.post<RectificationReportDetailDTO>(`${RectificationReportService.URL}/create`, dto);
  }

  /**
   * 删除整改报告信息
   * @param id 待删除整改报告编码
   *
   */
  delete(
    id: string,

  ): Observable<any> {

    return this.http.delete<any>(`${RectificationReportService.URL}/delete/${id}`);
  }

  /**
   * 获取所有整改报告信息
   *
   */
  findAll(

  ): Observable<Array<RectificationReportDetailDTO>> {

    return this.http.get<Array<RectificationReportDetailDTO>>(`${RectificationReportService.URL}/findAll`);
  }

  /**
   * 分页查询整改报告信息
   * @param page 页号，从0开始
   * @param size 每页纪录条数
   * @param sort 排序字段, 例如：字段1,asc,字段2,desc
   * @param rectificationReportTypeId 整改报告类型id
   * @param name 整改报告名称
   * @param auditStartTime 整改统计开始时间
   * @param auditEndTime 整改统计结束时间
   *
   */
  findAOnePage(
    page?: number,
    size?: number,
    sort?: string,
    rectificationReportTypeId?: string,
    name?: string,
    auditStartTime?: string,
    auditEndTime?: string,

  ): Observable<ApiPagedData<RectificationReportDetailDTO>> {
    const params = {};
    Object.assign(params, { page });
    Object.assign(params, size ? { size } : {});
    Object.assign(params, sort ? { sort } : {});
    Object.assign(params, rectificationReportTypeId ? { rectificationReportTypeId } : {});
    Object.assign(params, name ? { name } : {});
    Object.assign(params, auditStartTime ? { auditStartTime } : {});
    Object.assign(params, auditEndTime ? { auditEndTime } : {});

    return this.http.get<ApiPagedData<RectificationReportDetailDTO>>(`${RectificationReportService.URL}/findOngPage`, params);
  }

  /**
   * 修改整改报告信息
   * @param id 待修改整改报告编码
   * @param dto 修改后的整改报告信息
   *
   */
  update(
    id: string,
    dto: RectificationReportDetailDTO,

  ): Observable<RectificationReportDetailDTO> {

    return this.http.put<RectificationReportDetailDTO>(`${RectificationReportService.URL}/update/${id} `, dto);
  }

  /**
   * 获取单一整改报告信息
   * @param id 待查询整改报告编码
   *
   */
  findById(
    id: string,

  ): Observable<RectificationReportDetailDTO> {

    return this.http.get<RectificationReportDetailDTO>(`${RectificationReportService.URL}/${id}`);
  }

  /**
   * 生成文档
   */
  generateReport(
    rectificationReportId?: string,
    tmpId?: string,
    reportCategoryId?: string,
    reportName?: string,
    isClearHistory?: boolean,

  ): Observable<RectificationReportDetailDTO> {
    const params = {};
    Object.assign(params, rectificationReportId ? { rectificationReportId } : {});
    Object.assign(params, tmpId ? { tmpId } : {});
    Object.assign(params, reportCategoryId ? { reportCategoryId } : {});
    Object.assign(params, reportName ? { reportName } : {});
    Object.assign(params, isClearHistory ? { isClearHistory } : {});
    return this.http.get<RectificationReportDetailDTO>(`${RectificationReportService.URL}/generateReport`, params);
  }
}
