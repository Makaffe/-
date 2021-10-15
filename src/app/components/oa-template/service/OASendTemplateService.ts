import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs/internal/Observable';
import { OASendTemplateDTO } from '../model/OASendTemplateDTO';
import { OASendTemplateEditInfoDTO } from '../model/OASendTemplateEditInfoDTO';
import { PageDataDTO } from '../model/PageDataDTO_OASendTemplateDTO_';
@Injectable({
  providedIn: 'root',
})
/**
 * OA发文模板 Service
 * @Author 的架
 * @Date 2021/10/14
 */
export class OASendTemplateService {
  /**
   * API请求URL
   */
  private static URL = '/api/oasend/template';

  constructor(private http: _HttpClient) {}

  /**
   * 创建OA发送模板
   * @param oaSendTemplateEditInfoDTO OA发送模板DTO
   *
   */
  addUsingPOST(oaSendTemplateEditInfoDTO?: OASendTemplateEditInfoDTO): Observable<OASendTemplateDTO> {
    return this.http.post<OASendTemplateDTO>(`${OASendTemplateService.URL}/add`, oaSendTemplateEditInfoDTO);
  }

  /**
   * 查询所有OA发送模板
   * @param content OA发送模板内容
   * @param name OA发送模板名称
   *
   */
  findAllUsingGET(content?: string, name?: string): Observable<Array<OASendTemplateDTO>> {
    const params = {};
    Object.assign(params, content ? { content } : {});
    Object.assign(params, name ? { name } : {});

    return this.http.get<Array<OASendTemplateDTO>>(`${OASendTemplateService.URL}/all`, params);
  }

  /**
   * 删除OA发送模板
   * @param id OA发送模板ID
   *
   */
  deleteUsingDELETE(id: string): Observable<any> {
    return this.http.delete<any>(`${OASendTemplateService.URL}/delete/${id}`);
  }

  /**
   * 分页查询OA发送模板数据
   * @param sort 排序字段, 例如：字段1,asc,字段2,desc
   * @param page 页号，从0开始
   * @param size 每页纪录条数
   * @param name OA发送报文名称
   * @param content OA发送报文内容
   *
   */
  findOnePageUsingGET(
    sort?: string,
    page?: number,
    size?: number,
    name?: string,
    content?: string,
  ): Observable<PageDataDTO<OASendTemplateDTO>> {
    const params = {};
    Object.assign(params, sort ? { sort } : {});
    Object.assign(params, page ? { page } : {});
    Object.assign(params, size ? { size } : {});
    Object.assign(params, name ? { name } : {});
    Object.assign(params, content ? { content } : {});

    return this.http.get<PageDataDTO<OASendTemplateDTO>>(`${OASendTemplateService.URL}/findOnePage`, params);
  }

  /**
   * 根据ID查询OA发送模板数据
   * @param id OA发送模板ID
   *
   */
  findByIdUsingGET(id: string): Observable<OASendTemplateDTO> {
    return this.http.get<OASendTemplateDTO>(`${OASendTemplateService.URL}/${id}`);
  }

  /**
   * 更新OA发送模板数据
   * @param id OA发送模板ID
   * @param oASendTemplateEditInfoDTO OA发送模板DTO
   *
   */
  updateUsingPUT(id: string, oASendTemplateEditInfoDTO?: OASendTemplateEditInfoDTO): Observable<OASendTemplateDTO> {
    return this.http.put<OASendTemplateDTO>(`${OASendTemplateService.URL}/${id}`, oASendTemplateEditInfoDTO);
  }
}
