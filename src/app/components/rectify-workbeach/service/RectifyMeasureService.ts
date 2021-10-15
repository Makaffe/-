import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { ApiPagedData, QueryOptions } from '@mt-framework-ng/core';
import { Observable } from 'rxjs/internal/Observable';
import { ChangeMsOrRp } from '../model/ChangeMsOrRp';
import { RectifyMeasureDTO } from '../model/RectifyMeasureDTO';
import { RectifyMeasureEditInfoDTO } from '../model/RectifyMeasureEditInfoDTO';
@Injectable({
  providedIn: 'root',
})
/**
 * 整改措施管理 Service
 * @Author chenzhongde
 * @Date 2021/10/13
 */
export class RectifyMeasureService {
  /**
   * API请求URL
   */
  private static URL = '/api/rectify/measure';

  constructor(private http: _HttpClient) {}

  /**
   * 新增整改措施
   * @param rectifyMeasureEditInfoDTO 整改措施DTO
   *
   */
  add(rectifyMeasureEditInfoDTO?: RectifyMeasureEditInfoDTO): Observable<RectifyMeasureDTO> {
    return this.http.post<RectifyMeasureDTO>(`${RectifyMeasureService.URL}/add`, rectifyMeasureEditInfoDTO);
  }

  /**
   * 查询所有整改措施数据
   *
   */
  findAll(): Observable<Array<RectifyMeasureDTO>> {
    return this.http.get<Array<RectifyMeasureDTO>>(`${RectifyMeasureService.URL}/all`);
  }

  /**
   * 删除整改措施
   * @param id 整改措施ID
   *
   */
  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${RectifyMeasureService.URL}/delete/${id}`);
  }

  /**
   * 分页查询整改措施数据
   * @param page 页号，从0开始
   * @param size 每页纪录条数
   * @param sort 排序字段, 例如：字段1,asc,字段2,desc
   * @param rectifyProblemId 整改问题清单id
   * @param rectifyBackFeedHz 整改反馈频率
   * @param rectifyBackFeedHzUnit 整改反馈单位
   * @param rectifyEndTime 整改截止时间
   *
   */
  findOnePage(
    options: QueryOptions,
    rectifyProblemId: any,
    rectifyBackFeedHz?: any,
    rectifyBackFeedHzUnit?: any,
    rectifyEndTime?: any,
  ): Observable<ApiPagedData<RectifyMeasureDTO>> {
    const params = {};
    Object.assign(params, options);
    Object.assign(params, rectifyProblemId ? { rectifyProblemId } : {});
    Object.assign(params, rectifyBackFeedHz ? { rectifyBackFeedHz } : {});
    Object.assign(params, rectifyBackFeedHzUnit ? { rectifyBackFeedHzUnit } : {});
    Object.assign(params, rectifyEndTime ? { rectifyEndTime } : {});

    return this.http.get<ApiPagedData<RectifyMeasureDTO>>(`${RectifyMeasureService.URL}/page`, params);
  }

  /**
   * 更新整改措施数据状态或整改进度
   * @param id 整改措施ID
   * @param changeMsOrRp 更新整改措施状态或进度
   *
   */
  updateMsOrRp(id: string, changeMsOrRp?: ChangeMsOrRp): Observable<RectifyMeasureDTO> {
    return this.http.put<RectifyMeasureDTO>(`${RectifyMeasureService.URL}/status/${id}`, changeMsOrRp);
  }

  /**
   * 根据ID查询整改措施数据
   * @param id 整改措施ID
   *
   */
  findById(id: string): Observable<RectifyMeasureDTO> {
    return this.http.get<RectifyMeasureDTO>(`${RectifyMeasureService.URL}/${id}`);
  }

  /**
   * 更新整改措施数据
   * @param id 整改措施ID
   * @param rectifyMeasureEditInfoDTO 整改措施DTO
   *
   */
  update(id: string, rectifyMeasureEditInfoDTO?: RectifyMeasureEditInfoDTO): Observable<RectifyMeasureDTO> {
    return this.http.put<RectifyMeasureDTO>(`${RectifyMeasureService.URL}/${id}`, rectifyMeasureEditInfoDTO);
  }
}
