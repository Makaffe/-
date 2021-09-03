import { Injectable, Inject } from '@angular/core';
import { MenuService, SettingsService, TitleService, ALAIN_I18N_TOKEN, Menu } from '@delon/theme';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { ACLService } from '@delon/acl';
import { TranslateService } from '@ngx-translate/core';
import { I18NService } from '../i18n/i18n.service';

// import { NzIconService } from 'ng-zorro-antd/icon';
// import { ICONS_AUTO } from '../../../style-icons-auto';
// import { ICONS } from '../../../style-icons';
import { UserDTO, EncryptionService } from '@ng-mt-framework/api';
import { CacheService } from '@delon/cache';

import { I18N_DATA } from './i18n-data';

import { environment } from '../../../environments/environment';
import { APP_DATA } from './app-data';
import { ActivatedRouteSnapshot } from '@angular/router';
import { ReuseTabService } from '@delon/abc';

/** 缓存的Key前缀 */
export const CACHE_KEY_PREFIX = window.location.origin + window.location.pathname + '_';

/**
 * 用于应用启动时
 * 一般用来获取应用所需要的基础数据等
 */
@Injectable()
export class StartupService {
  menuTree = APP_DATA;

  constructor(
    // iconSrv: NzIconService,
    private menuService: MenuService,
    private translate: TranslateService,
    @Inject(ALAIN_I18N_TOKEN) private i18n: I18NService,
    private settingService: SettingsService,
    private aclService: ACLService,
    private titleService: TitleService,
    private cacheService: CacheService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private encryptionService: EncryptionService,
    private reuseTabService: ReuseTabService,
  ) {

    // 重写原方法，给key增加前缀
    // settingService['set'] = (key: string, value: any) => {
    //   localStorage.setItem(CACHE_KEY_PREFIX + key, JSON.stringify(value));
    // };
    // 重写路由复用获取URL的方式（要带上queryParams参数）
    reuseTabService.getUrl = (route: ActivatedRouteSnapshot) => {
      let next = reuseTabService.getTruthRoute(route);
      const segments: string[] = [];
      while (next) {
        segments.push(next.url.join('/'));
        next = next.parent;
      }
      let url =
        '/' +
        segments
          .filter(i => i)
          .reverse()
          .join('/');
      if (route.queryParams) { // 此段为特殊增加
        const params = Object.keys(route.queryParams).map(p => p + '=' + route.queryParams[p]).join('&');
        url += params ? ('?' + params) : '';
      }
      return url;
    };
    // 重写是否允许复用的判断
    reuseTabService.shouldReuseRoute = (future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean => {
      let ret = future.routeConfig === curr.routeConfig;
      if (!ret) return false;

      const path = ((future.routeConfig && future.routeConfig.path) || '') as string;
      // if (path.length > 0 && ~path.indexOf(':')) { // 去掉冒号的判断，只要开始出现地址，就直接根据全地址判断是否需要复用
      if (path.length) {
        const futureUrl = reuseTabService.getUrl(future);
        const currUrl = reuseTabService.getUrl(curr);
        ret = futureUrl === currUrl;
      }
      return ret;
    };
    // 监听路由属性变化
    // reuseTabService.change.subscribe(notify => {
    //   if (notify && notify.active === 'title') { // 标题变化
    //     // 有些功能页面会自动刷路由标题，此处监听到变化后强行把首页的标题刷回来
    //     reuseTabService['_titleCached'][this.getCachedDashboardUrl()] = { text: this.getCachedDashboardName() };
    //   }
    // });
    const fullscreenPrefix = '/fullscreen/';
    // 重写菜单的获取（根据URL）（默认忽略URL的?后面的参数）
    menuService.getHit = (data: Menu[], url: string, recursive = false, cb: ((i: Menu) => void) | null = null): Menu | null => {
      url = decodeURIComponent(url);
      if (url.indexOf('?ct=') > -1 || url.indexOf('&ct=') > -1) {
        // 去除时间段再匹配
        url = url.replace(/[?&]{1}ct=\d+/g, '');
      }
      let item: Menu | null = null,
        compareURL = url,
        link: string;

      if (compareURL) {
        const idx = compareURL.indexOf('?');
        if (idx > -1) {
          compareURL = compareURL.substring(0, idx);
        }
        if (compareURL.startsWith(fullscreenPrefix)) { // 忽略最前面的 fullscreen
          compareURL = compareURL.substring(fullscreenPrefix.length - 1);
        }
      }

      while (!item && url) {
        menuService.visit(data, i => {
          if (cb) {
            cb(i);
          }
          link = i.linkFinal || i.link;
          if (link && !i.linkMatchForce) { // linkMatchForce为强制URL匹配（即问号?后面的参数也要匹配）
            const idx = link.indexOf('?');
            if (idx > -1) {
              link = link.substring(0, idx);
            }
          }
          if (link.startsWith(fullscreenPrefix)) { // 忽略最前面的 fullscreen
            link = link.substring(fullscreenPrefix.length - 1);
          }
          if (link && (i.linkMatchForce ? (i.linkFinal || i.link) === url : !item && link === compareURL)) {
            item = i;
          }
        });

        if (!recursive) break;

        url = url
          .split('/')
          .slice(0, -1)
          .join('/');
      }

      return item;
    };
  }

  private viaLocal(resolve: any, reject: any) {
    // setting language data
    this.translate.setTranslation(this.i18n.defaultLang, I18N_DATA);
    this.translate.setDefaultLang(this.i18n.defaultLang);

    // application data
    const cacheMenuTree = this.cacheService.get('__functionModule', { mode: 'none' });
    if (cacheMenuTree && cacheMenuTree !== null) {
      this.menuTree = cacheMenuTree;
    }
    const res: any = this.menuTree;

    // 获取缓存中的权限
    const userDTO: UserDTO = this.cacheService.get('__user', { mode: 'none' });
    if (userDTO) {
      // 用户信息：包括姓名、头像、邮箱地址
      this.settingService.setUser({
        name: userDTO.name,
        id: userDTO.id,
      });

      // ACL：设置权限
      this.aclService.setRole(userDTO.authorities);
      // this.aclService.setAbility(auth);
    } else {
      this.tokenService.clear();
    }

    // 初始化菜单
    this.menuService.add(res.menu);
    // 设置页面标题的后缀
    this.titleService.suffix = res.app.name;
    // 应用信息：包括站点名、描述、年份
    this.settingService.setApp(res.app);

    resolve(null);
  }

  load(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.viaLocal(resolve, reject);
    });
  }
}
