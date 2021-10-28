import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { NzMessageService, UploadFile, UploadFilter, UploadXHRArgs } from 'ng-zorro-antd';
import { Observable, Observer } from 'rxjs';
import { RectifyProblemDTO } from '../rectify-issue/model/rectify-problem-dto';
import UUID from 'uuidjs';
import { NgForm } from '@angular/forms';
import { FormUtil, TreeUtil } from '@mt-framework-ng/util';
import { AuditPostDTO } from './model/AuditPostDTO';
import { OrganizationService, SystemFileService, UserDTO, UserService } from '@ng-mt-framework/api';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AuditPostService } from './service/AuditPostService';
import { ReuseTabService } from '@delon/abc';
import { Broadcaster } from 'src/app/matech/service/broadcaster';
import { AttachListComponent } from '../common/attach/attach-list.component';
import { DictSelectComponent } from '../common/dict-select/dict-select.component';
import { TreeNodeInterface } from 'src/app/routes/dashboard/rectify/rectify.dashboard.component';
import { RectificationPostListComponent } from './rectification-post-list.component';
interface ParentItemData {
  key: number;
  auditReportStatus: string;
  name: string;
  auditName: string;
  probkemAmount: number | string;
  auditEndTime: string;
  auditStartTime: string;
  expand: boolean;
}

interface ChildrenItemData {
  key: number;
  name: string;
  type: string;
  department: string;
  dustyname: string;
  money: string;
}
@Component({
  selector: 'app-rectification-post',
  templateUrl: './rectification-post.component.html',
})
export class RectificationPostComponent implements OnInit {
  /**
   * 列表组件
   */

  @ViewChild('rectificationPostListComponent', { static: false })
  rectificationPostListComponent: RectificationPostListComponent;
  /**
   * 搜索参数
   */
  params = this.initParams();

  startValue: Date | null = null;
  endValue: Date | null = null;
  endOpen = false;

  /**
   *
   * @param startValue 开始时间
   *
   */
  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue || !this.endValue) {
      return false;
    }
    return startValue.getTime() > this.endValue.getTime();
    // tslint:disable-next-line:semicolon
  };
  /**
   *
   * @param endValue 结束时间
   *
   */
  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.startValue) {
      return false;
    }
    return endValue.getTime() <= this.startValue.getTime();
    // tslint:disable-next-line:semicolon
  };

  /**
   *
   * @param item 参数
   *
   */
  initParams(item?: any) {
    return {
      name: item ? item.name : null,
      auditPostName: item ? item.auditPostName : null,
      importAuditPostStartTime: item ? item.importAuditPostStartTime : null,
      importAuditPostEndTime: item ? item.importAuditPostEndTime : null,
      problemType: item ? item.problemType : null,
      finishStatus: item ? item.finishStatus : null,
      source: item ? item.source : null,
    };
  }

  /**
   * 搜索
   */
  search() {}

  /**
   * 清除
   */
  clear() {}
  ngOnInit(): void {}
}
