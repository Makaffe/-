import { Component, ChangeDetectionStrategy, Input, ViewChild, OnInit } from '@angular/core';
import { SettingsService } from '@delon/theme';
import { CacheService } from '@delon/cache';

import { StartupService } from '@core';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { DataTransmit } from 'src/app/routes/navigation/data-transmit';

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  systemName = environment.systemName;
  title = '';

  searchToggleStatus: boolean;

  /**
   * 用户类型
   */
  userType = this.cacheService.get('__user', { mode: 'none' }).userType;

  constructor(
    public settings: SettingsService,
    private router: Router,
    private dataTransmit: DataTransmit,
    private cacheService: CacheService,
    private starupService: StartupService,
  ) {}

  ngOnInit() {
    const title = this.cacheService.get('__title', { mode: 'none' });
    if (title && title !== null) {
      this.title = title;
    } else {
      this.title = this.dataTransmit.getTitle();
    }
  }

  toggleCollapsedSidebar() {
    this.settings.setLayout('collapsed', !this.settings.layout.collapsed);
  }

  searchToggleChange() {
    this.searchToggleStatus = !this.searchToggleStatus;
  }

  return() {
    this.starupService.load().then(() => this.router.navigate(['/navigation']));
  }

  /**
   * 打开我的待办
   */
  returnMyTodo() {
    this.starupService.load().then(() => this.router.navigate(['/rectify-sys/rectify-sys-dashboard']));
  }
}
