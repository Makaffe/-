import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
  HttpEvent,
  HttpResponseBase,
  HttpResponse,
  HttpSentEvent,
  HttpHeaderResponse,
  HttpProgressEvent,
  HttpUserEvent,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { NzMessageService, NzNotificationService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { environment } from '@env/environment';
import { LOGIN_UTIL_TOKEN } from '@mt-framework-ng/core';

/**
 * 默认HTTP拦截器，其注册细节见 `app.module.ts`
 */
@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
  private status = {
    'status.0': '无法连接服务器，请检查网络或联系系统管理员。',
    'status.400': '错误的请求。由于语法错误，该请求无法完成。',
    'status.401': '错误的用户名或密码！',
    'status.403': '已禁止。服务器拒绝响应。',
    'status.404': '未找到。无法找到请求的位置。',
    'status.405': '方法不被允许。使用该位置不支持的请求方法进行了请求。',
    'status.406': '不可接受。服务器只生成客户端不接受的响应。',
    'status.407': '需要代理身份验证。客户端必须先使用代理对自身进行身份验证。',
    'status.408': '请求超时。等待请求的服务器超时。',
    'status.409': '冲突。由于请求中的冲突，无法完成该请求。',
    'status.410': '过期。请求页不再可用。',
    'status.411': '长度必需。未定义“内容长度”。',
    'status.412': '前提条件不满足。请求中给定的前提条件由服务器评估为 false。',
    'status.413': '请求实体太大。服务器不会接受请求，因为请求实体太大。',
    'status.414': '请求 URI 太长。服务器不会接受该请求，因为 URL 太长。',
    'status.415': '不支持的媒体类型。服务器不会接受该请求，因为媒体类型不受支持。',
    'status.416': 'HTTP 状态代码 {0}',
    'status.500': '内部服务器错误。',
    'status.501': '未实现。服务器不识别该请求方法，或者服务器没有能力完成请求。',
    'status.503': '服务不可用。服务器当前不可用(过载或故障)。',
  };

  constructor(private injector: Injector) {}

  get msg(): NzMessageService {
    return this.injector.get(NzMessageService);
  }

  private goTo(url: string) {
    setTimeout(() => this.injector.get(Router).navigateByUrl(url));
  }

  private handleData(event: HttpResponse<any> | HttpErrorResponse): Observable<any> {
    // 可能会因为 `throw` 导出无法执行 `_HttpClient` 的 `end()` 操作
    this.injector.get(_HttpClient).end();
    // 业务处理：一些通用操作
    switch (event.status) {
      case 200:
        break;
      case 401:
        if (event instanceof HttpErrorResponse) {
          if (event.error.message === '您的证书无效，请核查服务器是否取得授权或重新申请证书！') {
            this.injector.get(LOGIN_UTIL_TOKEN).createLicense();
          } else {
            this.msg.error(event.error.message);
          }
        }
        break;
      default:
        let msg = `${this.status['status.0']}`;
        if (event instanceof HttpErrorResponse) {
          if (!event.ok) {
            if (event.status !== 0) {
              if (event.error && event.error.message) {
                msg = event.error.message;
              } else {
                msg = `${this.status['status.' + event.status] || ''}`;
              }
            }
          }
        }
        this.msg.error(msg);
        break;
    }
    return of(event);
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    // 统一加上服务端前缀
    let url = req.url;

    if (!url.startsWith('https://') && !url.startsWith('http://')) {
      if (
        url.startsWith('/comm/categories') ||
        url.startsWith('/comm/favorite') ||
        url.startsWith('/comm/theme') ||
        url.startsWith('/data/insight') ||
        url.startsWith('/data/olap') ||
        url.startsWith('/data/pivot') ||
        url.startsWith('/data/dataSets') ||
        url.startsWith('/data/dataSource/dbs') ||
        url.startsWith('/data/dataSource/files') ||
        url.startsWith('/data/dataSource/tree') ||
        url.startsWith('/data/resources') ||
        url.startsWith('/aviator/functions') ||
        url.startsWith('/data/resourceAuthorities') ||
        url.startsWith('/base/dictionaries') ||
        url.startsWith('/base/files') ||
        url.startsWith('/data/tag') ||
        url.startsWith('/data/reuse') ||
        url.startsWith('/data/setReuse') ||
        url.startsWith('/alarm') ||
        url.startsWith('/comm/mtCategories') ||
        url.startsWith('/organizations') ||
        url.startsWith('/policy') ||
        url.startsWith('/base/mTable') ||
        url.startsWith('/quartz/job') ||
        url.startsWith('/tools') ||
        url.startsWith('/report')
      ) {
        // 对多维分析请求的api特殊处理
        url = environment.SERVER_URL + '/api' + url;
      } else {
        if (url.endsWith('.json')) {
        } else {
          url = environment.SERVER_URL + url;
        }
      }
    }

    const newReq = req.clone({
      url,
    });
    // 把null的参数变为空字符串
    newReq.params.keys().forEach(key => {
      const values = newReq.params.getAll(key);
      for (let index = 0; index < values.length; index++) {
        const vavlue = values[index];
        if (vavlue === undefined || vavlue === null) {
          values[index] = '';
        }
      }
    });

    return next.handle(newReq).pipe(
      mergeMap((event: any) => {
        // 允许统一对请求错误处理，这是因为一个请求若是业务上错误的情况下其HTTP请求的状态是200的情况下需要
        if (event instanceof HttpResponse && event.status === 200) return this.handleData(event);
        // 若一切都正常，则后续操作
        return of(event);
      }),
      catchError((err: HttpErrorResponse) => this.handleData(err)),
    );
  }
}
