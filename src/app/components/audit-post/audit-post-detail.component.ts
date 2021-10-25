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
@Component({
  selector: 'app-audit-post-detail',
  templateUrl: './audit-post-detail.component.html',
  styleUrls: ['./audit-post-detail.component.less'],
})
export class AuditPostDetailComponent implements OnInit {
  constructor(
    private broadcaster: Broadcaster,
    private msg: NzMessageService,
    private systemFileService: SystemFileService,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe,
    private auditPostsService: AuditPostService,
    private reuseTabService: ReuseTabService,
    private router: Router,
    private organizationService: OrganizationService,
    private userService: UserService,
  ) {}
  @ViewChild('auditPostForm', { static: true })
  auditPostForm: NgForm;
  @ViewChild('problemform', { static: true })
  problemform: NgForm;
  @ViewChild('attachListComponent', { static: false })
  attachListComponent: AttachListComponent;

  listOfData: RectifyProblemDTO[] = [];
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

  fileList = [];

  currentItem: AuditPostDTO = new AuditPostDTO();

  /**
   * 报告类型
   */
  @Input()
  postType: any = null;
  /**
   * 禁止全部输入空格正则匹配
   */
  PATTERN = '^(?!(\\s+)).*$';

  /**
   * 问题详情模态框
   */
  isVisabled: boolean;
  /**
   * 初始化问题表格
   */
  paramsItem: RectifyProblemDTO = this.initProblem();

  /**
   * 判断是否只读
   */
  visabled = false;
  isWatch = false;
  lookup = false;

  /**
   * 整改部门树
   */
  organizationTree = [];
  /**
   * 整改负责人列表
   */
  dutyUserList = [];

  /**
   * 是否已保存
   */
  haveSave = false;

  /**
   * 初始化问题类型
   */
  problemItem: RectifyProblemDTO = null;
  // tslint:disable-next-line:no-any
  handleChange(info: any): void {
    const fileList = info.fileList;
    // 2. read from response and show file link
    if (info.file.response) {
      info.file.url = info.file.response.url;
    }
    // 3. filter successfully uploaded files according to response from server
    // tslint:disable-next-line:no-any
    this.fileList = fileList.filter((item: any) => {
      if (item.response) {
        return item.response.status === 'success';
      }
      return true;
    });
  }

  ngOnInit() {
    this.organizationService.getOrganizationTreeOfEmployeeOrUser().subscribe(data => {
      this.organizationTree = TreeUtil.populateTreeNodes(data, 'id', 'name', 'children');
    });
    this.userService.findAll().subscribe(data => {
      if (data) {
        this.dutyUserList = data;
      }
    });
    this.activatedRoute.queryParams.subscribe(data => {
      this.visabled = data.allshow === 'true';
      this.isWatch = data.isWatch === 'true';
      console.log('=============ROUTE PARAMS=========');
      console.log(data);
      if (data.isNew === 'true') {
        this.currentItem = new AuditPostDTO();
        this.currentItem.auditPostTypeId = data.postTypeId;
      } else {
        // 查询数据
        this.auditPostsService.findById(data.postId).subscribe({
          next: (auditPostDTO: AuditPostDTO) => {
            this.updateCurrentItem(auditPostDTO);
          },
          error: () => {},
          complete: () => {},
        });
      }
    });
  }

  done(): void {
    console.dir(this.auditPostForm);

    console.dir(this.auditPostForm.form);
    if (!FormUtil.validateForm(this.auditPostForm.form)) {
      this.msg.warning(`请补全报告基本信息`);
      return;
    }
    if (!this.allProblemSaved()) {
      this.msg.warning(`请保存所有问题`);
      return;
    }
    this.currentItem.auditStartTime = this.datePipe.transform(this.currentItem.auditDateRange[0], 'yyyy-MM-dd');
    this.currentItem.auditEndTime = this.datePipe.transform(this.currentItem.auditDateRange[1], 'yyyy-MM-dd');
    this.currentItem.rectifyProblems = this.listOfData;
    console.log('=============================POST DATA=================');
    console.dir(this.currentItem);
    console.log('done');
    if (!this.currentItem.id) {
      this.currentItem.auditReportStatus = 'NO_GENERATED';
    }
    if (!this.currentItem.id) {
      this.auditPostsService.add(this.currentItem).subscribe({
        next: data => {
          this.updateCurrentItem(data);
          this.msg.success(`保存成功`);
        },
        error: () => {},
        complete: () => {},
      });
    } else {
      this.auditPostsService.update(this.currentItem.id, this.currentItem).subscribe({
        next: data => {
          this.updateCurrentItem(data);
          this.msg.success(`保存成功`);
        },
        error: () => {},
        complete: () => {},
      });
    }
  }

  /**
   * 返回
   */
  onReturn() {
    const url = this.router.url;
    // if (url.indexOf('?') !== -1) {
    //   url = url.slice(0, url.indexOf('?'));
    // }
    this.reuseTabService.close(url);
  }

  /**
   *  添加问题
   */
  addProblem(): void {
    this.paramsItem = this.initProblem();
    this.isVisabled = true;
    this.listOfData = [...this.listOfData];
  }

  deleteProblem(data: RectifyProblemDTO): void {
    this.listOfData = [...this.listOfData.filter(item => item.uuid !== data.uuid)];
  }

  /**
   *  初始化整改问题数据
   * @returns RectifyProblemDTO
   */
  initProblem(item?: RectifyProblemDTO): RectifyProblemDTO {
    return {
      name: item ? item.name : null,
      type: item ? item.type : null,
      money: item ? item.money : null,
      remark: item ? item.remark : null,
      rectifyDepartment: item ? item.rectifyDepartment : null,
      rectifyDepartmentId: item
        ? item.rectifyDepartmentId
          ? item.rectifyDepartmentId
          : item.rectifyDepartment
          ? item.rectifyDepartment.id
          : null
        : null,
      dutyUser: item ? item.dutyUser : null,
      dutyUserId: item ? (item.dutyUserId ? item.dutyUserId : item.dutyUser ? item.dutyUser.id : null) : null,
      advice: item ? item.advice : null,
      source: item ? item.source : this.currentItem.name,
      selectedRectifyDepartment: item ? item.selectedRectifyDepartment : null,
      selectedRectifyPeople: item ? item.selectedRectifyPeople : null,
      uuid: item ? item.uuid : UUID.generate(),
      editable: true,
      sendStatus: 'NOT_ISSUED',
      transferStatus: 'NOT_HANDED_OVER',
    };
  }

  saveProblem(data: RectifyProblemDTO): void {
    console.log('============SAVE= PROBLEM===========');
    console.log(data);
    if (
      !FormUtil.validateForm(this.auditPostForm.form) ||
      !data.name ||
      !data.type ||
      !data.remark ||
      !data.rectifyDepartmentId ||
      !data.dutyUserId ||
      !data.advice ||
      !data.source
    ) {
      this.msg.warning(`请确认问题信息填写完整`);
      return;
    }
    this.listOfData.filter(item => item.uuid === data.uuid)[0].editable = false;
  }

  editProblem(data: RectifyProblemDTO, lookup: boolean): void {
    this.listOfData.filter(item => item.uuid === data.uuid)[0].editable = true;
    this.paramsItem = this.initProblem(data);
    this.lookup = lookup;
    this.isVisabled = true;
  }

  selectDepartment($event, data): void {
    console.log('============SELECT DEPARTMENT============');
    console.log($event);
    console.log(data);
    if ($event && $event.length > 0) {
      this.paramsItem.rectifyDepartmentId = $event[0].id;
      // this.listOfData.filter(item => item.uuid === data.uuid)[0].rectifyDepartmentId = $event[0].id;
    } else {
      this.paramsItem.rectifyDepartmentId = null;
      // this.listOfData.filter(item => item.uuid === data.uuid)[0].rectifyDepartmentId = null;
    }
  }

  selectUser($event, data): void {
    console.log('============SELECT USER============');
    console.log($event);
    console.log(data);
    if ($event && $event.length > 0) {
      this.paramsItem.dutyUserId = $event[0].id;
      // this.listOfData.filter(item => item.uuid === data.uuid)[0].dutyUserId = $event[0].id;
    } else {
      this.paramsItem.dutyUserId = null;
      // this.listOfData.filter(item => item.uuid === data.uuid)[0].dutyUserId = null;
    }
  }

  allProblemSaved(): boolean {
    return this.listOfData.filter(item => item.editable).length === 0;
  }

  customReq = (item: UploadXHRArgs) => {
    // Create a FormData here to store files and other parameters.
    const formData = new FormData();
    // tslint:disable-next-line:no-any
    formData.append('file', item.file as any);
    this.systemFileService.singleFile('COMMON_FILE', formData).subscribe({
      next: data => {
        (data as any).uuid = data.id;
        item.onSuccess(data, data as any, null);
        data.name = data.originalName;
        this.fileList = [data as any];
        this.currentItem.systemFile = data;
      },
      error: () => {
        item.onError(null, item.file);
        this.msg.error(`上传失败`);
        this.fileList = [];
      },
      complete: () => {},
    });
    // tslint:disable-next-line:semicolon
  };

  removeFile = (file: UploadFile): boolean | Observable<boolean> => {
    if (this.isWatch) {
      return false;
    }
    if (this.currentItem.id) {
      this.msg.warning(`已关联审计报告，不支持删除`);
      return false;
    } else {
      this.systemFileService.deleteFileById(file.id).subscribe({
        next: () => {
          this.msg.success(`删除成功`);
          this.fileList = [];
          this.currentItem.systemFile = null;
        },
        error: () => {},
        complete: () => {},
      });
      return false;
    }
    // tslint:disable-next-line:semicolon
  };

  previewPostFile(): void {
    this.preview(this.currentItem.systemFile.id, this.currentItem.systemFile.name);
  }

  /**
   * 预览
   */
  preview(id: string, fileName?: string) {
    let name = fileName;
    if (fileName && fileName.lastIndexOf('.') !== -1) {
      name = fileName.substring(0, fileName.lastIndexOf('.'));
    }

    const fileType = 'png,jpg,jpeg,xml';
    const suffix = fileName.slice(fileName.lastIndexOf('.') + 1);
    if (suffix === 'txt') {
      this.msg.warning('.txt文件格式暂不支持预览，请下载文件！');
      return;
    }

    if (fileType.includes(suffix)) {
      // 预览图片
      this.systemFileService.getFileContentById(id).subscribe(
        blob => {
          const binaryData = [];
          binaryData.push(blob.body);
          const objectUrl = window.URL.createObjectURL(new Blob(binaryData, { type: blob.body.type }));
          const win = window.open(objectUrl);
          setTimeout(() => {
            win.document.title = name;
          }, 100);
        },
        () => {},
        null,
      );
    } else {
      this.systemFileService.previewFileById(id).subscribe(
        blob => {
          const uA = window.navigator.userAgent; // 判断浏览器内核
          const isIE =
            /msie\s|trident\/|edge\//i.test(uA) &&
            !!(
              'uniqueID' in document ||
              'documentMode' in document ||
              'ActiveXObject' in window ||
              'MSInputMethodContext' in window
            );
          const binaryData = [];
          binaryData.push(blob.body);
          const objectUrl = window.URL.createObjectURL(new Blob(binaryData, { type: blob.body.type }));
          const win = window.open(objectUrl);
          setTimeout(() => {
            win.document.title = name;
          }, 100);
        },
        () => {},
        null,
      );
    }
  }

  /**
   * 下载
   */
  downCertificate(id: string, fileName?: string, item?: any) {
    this.systemFileService.downloadFileContentById(id).subscribe(blob => {
      const uA = window.navigator.userAgent; // 判断浏览器内核
      const isIE =
        /msie\s|trident\/|edge\//i.test(uA) &&
        !!(
          'uniqueID' in document ||
          'documentMode' in document ||
          'ActiveXObject' in window ||
          'MSInputMethodContext' in window
        );
      const binaryData = [];
      binaryData.push(blob.body);
      const objectUrl = window.URL.createObjectURL(new Blob(binaryData, { type: blob.body.type }));
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.href = objectUrl;
      a.download = fileName ? fileName : '';
      if (isIE) {
        // 兼容IE11无法触发下载的问题
        (navigator as any).msSaveBlob(new Blob(binaryData), a.download);
      } else {
        a.click();
      }
      a.remove();
    });
  }

  generatePost(): void {
    if (!this.allProblemSaved()) {
      this.msg.warning(`请保存所有问题`);
      return;
    }
    this.currentItem.auditStartTime = this.datePipe.transform(this.currentItem.auditDateRange[0], 'yyyy-MM-dd');
    this.currentItem.auditEndTime = this.datePipe.transform(this.currentItem.auditDateRange[1], 'yyyy-MM-dd');
    this.currentItem.rectifyProblems = this.listOfData;
    console.log('=============================POST DATA=================');
    console.dir(this.currentItem);
    console.log('done');
    // 改变状态
    this.currentItem.auditReportStatus = 'GENERATED';
    this.auditPostsService.update(this.currentItem.id, this.currentItem).subscribe({
      next: data => {
        this.updateCurrentItem(data);
        this.msg.success(`报告已生成`);
        this.afterChange();
      },
      error: () => {},
      complete: () => {},
    });
  }

  /**
   * 生成报告后的操作
   */
  afterChange() {
    this.broadcaster.broadcast('writ:change');
    this.onReturn();
  }

  downLoadPostFile(): void {
    this.downCertificate(this.currentItem.systemFile.id, this.currentItem.systemFile.name);
  }

  updateCurrentItem(item: AuditPostDTO): void {
    item.auditDateRange = [new Date(item.auditStartTime), new Date(item.auditEndTime)];
    item.rectifyProblems.forEach(problem => {
      problem.selectedRectifyDepartment = [problem.rectifyDepartment];
      problem.selectedRectifyPeople = [problem.dutyUser as UserDTO];
      problem.rectifyDepartmentId = problem.rectifyDepartment.id;
      problem.dutyUserId = problem.dutyUser.id;
      problem.uuid = problem.id;
    });
    if (item.systemFile) {
      item.systemFile.name = item.systemFile.originalName;
      this.fileList = [item.systemFile];
    }
    this.listOfData = item.rectifyProblems;
    this.currentItem = item;
  }

  /**
   *
   * 问题详情框
   */

  handleOk() {
    if (!FormUtil.validateForm(this.problemform.form)) {
      this.msg.warning(`请确认问题信息填写完整`);
      return;
    }

    if (this.listOfData.filter(item => item.uuid === this.paramsItem.uuid).length > 0) {
      const findIndex = this.listOfData.findIndex(item => item.uuid === this.paramsItem.uuid);
      this.listOfData.splice(findIndex, 1, this.paramsItem);
    } else {
      this.listOfData.push(this.paramsItem);
    }
    this.listOfData = [...this.listOfData];
    this.handleCancel();
  }
  handleCancel() {
    for (const item of this.listOfData) {
      item.editable = false;
    }
    this.paramsItem = this.initProblem();
    FormUtil.resetForm(this.problemform.form);
    this.isVisabled = false;
  }
}
