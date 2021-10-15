import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { ApiPagedData } from '@mt-framework-ng/core';
import { Observable } from 'rxjs/internal/Observable';
import { ProposalTemplateDTO } from '../model/proposalTemplateDTO';
@Injectable({
  providedIn: 'root',
})
/**
 * 建议模板 Service
 * @Author gyl
 * @Date 2021/10/15
 */
export class ProposalTemplateService {
  /**
   * API请求URL
   */
  private static URL = '/api/proposalTemplate';

  constructor(private http: _HttpClient) { }


  /**
   * 新增建议模板信息
   * @param dto 待新增后的建议模板信息
   *
   */
  create(dto: ProposalTemplateDTO,

  ): Observable<ProposalTemplateDTO> {
    return this.http.post<ProposalTemplateDTO>(`${ProposalTemplateService.URL}/create`, dto);
  }

  /**
   * 删除建议模板信息
   * @param id 待删除建议模板编码
   *
   */
  delete(
    id: string,

  ): Observable<any> {

    return this.http.delete<any>(`${ProposalTemplateService.URL}/delete/${id}`);
  }

  /**
   * 获取所有建议模板信息
   *
   */
  findAll(

  ): Observable<Array<ProposalTemplateDTO>> {

    return this.http.get<Array<ProposalTemplateDTO>>(`${ProposalTemplateService.URL}/findAll`);
  }

  /**
   * 分页查询建议模板信息
   * @param page 页号，从0开始
   * @param size 每页纪录条数
   * @param sort 排序字段, 例如：字段1,asc,字段2,desc
   * @param auditProposal 审计建议
   * @param problemType 问题类型
   *
   */
  findAOnePage(
    page?: number,
    size?: number,
    sort?: string,
    auditProposal?: string,
    problemType?: string,

  ): Observable<ApiPagedData<ProposalTemplateDTO>> {
    const params = {};
    Object.assign(params, { page });
    Object.assign(params, size ? { size } : {});
    Object.assign(params, sort ? { sort } : {});
    Object.assign(params, auditProposal ? { auditProposal } : {});
    Object.assign(params, problemType ? { problemType } : {});
    return this.http.get<ApiPagedData<ProposalTemplateDTO>>(`${ProposalTemplateService.URL}/findOngPage`, params);
  }

  /**
   * 修改建议模板信息
   * @param id 待修改建议模板编码
   * @param dto 修改后的建议模板信息
   *
   */
  update(
    id: string,
    dto: ProposalTemplateDTO,

  ): Observable<ProposalTemplateDTO> {

    return this.http.put<ProposalTemplateDTO>(`${ProposalTemplateService.URL}/update/${id} `, dto);
  }

  /**
   * 获取单一建议模板信息
   * @param id 待查询建议模板编码
   *
   */
  findById(
    id: string,

  ): Observable<ProposalTemplateDTO> {
    return this.http.get<ProposalTemplateDTO>(`${ProposalTemplateService.URL} `);
  }
}
