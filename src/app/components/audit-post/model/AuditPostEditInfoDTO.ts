import { SystemFileDTO } from '@ng-mt-framework/api';
import { RectifyProblemDTO } from '../../rectify-issue/model/rectify-problem-dto';

/**
 * 增加或修改审计报告信息基础信息 DTO
 * @Author jdoasjoid
 * @Date 2021/10/13
 */
export interface AuditPostEditInfoDTO {
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
   * 报告来源
   */
  reportSource: string;

  /**
   * 审计报告状态
   */
  auditReportStatus: string;

  /**
   * 审计报告类型id
   */
  auditPostTypeId: string;

  /**
   * 整改问题清单
   */
  rectifyProblems: Array<RectifyProblemDTO>;

  /**
   * 关联的附件信息
   */
  systemFile: SystemFileDTO;
}
