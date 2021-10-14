import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { ApiPagedData, QueryOptions } from '@mt-framework-ng/core';
import { Observable } from 'rxjs/internal/Observable';
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
  private static URL = '/api/rectify-problem';

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

    return this.http.get<ApiPagedData<RectifyProblemDTO>>(`${RectifyProblemService.URL}`, params);
  }

  /**
   * 拆分问题
   * @param parentId 父问题id
   * @param children 子问题列表
   *
   */
  rectifyProblemSplit(parentId: string, children: Array<RectifyProblemDTO>): Observable<Array<RectifyProblemDTO>> {
    return this.http.post<Array<RectifyProblemDTO>>(`${RectifyProblemService.URL}/split/${parentId}`, children);
  }

  /**
   * 根据整改问题id查询备忘录
   * @param id 整改问题id
   *
   */
  findMome(id?: string): Observable<string> {
    return this.http.get<string>(`${RectifyProblemService.URL}/memo/${id}`);
  }

  /**
   * 根据整改问题id保存备忘录
   * @param id 整改问题id
   * @param remark 备忘录文本
   *
   */
  sevaMome(id: string, remark: string): Observable<string> {
    return this.http.put<string>(`${RectifyProblemService.URL}/memo/${id}`, remark);
  }
}
