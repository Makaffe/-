import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataTransmit {
  title = '';

  setTitle(title: string) {
    this.title = title;
  }

  getTitle(): string {
    return this.title;
  }
}
