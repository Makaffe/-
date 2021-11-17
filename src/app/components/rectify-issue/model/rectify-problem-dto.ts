import { SystemFileDTO } from '@mt-framework-ng/core';
import { OrganizationDTO, UserBaseDTO, UserDTO } from '@ng-mt-framework/api';
import { AuditReportDTO } from '../../audit-post/newmodel/AuditReportDTO';
import { ProposalTemplateDTO } from '../../advice-template/model/ProposalTemplateDTO';

/**
 * 整改问题清单信息 DTO
 * @Author LiHongXiang
 * @Date 2021/10/13
 */
export class RectifyProblemDTO {
  constructor(item?: RectifyProblemDTO) {
    this.id = item && item.id ? item.id : null;
    this.name = item && item.name ? item.name : null;
    this.mainType =
      item && item.rectifyProblemType && item.rectifyProblemType.parent
        ? item.rectifyProblemType.parent.id
        : item && item.rectifyProblemType
          ? item.rectifyProblemType.id
          : null;
    this.money = item && item.money ? item.money : null;
    this.isTrunk = item && item.isTrunk ? item.isTrunk : false;
    this.multipleYearRectify = item && item.multipleYearRectify ? item.multipleYearRectify : false;
    this.source = item && item.source ? item.source : null;
    this.sendStatus = item && item.sendStatus ? item.sendStatus : null;
    this.trackStatus = item && item.trackStatus ? item.trackStatus : null;
    this.remark = item && item.remark ? item.remark : null;
    this.advice = item && item.advice ? item.advice : null;
    this.description = item && item.description ? item.description : null;
    this.memorandum = item && item.memorandum ? item.memorandum : null;
    this.noRectifyStatus = item && item.noRectifyStatus ? item.noRectifyStatus : false;
    this.noRectifyReason = item && item.noRectifyReason ? item.noRectifyReason : null;
    this.autoReminderDay = item && item.autoReminderDay ? item.autoReminderDay : null;
    this.autoReminderTemple = item && item.autoReminderTemple ? item.autoReminderTemple : null;
    this.auditOpinion = item && item.auditOpinion ? item.auditOpinion : null;
    this.rectifyDepartmentReadTime = item && item.rectifyDepartmentReadTime ? item.rectifyDepartmentReadTime : null;
    this.disciplineInspectionReadTime =
      item && item.disciplineInspectionReadTime ? item.disciplineInspectionReadTime : null;
    this.auditReport = item && item.auditReport ? item.auditReport : null;
    this.auditReportId = item && item.auditReport ? item.auditReport.id : null;
    this.rectifyUnit = item && item.rectifyUnit ? item.rectifyUnit : null;
    this.auditOpinion = item && item.auditOpinion ? item.auditOpinion : null;
    this.transferStatus = item && item.transferStatus ? item.transferStatus : null;
    this.oaSendCase = item && item.oaSendCase ? item.oaSendCase : false;
    this.rectifyDepartment = item && item.rectifyDepartment ? item.rectifyDepartment : null;
    this.auditUser = item && item.auditUser ? item.auditUser : null;
    this.dutyUser = item && item.dutyUser ? item.dutyUser : null;
    this.oaSendTime = item && item.oaSendTime ? item.oaSendTime : null;
    this.transferTime = item && item.transferTime ? item.transferTime : null;
    this.rectifyStartTime = item && item.rectifyStartTime ? item.rectifyStartTime : null;
    this.rectifyEndTime = item && item.rectifyEndTime ? item.rectifyEndTime : null;
    this.transferCase = item && item.transferCase ? item.transferCase : false;
    this.rectifyCompleteTime = item && item.rectifyCompleteTime ? item.rectifyCompleteTime : null;
    this.rectifyBackFeedHz = item && item.rectifyBackFeedHz ? item.rectifyBackFeedHz : null;
    this.rectifyProgress = item && item.rectifyProgress ? item.rectifyProgress : null;
    this.rectifyProblemType = item && item.rectifyProblemType ? item.rectifyProblemType : null;
    this.memo = item && item.memo ? item.memo : null;
    this.children = item && item.children ? item.children : [];
    this.parent = item && item.parent ? item.parent : null;
    this.uuid = item && item.uuid ? item.uuid : null;
    this.key = item && item.key ? item.key : null;
    this.editable = item && item.editable ? item.editable : null;
    this.attachFiles = item && item.attachFiles ? item.attachFiles : [];
    this.noRectifyAttachFiles = item && item.noRectifyAttachFiles ? item.noRectifyAttachFiles : [];
    this.noRectifyAttachFileIds = item && item.noRectifyAttachFileIds ? item.noRectifyAttachFileIds : [];
    this.selectedRectifyDepartment = item && item.selectedRectifyDepartment ? item.selectedRectifyDepartment : [];
    this.selectedRectifyPeople = item && item.selectedRectifyPeople ? item.selectedRectifyPeople : [];
    this.auditUserId = item && item.auditUser ? item.auditUser.id : null;
    this.dutyUserId = item && item.dutyUser ? item.dutyUser.id : null;
    this.rectifyProblemTypeId = item && item.rectifyProblemType ? item.rectifyProblemType.id : null;
    this.rectifyUnitId = item && item.rectifyUnit ? item.rectifyUnit.id : null;
    this.rectifyDepartmentId = item && item.rectifyDepartment ? item.rectifyDepartment.id : null;
    this.parentId = item && item.parent ? item.parent.id : null;
    this.dutyUserName = item && item.dutyUserName ? item.dutyUserName : null;
    this.unitAndDepartment = item && item.unitAndDepartment ? item.unitAndDepartment : null;
    this.rectifyProblemCategory = item ? item.rectifyProblemCategory : 'AUDIT_OPINION';
    this.proposalTemplateId = item && item.proposalTemplate ? item.proposalTemplate.id : null;
    this.orgLevel = item && item.orgLevel ? item.orgLevel : null;
    this.childrenRectifyProblemEditInfoDTO = item && item.children ? item.children : [];
  }
  /**
   * 对象ID，新增时应当为null, 系统会自动生成
   */
  id?: string;

  /**
   * 问题名称
   */
  name?: string;

  /**
   * 一级问题类型 ：便于分类统计 问题类型 顶级id
   */
  mainType?: string;

  /**
   * 涉及金额
   */
  money?: number;

  /**
   * 是否问题主干：用于区分问题主干与拆分 （从报告新增中添加的数据 默认 true） 拆分新增的数据默认 false
   */
  isTrunk?: boolean;

  /**
   * 是否跨年整改 默认 false
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
   * 问题描述,TEXT存储
   */
  description?: string;

  /**
   * 备忘录,TEXT存储
   */
  memorandum?: string;

  /**
   * 备忘录,TEXT存储
   */
  noRectifyStatus?: boolean;

  /**
   * 无法整改原因,TEXT存储
   */
  noRectifyReason?: string;

  /**
   * 自动催办节点（在下次反馈前多少天进行自动提示催办）
   */
  autoReminderDay?: number;

  /**
   * 自动催办节点（在下次反馈前多少天进行自动提示催办）
   */
  autoReminderTemple?: string;

  /**
   * 审计建议
   */
  auditOpinion?: string;

  /**
   * 整改部门阅读时间
   */
  rectifyDepartmentReadTime?: string;

  /**
   * 纪检部门阅读时间
   */
  disciplineInspectionReadTime?: string;

  /**
   * 审计报告
   */
  auditReport?: AuditReportDTO;
  auditReportId?: string;
  /**
   * 整改单位
   */
  rectifyUnit?: any;

  /**
   * 创建数据的时间，系统根据服务器时间自动填写
   */
  createdTime?: string;

  /**
   * 最后修改者的ID，系统根据token自动填写
   */
  lastModifyUser?: UserBaseDTO;

  /**
   * 最后的修收时间，系统根据服务器时间自动填写
   */
  lastModifiedTime?: string;

  /**
   * 数据过滤路径，系统自动填写
   */
  filterPath?: string;

  /**
   * 移交状态，枚举
   */
  transferStatus?: string;

  /**
   * OA发送情况
   */
  oaSendCase?: boolean;

  /**
   * 整改部门
   */
  rectifyDepartment?: OrganizationDTO;
  rectifyDepartmentId?: string;

  /**
   * auditUser
   */
  auditUser?: any;
  auditUserId?: string;
  /**
   * 整改责任人
   */
  dutyUser?: UserBaseDTO;
  dutyUserId?: string;

  /**
   * OA发送时间
   */
  oaSendTime?: string;

  /**
   * 移交时间
   */
  transferTime?: string;

  /**
   * 整改拟开始时间
   */
  rectifyStartTime?: string;
  /**
   * 整改拟开始时间
   */
  rectifyEndTime?: string;

  /**
   * 移交情况
   */
  transferCase?: boolean;

  /**
   * 整改拟完成时间
   */
  rectifyCompleteTime?: string;

  /**
   * 整改反馈频率
   */
  rectifyBackFeedHz?: number;

  /**
   * 整改反馈频率单位,枚举
   */
  rectifyBackFeedHzUnit?: string;

  /**
   * 整改进度
   */
  rectifyProgress?: number;

  rectifyProblemType?: any;

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
   * UUID
   */
  uuid?: string;

  /**
   * key
   */
  key?: number;

  /**
   * 是否可编辑
   */
  editable?: boolean;

  attachFiles?: Array<SystemFileDTO>;

  noRectifyAttachFiles?: Array<SystemFileDTO>;

  noRectifyAttachFileIds?: Array<string>;

  selectedRectifyDepartment?: OrganizationDTO[];

  selectedRectifyPeople?: UserDTO[];
  rectifyUnitId?: string;
  rectifyProblemTypeId?: string;
  unitAndDepartment?: string;
  dutyUserName?: string;
  zgdw?: any;
  sjje?: any;
  zgjzsj?: any;

  rectifyProblemCategory?: string;

  /**
   * 建议模板编码
   */
  proposalTemplateId?: string;
  proposalTemplate?: ProposalTemplateDTO;

  /**
   * 组织level
   */
  orgLevel?: string;

  /**
   * 子问题信息
   */
  childrenRectifyProblemEditInfoDTO?: Array<RectifyProblemDTO>;

}
