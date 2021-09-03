import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';
@Component({
  selector: 'app-sys-name',
  templateUrl: './sys-name.component.html',
  styleUrls: ['./sys-name.component.less'],
})
export class SysNameComponent {
  systemName = environment.systemName;
}
