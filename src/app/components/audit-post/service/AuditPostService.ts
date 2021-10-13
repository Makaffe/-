import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { ApiPagedData } from '@mt-framework-ng/core';
import { Observable } from 'rxjs/internal/Observable';
import { AuditPostDTO } from '../model/AuditPostDTO';
import { AuditPostEditInfoDTO } from '../model/AuditPostEditInfoDTO';
@Injectable({
  providedIn: 'root',
})
/**
 * 审计报告管理 Service
 * @Author makaffe
 * @Date 2021/10/13
 */
export class AuditPostService {
  /**
   * API请求URL
   */
  private static URL = '/api/audit-post';

  constructor(private http: _HttpClient) {}

  /**
   * 创建审计报告
   * @param auditPostEditInfoDTO 审计报告DTO
   *
   */
  addUsingPOST(auditPostEditInfoDTO?: AuditPostEditInfoDTO): Observable<AuditPostDTO> {
    return this.http.post<AuditPostDTO>(`${AuditPostService.URL}/add`, auditPostEditInfoDTO);
  }

  /**
   * 查询所有审计报告数据
   * @param name 报告名称
   * @param auditBeginTime 审计开始时间
   * @param auditEndTime 审计结束时间
   * @param auditUnitName 审计单位名称
   *
   */
  findAllUsingGET_9(
    name?: string,
    auditBeginTime?: string,
    auditEndTime?: string,
    auditUnitName?: string,
  ): Observable<Array<AuditPostDTO>> {
    const params = {};
    Object.assign(params, name ? { name } : {});
    Object.assign(params, auditBeginTime ? { auditBeginTime } : {});
    Object.assign(params, auditEndTime ? { auditEndTime } : {});
    Object.assign(params, auditUnitName ? { auditUnitName } : {});

    return this.http.get<Array<AuditPostDTO>>(`${AuditPostService.URL}/all`, params);
  }

  /**
   * 删除审计报告
   * @param id 审计报告ID
   *
   */
  deleteUsingDELETE_23(id: string): Observable<any> {
    return this.http.delete<any>(`${AuditPostService.URL}/delete/${id}`);
  }

  /**
   * 分页查询审计报告数据
   * @param sort 排序字段, 例如：字段1,asc,字段2,desc
   * @param page 页号，从0开始
   * @param size 每页纪录条数
   * @param name 报告名称
   * @param auditBeginTime 审计开始时间
   * @param auditEndTime 审计结束时间
   * @param auditUnitName 审计单位名称
   *
   */
  findOnePageUsingGET_12(
    sort?: string,
    page?: number,
    size?: number,
    name?: string,
    auditBeginTime?: string,
    auditEndTime?: string,
    auditUnitName?: string,
  ): Observable<ApiPagedData<AuditPostDTO>> {
    const params = {};
    Object.assign(params, sort ? { sort } : {});
    Object.assign(params, page ? { page } : {});
    Object.assign(params, size ? { size } : {});
    Object.assign(params, name ? { name } : {});
    Object.assign(params, auditBeginTime ? { auditBeginTime } : {});
    Object.assign(params, auditEndTime ? { auditEndTime } : {});
    Object.assign(params, auditUnitName ? { auditUnitName } : {});

    return this.http.get<ApiPagedData<AuditPostDTO>>(`${AuditPostService.URL}/findOnePage`, params);
  }

  /**
   * 根据ID查询审计报告数据
   * @param id 审计报告ID
   *
   */
  findByIdUsingGET_26(id: string): Observable<AuditPostDTO> {
    return this.http.get<AuditPostDTO>(`${AuditPostService.URL}/${id}`);
  }

  /**
   * 更新审计报告数据
   * @param id 审计报告ID
   * @param auditPostEditInfoDTO 审计报告DTO
   *
   */
  updateUsingPUT_24(id: string, auditPostEditInfoDTO?: AuditPostEditInfoDTO): Observable<AuditPostDTO> {
    return this.http.put<AuditPostDTO>(`${AuditPostService.URL}/${id}`, auditPostEditInfoDTO);
  }
}
