import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs/internal/Observable';
import { TransferRecordDTO } from '../model/TransferRecordDTO';
@Injectable({
  providedIn: 'root',
})
/**
 * 移交处分记录 Service
 * @Author chenzhongde
 * @Date 2021/11/4
 */
export class TransferRecordService {
  /**
   * API请求URL
   */
  private static URL = '/api/transfer/record';

  constructor(private http: _HttpClient) {}

  /**
   * 新增移交处分记录信息
   * @param dto 待移交处分记录信息
   *
   */
  create(dto: TransferRecordDTO): Observable<TransferRecordDTO> {
    return this.http.post<TransferRecordDTO>(`${TransferRecordService.URL}/create`, dto);
  }

  /**
   * 删除移交处分记录信息
   * @param id 待删除移交处分记录编码
   *
   */
  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${TransferRecordService.URL}/delete/${id}`);
  }

  /**
   * 获取所有移交处分记录信息
   *
   */
  findAll(): Observable<Array<TransferRecordDTO>> {
    return this.http.get<Array<TransferRecordDTO>>(`${TransferRecordService.URL}/findAll`);
  }

  /**
   * 获取指定移交处理的所有移交处分记录信息
   * @param transferDisposeId 移交处理编码
   *
   */
  findByTransferRecordById(transferDisposeId: string): Observable<Array<TransferRecordDTO>> {
    return this.http.get<Array<TransferRecordDTO>>(
      `${TransferRecordService.URL}/findByTransferRecordById/${transferDisposeId}`,
    );
  }

  /**
   * 修改移交处分记录信息
   * @param id 待修改移交处分记录编码
   * @param dto 修改后的移交处分记录信息
   *
   */
  update(id: string, dto: TransferRecordDTO): Observable<TransferRecordDTO> {
    return this.http.put<TransferRecordDTO>(`${TransferRecordService.URL}/update/${id}`, dto);
  }

  /**
   * 获取单一移交处分记录信息
   * @param id 待查询移交处分记录编码
   *
   */
  findById(id: string): Observable<TransferRecordDTO> {
    return this.http.get<TransferRecordDTO>(`${TransferRecordService.URL}`);
  }
}
