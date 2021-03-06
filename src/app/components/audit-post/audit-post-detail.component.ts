import { deepCopy } from '@delon/util';
import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReuseTabService } from '@delon/abc';
import { FormUtil, TreeUtil } from '@mt-framework-ng/util';
import { RectifyProblemService } from '@mt-rectify-framework/comp/rectify-issue';
import { SystemFileService } from '@ng-mt-framework/api';
import { NzMessageService, NzTreeNode, NzTreeSelectComponent, UploadFile, UploadFilter, UploadXHRArgs } from 'ng-zorro-antd';
import { Observable, Observer } from 'rxjs';
import { Broadcaster } from 'src/app/matech/service/broadcaster';
import UUID from 'uuidjs';
import { ProposalTemplateService } from '../advice-template/public_api';
import { AttachListComponent } from '../common/attach/attach-list.component';
import { ProblemTypeService } from '../common/problem-type-select/ProblemTypeService.service';
import { RectifyProblemDTO } from '../rectify-issue/model/rectify-problem-dto';
import { AuditPostListComponent } from './audit-post-list.component';
import { AuditPostViewComponent } from './audit-post-view.component';
import { AuditReportEditInfoDTO } from './newmodel/AuditReportEditInfoDTO';
import { RectifyProblemEditInfoDTO } from './newmodel/RectifyProblemEditInfoDTO';
import { AuditReportService } from './newservice/AuditReportService';
@Component({
  selector: 'app-audit-post-detail',
  templateUrl: './audit-post-detail.component.html',
  styleUrls: ['./audit-post-detail.component.less'],
})
export class AuditPostDetailComponent implements OnInit {

  @ViewChild('auditPostListComponent', { static: false })
  auditPostListComponent: AuditPostListComponent;

  @ViewChild('auditPostViewComponent', { static: false })
  auditPostViewComponent: AuditPostViewComponent;

  @ViewChild('problemtypeselect', { static: false })
  problemtypeselect: NzTreeSelectComponent;

  constructor(
    private proposalTemplateService: ProposalTemplateService,
    private msg: NzMessageService,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe,
    private auditReportService: AuditReportService,
    private reuseTabService: ReuseTabService,
    private router: Router,
    private problemTypeService: ProblemTypeService,
    private broadcastr: Broadcaster,
  ) { }
  @ViewChild('auditPostForm', { static: true })
  auditPostForm: NgForm;
  @ViewChild('problemform', { static: true })
  problemform: NgForm;
  @ViewChild('attachListComponent', { static: false })
  attachListComponent: AttachListComponent;

  /**
   * ??????????????????
   */
  dateRange = [];

  /**
   * ????????????????????????????????????
   */
  PATTERN = '^(?!(\\s+)).*$';
  /**
   * ????????????
   */
  @Input()
  filter = {
    name: null,
    auditName: null,
    auditStartTime: null,
    auditEndTime: null,
  };

  /**
   * ?????????????????????
   */
  filters: UploadFilter[] = [
    {
      name: 'type',
      fn: (fileList: UploadFile[]) => {
        const filterFiles = fileList.filter(
          w =>
            // tslint:disable-next-line:no-bitwise
            ~['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'].indexOf(
              w.type,
            ),
        );
        if (filterFiles.length !== fileList.length) {
          this.msg.error(`??????????????????????????????????????? doc ???docx ??????`);
          return filterFiles;
        }
        return fileList;
      },
    },
    {
      name: 'async',
      fn: (fileList: UploadFile[]) => {
        return new Observable((observer: Observer<UploadFile[]>) => {
          // doing
          observer.next(fileList);
          observer.complete();
        });
      },
    },
  ];
  /**
   * ?????????????????????????????????
   */
  show: boolean;

  /**
   * ??????????????????
   */
  isWatch: boolean;

  /**
   * ????????????
   */
  isWatchProblem: boolean;

  /**
   * ??????????????????
   */
  isEdit: boolean;

  /**
   * ??????????????????
   */
  fileList = [];

  /**
   * ??????????????????
   */
  reportFile = [];

  /**
   * ?????????????????????
   */
  isVisabled: boolean;

  /**
   * ???????????????????????????
   */
  currentItem = this.initAuditReport();

  /**
   * ?????????????????????
   */
  listOfData = [
    { name: 'XXXXX????????????', rectifyProblemTypeId: '?????????????????????', rectifyProblemCategory: 'AUDIT_OPINION', money: '10000' },
    { name: 'XXXXX????????????', rectifyProblemTypeId: '?????????????????????', rectifyProblemCategory: 'AUDIT_OPINION2', money: '20000' }
  ];

  /**
   *
   *  ?????????????????????
   *
   */
  paramsItem = this.initProblem();

  /**
   * ????????????????????????
   */
  problemTypeName = '';

  /**
   *
   * ?????????????????????????????????
   *
   */
  auditReportType = '';

  /**
   * ???????????????
   */
  problemTypeNodes = [];

  /**
   * ??????????????????????????????id
   */
  postId: string;

  /**
   * ????????????map
   */
  problemTypeMap: Map<string, string> = new Map<string, string>();

  /** ????????????????????????????????? */
  currentProblemIndex = -1;

  /** ?????????????????? */
  proposalTemplateAll = [];
  proposalTemplates = [];

  /** ???????????? */
  tempAdvice = null;

  /**
   *
   * @param item ??????????????????
   * @returns ????????????
   */
  initAuditReport(item?: AuditReportEditInfoDTO) {
    return {
      id: item ? item.id : null,
      auditName: item ? item.auditName : null,
      name: item ? item.name : null,
      auditStartTime: item ? item.auditStartTime : null,
      auditEndTime: item ? item.auditEndTime : null,
      auditSource: item ? item.auditSource : null,
      auditReportStatus: item ? item.auditReportStatus : null,
      auditTarget: item ? item.auditTarget : null,
      auditReportType: this.auditReportType ? this.auditReportType : null,
      auditReportFileDTO: item ? item.auditReportFileDTO : null,
      systemFileDTOS: item && item.systemFileDTOS ? item.systemFileDTOS : [],
      rectifyProblems: item ? item.rectifyProblems : [],
    };
  }

  /**
   * ??????????????????????????????
   */

  loadFile() {
    this.show = this.reportFile.length > 0;
  }

  /**
   * ??????
   */
  onReturn() {
    const url = this.router.url;
    setTimeout(() => {
      this.reuseTabService.close(url);
    }, 10);
  }

  /**
   *  ????????????
   */
  addProblem(): void {
    if (this.reportFile.length === 0) {
      this.msg.warning('???????????????????????????');
      return;
    }
    if (!FormUtil.validateForm(this.auditPostForm.form)) {
      this.msg.warning(`???????????????????????????`);
      return;
    }
    this.paramsItem = this.initProblem();
    this.paramsItem.source = this.currentItem.name;
    this.isVisabled = true;
    this.listOfData = [...this.listOfData];
  }

  /**
   *
   * @param data ????????????
   */
  deleteProblem(data: RectifyProblemDTO): void {
    // this.listOfData.splice(this.listOfData.indexOf(data), 1);
    this.listOfData = [...this.listOfData];
  }

  /**
   *
   * @param data ????????????
   * @param lookup ????????????
   */

  editProblem(data: RectifyProblemEditInfoDTO, lookup: boolean): void {
    this.getProposalTemplates(data.rectifyProblemTypeId);
    // this.currentProblemIndex = this.listOfData.indexOf(data);
    this.paramsItem = this.initProblem(data);
    this.isVisabled = true;
    this.isWatchProblem = lookup;
  }

  /**
   *
   * @param item ?????????????????????
   * @returns ??????
   */
  initProblem(item?: RectifyProblemEditInfoDTO): RectifyProblemEditInfoDTO {
    return {
      id: item ? item.id : null,
      name: item ? item.name : null,
      mainType: item ? item.mainType : null,
      rectifyProblemTypeId: item ? (item.rectifyProblemTypeId ? item.rectifyProblemTypeId : item.rectifyProblemType.id) : null,
      money: item ? item.money : null,
      sendStatus: 'NOT_ISSUED',
      transferStatus: 'NOT_HANDED_OVER',
      trackStatus: 'NOT_RECTFIED',
      description: item ? item.description : null,
      auditOpinion: item ? item.auditOpinion : null,
      auditReportId: item ? item.auditReportId : null,
      noRectifyStatus: false,
      multipleYearRectify: false,
      isTrunk: true,
      oaSendCase: false,
      transferCase: false,
      advice: item ? item.advice : null,
      source: item ? item.source : this.currentItem.name,
      uuid: item ? item.uuid : UUID.generate(),
      rectifyProblemCategory: item ? item.rectifyProblemCategory : 'AUDIT_OPINION',
      // tslint:disable-next-line:max-line-length
      proposalTemplateId: item ? (item.proposalTemplateId ? item.proposalTemplateId : (item.proposalTemplate ? item.proposalTemplate.id : null)) : null,
    };
  }

  /**
   * ???????????????????????????
   */
  handleOk() {
    if (!FormUtil.validateForm(this.problemform.form)) {
      this.msg.warning(`?????????????????????????????????`);
      return;
    }
    // if (this.currentProblemIndex === -1) {
    //   this.listOfData.push(this.paramsItem);
    // } else {
    //   this.listOfData[this.currentProblemIndex] = this.initProblem(this.paramsItem);
    // }
    this.listOfData = [...this.listOfData];
    this.handleCancel();
  }

  /**
   * ????????????
   */
  handleCancel() {
    // for (const item of this.listOfData) {
    //   item.editable = false;
    // }
    this.paramsItem = this.initProblem();
    FormUtil.resetForm(this.problemform.form);
    this.currentProblemIndex = -1;
    this.isVisabled = false;
  }

  done() {
    if (this.reportFile.length === 0) {
      this.msg.warning('????????????????????????');
      return;
    }
    if (!FormUtil.validateForm(this.auditPostForm.form)) {
      this.msg.warning(`???????????????????????????`);
      return;
    }

    this.currentItem.auditReportFileDTO = this.reportFile[0];
    this.currentItem.auditStartTime = this.datePipe.transform(this.dateRange[0], 'yyyy-MM-dd');
    this.currentItem.auditEndTime = this.datePipe.transform(this.dateRange[1], 'yyyy-MM-dd');
    console.dir(this.currentItem);
    console.log('done');
    this.currentItem.auditReportStatus = 'NOT_RECTIFIED';
    // this.currentItem.rectifyProblems = this.listOfData;
    if (!this.currentItem.id) {

      this.auditReportService.create(this.currentItem).subscribe({
        next: data => {
          this.msg.success(`????????????`);
          this.onReturn();
          this.broadcastr.broadcast('seva:data-seva');
        },
        error: () => { },
        complete: () => { },
      });
    } else {
      this.auditReportService.update(this.postId, this.currentItem).subscribe(data => {
        this.msg.success('????????????');
        this.onReturn();
        this.broadcastr.broadcast('seva:data-seva');
      });
    }
  }

  /**
   * ???????????????????????????
   * @param treeNode treeNode
   */
  getProblemType(event: string) {
    const treeNodeList = this.problemtypeselect.getSelectedNodeList();
    this.paramsItem.rectifyProblemTypeId = event;
    if (treeNodeList.length > 0) {
      if (treeNodeList[0].origin.parent && treeNodeList[0].origin.parent != null) {
        this.paramsItem.mainType = treeNodeList[0].origin.parent.id;
      } else {
        this.paramsItem.mainType = event;
      }
    }

    this.paramsItem.proposalTemplateId = null;
    this.getProposalTemplates(event);

  }

  /**
   * ??????????????????
   */
  getProposalTemplates(event?: string) {
    this.proposalTemplates = [];
    if (event) {
      this.proposalTemplateAll.forEach(data => {
        if (event === data.rectifyProblemType.id) {
          this.proposalTemplates.push(data);
        }
      });
    }
    this.proposalTemplates = [...this.proposalTemplates];
  }

  /**
   * ??????????????????
   */
  proposalTemplateChange(event: string) {
    this.tempAdvice = null;
    if (event) {
      this.proposalTemplateAll.forEach(data => {
        if (data.id === event) {
          this.tempAdvice = data.auditProposal;
        }
      });
    }
  }


  /**
   * ???????????????
   */
  loadProblemTypeTree() {
    this.problemTypeService.findAllUsingGET().subscribe(data => {
      if (data) {
        this.problemTypeMap.clear();
        this.problemTypeNodes = TreeUtil.populateTreeNodes(data, 'id', 'name', 'children');
        this.recursionpPoblemTypeTree(data);
      }
    });
  }

  /**
   * ????????????????????????
   */
  loadProposalTemplates() {
    this.proposalTemplateService.findAll().subscribe(result => {
      if (result) {
        this.proposalTemplateAll = result;
      }
    });
  }

  /**
   * ??????problemTypeTree??????problemTypeMap??????????????????
   * @param problemTypeTree ???????????????
   */
  recursionpPoblemTypeTree(problemTypeTree: Array<any>) {
    problemTypeTree.forEach(problemType => {
      this.problemTypeMap.set(problemType.id, problemType.name);
      if (problemType.children && problemType.children.length > 0) {
        this.recursionpPoblemTypeTree(problemType.children);
      }
    });
  }

  /**
   * ??????????????????
   * @param id ????????????id
   * @returns ????????????name
   */
  convertProblemType(id: string) {
    if (id) {
      return this.problemTypeMap.get(id);
    }
  }

  read() {
    this.auditReportService.findById(this.postId).subscribe(data => {
      this.currentItem = this.initAuditReport(data);
      this.dateRange = [new Date(data.auditStartTime), new Date(data.auditEndTime)];
      // this.listOfData = data.rectifyProblems;
      this.listOfData.forEach(d => {
        // Object.assign(d, { rectifyProblemTypeId: d.rectifyProblemType.id });
      });

      if (data.auditReportFileDTO) {
        this.reportFile = [data.auditReportFileDTO];
      }
    });

    this.show = true;
  }

  ngOnInit(): void {
    this.loadProblemTypeTree();
    this.loadProposalTemplates();
    this.activatedRoute.queryParams.subscribe(data => {
      this.isWatch = data.isWatch === 'true';
      this.isWatchProblem = this.isWatch;
      this.isEdit = data.isEdit === 'true';
      this.auditReportType = data.postTypeId;
      this.postId = data.postId;
    });

    if (this.postId) {
      this.read();
    } else {
      this.currentItem = this.initAuditReport();
    }
  }

  reportFileChange(event: Array<any>) {
    this.show = event.length > 0;
  }

  /**
   * ??????????????????
   */
  confirmReference() {
    this.paramsItem.advice = this.tempAdvice;
  }

}
