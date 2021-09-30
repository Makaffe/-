import { Component, OnInit } from '@angular/core';
import { NzMessageService, UploadFile, UploadFilter } from 'ng-zorro-antd';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'audit-post-detail',
  templateUrl: './audit-post-detail.component.html',
  styleUrls: ['./audit-post-detail.component.less'],
})
export class AuditPostDetailComponent implements OnInit {
  listOfData = [
    {
      id: '1',
      issueName: '不明资金来源',
      issueDesc: '年度收入大于支出',
      issueType: '资金',
      rectifyDepartment: '部门一',
      rectifyPrincipal: '张三',
      auditingAdvice: '立即整改',
      source: '审计发现',
    },
  ];
  filters: UploadFilter[] = [
    {
      name: 'type',
      fn: (fileList: UploadFile[]) => {
        const filterFiles = fileList.filter(w => ~['image/png'].indexOf(w.type));
        if (filterFiles.length !== fileList.length) {
          this.msg.error(`包含文件格式不正确，只支持 png 格式`);
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

  fileList = [
    {
      uid: -1,
      name: '《2021-10-01年度中期审计报告》.docx',
      status: 'done',
    },
  ];

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
  constructor(private msg: NzMessageService) {}

  ngOnInit() {}

  pre(): void {
    this.current -= 1;
    this.changeContent();
  }

  next(): void {
    this.current += 1;
    this.visabled = true;
    this.changeContent();
  }

  done(): void {
    console.log('done');
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
}
