import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { QueryOptions } from '@ng-mt-framework/api';
import { Observable } from 'rxjs/internal/Observable';
import { PageDataDTO } from '../model/PageDataDTO_RectifyTrackDTO_';
import { RectifyTrackDTO } from '../model/rectify-track-dto';
@Injectable({
  providedIn: 'root',
})
/**
 * OA发文模板 Service
 * @Author 的架
 * @Date 2021/10/14
 */
export class RectifyTrackService {
  /**
   * API请求URL
   */
  private static URL = '/api/rectify-problem';

  constructor(private http: _HttpClient) {}

  /**
   * 分页查询OA发送模板数据
   * @param sort 排序字段, 例如：字段1,asc,字段2,desc
   * @param page 页号，从0开始
   * @param size 每页纪录条数
   * @param rectifyProblemName 整改问题名称,支持模糊查询
   * @param rectifyDepartmentId 整改部门id
   * @param sendStatus 问题状态
   * @param transferStatus 移交状态
   * @param startTime 开始时间
   * @param endTime 截止时间
   */
  findOnePageUsingGET(
    options: QueryOptions,
    rectifyProblemName?: string,
    rectifyDepartmentId?: string,
    sendStatus?: string,
    transferStatus?: string,
    startTime?: string,
    endTime?: string,
  ): Observable<PageDataDTO<RectifyTrackDTO>> {
    const params = {};
    Object.assign(params, options);
    Object.assign(params, rectifyProblemName ? { rectifyProblemName } : {});
    Object.assign(params, rectifyDepartmentId ? { rectifyDepartmentId } : {});
    Object.assign(params, sendStatus ? { sendStatus } : {});
    Object.assign(params, transferStatus ? { transferStatus } : {});
    Object.assign(params, startTime ? { startTime } : {});
    Object.assign(params, endTime ? { endTime } : {});

    return this.http.get<PageDataDTO<RectifyTrackDTO>>(`${RectifyTrackService.URL}/findOnePage2Track`, params);
  }
}
