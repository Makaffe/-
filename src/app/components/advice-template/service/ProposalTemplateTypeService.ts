import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs/internal/Observable';
import { ProposalTemplateTypeDTO } from '../model/ProposalTemplateTypeDTO';
import { ProposalTemplateTypeEditInfoDTO } from '../model/ProposalTemplateTypeEditInfoDTO';
@Injectable({
  providedIn: 'root',
})
/**
 * 建议模板类型 Service
 * @Author makaffe
 * @Date 2021/10/18
 */
export class ProposalTemplateTypeService {
  /**
   * API请求URL
   */
  private static URL = '/api/proposal/template/type';

  constructor(private http: _HttpClient) {}

  /**
   * 创建建议模板类型
   * @param proposalTemplateTypeEditInfoDTO 建议模板类型DTO
   *
   */
  addUsingPOST(proposalTemplateTypeEditInfoDTO?: ProposalTemplateTypeEditInfoDTO): Observable<ProposalTemplateTypeDTO> {
    return this.http.post<ProposalTemplateTypeDTO>(
      `${ProposalTemplateTypeService.URL}/add`,
      proposalTemplateTypeEditInfoDTO,
    );
  }

  /**
   * 查询所有建议模板类型数据
   *
   */
  findAllUsingGET(): Observable<Array<ProposalTemplateTypeDTO>> {
    return this.http.get<Array<ProposalTemplateTypeDTO>>(`${ProposalTemplateTypeService.URL}/all`);
  }

  /**
   * 删除建议模板类型
   * @param id 建议模板类型ID
   *
   */
  deleteUsingDELETE(id: string): Observable<any> {
    return this.http.delete<any>(`${ProposalTemplateTypeService.URL}/delete/${id}`);
  }

  /**
   * 根据id查询建议模板类型
   * @param id 建议模板类型ID
   *
   */
  findByIdUsingGET(id: string): Observable<ProposalTemplateTypeDTO> {
    return this.http.get<ProposalTemplateTypeDTO>(`${ProposalTemplateTypeService.URL}/${id}`);
  }

  /**
   * 更新OA发送模板类型数据
   * @param id 建议模板类型ID
   * @param proposalTemplateTypeEditInfoDTO 建议模板类型DTO
   *
   */
  updateUsingPUT(
    id: string,
    proposalTemplateTypeEditInfoDTO?: ProposalTemplateTypeEditInfoDTO,
  ): Observable<ProposalTemplateTypeDTO> {
    return this.http.put<ProposalTemplateTypeDTO>(
      `${ProposalTemplateTypeService.URL}/${id}`,
      proposalTemplateTypeEditInfoDTO,
    );
  }
}
