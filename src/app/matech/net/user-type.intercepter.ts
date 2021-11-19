import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/matech/service/base/login.service';

@Injectable({
  providedIn: 'root',
})
export class UserDeptTypeInterceptor implements HttpInterceptor {
  constructor(private loginService: LoginService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const request = req.clone({
      setHeaders: { 'User-Dept-Type': this.loginService.getUserType() || '' },
    });
    return next.handle(request);
  }
}
