import { Component, OnInit, Inject, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SyncADService } from 'src/app/layout/default/header/syncad.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'header-syncad',
  template: `
  <nz-dropdown nzPlacement="bottomCenter">
      <div
        class="alain-default__nav-item align-items-center px-sm"
        style="padding: 23px 2px; color: rgba(0, 0, 0, 0.45)"
        nz-dropdown
      >
        <i nz-icon nzType="cloud-sync" nzTheme="outline"></i>
      </div>
      <div nz-menu class="width-sm">
        <div nz-menu-item (click)="syncUnitDeptEmp()">
          <i nz-icon nzType="sync" class="mr-sm" nzTheme="outline"></i>
          {{ 'menu.syncad.unit-dept-emp' | translate }}
        </div>
        <li nz-menu-divider></li>
        <div nz-menu-item (click)="syncOutEmp()">
          <i nz-icon nzType="sync" class="mr-sm" nzTheme="outline"></i>
          {{ 'menu.syncad.out-emp' | translate }}
        </div>
      </div>
    </nz-dropdown>
  `,
  styles: []
})
export class HeaderSyncADComponent implements OnInit {

  constructor(
    private router: Router,
    private msg: NzMessageService,
    private syncADService: SyncADService,
    ) { }

  ngOnInit() {
  }

  syncUnitDeptEmp() {
    console.log('syncUnitDeptEmp触发了');
    const aa = this.syncADService.syncUnitDeptEmp()
// tslint:disable-next-line: deprecation
    .subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
      },
      () => {
        console.log('finanlly');
      }
    );
    console.log(aa);
  }

  syncOutEmp() {
    console.log('syncOutEmp触发了');
    const aa = this.syncADService.syncOutEmp()
// tslint:disable-next-line: deprecation
    .subscribe(
      data => {
        console.log('data:');
        console.log(data);
      },
      err => {
        console.log('err:');
        console.log(err);
      },
      () => {
        console.log('finanlly');
      }
    );
    console.log(aa);
  }

}
