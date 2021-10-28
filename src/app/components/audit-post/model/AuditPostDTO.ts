import { SystemFileDTO, UserBaseDTO } from '@ng-mt-framework/api';
import { RectifyProblemDTO } from '../../rectify-issue/model/rectify-problem-dto';
import { AuditPostTypeDTO } from './AuditPostTypeDTO';

/**
 * 审计报告信息 DTO
 * @Author jdiosajdoisajdas
 * @Date 2021/10/12
 */
export class AuditPostDTO {
  constructor(item?: AuditPostDTO) {
    this.id = item && item.id ? item.id : null;
    this.auditName = item && item.auditName ? item.auditName : null;
    this.auditTarget = item && item.auditTarget ? item.auditTarget : null;
    this.name = item && item.name ? item.name : null;
    this.auditStartTime = item && item.auditStartTime ? item.auditStartTime : null;
    this.auditEndTime = item && item.auditEndTime ? item.auditEndTime : null;
    this.reportSource = item && item.reportSource ? item.reportSource : null;
    this.rectifyProblems = item && item.rectifyProblems ? item.rectifyProblems : [];
    this.auditPostType = item && item.auditPostType ? item.auditPostType : null;
    this.auditPostTypeId = item && item.auditPostTypeId ? item.auditPostTypeId : null;
    this.systemFile = item && item.systemFile ? item.systemFile : null;
    this.systemFiles = item && item.systemFiles ? item.systemFiles : [];
  }
  /**
   * 对象ID，新增时应当为null, 系统会自动生成
   */
  id?: string;

  /**
   * 审计单位名称
   */
  auditName?: string;

  /**
   * 被审计单位名称
   */
  auditTarget?: string;

  /**
   * 报告名称
   */
  name?: string;

  /**
   * 审计开始时间
   */
  auditStartTime?: string;

  /**
   * 审计结束时间
   */
  auditEndTime?: string;

  /**
   * 报告来源
   */
  reportSource?: string;

  /**
   * 整改问题清单
   */
  rectifyProblems?: RectifyProblemDTO[];

  /**
   * 创建数据的用户ID，系统根据token自动填写
   */
  createUser?: UserBaseDTO;

  /**
   * 创建数据的时间，系统根据服务器时间自动填写
   */
  createdTime?: string;

  /**
   * 审计报告状态
   */
  auditReportStatus?: string;

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
  auditPostType?: AuditPostTypeDTO;

  /**
   * 上传的报告信息
   */
  systemFile?: SystemFileDTO;

  /**
   * 上传的附件信息
   */
  systemFiles?: Array<SystemFileDTO>;

  auditDateRange?: Date[];

  auditPostTypeId: string;
}
