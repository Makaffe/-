import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs/internal/Observable';
import { AuditPostTypeDTO } from '../model/AuditPostTypeDTO';
import { AuditPostTypeEditInfoDTO } from '../model/AuditPostTypeEditInfoDTO';
@Injectable({
  providedIn: 'root',
})
/**
 * 审计报告类型管理 Service
 * @Author jdiosajdoisajdas
 * @Date 2021/10/12
 */
export class AuditPostTypeService {
  /**
   * API请求URL
   */
  private static URL = '/api/audit-post-type';

  constructor(private http: _HttpClient) {}

  // /**
  //   * 创建审计报告类型
  //   * @param auditPostTypeEditInfoDTO 审计报告类型DTO
  //   *
  //   */
  addUsingPOST(auditPostTypeEditInfoDTO?: AuditPostTypeEditInfoDTO): Observable<AuditPostTypeDTO> {
    return this.http.post<AuditPostTypeDTO>(`${AuditPostTypeService.URL}/add`, auditPostTypeEditInfoDTO);
  }

  /**
   * 查询所有审计报告类型数据
   *
   */
  findAllUsingGET(): Observable<Array<AuditPostTypeDTO>> {
    return this.http.get<Array<AuditPostTypeDTO>>(`${AuditPostTypeService.URL}/all`);
  }

  /**
   * 删除审计报告类型
   * @param id 审计报告类型ID
   *
   */
  deleteUsingDELETE(id: string): Observable<any> {
    return this.http.delete<any>(`${AuditPostTypeService.URL}/delete/${id}`);
  }

  /**
   * 根据ID查询审计报告类型数据
   * @param id 审计报告类型ID
   *
   */
  findByIdUsingGET(id: string): Observable<AuditPostTypeDTO> {
    return this.http.get<AuditPostTypeDTO>(`${AuditPostTypeService.URL}/${id}`);
  }

  /**
   * 更新审计报告类型数据
   * @param id 审计报告类型ID
   * @param auditPostTypeEditInfoDTO 审计报告类型DTO
   *
   */
  updateUsingPUT(id: string, auditPostTypeEditInfoDTO?: AuditPostTypeEditInfoDTO): Observable<AuditPostTypeDTO> {
    return this.http.put<AuditPostTypeDTO>(`${AuditPostTypeService.URL}/${id}`, auditPostTypeEditInfoDTO);
  }
}
