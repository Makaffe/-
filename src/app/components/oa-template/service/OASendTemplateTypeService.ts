import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs/internal/Observable';
import { OASendTemplateTypeDTO } from '../model/OASendTemplateTypeDTO';
import { OASendTemplateTypeEditInfoDTO } from '../model/OASendTemplateTypeEditInfoDTO';
@Injectable({
  providedIn: 'root',
})
/**
 * OA发文模板类型 Service
 * @Author jdoaisjdoaisjdoais
 * @Date 2021/10/13
 */
export class OASendTemplateTypeService {
  /**
   * API请求URL
   */
  private static URL = '/api/oasend/template/type';

  constructor(private http: _HttpClient) {}

  /**
   * 创建OA发送模板类型
   * @param oASendTemplateTypeEditInfoDTO OA发送模板类型DTO
   *
   */
  addUsingPOST(oASendTemplateTypeEditInfoDTO?: OASendTemplateTypeEditInfoDTO): Observable<OASendTemplateTypeDTO> {
    return this.http.post<OASendTemplateTypeDTO>(`${OASendTemplateTypeService.URL}/create`, oASendTemplateTypeEditInfoDTO);
  }

  /**
   * 查询所有OA发送模板报文类型数据
   *
   */
  findAllUsingGET(): Observable<Array<OASendTemplateTypeDTO>> {
    return this.http.get<Array<OASendTemplateTypeDTO>>(`${OASendTemplateTypeService.URL}/findAll`);
  }

  /**
   * 删除OA发送模板类型
   * @param id OA发送模板类型ID
   *
   */
  deleteUsingDELETE(id: string): Observable<any> {
    return this.http.delete<any>(`${OASendTemplateTypeService.URL}/delete/${id}`);
  }

  /**
   * 根据ID查询OA发送模板类型数据
   * @param id OA发送模板类型ID
   *
   */
  findByIdUsingGET(id: string): Observable<OASendTemplateTypeDTO> {
    return this.http.get<OASendTemplateTypeDTO>(`${OASendTemplateTypeService.URL}${id}`);
  }

  /**
   * 更新OA发送模板类型数据
   * @param id OA发送模板类型ID
   * @param oaSendTemplateTypeEditInfoDTO DTO
   *
   */
  updateUsingPUT(
    id: string,
    oaSendTemplateTypeEditInfoDTO?: OASendTemplateTypeEditInfoDTO,
  ): Observable<OASendTemplateTypeDTO> {
    return this.http.put<OASendTemplateTypeDTO>(`${OASendTemplateTypeService.URL}/update/${id}`, oaSendTemplateTypeEditInfoDTO);
  }
}
