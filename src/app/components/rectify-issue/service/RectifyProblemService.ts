import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { ApiPagedData, ApiSimpleData, QueryOptions } from '@mt-framework-ng/core';
import { Observable } from 'rxjs/internal/Observable';
import { RectifyTrackDTO } from '../../rectify-track/model/RectifyTrackDTO';
import { RectifyProblemDTO } from '../model/rectify-problem-dto';
@Injectable({
  providedIn: 'root',
})
/**
 * 整改问题 Service
 * @Author fjr
 * @Date 2021/10/13
 */
export class RectifyProblemService {
  /**
   * API请求URL
   */
  private static URL = '/api/rectify/problem';

  constructor(private http: _HttpClient) {}

  /**
   * 分页查询整改问题
   * @param page 页号，从0开始
   * @param size 每页纪录条数
   * @param sort 排序字段, 例如：字段1,asc,字段2,desc
   * @param rectifyProblemName 整改问题名称,支持模糊查询
   * @param rectifyDepartmentId 整改部门id
   * @param sendStatus 下发状态
   * @param transferStatus 移交状态
   *
   */
  findOnePage(
    option: QueryOptions,
    rectifyProblemName?: string,
    rectifyDepartmentId?: string,
    sendStatus?: string,
    transferStatus?: string,
  ): Observable<ApiPagedData<RectifyProblemDTO>> {
    const params = {};
    Object.assign(params, option);
    Object.assign(params, rectifyProblemName ? { rectifyProblemName } : {});
    Object.assign(params, rectifyDepartmentId ? { rectifyDepartmentId } : {});
    Object.assign(params, sendStatus ? { sendStatus } : {});
    Object.assign(params, transferStatus ? { transferStatus } : {});

    return this.http.get<ApiPagedData<RectifyProblemDTO>>(`${RectifyProblemService.URL}/findOnePage`, params);
  }

  /**
   * 拆分问题
   * @param children 子问题列表 把父问题放到最后
   *
   */
  rectifyProblemSplit(children: Array<RectifyProblemDTO>): Observable<Array<RectifyProblemDTO>> {
    return this.http.post<Array<RectifyProblemDTO>>(`${RectifyProblemService.URL}/rectifyProblemSplit`, children);
  }

  /**
   * 问题下发
   * @param ids 整改问题ids
   *
   */
  rectifyProblemSend(ids: Array<string>): Observable<Array<RectifyProblemDTO>> {
    return this.http.put<Array<RectifyProblemDTO>>(`${RectifyProblemService.URL}/send`, ids);
  }

  /**
   * 移交纪检
   * @param ids 整改问题ids
   * @param transferCause 问题移交原因
   *
   */
  rectifyProblemTransfer(ids: Array<string>, transferCause: string): Observable<Array<RectifyProblemDTO>> {
    return this.http.put<Array<RectifyProblemDTO>>(
      `${RectifyProblemService.URL}/rectifyProblemTransfer?transferCause=${transferCause}`,
      ids,
    );
  }

  /**
   * 根据整改问题id查询备忘录
   * @param id 整改问题id
   *
   */
  findMome(id?: string): Observable<ApiSimpleData<string>> {
    return this.http.get<ApiSimpleData<string>>(`${RectifyProblemService.URL}/memo/${id}`);
  }

  /**
   * 根据整改问题id保存备忘录
   * @param id 整改问题id
   * @param remark 备忘录文本
   *
   */
  sevaMome(id: string, memo: string): Observable<ApiSimpleData<string>> {
    return this.http.put<ApiSimpleData<string>>(`${RectifyProblemService.URL}/memo/${id}`, memo);
  }

  /**
   *
   * @param option 分页参数
   * @param reportName 报告名称,支持模糊查询
   * @param rectifyProblemName 整改问题名称,支持模糊查询
   * @param rectifyUnitId 被整改单位id
   * @param rectifyDepartmentId 被整改部门id
   * @param rectifyUserId 被整改人id
   * @param sendStatus 问题状态,支持多个状态使用逗号隔开
   * @param transferStatus 移交状态,支持多个状态使用逗号隔开
   * @param trackStatus 跟踪状态,支持多个状态使用逗号隔开
   * @param startTime 开始时间
   * @param endTime 截止时间
   * @param dutyUserId 整改处理人
   * @returns 整改跟踪分页数据
   */
  findOnePage2Track(
    option: QueryOptions,
    reportName?: string,
    rectifyProblemName?: string,
    rectifyUnitId?: string,
    rectifyDepartmentId?: string,
    rectifyUserId?: string,
    sendStatus?: string,
    transferStatus?: string,
    trackStatus?: string,
    startTime?: string,
    endTime?: string,
    dutyUserId?: string,
  ): Observable<ApiPagedData<RectifyTrackDTO>> {
    const params = {};
    Object.assign(params, option);
    Object.assign(params, reportName ? { reportName } : {});
    Object.assign(params, rectifyProblemName ? { rectifyProblemName } : {});
    Object.assign(params, rectifyUnitId ? { rectifyUnitId } : {});
    Object.assign(params, rectifyDepartmentId ? { rectifyDepartmentId } : {});
    Object.assign(params, rectifyUserId ? { rectifyUserId } : {});
    Object.assign(params, sendStatus ? { sendStatus } : {});
    Object.assign(params, transferStatus ? { transferStatus } : {});
    Object.assign(params, trackStatus ? { trackStatus } : {});
    Object.assign(params, startTime ? { startTime } : {});
    Object.assign(params, endTime ? { endTime } : {});
    Object.assign(params, dutyUserId ? { dutyUserId } : {});

    return this.http.get<ApiPagedData<RectifyTrackDTO>>(`${RectifyProblemService.URL}/findOnePage2Track`, params);
  }

  /**
   * 根据id查询整改跟踪问题
   * @param id 整改问题id
   *
   */
  rectifyTrackById(id: string): Observable<RectifyTrackDTO> {
    return this.http.get<RectifyTrackDTO>(`${RectifyProblemService.URL}/rectify/track/${id}`);
  }

  /**
   * 根据id修改整改问题信息
   * @param id 整改问题id
   *
   */
  update(id: string, rectifyTrack: RectifyTrackDTO): Observable<RectifyTrackDTO> {
    return this.http.post<RectifyTrackDTO>(`${RectifyProblemService.URL}/update/${id}`, rectifyTrack);
  }
}
