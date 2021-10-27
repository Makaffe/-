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
  listOfParentData: ParentItemData[] = [
    {
      key: 1,
      auditReportStatus: '未生成',
      name: '审计报告',
      auditName: '审计单位',
      auditStartTime: '2021-10-26',
      auditEndTime: '2021-10-27',
      probkemAmount: 10,
      expand: false,
    },
    {
      key: 2,
      auditReportStatus: '已生成',
      name: '审计报告',
      auditName: '审计单位',
      auditStartTime: '2021-10-26',
      auditEndTime: '2021-10-27',
      probkemAmount: 10,
      expand: false,
    },
  ];
  listOfChildrenData: ChildrenItemData[] = [
    {
      key: 1,
      name: '金额分配问题',
      type: '金额分配',
      department: '财政部',
      dustyname: 'zhangSan',
      money: '10000',
    },
    {
      key: 2,
      name: '金额分配问题',
      type: '金额分配',
      department: '财政部',
      dustyname: 'zhangSan',
      money: '10000',
    },
  ];

  ngOnInit(): void {
    // for (let i = 0; i < 3; ++i) {
    //   this.listOfParentData.push({
    //     key: i,
    //     name: 'Screem',
    //     platform: 'iOS',
    //     version: '10.3.4.5654',
    //     upgradeNum: 500,
    //     creator: 'Jack',
    //     createdAt: '2014-12-24 23:12:00',
    //     expand: false,
    //   });
    // }
  }
}
