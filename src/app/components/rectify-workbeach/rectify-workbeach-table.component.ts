import { Component, Inject, Input, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { STColumn, STColumnTag, STComponent } from '@delon/abc';
import { TABLE_PARAMETER } from '@ng-mt-framework/comp';
import { ObjectUtil } from '@ng-mt-framework/util';
import { RectifyProblemDelayApplyDTO } from './model/RectifyProblemDelayApplyDTO.';
import { RectifyProblemDelayApplyEditInfoDTO } from './model/RectifyProblemDelayApplyEditInfoDTO';
import { RectifyWorkbeachPutComponent } from './rectify-workbeach-put.component';
import { RectifyProblemDelayApplyService } from './service/RectifyProblemDelayApplyService';
import { Status } from './status';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rectify-workbeach-table',
  templateUrl: './rectify-workbeach-table.component.html',
  styles: [],
})
export class RectifyWorkbeachTableComponent implements OnInit {

  constructor(private rectifyProblemDelayApplyService: RectifyProblemDelayApplyService) {}
  loading = false;

  /**
   * 整改部门提交申请请求
   * 调用弹窗组件
   */
  @ViewChild('rectifyWorkbeachPutComponent', { static: false })
  rectifyWorkbeachPutComponent: RectifyWorkbeachPutComponent;
  /**
   * st 表格组件
   */
  @ViewChild('st', { static: false })
  st: STComponent;

  TAG: STColumnTag = Status.TAG;

  /**
   * 列表参数
   */
  tableParameter = ObjectUtil.deepClone(TABLE_PARAMETER);

  /**
   * 显示申请人
   */
  showCreateUserName = null;

  /**
   * 显示批复人
   */
  showReplyUserName = null;

  /**
   * 列表数据
   */
   tableData: RectifyProblemDelayApplyDTO = null;


   /**
    * 审批过后查看按钮不显示
    */
   showButton = null;

  /**
   * 控制弹窗是否弹出
   */
  isVisible = false;

  /**
   * 接收数据
   */
  approvingData = [];

  /**
   * 列定义
   */
  columns: STColumn[] = [
    { title: '序号', render: 'number', width: '90px', className: 'text-center' },
    {
      title: '状态',
      index: 'status',
      width: '100px',
      className: 'text-center',
      type: 'tag',
      tag: this.TAG,
    },
    {
      title: '延期截止日期',
      //render: 'effectiveDate',
      index: 'delayEndTime',
      width: '140px',
      className: 'text-center',
      sort: this.tableParameter.sortDef,
    },
    {
      title: '原整改截止日期',
      index: 'endTime',
      width: '140px',
      className: 'text-center',
      sort: this.tableParameter.sortDef,
    },
    { title: '批复人', index: 'replyUser.name', width: '100px' },
    { title: '批复日期', index: 'replyTime', width: '140px', className: 'text-center', sort: this.tableParameter.sortDef },
    { title: '申请人', index: 'createUser.name', width: '100px' },
    { title: '申请日期', index: 'createdTime', width: '140px', className: 'text-center', sort: this.tableParameter.sortDef },
    { title: '操作', render: 'operations', width: '150px', className: 'text-center' },
  ];

  /**
   * 对应的列表中表的数据
   */
  listOfData = [];

  currentItem: null;

  current: RectifyProblemDelayApplyEditInfoDTO;

  handleCancel() {
    this.isVisible = false;
  }

  ngOnInit(): void {}

  /**
   *
   * @param e 翻页设置
   */
  stChange(e: any) {}

  /**
   * 打开列表弹窗
   */
  Open() {
    this.load();
    this.isVisible = true;
  }

  /**
   * 加载列表数据
   */
   load() {
    this.loading = true;
    this.rectifyProblemDelayApplyService.findAll().subscribe( data => {
      this.tableData = data;

      // this.showReplyUserName = this.tableData && this.tableData.replyUser.name ? this.tableData.replyUser.name : null;
      // this.showCreateUserName = this.tableData && this.tableData.createUser.name ? this.tableData.createUser.name : null;

      if (this.tableData.status === 'PASS ') {
        this.showButton = true;
      }

      console.log(this.tableData);
      console.log(data);
    },
    null,
    () => (this.loading = false),
    );
  }

  saveData(item: RectifyProblemDelayApplyEditInfoDTO) {
    this.isVisible = false;

    // this.rectifyProblemDelayApplyService.updateProblem(item.id, item).subscribe( data => {
    //   console.log(data);
    // });

  }

  /**
   * 查看
   */
  watch(item: RectifyProblemDelayApplyDTO) {
    this.rectifyWorkbeachPutComponent.isWatchForTable = true;

    if (item) {
      console.log(item.id);
      this.rectifyWorkbeachPutComponent.problems(item.id);
    }

    //isRectify == true 是 部门
    //isRectify == false 是 人员

    this.rectifyWorkbeachPutComponent.create = true;

    this.rectifyWorkbeachPutComponent.isVisible = true;
    //this.rectifyWorkbeachPutComponent.access = true;
    this.rectifyWorkbeachPutComponent.isable = true;

  }

  /**
   * 批复人与批复日期显示还是不显示
   */
  isShowData() {
    this.listOfData[0].name1 = '';
    this.listOfData[0].time = '';
    this.rectifyWorkbeachPutComponent.access = true;
  }

  /**
   * 弹窗列表显示数据
   */
  tableList() {
    console.log(this.current.id);
    this.rectifyProblemDelayApplyService.delayedRectification(this.current.id).subscribe(data => {
      console.log(data);
    });
  }

  change(item: RectifyProblemDelayApplyEditInfoDTO) {
    this.rectifyWorkbeachPutComponent.create = false;
    this.rectifyWorkbeachPutComponent.isable = false;
    this.rectifyWorkbeachPutComponent.isRectify = true;

    this.rectifyWorkbeachPutComponent.isVisible = true;
    this.rectifyWorkbeachPutComponent.problems(item.id, item);


  }

  delect(item: RectifyProblemDelayApplyDTO) {
    console.log(item.id);
    this.rectifyProblemDelayApplyService.delete(item.id).subscribe( () => {
      this.load();
    });
  }


}
