import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs/internal/Observable';
import { ProposalTemplateTypeDTO } from '../model/ProposalTemplateTypeDTO';
@Injectable({
  providedIn: 'root',
})
/**
 * 建议模板类型 Service
 * @Author gyl
 * @Date 2021/10/15
 */
export class ProposalTemplateTypeService {
  /**
   * API请求URL
   */
  private static URL = '/api/proposalTemplateType';

  constructor(private http: _HttpClient) { }


  /**
   * 新增建议模板类型信息
   * @param dto 待新增后的建议模板类型信息
   *
   */
  create(
    dto: ProposalTemplateTypeDTO,

  ): Observable<ProposalTemplateTypeDTO> {

    return this.http.post<ProposalTemplateTypeDTO>(`${ProposalTemplateTypeService.URL}/create`, dto);
  }

  /**
   * 删除建议模板类型信息
   * @param id 待删除建议模板类型编码
   *
   */
  delete(
    id: string,

  ): Observable<any> {

    return this.http.delete<any>(`${ProposalTemplateTypeService.URL}/delete/${id}`);
  }

  /**
   * 获取所有建议模板类型信息
   *
   */
  findAll(

  ): Observable<Array<ProposalTemplateTypeDTO>> {

    return this.http.get<Array<ProposalTemplateTypeDTO>>(`${ProposalTemplateTypeService.URL}/findAll`);
  }

  /**
   * 修改建议模板类型信息
   * @param id 待修改建议模板类型编码
   * @param dto 修改后的建议模板信息
   *
   */
  update(
    id: string,
    dto: ProposalTemplateTypeDTO,

  ): Observable<ProposalTemplateTypeDTO> {

    return this.http.put<ProposalTemplateTypeDTO>(`${ProposalTemplateTypeService.URL}/update/${id} `, dto);
  }

  /**
   * 获取单一建议模板类型信息
   * @param id 待查询建议模板类型编码
   *
   */
  findById(
    id: string,

  ): Observable<ProposalTemplateTypeDTO> {

    return this.http.get<ProposalTemplateTypeDTO>(`${ProposalTemplateTypeService.URL}${id}`);
  }
}
