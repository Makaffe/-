import { TemplateFile } from '@mt-insight-ng/insight';
import { RectificationReportTypeDTO } from './RectificationReportTypeDTO';

/**
 * RectificationReportDTO
 * @Author gyl
 * @Date 2021/10/20
 */
export class RectificationReportDTO {
  constructor(item?: RectificationReportDTO) {
    this.id = item && item.id ? item.id : null;
    this.name = item && item.name ? item.name : null;
    this.auditStartTime = item && item.auditStartTime ? item.auditStartTime : null;
    this.auditEndTime = item && item.auditEndTime ? item.auditEndTime : null;
    this.auditReportStatus = item && item.auditReportStatus ? item.auditReportStatus : null;
    this.templateFiles = item && item.templateFiles ? item.templateFiles : [];
    this.templateFileIds = item && item.templateFileIds ? item.templateFileIds : null;
    this.rectificationReportType = item && item.rectificationReportType ? item.rectificationReportType : null;
    this.rectificationReportTypeId = item && item.rectificationReportTypeId ? item.rectificationReportTypeId : null;
  }


  /**
   * 对象ID，新增时应当为null, 系统会自动生成
   */
  id: string;

  /**
   * 名称
   */
  name: string;

  /**
   * 整改统计开始时间
   */
  auditStartTime: string;

  /**
   * 整改统计结束时间
   */
  auditEndTime: string;

  /**
   * 状态
   */
  auditReportStatus: string;

  /**
   * 关联文书模板
   */
  templateFiles: Array<TemplateFile>;

  /**
   * 关联文书模板ids,支持多个模板id-用逗号隔开
   */
  templateFileIds: string;

  /**
   * 整改报告类型
   */
  rectificationReportType: RectificationReportTypeDTO;

  /**
   * 整改报告id
   */
  rectificationReportTypeId: string;

}
