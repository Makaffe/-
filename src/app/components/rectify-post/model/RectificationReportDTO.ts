import { ReportFile, TemplateFile } from '@mt-insight-ng/insight';
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
    this.templateFile = item && item.templateFile ? item.templateFile : null;
    this.templateFileId = item && item.templateFileId ? item.templateFileId : null;
    this.reportFile = item && item.reportFile ? item.reportFile : null;
    this.reportFileId = item && item.reportFileId ? item.reportFileId : null;
    this.rectificationReportType = item && item.rectificationReportType ? item.rectificationReportType : null;
    this.rectificationReportTypeId = item && item.rectificationReportTypeId ? item.rectificationReportTypeId : null;
    this.categoryId = item && item.categoryId ? item.categoryId : null;
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
  templateFile?: TemplateFile;

  /**
   * 关联文书模板id
   */
  templateFileId?: string;

  /**
   * 关联文书报告
   */
  reportFile?: ReportFile;

  /**
   * 关联文书报告id
   */
  reportFileId?: ReportFile;

  /**
   * 整改报告类型
   */
  rectificationReportType?: RectificationReportTypeDTO;

  /**
   * 整改报告id
   */
  rectificationReportTypeId?: string;

  /**
   * 报告存储目录id
   */
  categoryId?: string;

}
