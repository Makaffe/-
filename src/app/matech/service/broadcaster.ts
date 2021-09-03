import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

interface BroadcastEvent {
  key: any;
  data?: any;
}

@Injectable({
  providedIn: 'root',
})
export class Broadcaster {
  // tslint:disable-next-line: variable-name
  private _eventBus: Subject<BroadcastEvent>;

  constructor() {
    this._eventBus = new Subject<BroadcastEvent>();
  }

  /**
   * 广播
   * @param key 自定义值
   * @param data 传的参数
   */
  broadcast(key: any, data?: any) {
    this._eventBus.next({ key, data });
  }

  /**
   * 监听
   * @param key 自定义值
   */
  on<T>(key: any): Observable<T> {
    return this._eventBus.asObservable().pipe(
      filter(event => event.key === key),
      map(event => event.data as T),
    );
  }
}
