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

  constructor(private http: _HttpClient) { }

  /**
   * 分页查询整改问题
   * @param option 分页参数
   * @param reportName 报告名称
   * @param startTime 开始时间
   * @param endTime 结束时间
   * @param rectifyProblemId 问题类型
   * @param rectifyProblemName 问题名称
   * @param sendStatus 发送状态
   * @param isAllot 是否已分配
   * @param rectifyObject 整改对象
   * @param dutyUserName 整改负责人名称
   * @param trackStatus 整改状态
   *
   */
  findOnePage(
    option: QueryOptions,
    reportName?: string,
    startTime?: string,
    endTime?: string,
    rectifyProblemId?: string,
    rectifyProblemName?: string,
    sendStatus?: string,
    isAllot?: string,
    rectifyObject?: string,
    dutyUserName?: string,
    trackStatus?: string
  ): Observable<ApiPagedData<RectifyProblemDTO>> {
    const params = {};
    Object.assign(params, option);
    Object.assign(params, reportName ? { reportName } : {});
    Object.assign(params, startTime ? { startTime } : {});
    Object.assign(params, endTime ? { endTime } : {});
    Object.assign(params, rectifyProblemId ? { rectifyProblemId } : {});
    Object.assign(params, rectifyProblemName ? { rectifyProblemName } : {});
    Object.assign(params, sendStatus ? { sendStatus } : {});
    Object.assign(params, isAllot !== null ? { isAllot } : {});
    Object.assign(params, rectifyObject ? { rectifyObject } : {});
    Object.assign(params, dutyUserName ? { dutyUserName } : {});
    Object.assign(params, trackStatus ? { trackStatus } : {});
    return this.http.get<ApiPagedData<RectifyProblemDTO>>(`${RectifyProblemService.URL}/findOnePage`, params);
  }

  /**
   * 拆分问题
   * @param children 子问题列表 把父问题放到最后
   *
   */
  rectifyProblemSplit(rectifyProblemEditInfoDTO: RectifyProblemDTO): Observable<Array<RectifyProblemDTO>> {
    return this.http.post<Array<RectifyProblemDTO>>(`${RectifyProblemService.URL}/rectifyProblemSplit`, rectifyProblemEditInfoDTO);
  }

  /**
   * 问题下发
   * @param ids 整改问题ids
   *
   */
  rectifyProblemSend(ids: Array<string>, content?: string): Observable<Array<RectifyProblemDTO>> {
    return this.http.put<Array<RectifyProblemDTO>>(`${RectifyProblemService.URL}/rectifyProblemSend`, { ids, content });
  }

  /**
   * 移交纪检
   * @param ids 整改问题ids
   * @param transferCause 问题移交原因
   *
   */
  rectifyProblemTransfer(ids: Array<string>, content: string): Observable<Array<RectifyProblemDTO>> {
    return this.http.put<Array<RectifyProblemDTO>>(
      `${RectifyProblemService.URL}/rectifyProblemTransfer`,
      { ids, content },
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

  /**
   * 导出数据
   * @param option 分页参数
   * @param reportName 报告名称
   * @param startTime 开始时间
   * @param endTime 结束时间
   * @param rectifyProblemId 问题类型
   * @param rectifyProblemName 问题名称
   * @param sendStatus 发送状态
   * @param isAllot 是否已分配
   * @param rectifyObject 整改对象
   * @param dutyUserName 整改负责人名称
   * @param trackStatus 整改状态
   */
  export(
    option: QueryOptions,
    reportName?: string,
    startTime?: string,
    endTime?: string,
    rectifyProblemId?: string,
    rectifyProblemName?: string,
    sendStatus?: string,
    isAllot?: string,
    rectifyObject?: string,
    dutyUserName?: string,
    trackStatus?: string,
    isAllExport?: boolean
  ): Observable<any> {
    const params = {};
    Object.assign(params, option);
    Object.assign(params, reportName ? { reportName } : {});
    Object.assign(params, startTime ? { startTime } : {});
    Object.assign(params, endTime ? { endTime } : {});
    Object.assign(params, rectifyProblemId ? { rectifyProblemId } : {});
    Object.assign(params, rectifyProblemName ? { rectifyProblemName } : {});
    Object.assign(params, sendStatus ? { sendStatus } : {});
    Object.assign(params, isAllot !== null ? { isAllot } : {});
    Object.assign(params, rectifyObject ? { rectifyObject } : {});
    Object.assign(params, dutyUserName ? { dutyUserName } : {});
    Object.assign(params, trackStatus ? { trackStatus } : {});
    Object.assign(params, isAllExport !== null ? { isAllExport } : {});
    return this.http.get<any>(`${RectifyProblemService.URL}/export`, params, {
      responseType: 'blob',
      observe: 'response',
    });
  }
}
