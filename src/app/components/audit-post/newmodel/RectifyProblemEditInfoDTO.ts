/**
 * 创建或修改整改问题清单信息 DTO
 * @Author 88
 * @Date 2021/11/2
 */

import { RectifyProblemTypeEditInfoDTO } from '@mt-rectify-framework/comp/rectify-issue';

// tslint?:disable-next-line?:class-name
export interface RectifyProblemEditInfoDTO {
  /**
   * 对象ID，新增时应当为null, 系统会自动生成
   */
  id?: string;

  /**
   * 问题名称
   */
  name?: string;

  /**
   * 一级问题类型 ：便于分类统计 问题类型，字典（PROBLEM_TYPE）
   */
  mainType?: string;

  /**
   * 问题类型，字典（PROBLEM_TYPE）
   */
  rectifyProblemTypeId?: string;

  /**
   * 审计意见
   */
  auditOpinion?: string;

  /**
   * 是否问题主干：用于区分问题主干与拆分
   */
  isTrunk?: boolean;

  /**
   * 是否跨年整改
   */
  multipleYearRectify?: boolean;

  /**
   * 问题来源
   */
  source?: string;

  /**
   * 下发状态，枚举
   */
  sendStatus?: string;

  /**
   * 跟踪状态，枚举
   */
  trackStatus?: string;

  /**
   * 移交状态，枚举
   */
  transferStatus?: string;

  /**
   * OA发送情况
   */
  oaSendCase?: boolean;

  /**
   * OA发送时间
   */
  oaSendTime?: string;

  /**
   * 移交情况
   */
  transferCase?: boolean;

  /**
   * 移交时间
   */
  transferTime?: string;

  /**
   * 整改拟开始时间
   */
  rectifyStartTime?: string;

  /**
   * 整改拟完成时间
   */
  rectifyEndTime?: string;

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
   * 涉及金额
   */
  money?: number;

  /**
   * 审计建议,CLOB存储
   */
  advice?: string;

  /**
   * 问题描述,CLOB存储
   */
  description?: string;

  /**
   * 备忘录,CLOB存储
   */
  memorandum?: string;

  /**
   * 是否无法整改
   */
  noRectifyStatus?: boolean;

  /**
   * 无法整改原因,CLOB存储
   */
  noRectifyReason?: string;

  /**
   * 自动催办节点（在下次反馈前多少天进行自动提示催办）
   */
  autoReminderDay?: number;

  /**
   * 自动催办节点模板（在下次反馈前多少天进行自动提示催办）
   */
  autoReminderTemple?: string;

  /**
   * 审计报告id
   */
  auditReportId?: string;

  /**
   * 整改单位编码
   */
  rectifyUnitId?: string;

  /**
   * 整改部门编码
   */
  rectifyDepartmentId?: string;

  /**
   * 审计负责人(监督人)
   */
  auditUserId?: string;

  /**
   * 整改责任人
   */
  dutyUserId?: string;

  /**
   * 父id
   */
  parentId?: string;

  /**
   * 建议模板编码
   */
  proposalTemplateId?: string;

  /**
   * 关联附件编码集合
   */
  attachFileIds?: Array<string>;

  /**
   * 关联附件编码集合
   */
  noRectifyAttachFileIds?: Array<string>;

  /**
   * uuid
   */
  uuid?: string;

  /**
   * 问题类型
   */
  rectifyProblemType?: RectifyProblemTypeEditInfoDTO;

  /**
   * 审计问题类别
   */
  rectifyProblemCategory?: string;

  /**
   * 意见问题数
   */
  auditOpinionCount?: number;

   /**
    * 建议问题数
    */
   auditProposalCount?: number;
}
