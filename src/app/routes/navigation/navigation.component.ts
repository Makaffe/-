import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StartupService } from '@core';
import { APP_RECTIFY_DATA } from '@core/startup/app-rectify-data';
import { APP_SYSTEM_DATA } from '@core/startup/app-system-data';
import { ReuseTabService } from '@delon/abc';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { CacheService } from '@delon/cache';
import { MenuService, TitleService } from '@delon/theme';
import { environment } from '@env/environment';
import { MenuDto } from '@ng-mt-framework/api';
import { HomeMenuDTO } from 'src/app/matech/model/base/home-menu.dto';
import { DataTransmit } from './data-transmit';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.less'],
})
export class NavigationComponent implements OnInit {
  /**
   * 导航页内容id
   */
  // tslint:disable-next-line:no-string-literal
  navigateContentId = environment['navigateContentId'] ? environment['navigateContentId'] : 'default';

  /**
   * 导航页内容id为gzsgzj时的子系统名
   */
  EARLY_WARNING_ANALYSIS_SYS_NAME = '预警分析';
  AUDIT_RECTIFICATION_SYS_NAME = '审计整改';

  /**
   * 是否含有数据分析子系统
   */
  // tslint:disable-next-line:no-string-literal
  hasDataAnalysis = environment['dataAnalysis'] && environment['dataAnalysis']['show'] === true ? true : false;

  /**
   * 业务数据分析子系统显示名
   */
  // tslint:disable-next-line:no-string-literal
  DATA_ANALYSIS_SYS_NAME = environment['dataAnalysis']['name'];

  /* 各子系统名 */
  FINANCIAL_ANALYSIS_SYS_NAME = '审计整改';
  INSIGHT_ANALYSIS_SYS_NAME = '多维分析';
  SYS_MANAGEMENT_SYS_NAME = '系统管理';

  constructor(
    private router: Router,
    private cacheService: CacheService,
    private reuseTabService: ReuseTabService,
    private starupService: StartupService,
    private dataTransmit: DataTransmit,
    private menuService: MenuService,
    private titleService: TitleService,

    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
  ) {}

  ngOnInit() {}

  /**
   * 财务分析
   */
  clickFinancialAnalysis() {
    this.common(APP_RECTIFY_DATA, this.FINANCIAL_ANALYSIS_SYS_NAME);
    this.starupService.load().then(() => {
      this.router.navigate(['/audit-rectify/dashboard']);
    });
  }

  /**
   * 系统管理
   */
  clickSystem() {
    this.common(APP_SYSTEM_DATA, this.SYS_MANAGEMENT_SYS_NAME);
    this.starupService.load().then(() => this.router.navigate(['/sys-dashboard']));
  }

  /**
   * 拼接动态菜单项
   * @param menu 菜单dto
   */
  spliceMenu(menu: MenuDto): HomeMenuDTO {
    const homeMenu: HomeMenuDTO = {
      text: menu.name,
      icon: 'anticon-' + menu.iconValue,
      linkMatchForce: true,
    };
    if (menu.link) {
      homeMenu.link = menu.link;
    }
    if (menu.children) {
      const acl: Array<string> = new Array<string>();
      const menus: Array<HomeMenuDTO> = [];
      menu.children.forEach(child => {
        const childHomeMenu: HomeMenuDTO = this.spliceMenu(child);
        // TODO 权限暂无，后续添加
        // if (childHomeMenu.acl) {
        //   childHomeMenu.acl.forEach(element => {
        //     acl.push(element);
        //   });
        // }
        menus.push(childHomeMenu);
      });
      // homeMenu.acl = acl;
      homeMenu.children = menus;
    } else {
      // if (menu.acl) {
      //   const aclArray: Array<string> = menu.acl.split(',');
      //   homeMenu.acl = aclArray;
      // }
    }
    return homeMenu;
  }

  /**
   * 获取智能化辅助分析的第一个菜单
   * @param data 菜单集合
   */
  getFirstMenu(data: Array<MenuDto>): string {
    for (const d of data) {
      if (d.children) {
        return this.getFirstMenu(d.children);
      } else {
        return d.link;
      }
    }
    return '/';
  }

  setAttribute(id: string, url: string) {
    document.querySelector('#' + id).setAttribute('src', url);
  }

  /**
   * 共用方法
   * @param module 选择的功能模块
   * @param title 系统标题
   */
  common(module: any, title: string) {
    this.reuseTabService.clear();
    this.starupService.menuTree = module;
    this.cacheService.set('__functionModule', module);
    this.cacheService.set('__title', title);
    this.dataTransmit.setTitle(title);
  }

  /**
   * 退出登录
   */
  logout() {
    this.tokenService.clear();
    // tslint:disable-next-line: no-non-null-assertion
    this.router.navigateByUrl(this.tokenService.login_url!);
  }
}
