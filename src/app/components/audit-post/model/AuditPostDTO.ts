import { SystemFileDTO, UserBaseDTO } from '@ng-mt-framework/api';
import { AuditPostTypeDTO } from './AuditPostTypeDTO';
import { RectifyProblemDTO } from './RectifyProblemDTO';

/**
 * 审计报告信息 DTO
 * @Author jdiosajdoisajdas
 * @Date 2021/10/12
 */
export interface AuditPostDTO {
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
   * 创建数据的用户ID，系统根据token自动填写
   */
  createUser: UserBaseDTO;

  /**
   * 创建数据的时间，系统根据服务器时间自动填写
   */
  createdTime: string;

  /**
   * 报告来源
   */
  reportSource: string;

  /**
   * 审计报告状态
   */
  auditReportStatus: string;

  /**
   * 最后修改者的ID，系统根据token自动填写
   */
  lastModifyUser: UserBaseDTO;

  /**
   * 最后的修收时间，系统根据服务器时间自动填写
   */
  lastModifiedTime: string;

  /**
   * 数据过滤路径，系统自动填写
   */
  filterPath: string;

  /**
   * 审计报告类型
   */
  auditPostType: AuditPostTypeDTO;

  /**
   * 整改问题清单
   */
  rectifyProblem: RectifyProblemDTO;

  /**
   * 关联的附件信息
   */
  systemFiles: Array<SystemFileDTO>;
}
