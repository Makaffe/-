import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { RectifyProblemDelayApplyDTO } from './model/RectifyProblemDelayApplyDTO.';
import { RectifyProblemDelayApplyEditInfoDTO } from './model/RectifyProblemDelayApplyEditInfoDTO';
import { RectifyProblemDelayApplyService } from './service/RectifyProblemDelayApplyService';

@Component({
  selector: 'app-rectify-workbeach-put',
  templateUrl: './rectify-workbeach-put.component.html',
  styles: [],
})
export class RectifyWorkbeachPutComponent implements OnInit {
  constructor(
    private msg: NzMessageService,
    private rectifyProblemDelayApplyService: RectifyProblemDelayApplyService,
  ) {}

  /**
   * 页面同意与不同意控制按钮
   */
  currentItem = {
    radioValue: null,
    replyComments: null,
  };

  /**
   * 状态是不是通过
   */
  access = false;

  /**
   * 是不是禁用按钮
   */
  isable = false;
  /**
   * 用于标记是否同意审批
   */
  isAgree = false;

  /**
   * 后端接收文件
   */
  systemFiles = [];

  /**
   * 是否是查看状态
   */
  isWatchForTable = false;

  /**
   * 是否是新建状态
   */
  create = false;

  /**
   * 批复人名称
   */
  currentReplyName = null;

  /**
   * 申请人的名称
   */
  currentCreateUserName = null;

  /**
   * 字段初始化
   */
  filter: RectifyProblemDelayApplyDTO = {
    id: null,
    status: 'DRAFT',
    applyReason: null,
    delayEndTime: null,
    replyTime: null,
    replyComments: null,
    beforeRectifyEndTime: null,
    createUser: null,
    createdTime: null,
    lastModifyUser: null,
    lastModifiedTime: null,
    filterPath: null,
    replyUser: null,
    attachFiles: [],
  };

  /**
   * 初始化对象
   */
  current: RectifyProblemDelayApplyDTO = new RectifyProblemDelayApplyDTO();

  /**
   * 判断是否为整改部门
   */
  @Input()
  isRectify = null;

  /**
   * 用来控制跳窗是否打开
   */
  isVisible = false;

  /**
   * 用于进行修改的ID
   */
  updateId = null;

  /**
   * 用于获取当前点击位置的ID，下的DTO
   */
  updateDTO: RectifyProblemDelayApplyEditInfoDTO;

  ngOnInit(): void {}

  /**
   * 用来控制打开弹窗
   */
  open() {
    if (!this.isRectify) {
    } else {
      console.log(this.current.id);
    }
    this.isVisible = true;
  }
  /**
   * 关闭弹窗
   */
  handleCancel() {
    this.isVisible = false;
  }

  /**
   * 点击完成保存
   */
  saveData(id?: string, dto?: RectifyProblemDelayApplyEditInfoDTO) {
    if (this.isRectify) {
      //部门进来的
      console.log(' 我是部门');

      //根据ID判断 是不是 第一次
      console.log(this.current.id);
      if (this.current.id === null) {
        this.apply();
      } else {
        //id不是空，需要修改

        this.updateDTO = this.current;
        this.update(this.updateId, this.updateDTO);
      }
    } else {
      //人员进来的

      console.log('我是 人员');
    }

    this.isVisible = false;
  }

  /**
   * 判断是否同意审批
   */
  agree() {
    //this.isAgree = !this.isAgree;
    this.isAgree = true;
  }

  /**
   * 获取单一审批问题
   */
  problems(id: string, dto?: RectifyProblemDelayApplyEditInfoDTO) {
    this.rectifyProblemDelayApplyService.delayedRectification(id).subscribe(data => {
      this.current = data;
      this.currentReplyName = this.current && this.current.replyUser ? this.current.replyUser.name : null;
      this.currentCreateUserName = this.current && this.current.createUser ? this.current.createUser.name : null;
    });

    this.updateId = id;
    this.updateDTO = dto;
  }

  /**
   * 开始进行申请
   */
  apply() {
    console.log(this.current);
    this.rectifyProblemDelayApplyService.addDelayRectify(this.current).subscribe(data => {
      console.log(data);
    });
  }

  /**
   * 修改申请审批
   */
  update(id: string, dto: RectifyProblemDelayApplyEditInfoDTO) {
    this.rectifyProblemDelayApplyService.updateProblem(id, dto).subscribe(data => {
      this.current = data;
      console.log(data);
    });
  }
}
