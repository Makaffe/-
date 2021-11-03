import { RectifyProblemDTO } from '@mt-rectify-framework/comp/rectify-issue';
import { SystemFileDTO, UserBaseDTO } from '@ng-mt-framework/api';
import { AuditReportTypeBaseDTO } from './AuditReportTypeBaseDTO';

/**
 * 审计报告信息 DTO
 * @Author 111
 * @Date 2021/11/1
 */
export interface AuditReportDTO {
  /**
   * 对象ID，新增时应当为null, 系统会自动生成
   */
  id: string;

  /**
   * 审计单位名称
   */
  auditName: string;

  /**
   * 报告名称
   */
  name: string;

  /**
   * 审计开始时间
   */
  auditStartTime: string;

  /**
   * 审计结束时间
   */
  auditEndTime: string;

  /**
   * 报告来源, 字典取值：取值标记(key)  MRF_REPORT_SOURCE
   */
  reportSource: string;

  /**
   * 审计报告状态
   */
  auditReportStatus: string;

  /**
   * 被审对象: 审计报告中时文本描述，到具体问题清单中进行单位部门关联
   */
  auditTarget: string;

  /**
   * 创建数据的用户ID，系统根据token自动填写
   */
  createUser?: UserBaseDTO;

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
   * 审计报告类型
   */
  auditReportType: string;

  /**
   * 关联的报告附件信息
   */
  reportFile?: SystemFileDTO;

  /**
   * 关联的附件信息
   */
  attachFiles?: Array<SystemFileDTO>;

  rectifyProblems?: RectifyProblemDTO[];
}
