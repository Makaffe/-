import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { QueryOptions } from '@ng-mt-framework/api';
import { Observable } from 'rxjs/internal/Observable';
import { AuditReportDTO } from '../newmodel/AuditReportDTO';
import { AuditReportEditInfoDTO } from '../newmodel/AuditReportEditInfoDTO';
import { PageDataDTO } from '../newmodel/PageDataDTO_AuditReportDTO_';
@Injectable({
  providedIn: 'root',
})
/**
 * 审计报告管理 Service
 * @Author 111
 * @Date 2021/11/1
 */
export class AuditReportService {
  /**
   * API请求URL
   */
  private static URL = '/api/audit/report';

  constructor(private http: _HttpClient) {}

  /**
   * 创建审计报告
   * @param dto 审计报告DTO
   *
   */
  create(dto?: AuditReportEditInfoDTO): Observable<AuditReportDTO> {
    return this.http.post<AuditReportDTO>(`${AuditReportService.URL}/create`, dto);
  }

  /**
   * 删除审计报告
   * @param id 审计报告ID
   *
   */
  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${AuditReportService.URL}/delete/${id}`);
  }

  /**
   * 查询所有审计报告数据
   * @param typeId 报告类型
   * @param name 报告名称
   * @param auditBeginTime 审计开始日期(yyyy-MM-dd)
   * @param auditEndTime 审计结束日期(yyyy-MM-dd)
   * @param auditUnitName 审计单位名称
   *
   */
  findAll(
    typeId?: string,
    name?: string,
    auditBeginTime?: string,
    auditEndTime?: string,
    auditUnitName?: string,
  ): Observable<Array<AuditReportDTO>> {
    const params = {};
    Object.assign(params, typeId ? { typeId } : {});
    Object.assign(params, name ? { name } : {});
    Object.assign(params, auditBeginTime ? { auditBeginTime } : {});
    Object.assign(params, auditEndTime ? { auditEndTime } : {});
    Object.assign(params, auditUnitName ? { auditUnitName } : {});

    return this.http.get<Array<AuditReportDTO>>(`${AuditReportService.URL}/findAll`, params);
  }

  /**
   * 分页查询审计报告数据
   * @param sort 排序字段, 例如：字段1,asc,字段2,desc
   * @param page 页号，从0开始
   * @param size 每页纪录条数
   * @param type 报告类型
   * @param name 报告名称
   * @param auditBeginTime 审计开始日期(yyyy-MM-dd)
   * @param auditEndTime 审计结束日期(yyyy-MM-dd)
   * @param auditUnitName 审计单位名称
   *
   */
  findOnePage(
    option: QueryOptions,
    type?: string,
    name?: string,
    auditBeginTime?: string,
    auditEndTime?: string,
    auditUnitName?: string,
  ): Observable<PageDataDTO<AuditReportDTO>> {
    const params = {};
    Object.assign(params, option);
    Object.assign(params, type ? { type } : {});
    Object.assign(params, name ? { name } : {});
    Object.assign(params, auditBeginTime ? { auditBeginTime } : {});
    Object.assign(params, auditEndTime ? { auditEndTime } : {});
    Object.assign(params, auditUnitName ? { auditUnitName } : {});

    return this.http.get<PageDataDTO<AuditReportDTO>>(`${AuditReportService.URL}/findOnePage`, params);
  }

  /**
   * 更新审计报告数据
   * @param id 审计报告ID
   * @param dto 审计报告DTO
   *
   */
  update(id: string, dto?: AuditReportEditInfoDTO): Observable<AuditReportDTO> {
    return this.http.put<AuditReportDTO>(`${AuditReportService.URL}/update/${id}`, dto);
  }

  /**
   * 根据ID查询审计报告数据
   * @param id 审计报告ID
   *
   */
  findById(id: string): Observable<AuditReportDTO> {
    return this.http.get<AuditReportDTO>(`${AuditReportService.URL}/${id}`);
  }
}
