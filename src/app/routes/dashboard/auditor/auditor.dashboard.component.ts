import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { STColumn } from '@delon/abc';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-auditor-dashboard',
  templateUrl: './auditor.dashboard.component.html',
  styleUrls: ['./auditor.dashboard.component.less'],
})
export class AuditorDashboardComponent implements OnInit {
  cards: Array<{
    icon: string;
    value: number;
    title: string;
    className: string;
  }> = [];
  constructor(private router: Router) {}
  users: any[] = [];
  rectifyIssuecolumns: STColumn[] = [
    {
      title: '排名',
      index: 'id',
      
    },
    {
      title: '整改部门',
      index: 'name',
     
    },
    {
      title: '整改问题',
      index: 'age',
     
    },
    {
      title: '整改反馈进度',
      index: 'age',
    },
    {
      title: '整改截止时间',
      index: 'age',
    },
    {
      title: '剩余整改天数',
      index: 'age',
    },
  ];
  rectifyProcesscolumns: STColumn[] = [
    {
      title: '排名',
      index: 'id',
      
    },
    {
      title: '整改部门',
      index: 'name',
     
    },
    {
      title: '整改问题',
      index: 'age',
     
    },
    {
      title: '整改反馈进度',
      index: 'age',
    },
    {
      title: '整改截止时间',
      index: 'age',
    },
    {
      title: '剩余整改天数',
      index: 'age',
    },
    {
      title: '操作',
      render:'operations'
    },
  ];
  ngOnInit() {
    this.cards = [
      {
        icon: 'audit',
        value: 1,
        title: '审计类型',
        className: 'bg-orange',
      },
      {
        icon: 'project',
        value: 2,
        title: '项目',
        className: 'bg-magenta',
      },
      {
        icon: 'bank',
        value: 3,
        title: '被审计单位',
        className: 'bg-primary',
      },
      {
        icon: 'exclamation-circle',
        value: 4,
        title: '发现问题类型',
        className: 'bg-volcano',
      },
      {
        icon: 'exception',
        value: 5,
        title: '发现问题',
        className: 'bg-purple',
      },
      {
        icon: 'file-done',
        value: 6,
        title: '已整改',
        className: 'bg-success',
      },
    ];
    of(
      Array(100)
        .fill({})
        .map((_item: any, idx: number) => {
          return {
            id: idx + 1,
            name: `name ${idx + 1}`,
            age: Math.ceil(Math.random() * 10) + 20,
            status: Math.floor(Math.random() * 5) + 1,
          };
        }),
    )
      .pipe(delay(500))
      .subscribe(res => (this.users = res));
  }
  goDepartmentDraw(){
  this.router.navigate(['/audit-rectify/department-draw']);
  }
  goWorkBeach(){
    this.router.navigate(['/audit-rectify/rectify-workbeach']);
  }
}
