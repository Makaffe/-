import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TreeUtil } from '@mt-framework-ng/util';
import { QueryOptions } from '@ng-mt-framework/api';
import { TABLE_PARAMETER } from '@ng-mt-framework/comp';
import { ObjectUtil } from '@ng-mt-framework/util';
import { NzMessageService, NzTreeNode } from 'ng-zorro-antd';
import { __spread } from 'tslib';
import { OASendTemplateService } from '../oa-template/service/OASendTemplateService';
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
    private oaSendTemplateService: OASendTemplateService,
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
   * OA模板表格加载
   */
  tableData = [];

  /**
   * 分页参数
   */
  private options: QueryOptions = {
    page: 0,
    size: 20,
    sort: 'id,desc',
  };

  /**
   * 列表参数
   */
  tableParameter = ObjectUtil.deepClone(TABLE_PARAMETER);

  /**
   * 列名称
   */
  columns = [
    { title: '序号', render: 'number', width: '10%', className: 'text-center', type: 'radio' },
    {
      title: 'OA模板名称',
      index: 'name',
      width: '30%',
      sort: this.tableParameter.sortDef,
    },
    {
      title: 'OA模板内容',
      index: 'content',
      sort: this.tableParameter.sortDef,
      width: '60%',
    },
  ];
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

  /**
   *
   * @param $event
   * 树节点
   * 点击后触发
   */
  onChange($event: string) {
    this.oaSendTemplateService.findOnePageUsingGET(this.options, $event).subscribe(
      data => {
        if (data) {
          this.tableData = data.data;
          this.tableData = __spread(this.tableData);
          this.tableParameter.page.total = data.totalRecords;
          this.tableParameter.pi = data.pageNo + 1;
        }
      },
      null,
      () => (this.loading = false),
    );
  }
}
