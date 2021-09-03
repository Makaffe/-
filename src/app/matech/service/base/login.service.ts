import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CacheService } from '@delon/cache';
import { _HttpClient } from '@delon/theme';
import { JwtTokenDTO, UserDTO, ApiSimpleData } from '@ng-mt-framework/api';
import { Observable } from 'rxjs/internal/Observable';
import { LonginDTO } from '../../model/base/longin-dto';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  /**
   * API的入口URL
   */
  private static URL = '/api/token';

  constructor(private http: _HttpClient, private cacheService: CacheService) {}

  /**
   *
   * 根据ID查找用户
   * @param id 用户id
   */
  findById(id: string): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${LoginService.URL}/${id}`);
  }

  /**
   * 退出登录
   */
  logout(): any {
    return this.http.delete(`${LoginService.URL}`);
  }

  /**
   * 获取Token
   */
  login(longinDTO: LonginDTO): Observable<JwtTokenDTO> {
    return this.http.post<JwtTokenDTO>(`${LoginService.URL}?_allow_anonymous=true&encrypt=body`, longinDTO);
  }

  /**
   * 获取用户类型
   */
  getUserType(): string {
    const user = this.cacheService.get('__user', { mode: 'none' });
    if (user) {
      return user.userType;
    }
    return '';
  }

  /**
   * 单点登录接口
   * @param token OA系统提供的token信息
   * @returns JwtTokenDTO
   */
  singleLogin(token: string): Observable<JwtTokenDTO> {
    const tokenDTO: ApiSimpleData<string> = { data: encodeURIComponent(token) };
    const httpOptions = {
      headers: new HttpHeaders().set('Access-Control-Allow-Origin', '*'),
    };
    return this.http.post('/api/single/login', tokenDTO, null, httpOptions);
  }
}
