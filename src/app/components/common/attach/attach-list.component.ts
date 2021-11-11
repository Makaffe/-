import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { UploadFile, UploadFilter, NzMessageService, NzModalService, UploadXHRArgs } from 'ng-zorro-antd';
import { SystemFileService, SystemFileDTO } from '@ng-mt-framework/api';
import { NzUploadComponent } from 'ng-zorro-antd/upload';
import { BehaviorSubject } from 'rxjs';
import { HttpEventType } from '@angular/common/http';

/**
 * 附件组件
 */
@Component({
  selector: 'app-attach-list',
  templateUrl: './attach-list.component.html',
  styles: [``],
})
export class AttachListComponent implements OnInit {
  /**
   * 组件的实例，因为转换base回调onload事件目前无法访问this
   * 在路由复用的场景下，不确定会不会有问题, 目前未发现
   */
  static attachListComponent: AttachListComponent = null;

  @ViewChild('uploadComponent', { static: false })
  private uploadComponent: NzUploadComponent;

  constructor(
    private msg: NzMessageService,
    private systemFileService: SystemFileService,
    private modalService: NzModalService,
  ) {
    AttachListComponent.attachListComponent = this;
  }

  /**
   * 文件名（用于文件名重复时，暂存新的文件名）
   */
  tmpName: string = null;

  /**
   * 初始化图片
   */
  previewImage: string | undefined = '';

  /**
   * 预览文件
   */
  previewFile: string | undefined = '';

  /**
   * 预览窗口
   */
  previewVisible = false;

  /**
   * 文件标题
   */
  @Input()
  fileTitle = '已上传附件信息';

  /**
   * 指定滚动区域的宽高度
   */
  @Input()
  scroll = { y: '100%' };

  /**
   * 选择文件、删除按钮可见性(可编辑模式)
   */
  @Input()
  show = true;

  /**
   * 选择文件(可编辑模式)
   */
  @Input()
  disabled = false;

  /**
   * 文件类型 文件上传时追加请求参数
   */
  @Input()
  fileType: string = null;

  /**
   * 文件上传请求地址
   */
  @Input()
  action = '/api/base/files/single';

  /**
   * 文件最大上传个数，默认不限制
   */
  @Input()
  maxUploadFileLength = null;

  /**
   * 删除时是否直接调用删除方法
   */
  @Input()
  deleteUseMethod = true;

  /**
   * 设置附件展示框高度
   */
  @Input()
  TBHeight = '200px';

  @Input()
  fileName = '附件名称';

  /**
   * 文件上传个数限制，默认0，即不做限制
   */
  @Input()
  fileLimit = 0;

  /**
   * 是否允许删除
   */
  @Input()
  showDelete = true;

  /**
   * 模拟订阅对象，用于处理附件上传取消事件
   */
  private upLoadSubject = new BehaviorSubject<any>({});

  /**
   * 模拟可观察对象，用于处理附件上传取消事件
   */
  private upLoadObservable = this.upLoadSubject.asObservable();

  /**
   * 文件上传 类型限制
   */
  @Input()
  filters: UploadFilter[] = [
    {
      name: 'type',
      fn: (fileList: UploadFile[]) => {
        // tslint:disable-next-line: no-bitwise
        const fileType = 'exe,jsp,asp,html';
        const filterFiles = [];
        let flag = false;
        fileList.forEach(f => {
          if (!f.name.includes('.')) {
            flag = true;
            return;
          }
          const suffix = f.name.slice(f.name.lastIndexOf('.') + 1);
          if (!fileType.includes(suffix)) {
            filterFiles.push(f);
          }
        });

        if (filterFiles.length !== fileList.length || flag) {
          this.msg.error(`包含文件格式不正确`);
          return filterFiles;
        }

        return fileList;
      },
    },
  ];

  /**
   * 初始化上传按钮配置
   */
  @Input()
  showUploadList = {
    showPreviewIcon: true,
    showRemoveIcon: true,
    hidePreviewIconInNonImage: true,
  };

  /**
   * 上传文件列表
   */
  fileList: UploadFile[] = [];

  /**
   * 附件列表
   */
  @Input()
  attachFiles: Array<SystemFileDTO> = [];
  @Output()
  attachFilesChange = new EventEmitter<Array<SystemFileDTO>>();

  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  mapOfCheckedId: { [key: string]: boolean } = {};

  refreshStatus(): void {
    console.log(this.mapOfCheckedId);
    this.isAllDisplayDataChecked = this.attachFiles.every(item => this.mapOfCheckedId[item.id]);
    this.isIndeterminate = this.attachFiles.some(item => this.mapOfCheckedId[item.id]) && !this.isAllDisplayDataChecked;
  }

  checkAll(value: boolean): void {
    this.attachFiles.forEach(item => (this.mapOfCheckedId[item.id] = value));
    this.refreshStatus();
  }

  /**
   * 批量下载
   */
  download() {
    this.attachFiles.forEach(file => {
      if (this.mapOfCheckedId[file.id]) {
        this.downCertificate(file.id, file.originalName);
      }
    });
  }

  /**
   * 检查文件是否重复
   * @param name 待上传文件名
   */
  isFileUnique(name: string) {
    let isUnique = true;
    this.attachFiles.forEach(f => {
      if (f.originalName === name) {
        isUnique = false;
        return;
      }
    });
    return isUnique;
  }

  /**
   * 删除附件
   * @param data 需要删除的附件数据
   *
   */
  deleteAttach(data: any) {
    this.attachFiles = this.attachFiles.filter(item => item !== data);
    this.attachFilesChange.emit(this.attachFiles);
    this.attachFiles = [...this.attachFiles];
    this.fileList = this.fileList.filter(f => f.response.id !== data.id);
    this.fileList = [...this.fileList];
    if (this.deleteUseMethod) {
      this.deleteSystemFile(data.id);
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
        navigator.msSaveBlob(new Blob(binaryData), a.download);
      } else {
        a.click();
      }
      a.remove();
    });
  }

  ngOnInit() {
    this.attachFiles = [...this.attachFiles];
  }

  /**
   * 文件上传 追加请求参数
   */
  handleData = (file: UploadFile) => {
    return { type: this.fileType };
    // tslint:disable-next-line:semicolon
  };

  /**
   * 文件 开始、上传进度、完成、失败都会调用这个函数
   *
   * @param info  文件参数
   */
  upLoadFile(info: { file: UploadFile; fileList: Array<UploadFile>; type: string; event: any }): void {
    switch (info.file.status) {
      // 完成时
      case 'done':
        if (info.file.response) {
          const name = this.tmpName !== null ? this.tmpName : info.file.name;
          if (info.file.response.id) {
            // 绑定上传成功后问的文件id
            this.attachFiles.push({
              name: info.file.response.name,
              id: info.file.response.id,
              originalName: name,
              size: info.file.size,
              type: this.fileType,
              lastModifiedTime: info.file.response.lastModifiedTime,
            });
            this.attachFiles = [...this.attachFiles];
            this.attachFilesChange.emit(this.attachFiles);
            this.fileList = this.fileList.filter(f => f.name !== info.file.name);
            this.fileList = [...this.fileList];
          }

          // 根据uid排除文件
          if (info.file.response.handleType === 'CANCEL') {
            this.fileList = this.fileList.filter(f => f.uid !== info.file.uid);
            this.fileList = [...this.fileList];
          }
        }
        break;
      case 'removed':
        let fileId = null;
        // 移除后删除文件
        if (info.file.response) {
          fileId = info.file.response.id;
        } else {
          fileId = info.file.uid;
        }

        this.attachFiles = this.attachFiles.filter(f => f.id !== fileId);
        this.attachFiles = [...this.attachFiles];
        this.attachFilesChange.emit(this.attachFiles);
        this.fileList = this.fileList.filter(f => f.response.id !== fileId);
        this.fileList = [...this.fileList];

        if (info.file.response && info.file.response.id) {
          // this.deleteSystemFile(fileId);
        }
        break;
      default:
        if (info.type === 'start' && info.file.response && info.file.response.handleType === 'CANCEL') {
          this.fileList = this.fileList.filter(f => f.uid !== info.file.uid);
          this.fileList = [...this.fileList];
        }
    }
  }

  /**
   * 删除文件
   *
   * @param fileId 文件id
   */
  deleteSystemFile(fileId: string) {
    this.systemFileService.deleteFileById(fileId).subscribe(data => {
      this.msg.success('删除成功!');
    });
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
   * 自定上传方法 用于拦截重复文件上传并处理
   * @param item 文件上传XHR请求对象
   */
  customReq = (item: any) => {
    // 因为上传多文件时，此函数会被在短时间内连续调用，进度条可能会在页面上停滞，所以进行微调的延时处理。
    setTimeout(() => {
      this.filters.forEach(filter => {
        filter.fn([item.file]);
      });

      // 当文件个数大于限制个数的时候，停止上传
      if (this.maxUploadFileLength && this.maxUploadFileLength <= this.attachFiles.length) {
        this.msg.warning('文件个数超出限制，限制为' + this.maxUploadFileLength + '个');
        // 拦截文件上传请求  暂时取消文件上传
        this.uploadComponent.nzFileList = this.uploadComponent.nzFileList.concat(item.file);
        return this.upLoadObservable.subscribe(next => {
          item.onSuccess({ handleType: 'CANCEL' }, item.file, '');
        });
      }

      const suffix = item.file.name.slice(item.file.name.lastIndexOf('.') + 1);
      // 判断是否已上传相同文件名文件
      if (this.isFileUnique(item.file.name)) {
        const formData = new FormData();
        formData.append('file', item.file as any);
        return this.systemFileService.singleFile(this.fileType, formData).subscribe(data => {
          item.onSuccess(data, item.file, '');
        });

        // 进度条显示
        // const url = '/api/base/files/single?type=' + this.fileType;
        // const file = item.file;
        // const formData = new FormData();
        // formData.append('file', file);
        // const req = new HttpRequest('Post', url, formData, { reportProgress: true });
        // this.http.request(req).pipe(
        //   map(event =>
        //     this.getEventMessage(event, item))).subscribe(r => {
        //     });
      } else {
        this.modalService.confirm({
          nzTitle: '提示',
          nzContent: '相同文件名的文件已上传，是否上传？',
          nzOnOk: () => {
            // 重新构造上传文件对象，加盖时间戳

            const upLoadFile = new File([item.file as any], new Date().getTime() + item.file.name);

            this.uploadComponent.uploadComp.uploadFiles([upLoadFile]);
          },
          nzOnCancel: () => {
            // 确认取消上传
          },
        });

        // 拦截文件上传请求  暂时取消文件上传
        this.uploadComponent.nzFileList = this.uploadComponent.nzFileList.concat(item.file);
        return this.upLoadObservable.subscribe(next => {
          item.onSuccess({ handleType: 'CANCEL' }, item.file, '');
        });
      }
    }, 200);
    // tslint:disable-next-line:semicolon
  };

  // tslint:disable-next-line:member-ordering
  loaded = 0;
  // tslint:disable-next-line:member-ordering
  total = 0;

  // tslint:disable-next-line:member-ordering
  percent = 0;

  private getEventMessage(event, item: any) {
    switch (event.type) {
      case HttpEventType.Sent:
        break;
      case HttpEventType.UploadProgress:
        this.loaded = event.loaded;
        this.total = event.total;
        this.percent = Number(((this.loaded / this.total) * 100).toFixed(2));
        break;
      default:
        if (event.body) {
          item.onSuccess(event.body, item.file, '');
        }
    }
  }
}
