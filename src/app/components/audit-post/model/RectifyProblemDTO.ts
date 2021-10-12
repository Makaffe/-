import { RoleDTO, UserBaseDTO, UserDTO } from '@ng-mt-framework/api';
import { AuditPostDTO } from './AuditPostDTO';
import { RectifyMeasureReplyDTO } from './RectifyMeasureReplyDTO';
import { RectifyTimeLineDTO } from './RectifyTimeLineDTO';

/**
 * 整改问题清单信息 DTO
 * @Author jdiosajdoisajdas
 * @Date 2021/10/12
 */
export interface RectifyProblemDTO {
  /**
   * 对象ID，新增时应当为null, 系统会自动生成
   */
  id: string;

  /**
   * 问题名称
   */
  name: string;

  /**
   * 问题名称
   */
  type: string;

  /**
   * 创建数据的用户ID，系统根据token自动填写
   */
  createUser: UserBaseDTO;

  /**
   * 描述
   */
  remark: string;

  /**
   * 审计建议
   */
  advice: string;

  /**
   * 创建数据的时间，系统根据服务器时间自动填写
   */
  createdTime: string;

  /**
   * 最后修改者的ID，系统根据token自动填写
   */
  lastModifyUser: UserBaseDTO;

  /**
   * 问题来源
   */
  source: string;

  /**
   * 最后的修收时间，系统根据服务器时间自动填写
   */
  lastModifiedTime: string;

  /**
   * 下发状态
   */
  sendStatus: string;

  /**
   * 数据过滤路径，系统自动填写
   */
  filterPath: string;

  /**
   * 跟踪情况
   */
  trackStatus: string;

  /**
   * 审计报告
   */
  auditPosts: Array<AuditPostDTO>;

  /**
   * 整改措施回复
   */
  rectifyMeasureReply: RectifyMeasureReplyDTO;

  /**
   * 整改时间轴
   */
  rectifyTimeLine: RectifyTimeLineDTO;

  /**
   * 移交状态
   */
  transferStatus: string;

  /**
   * OA发送情况
   */
  oaSendCase: boolean;

  /**
   * 所属的角色
   */
  roles: Array<RoleDTO>;

  /**
   * 整改责任人
   */
  dutyUsers: Array<UserDTO>;

  /**
   * OA发送时间
   */
  oaSendTime: string;

  /**
   * 整改具体负责人
   */
  responsibleUsers: Array<UserDTO>;

  /**
   * 移交时间
   */
  transferTime: string;

  /**
   * 移交情况
   */
  transferCase: boolean;

  /**
   * 整改截止时间
   */
  rectifyEndTime: string;

  /**
   * 整改拟完成时间
   */
  rectifyCompleteTime: string;

  /**
   * 整改反馈频率
   */
  rectifyBackFeedHz: number;

  /**
   * 整改反馈频率单位
   */
  rectifyBackFeedHzUnit: string;

  /**
   * 整改进度
   */
  rectifyProgress: number;

  /**
   * 备忘录
   */
  memo: string;
}
