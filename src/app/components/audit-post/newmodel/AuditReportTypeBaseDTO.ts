/**
 * 审计报告类型类型基本信息 DTO
 * @Author 111
 * @Date 2021/11/1
 */
export interface AuditReportTypeBaseDTO {
  /**
   * 对象ID，新增时应当为null, 系统会自动生成
   */
  id: string;

  /**
   * 名称
   */
  name: string;

  /**
   * 备注
   */
  remark: string;
}
