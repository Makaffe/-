import { Component, OnInit } from '@angular/core';

interface ItemData {
  id: string;
  name: string;
  age: number;
}
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'supervise-process-form',
  templateUrl: './supervise-process-form.component.html',
  styles: [],
})
export class SuperviseProcessFormComponent implements OnInit {
  constructor() {}
  isVisible = false;
  date = new Date();
  radioLetterValue: any;
  radioDisciplineValue: any;
  editCache: { [key: string]: { edit: boolean; data: ItemData } } = {};
  listOfData: ItemData[] = [];

  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item.id] = {
        edit: true,
        data: { ...item },
      };
    });
  }

  ngOnInit(): void {
    for (let i = 0; i < 2; i++) {
      this.listOfData.push({
        id: `${i}`,
        name: `Edrward ${i}`,
        age: 32,
      });
    }
    this.updateEditCache();
  }

  handleCancel() {
    this.isVisible = false;
  }

  show() {
    this.isVisible = true;
  }

  addRow() {
    this.listOfData.push({
      id: (this.listOfData.length + 1).toString(),
      name: `sss`,
      age: 22,
    });
  }
}
