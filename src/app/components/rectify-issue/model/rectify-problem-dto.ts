import { OrganizationDTO, UserBaseDTO } from '@ng-mt-framework/api';
import { AuditPostDTO } from '../../audit-post/model/AuditPostDTO';

/**
 * 整改问题清单信息 DTO
 * @Author LiHongXiang
 * @Date 2021/10/13
 */
export class RectifyProblemDTO {
  /**
   * 对象ID，新增时应当为null, 系统会自动生成
   */
  id?: string;

  /**
   * 问题名称
   */
  name?: string;

  /**
   * 问题类型，枚举
   */
  type?: string;

  /**
   * 创建数据的用户ID，系统根据token自动填写
   */
  createUser?: UserBaseDTO;

  /**
   * 描述
   */
  remark?: string;

  /**
   * 审计建议
   */
  advice?: string;

  /**
   * 创建数据的时间，系统根据服务器时间自动填写
   */
  createdTime?: string;

  /**
   * 最后修改者的ID，系统根据token自动填写
   */
  lastModifyUser?: UserBaseDTO;

  /**
   * 问题来源
   */
  source?: string;

  /**
   * 最后的修收时间，系统根据服务器时间自动填写
   */
  lastModifiedTime?: string;

  /**
   * 下发状态，枚举
   */
  sendStatus?: string;

  /**
   * 数据过滤路径，系统自动填写
   */
  filterPath?: string;

  /**
   * 跟踪情况
   */
  trackStatus?: string;

  /**
   * 审计报告
   */
  auditPost?: AuditPostDTO;

  /**
   * 移交状态，枚举
   */
  transferStatus?: string;

  /**
   * OA发送情况
   */
  oaSendCase?: boolean;

  /**
   * 所属部门
   */
  rectifyDepartments?: Array<OrganizationDTO>;

  /**
   * 整改责任人
   */
  dutyUsers?: Array<UserBaseDTO>;

  /**
   * OA发送时间
   */
  oaSendTime?: string;

  /**
   * 整改具体负责人
   */
  responsibleUsers?: Array<UserBaseDTO>;

  /**
   * 移交时间
   */
  transferTime?: string;

  /**
   * 移交情况
   */
  transferCase?: boolean;

  /**
   * 整改截止时间
   */
  rectifyEndTime?: string;

  /**
   * 整改拟完成时间
   */
  rectifyCompleteTime?: string;

  /**
   * 整改反馈频率
   */
  rectifyBackFeedHz?: number;

  /**
   * 整改反馈频率单位
   */
  rectifyBackFeedHzUnit?: string;

  /**
   * 整改进度
   */
  rectifyProgress?: number;

  /**
   * 备忘录
   */
  memo?: string;

  /**
   * 显示顺序
   */
  showOrder?: number;

  /**
   * 子问题列表
   */
  children?: Array<RectifyProblemDTO>;

  /**
   * 父问题
   */
  parent?: RectifyProblemDTO;

  /**
   * 父问题ID
   */
  parentId?: string;

  /**
   * 整改部门ID
   */
  rectifyDepartmentId?: string;

  /**
   * 整改负责人ID
   */
  rectifyPeopleId?: string;

  /**
   * UUID
   */
  uuid?: string;

  /**
   * 是否可编辑
   */
  editable?: boolean;
}
