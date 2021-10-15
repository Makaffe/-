import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TreeUtil } from '@mt-framework-ng/util';
import { NzMessageService } from 'ng-zorro-antd';
import { OASendTemplateTypeService } from '../oa-template/service/OASendTemplateTypeService';
import { RectifyProblemDTO } from './public_api';
import { RectifyProblemService } from './service/RectifyProblemService';
@Component({
  selector: 'app-rectify-issue-order',
  templateUrl: './rectify-issue-order.component.html',
  styles: [],
})
export class RectifyIssueOrderComponent implements OnInit {
  constructor(
    private rectifyProblemService: RectifyProblemService,
    private msg: NzMessageService,
    private oASendTemplateTypeService: OASendTemplateTypeService,
  ) {}

  /**
   * 数据改变通知事件
   */
  @Output()
  notification = new EventEmitter();

  /**
   * 模态框是否可见
   */
  isVisible = false;

  /**
   * 后台请求标识
   */
  loading = false;

  /**
   * 表格数据
   */
  listOfData: any[] = [];

  /**
   * oa模板类型树
   */
  oASendTemplateTypeTree = [];

  /**
   * 选择的oa模板类型
   */
  selectOaSendTemplateType = null;

  ngOnInit() {
    this.oASendTemplateTypeService.findAllUsingGET().subscribe(data => {
      this.oASendTemplateTypeTree = TreeUtil.populateTreeNodes(data, 'id', 'name', 'children');
    });
  }

  /**
   * 关闭
   */
  handleCancel() {
    this.listOfData = [];
    this.isVisible = false;
  }

  /**
   * 保存
   */
  save() {
    this.loading = true;
    const ids = [];
    this.listOfData.forEach(data => {
      ids.push(data.id);
    });
    this.rectifyProblemService.rectifyProblemSend(ids).subscribe(
      data => {
        this.msg.success('问题下发成功！');
        this.notification.emit();
        this.handleCancel();
      },
      () => {},
      () => {
        this.loading = false;
      },
    );
  }

  /**
   * 初始化编辑页面
   * @param problems 整改问题数据
   *
   */
  edit(problems: Array<RectifyProblemDTO>) {
    problems.forEach(problem => {
      this.listOfData.push({
        id: problem.id,
        rectifyDepartment: problem.rectifyDepartment,
        dutyUser: problem.dutyUser,
      });
    });
    this.listOfData = [...this.listOfData];
    this.isVisible = true;
  }
}
