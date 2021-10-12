/**
 * 新增或修改审计报告类型信息 DTO
 * @Author jdiosajdoisajdas
 * @Date 2021/10/12
 */
export interface AuditPostTypeEditInfoDTO {
  /**
   * 对象ID，新增时应当为null, 系统会自动生成
   */
  id: string;

  /**
   * 名称
   */
  name: string;

  /**
   * 父级ID
   */
  parentId: string;

  /**
   * 备注
   */
  remark: string;
}
