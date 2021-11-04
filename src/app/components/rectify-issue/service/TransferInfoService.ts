import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { ApiPagedData, QueryOptions } from '@mt-framework-ng/core';
import { Observable } from 'rxjs/internal/Observable';
import { TransferInfoDTO } from '../model/TransferInfoDTO';
@Injectable({
  providedIn: 'root',
})
/**
 * 整改问题移交 Service
 * @Author chenzhongde
 * @Date 2021/11/4
 */
export class TransferInfoService {
  /**
   * API请求URL
   */
  private static URL = '/api/transfer/info';

  constructor(private http: _HttpClient) {}

  /**
   * 新增整改问题移交信息
   * @param dto 待整改问题移交信息
   *
   */
  create(dto: TransferInfoDTO): Observable<TransferInfoDTO> {
    return this.http.post<TransferInfoDTO>(`${TransferInfoService.URL}/create`, dto);
  }

  /**
   * 删除整改问题移交信息
   * @param id 待删除整改问题移交编码
   *
   */
  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${TransferInfoService.URL}/delete/${id}`);
  }

  /**
   * 获取所有整改问题移交信息
   *
   */
  findAll(): Observable<Array<TransferInfoDTO>> {
    return this.http.get<Array<TransferInfoDTO>>(`${TransferInfoService.URL}/findAll`);
  }

  /**
   * 获取所有整改问题延期申请信息
   * @param rectifyProblemId 整改问题编码
   *
   */
  findByTransferInfoById(rectifyProblemId: string): Observable<Array<TransferInfoDTO>> {
    return this.http.get<Array<TransferInfoDTO>>(
      `${TransferInfoService.URL}/findByTransferInfoById/${rectifyProblemId}`,
    );
  }

  /**
   * 分页查询建议模板信息
   * @param page 页号，从0开始
   * @param size 每页纪录条数
   * @param sort 排序字段, 例如：字段1,asc,字段2,desc
   * @param rectifyProblemId 整改问题编码
   * @param rectifyProblemName 问题名称
   * @param transferDisposeStatus 状态
   * @param rectifyDepartmentId 整改部门id
   * @param startTime 时间开始
   * @param endTime 时间截至
   *
   */
  findOnePage(
    option: QueryOptions,
    rectifyProblemId?: string,
    rectifyProblemName?: string,
    transferDisposeStatus?: string,
    rectifyDepartmentId?: string,
    startTime?: string,
    endTime?: string,
  ): Observable<ApiPagedData<TransferInfoDTO>> {
    const params = {};
    Object.assign(params, option);
    Object.assign(params, rectifyProblemId ? { rectifyProblemId } : {});
    Object.assign(params, rectifyProblemName ? { rectifyProblemName } : {});
    Object.assign(params, transferDisposeStatus ? { transferDisposeStatus } : {});
    Object.assign(params, rectifyDepartmentId ? { rectifyDepartmentId } : {});
    Object.assign(params, startTime ? { startTime } : {});
    Object.assign(params, endTime ? { endTime } : {});

    return this.http.get<ApiPagedData<TransferInfoDTO>>(`${TransferInfoService.URL}/findOnePage`, params);
  }

  /**
   * 修改整改问题移交信息
   * @param id 待修改整改问题移交编码
   * @param dto 修改后的整改问题移交信息
   *
   */
  update(id: string, dto: TransferInfoDTO): Observable<TransferInfoDTO> {
    return this.http.put<TransferInfoDTO>(`${TransferInfoService.URL}/update/${id}`, dto);
  }

  /**
   * 获取单一整改问题移交信息
   * @param id 待查询整改问题移交编码
   *
   */
  findById(id: string): Observable<TransferInfoDTO> {
    return this.http.get<TransferInfoDTO>(`${TransferInfoService.URL}`);
  }
}
