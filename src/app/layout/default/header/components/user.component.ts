import { Component, Inject, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '@delon/theme';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { ChangePasswordComponent } from '@ng-mt-framework/comp';

@Component({
  selector: 'header-user',
  template: `
    <nz-dropdown nzPlacement="bottomRight">
      <div
        class="alain-default__nav-item d-flex align-items-center px-sm"
        style="padding: 23px 2px;margin-right: 15px;color: rgba(0, 0, 0, 0.45)"
        nz-dropdown
      >
        <i nz-icon nzType="user" nzTheme="outline"></i>&nbsp;
        {{ settings.user.name }}
      </div>
      <div nz-menu class="width-sm">
        <div nz-menu-item (click)="changePassword()">
          <i nz-icon nzType="edit" class="mr-sm"></i>
          {{ 'menu.account.password' | translate }}
        </div>
        <li nz-menu-divider></li>
        <div nz-menu-item (click)="logout()">
          <i nz-icon nzType="logout" class="mr-sm"></i>
          {{ 'menu.account.logout' | translate }}
        </div>
      </div>
    </nz-dropdown>
    <mt-change-password #changePasswordComponent [(isVisible)]="isVisible"></mt-change-password>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderUserComponent {
  /**
   * 修改密码弹窗
   */
  isVisible = false;

  /**
   * 修改密码组件
   */
  @ViewChild('changePasswordComponent', { static: false })
  changePasswordComponent: ChangePasswordComponent;

  constructor(
    public settings: SettingsService,
    private router: Router,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
  ) {}

  logout() {
    this.tokenService.clear();
    // tslint:disable-next-line: no-non-null-assertion
    this.router.navigateByUrl(this.tokenService.login_url!);
  }

  /**
   * 修改密码
   */
  changePassword() {
    this.isVisible = true;
  }
}
