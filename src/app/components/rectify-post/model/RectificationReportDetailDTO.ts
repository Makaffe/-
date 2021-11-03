import { RectificationReportDTO } from './RectificationReportDTO';

export class RectificationReportDetailDTO extends RectificationReportDTO {
  constructor(item?: RectificationReportDetailDTO) {
    super(item);
    this.summaryRules = item && item.summaryRules ? item.summaryRules : null;
    this.referenceId = item && item.referenceId ? item.referenceId : null;
  }
  /**
   * 汇总规则: 全部、单位、部门、报告
   */
  summaryRules: 'ALL' | 'UNIT' | 'DEPARTMENT' | 'REPORT';

  /**
   * 数据id，某一汇总规则下的数据id
   */
  referenceId: string;
}
