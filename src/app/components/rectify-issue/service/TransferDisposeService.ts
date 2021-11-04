import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs/internal/Observable';
import { TransferDisposeDTO } from '../model/TransferDisposeDTO';
@Injectable({
  providedIn: 'root',
})
/**
 * 移交处理记录 Service
 * @Author chenzhongde
 * @Date 2021/11/4
 */
export class TransferDisposeService {
  /**
   * API请求URL
   */
  private static URL = '/api/transfer/dispose';

  constructor(private http: _HttpClient) {}

  /**
   * 新增移交处理记录信息
   * @param dto 待移交处理记录信息
   *
   */
  create(dto: TransferDisposeDTO): Observable<TransferDisposeDTO> {
    return this.http.post<TransferDisposeDTO>(`${TransferDisposeService.URL}/create`, dto);
  }

  /**
   * 删除移交处理记录信息
   * @param id 待删除移交处理记录编码
   *
   */
  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${TransferDisposeService.URL}/delete/${id}`);
  }

  /**
   * 获取所有移交处理记录信息
   *
   */
  findAll(): Observable<Array<TransferDisposeDTO>> {
    return this.http.get<Array<TransferDisposeDTO>>(`${TransferDisposeService.URL}/findAll`);
  }

  /**
   * 获取指定移交问题的所有移交处理记录信息
   * @param transferInfoId 整改问题移交编码
   *
   */
  findByTransferDisposeById(transferInfoId: string): Observable<Array<TransferDisposeDTO>> {
    return this.http.get<Array<TransferDisposeDTO>>(
      `${TransferDisposeService.URL}/findByTransferDisposeById/${transferInfoId}`,
    );
  }

  /**
   * 修改移交处理记录信息
   * @param id 待修改移交处理记录编码
   * @param dto 修改后的移交处理记录信息
   *
   */
  update(id: string, dto: TransferDisposeDTO): Observable<TransferDisposeDTO> {
    return this.http.put<TransferDisposeDTO>(`${TransferDisposeService.URL}/update/${id}`, dto);
  }

  /**
   * 获取单一移交处理记录信息
   * @param id 待查询移交处理记录编码
   *
   */
  findById(id: string): Observable<TransferDisposeDTO> {
    return this.http.get<TransferDisposeDTO>(`${TransferDisposeService.URL}`);
  }
}
