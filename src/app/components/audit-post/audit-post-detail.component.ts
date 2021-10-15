import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { NzMessageService, UploadFile, UploadFilter, UploadXHRArgs } from 'ng-zorro-antd';
import { Observable, Observer } from 'rxjs';
import { RectifyProblemDTO } from '../rectify-issue/model/rectify-problem-dto';
import UUID from 'uuidjs';
import { NgForm } from '@angular/forms';
import { FormUtil } from '@mt-framework-ng/util';
import { AuditPostDTO } from './model/AuditPostDTO';
import { SystemFileService, UserDTO } from '@ng-mt-framework/api';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AuditPostService } from './service/AuditPostService';
@Component({
  selector: 'audit-post-detail',
  templateUrl: './audit-post-detail.component.html',
  styleUrls: ['./audit-post-detail.component.less'],
})
export class AuditPostDetailComponent implements OnInit {
  @ViewChild('auditPostForm', { static: true })
  auditPostForm: NgForm;
  listOfData: RectifyProblemDTO[] = [];
  filters: UploadFilter[] = [
    {
      name: 'type',
      fn: (fileList: UploadFile[]) => {
        const filterFiles = fileList.filter(
          w =>
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
   * 步骤条进度
   */
  current = 0;
  /**
   * 判断是否只读
   */
  readFlag1: boolean;
  readFlag2: boolean;
  visabled = false;
  isWatch = false;
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
  constructor(
    private msg: NzMessageService,
    private systemFileService: SystemFileService,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe,
    private auditPostsService: AuditPostService,
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(data => {
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

  pre(): void {
    this.current -= 1;
    this.changeContent();
  }

  next(): void {
    console.log('==============FORM OBJECT==============');
    console.dir(this.auditPostForm);

    console.dir(this.auditPostForm.form);
    if (!FormUtil.validateForm(this.auditPostForm.form)) {
      this.msg.warning(`请补全报告基本信息`);
      return;
    }
    this.current += 1;
    this.visabled = true;
    this.changeContent();
  }

  done(): void {
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

  changeContent(): void {
    switch (this.current) {
      case 0: {
        this.readFlag1 = false;
        this.readFlag2 = true;
        break;
      }
      case 1: {
        this.readFlag1 = true;
        this.readFlag2 = false;
        break;
      }
      default: {
        this.readFlag1 = true;
        this.readFlag1 = false;
      }
    }
  }

  /**
   *  添加问题
   */
  addProblem(): void {
    this.listOfData.push(this.initProblem());
    this.listOfData = [...this.listOfData];
  }

  deleteProblem(data: RectifyProblemDTO): void {
    this.listOfData = [...this.listOfData.filter(item => item.uuid !== data.uuid)];
  }

  /**
   *  初始化整改问题数据
   * @returns RectifyProblemDTO
   */
  initProblem(): RectifyProblemDTO {
    return {
      name: null,
      type: null,
      remark: null,
      rectifyDepartmentId: null,
      dutyUserId: null,
      advice: null,
      source: this.currentItem.name,
      selectedRectifyDepartment: null,
      selectedRectifyPeople: null,
      uuid: UUID.generate(),
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

  editProblem(data: RectifyProblemDTO): void {
    this.listOfData.filter(item => item.uuid === data.uuid)[0].editable = true;
  }

  selectDepartment($event, data): void {
    console.log('============SELECT DEPARTMENT============');
    console.log($event);
    console.log(data);
    if ($event && $event.length > 0) {
      this.listOfData.filter(item => item.uuid === data.uuid)[0].rectifyDepartmentId = $event[0].id;
    } else {
      this.listOfData.filter(item => item.uuid === data.uuid)[0].rectifyDepartmentId = null;
    }
  }

  selectUser($event, data): void {
    console.log('============SELECT USER============');
    console.log($event);
    console.log(data);
    if ($event && $event.length > 0) {
      this.listOfData.filter(item => item.uuid === data.uuid)[0].dutyUserId = $event[0].id;
    } else {
      this.listOfData.filter(item => item.uuid === data.uuid)[0].dutyUserId = null;
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
      },
      error: () => {},
      complete: () => {},
    });
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
}
