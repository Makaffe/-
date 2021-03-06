import { RectifyProblemDTO } from '@mt-rectify-framework/comp/rectify-issue';
import { SystemFileDTO } from '@ng-mt-framework/api';
import { RectifyProblemEditInfoDTO } from './RectifyProblemEditInfoDTO';

/**
 * 增加或修改审计报告信息基础信息 DTO
 * @Author 111
 * @Date 2021/11/1
 */
export interface AuditReportEditInfoDTO {
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
  auditSource: string;

  /**
   * 审计报告状态
   */
  auditReportStatus: string;

  /**
   * 被审对象: 审计报告中时文本描述，到具体问题清单中进行单位部门关联
   */
  auditTarget: string;

  /**
   * 审计报告类型id
   */
  auditReportType: string;

  /**
   * 关联的报告附件信息
   */
  auditReportFileDTO?: SystemFileDTO;

  /**
   * 关联的附件信息
   */
  systemFileDTOS?: Array<SystemFileDTO>;

  /**
   * 关联问题数据集合
   */
  rectifyProblems?: Array<RectifyProblemEditInfoDTO>;
}
