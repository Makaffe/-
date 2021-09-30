// import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
// import { NzInputDirective } from 'ng-zorro-antd';

import { Component, OnInit } from '@angular/core';
import { ItemData } from './rectify-issue-list.component';
// interface ItemData {
//   id: string;
//   proName: string;
//   proDes: string;
//   proType: string;
//   department: string;
//   person: string;
//   suggest: string;
//   children?: ItemData[];
// }
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rectify-issue-split',
  templateUrl: './rectify-issue-split.component.html',
  styles: [],
})
export class RectifyIssueSplitComponent implements OnInit {
  editCache: { [key: string]: { edit: boolean; data: ItemData } } = {};
  listOfData: ItemData[] = [];
  data: ItemData = {
    key: null,
    id: null,
    proName: '',
    status: '',
    situation: '',
    admitName: '',
    proCome: '',
    oaSend: '',
    proDes: '',
    proType: '',
    department: '',
    person: '',
    suggest: '',
    children: null,
    checked: false,
  };
  loading = false;
  isVisible = false;
  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false,
    };
  }

  saveEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    Object.assign(this.listOfData[index], this.editCache[id].data);
    this.editCache[id].edit = false;
  }

  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item },
      };
    });
  }

  ngOnInit(): void {}

  handleCancel() {
    this.listOfData = [];
    this.isVisible = false;
  }
  save() {
    this.isVisible = false;
  }
  edit(item?: any) {
    this.data = item;
    // for (const child of item.children) {
    //   this.listOfData.push(child);
    // }
    console.log(this.data);
    if (item.children !== null && item.children) {
      this.listOfData = item.children;

      this.updateEditCache();
    }
    this.isVisible = true;
  }
  handleAdd() {
    if (this.listOfData.length === 0) {
      // this.listOfData.push({});
      this.listOfData = [
        ...this.listOfData,
        {
          key: this.data.key * 10 + 1,
          id: this.data.id + '1',
          proName: '子问题一',
          status: '未下发',
          situation: '未移交',
          admitName: '',
          proCome: '子问题一来源',
          oaSend: '',
          proDes: '描述一',
          proType: '类型一',
          department: '部门一',
          person: '张三',
          suggest: '子问题审计建议xxx',
          children: null,
          checked: false,
        },
      ];
    } else {
      this.listOfData = [
        ...this.listOfData,
        {
          key: this.listOfData[this.listOfData.length - 1].key + 1,
          id: (+this.listOfData[this.listOfData.length - 1].key + 1).toLocaleString(),
          proName: this.listOfData[this.listOfData.length - 1].proName,
          status: '未下发',
          situation: '未移交',
          admitName: this.listOfData[this.listOfData.length - 1].admitName,
          proCome: this.listOfData[this.listOfData.length - 1].proCome,
          oaSend: this.listOfData[this.listOfData.length - 1].oaSend,
          proDes: this.listOfData[this.listOfData.length - 1].proDes,
          proType: this.listOfData[this.listOfData.length - 1].proType,
          department: this.listOfData[this.listOfData.length - 1].department,
          person: this.listOfData[this.listOfData.length - 1].person,
          suggest: this.listOfData[this.listOfData.length - 1].suggest,
          children: null,
          checked: false,
        },
      ];
    }
    this.updateEditCache();
  }
}
