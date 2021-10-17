﻿import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs/internal/Observable';
import { RectifyMeasureReplyDTO } from '../model/RectifyMeasureReplyDTO';
import { RectifyMeasureReplyEditInfoDTO } from '../model/RectifyMeasureReplyEditInfoDTO';
@Injectable({
  providedIn: 'root',
})
/**
 * 整改措施回复 Service
 * @Author chenzhongde
 * @Date 2021/10/15
 */
export class RectifyMeasureReplyService {
  /**
   * API请求URL
   */
  private static URL = '/api/rectify/measure/reply';

  constructor(private http: _HttpClient) {}

  /**
   * 新增整改措施回复
   * @param rectifyMeasureReplyEditInfoDTO  整改措施回复DTO
   *
   */
  add(rectifyMeasureReplyEditInfoDTO?: RectifyMeasureReplyEditInfoDTO): Observable<RectifyMeasureReplyDTO> {
    return this.http.post<RectifyMeasureReplyDTO>(
      `${RectifyMeasureReplyService.URL}/add`,
      rectifyMeasureReplyEditInfoDTO,
    );
  }

  /**
   * 查询所有整改措施回复数据
   *
   */
  findAll(): Observable<Array<RectifyMeasureReplyDTO>> {
    return this.http.get<Array<RectifyMeasureReplyDTO>>(`${RectifyMeasureReplyService.URL}/all`);
  }

  /**
   * 删除整改措施回复
   * @param id 整改措施回复ID
   *
   */
  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${RectifyMeasureReplyService.URL}/delete/${id}`);
  }

  /**
   * 根据ID查询整改措施回复数据
   * @param id 整改措施回复ID
   *
   */
  findById(id: string): Observable<RectifyMeasureReplyDTO> {
    return this.http.get<RectifyMeasureReplyDTO>(`${RectifyMeasureReplyService.URL}/${id}`);
  }

  /**
   * 更新整改措施回复数据
   * @param id 整改措施回复ID
   * @param rectifyMeasureReplyEditInfoDTO 整改措施回复DTO
   *
   */
  update(
    id: string,
    rectifyMeasureReplyEditInfoDTO?: RectifyMeasureReplyEditInfoDTO,
  ): Observable<RectifyMeasureReplyDTO> {
    return this.http.put<RectifyMeasureReplyDTO>(
      `${RectifyMeasureReplyService.URL}/${id}`,
      rectifyMeasureReplyEditInfoDTO,
    );
  }
}
