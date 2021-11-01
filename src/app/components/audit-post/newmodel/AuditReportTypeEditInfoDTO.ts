/**
 * 新增或修改审计报告类型信息 DTO
 * @Author 111
 * @Date 2021/11/1
 */
export interface AuditReportTypeEditInfoDTO {
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

  /**
   * 父级ID
   */
  parentId: string;
}
