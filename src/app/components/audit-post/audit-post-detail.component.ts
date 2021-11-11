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
    private rectifyProblemService: RectifyProblemService,
    private msg: NzMessageService,
    private systemFileService: SystemFileService,
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
   * 日期范围数组
   */
  dateRange = [];

  /**
   * 禁止全部输入空格正则匹配
   */
  PATTERN = '^(?!(\\s+)).*$';
  /**
   * 搜索条件
   */
  @Input()
  filter = {
    name: null,
    auditName: null,
    auditStartTime: null,
    auditEndTime: null,
  };

  /**
   * 上传文件的操作
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
          this.msg.error(`包含文件格式不正确，只支持 doc 、docx 格式`);
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
   * 判断是否显示下方的输入
   */
  show: boolean;

  /**
   * 是否查看进入
   */
  isWatch: boolean;

  /**
   * 是否编辑进入
   */
  isEdit: boolean;

  /**
   * 上传文件列表
   */
  fileList = [];

  /**
   * 审计报告附件
   */
  reportFile = [];

  /**
   * 问题详情模态框
   */
  isVisabled: boolean;

  /**
   * 初始化审计报告参数
   */
  currentItem = this.initAuditReport();

  /**
   * 初始化问题列表
   */
  listOfData = [];

  /**
   *
   *  问题初始化变量
   *
   */
  paramsItem = this.initProblem();

  /**
   * 便于回显问题类型
   */
  problemTypeName = '';

  /**
   *
   * 路由接收传递的类型参数
   *
   */
  auditReportType = '';

  /**
   * 问题类型树
   */
  problemTypeNodes = [];

  /**
   * 查看和编辑传递过来的id
   */
  postId: string;

  /**
   * 问题类型map
   */
  problemTypeMap: Map<string, string> = new Map<string, string>();

  /**
   *
   * @param item 审计报告函数
   * @returns 审计报告
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
   * 判断是否已经存入文件
   */

  loadFile() {
    this.show = this.reportFile.length > 0;
  }

  /**
   * 返回
   */
  onReturn() {
    const url = this.router.url;
    setTimeout(() => {
      this.reuseTabService.close(url);
    }, 10);
  }

  /**
   *  添加问题
   */
  addProblem(): void {
    if (this.reportFile.length === 0) {
      this.msg.warning('请先上传报告并读取');
      return;
    }
    if (!FormUtil.validateForm(this.auditPostForm.form)) {
      this.msg.warning(`请补全报告基本信息`);
      return;
    }
    this.paramsItem = this.initProblem();
    this.paramsItem.source = this.currentItem.name;
    this.isVisabled = true;
    this.listOfData = [...this.listOfData];
  }

  /**
   *
   * @param data 删除问题
   */
  deleteProblem(data: RectifyProblemDTO): void {
    if (!data.id) {
      this.listOfData = [...this.listOfData.filter(item => item.uuid !== data.uuid)];
    } else {
      this.listOfData = [...this.listOfData.filter(item => item.id !== data.id)];
    }
  }

  /**
   *
   * @param data 问题数据
   * @param lookup 是否查看
   */

  editProblem(data: RectifyProblemEditInfoDTO, lookup: boolean): void {
    if (data.id && !data.uuid) {
      // tslint:disable-next-line:no-shadowed-variable
      this.rectifyProblemService.rectifyTrackById(data.id).subscribe(data => {
        this.paramsItem = this.initProblem(data);
        this.problemTypeName = this.paramsItem.rectifyProblemType.name;
        this.isVisabled = true;
      });
    } else {
      this.paramsItem = this.initProblem(data);
      this.isVisabled = true;
    }
    this.isWatch = lookup;
  }

  /**
   *
   * @param item 初始化问题函数
   * @returns 问题
   */
  initProblem(item?: RectifyProblemEditInfoDTO): RectifyProblemEditInfoDTO {
    return {
      id: item ? item.id : null,
      name: item ? item.name : null,
      rectifyProblemType: item ? item.rectifyProblemType : null,
      mainType: item ? item.mainType : null,
      rectifyProblemTypeId: item ? (item.rectifyProblemType ? item.rectifyProblemType.id : null) : null,
      money: item ? item.money : null,
      description: item ? item.description : null,
      sendStatus: 'NOT_ISSUED',
      transferStatus: 'NOT_HANDED_OVER',
      trackStatus: 'NOT_RECTFIED',
      auditOpinion: item ? item.auditOpinion : null,
      auditReportId: item ? item.auditReportId : null,
      rectifyDepartmentId: item ? item.rectifyDepartmentId : null,
      rectifyUnitId: item ? item.rectifyUnitId : null,
      dutyUserId: item ? item.dutyUserId : null,
      auditUserId: item ? item.auditUserId : null,
      noRectifyStatus: false,
      multipleYearRectify: false,
      isTrunk: true,
      oaSendCase: false,
      transferCase: false,
      advice: item ? item.advice : null,
      source: item ? item.source : this.currentItem.name,
      uuid: item ? item.uuid : UUID.generate(),
      rectifyProblemCategory: item ? (item.rectifyProblemCategory === '审计意见问题' ? 'AUDIT_OPINION' : 'AUDIT_PROPOSAL') : 'AUDIT_OPINION',
      auditOpinionCount: item && item.auditOpinionCount ? item.auditOpinionCount : 0,
      auditProposalCount: item && item.auditProposalCount ? item.auditProposalCount : 0

    };
  }

  /**
   * 点解问题模态框确定
   */
  handleOk() {
    if (!FormUtil.validateForm(this.problemform.form)) {
      this.msg.warning(`请确认问题信息填写完整`);
      return;
    }
    if (this.listOfData.filter(item => item.id === this.paramsItem.id).length > 0 && this.paramsItem.id) {
      const findIndex = this.listOfData.findIndex(item => item.id === this.paramsItem.id);
      const id = this.listOfData[findIndex].id;
      this.listOfData.splice(findIndex, 1, this.paramsItem);
      this.paramsItem.id = id;
      this.paramsItem.uuid = id;
    }
    if (this.listOfData.filter(item => item.uuid === this.paramsItem.uuid).length > 0 && this.paramsItem.uuid) {
      const findIndex = this.listOfData.findIndex(item => item.uuid === this.paramsItem.uuid);
      const uuid = this.listOfData[findIndex].uuid;
      const typeId = this.listOfData[findIndex].rectifyProblemTypeId;
      const mainType = this.listOfData[findIndex].mainType;
      this.listOfData.splice(findIndex, 1, this.paramsItem);
      // this.paramsItem.id = null;
      this.paramsItem.uuid = uuid;
      if (!this.listOfData[findIndex].rectifyProblemTypeId) {
        this.listOfData[findIndex].rectifyProblemTypeId = typeId;
        this.listOfData[findIndex].mainType = mainType;
      }
    } else {
      this.listOfData.push(this.paramsItem);
    }

    this.listOfData.forEach(d => {
      if (d.id) {
        d.rectifyProblemTypeId = d.rectifyProblemType.id;
      }
    });

    this.listOfData = [...this.listOfData];
    this.handleCancel();
  }

  /**
   * 点击取消
   */
  handleCancel() {
    for (const item of this.listOfData) {
      item.editable = false;
    }
    this.paramsItem = this.initProblem();
    FormUtil.resetForm(this.problemform.form);
    this.isVisabled = false;
  }

  done() {
    if (this.reportFile.length === 0) {
      this.msg.warning('请先上传报告并读取');
      return;
    }
    if (!FormUtil.validateForm(this.auditPostForm.form)) {
      this.msg.warning(`请补全报告基本信息`);
      return;
    }
    if (this.listOfData.length === 0) {
      this.msg.warning('请提交问题');
      return;
    }

    this.currentItem.auditReportFileDTO = this.reportFile[0];
    this.currentItem.auditStartTime = this.datePipe.transform(this.dateRange[0], 'yyyy-MM-dd');
    this.currentItem.auditEndTime = this.datePipe.transform(this.dateRange[1], 'yyyy-MM-dd');
    console.dir(this.currentItem);
    console.log('done');
    this.currentItem.auditReportStatus = 'NOT_RECTIFIED';
    this.currentItem.rectifyProblems = this.listOfData;
    if (!this.currentItem.id) {

      this.auditReportService.create(this.currentItem).subscribe({
        next: data => {
          this.msg.success(`保存成功`);
          this.onReturn();
          this.broadcastr.broadcast('seva:data-seva');
        },
        error: () => { },
        complete: () => { },
      });
    } else {
      this.auditReportService.update(this.postId, this.currentItem).subscribe(data => {
        this.msg.success('更新成功');
        this.onReturn();
        this.broadcastr.broadcast('seva:data-seva');
      });
    }
  }

  /**
   * 获取选中的问题类型
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

    // if (treeNodeList.length > 0 && treeNodeList[0].origin.parent && treeNodeList[0].origin.parent != null) {
    //   this.paramsItem.mainType = treeNodeList[0].origin.parent.id;
    //   this.paramsItem.rectifyProblemTypeId = event;
    // } else {
    //   this.paramsItem.mainType = event;
    //   this.paramsItem.rectifyProblemTypeId = event;
    // }
  }


  /**
   * 获取问题树
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
   * 递归problemTypeTree设置problemTypeMap用于方便回显
   * @param problemTypeTree 问题类型树
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
   * 问题类型回显
   * @param id 问题类型id
   * @returns 问题类型name
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
      this.listOfData = data.rectifyProblems;

      if (data.auditReportFileDTO) {
        this.reportFile = [data.auditReportFileDTO];
      }
    });

    this.show = true;
  }

  ngOnInit(): void {
    this.loadProblemTypeTree();
    this.activatedRoute.queryParams.subscribe(data => {
      this.isWatch = data.isWatch === 'true';
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

}
