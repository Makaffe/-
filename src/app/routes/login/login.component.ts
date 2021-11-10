import { AfterViewInit, Component, ElementRef, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { StartupService } from '@core/startup/startup.service';
import { ReuseTabService } from '@delon/abc';
import { DA_SERVICE_TOKEN, TokenService } from '@delon/auth';
import { CacheService } from '@delon/cache';
import { SettingsService } from '@delon/theme';
import { UserService } from '@ng-mt-framework/api';
import { FormUtil } from '@ng-mt-framework/util';
import { parse } from 'date-fns';
import { NzMessageService } from 'ng-zorro-antd';
import { LonginDTO } from 'src/app/matech/model/base/longin-dto';
import { LoginService } from 'src/app/matech/service/base/login.service';
import { environment } from '@env/environment';
import { forkJoin } from 'rxjs';
import { LARGE_SCREEN_MODE_STROE_KEY } from '@mt-framework-ng/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  /**
   * 用户类型列表
   */
  userTypeList = [
    { label: '审计人员', value: 'AUDIT_DEPARTMENT' },
    { label: '纪检部门', value: 'SUPERVISE_DEPARTMENT' },
    { label: '整改部门', value: 'RECTIFY_DEPARTMENT' },
  ];

  /**
   * 展示系统名
   */
  systemName = environment.systemName;

  /**
   * 登录表单
   */
  loginForm: FormGroup;

  /**
   * 用户账号输入控件
   */
  @ViewChild('userName', { static: false })
  inputUserName: ElementRef;

  @ViewChild('loginDetailForm', { static: false })
  loginDetailForm: NgForm;

  /**
   * 登录按钮的loading状态
   */
  loading = false;

  loginDTO: LonginDTO = {
    account: 'admin',
    password: '!qAz@wSx',
    organizationType: 'POSITION',
    // tslint:disable-next-line:no-string-literal
    userType: 'AUDIT_DEPARTMENT',
  };

  /**
   * 需要缓存的用户信息对象
   */
  userInfo = {
    id: '',
    name: '',
    authorities: [],
    topOrganizationDTOS: [],
    userType: null,
  };

  /**
   * 当前用户id
   */
  userId = '';

  loginModel = null;

  rememberMe = false;

  constructor(
    private router: Router,
    public msg: NzMessageService,
    private userService: UserService,
    @Optional()
    @Inject(ReuseTabService)
    private reuseTabService: ReuseTabService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: TokenService,
    private cacheService: CacheService,
    private longinService: LoginService,
    private starupService: StartupService,
    private settingService: SettingsService,
  ) { }

  ngOnInit(): void {
    this.cacheService.clear();
    this.tokenService.clear();
    this.settingService.setUser(null);
    this.settingService.setLayout(null);
    this.loginModel = this.createModel();
  }

  private createModel(): any {
    const Model = {
      userName: null,
      password: null,
    };
    return Model;
  }

  ngAfterViewInit(): void { }

  /**
   * 登录
   */
  onLogin($event: Event) {
    $event.preventDefault();
    this.cacheService.set('__user', this.userInfo, {
      type: this.rememberMe ? 's' : 'm',
    });
    if (!FormUtil.validateForm(this.loginDetailForm.form)) {
      return;
    }

    // 默认配置中对所有HTTP请求都会强制[校验](https://ng-alain.com/auth/getting-started) 用户 Token
    // 然一般来说登录请求不需要校验，因此可以在请求URL加上：`/login?_allow_anonymous=true` 表示不触发用户 Token 校验
    this.loading = true;
    // tslint:disable-next-line: deprecation
    this.longinService.login(this.loginDTO).subscribe(
      data => {
        this.loading = false;
        if (data) {
          this.afterLogin(data);
        }
      },
      null,
      () => {
        this.loading = false;
      },
    );
  }

  afterLogin(data: any) {
    // 清空路由复用信息
    this.reuseTabService.clear();
    // 设置Token信息
    this.tokenService.set(data);

    // 查询当前登录人信息
    const user$ = this.userService.findUserById(data.userId);
    const roles$ = this.userService.findRolesByUserId(data.userId);
    forkJoin([user$, roles$]).subscribe(result => {
      if (!result) {
        return;
      }

      const roleIds = [];
      result[1].forEach(role => {
        roleIds.push(role.id);
      });

      // 账号过期时间
      const expire = parse(data.expires);
      const expireTime = (expire.getTime() - new Date().getTime()) / 1000;

      // 处理用户信息请求结果
      this.userId = data.userId;
      if (result[0]) {
        this.userInfo.id = data.userId;
        this.userInfo.name = result[0].name;
        this.userInfo.authorities = result[0].authorities;
        this.userInfo.userType = this.loginDTO.userType;
        if (result[0].topOrganizationDTOS) {
          this.userInfo.topOrganizationDTOS = result[0].topOrganizationDTOS;
        }
        // 缓存用户信息
        this.cacheService.set('__user', this.userInfo, {
          type: this.rememberMe ? 's' : 'm',
          expire: expireTime,
        });
        this.cacheService.set('__rememberUser', this.rememberMe, {
          type: 's',
        });
      }

      this.cacheService.set(LARGE_SCREEN_MODE_STROE_KEY, true);

      // 检查用户角色, 角色由后台sql脚本初始化，id需明确（1.系统管理员， 2.审计人员，3.纪检部门，4.整改部门）
      switch (this.loginDTO.userType) {
        case 'AUDIT_DEPARTMENT':
          if (!roleIds.includes('2')) {
            this.msg.error('登录用户不是审计人员！');
            return;
          }
          this.starupService.load(this.loginDTO.userType).then(() => this.router.navigate(['/audit-rectify/auditor-dashboard']));
          break;
        case 'SUPERVISE_DEPARTMENT':
          if (!roleIds.includes('3')) {
            this.msg.error('登录用户不是纪检部门人员！');
            return;
          }
          this.starupService.load(this.loginDTO.userType).then(() => this.router.navigate(['/audit-rectify/supervise-dashboard']));
          break;
        case 'RECTIFY_DEPARTMENT':
          if (!roleIds.includes('4')) {
            this.msg.error('登录用户不是整改部门人员！');
            return;
          }
          this.starupService.load(this.loginDTO.userType).then(() => this.router.navigate(['/audit-rectify/rectify-dashboard']));
          break;
        default:
          break;
      }

      //   this.starupService.load().then(() => this.router.navigate(['/navigation']));
    });
  }
}
