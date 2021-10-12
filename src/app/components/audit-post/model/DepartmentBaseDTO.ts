/**
 * undefined DTO
 * @Author jdiosajdoisajdas
 * @Date 2021/10/12
 */
export interface DepartmentBaseDTO {
  /**
   * ID
   */
  id: string;

  /**
   * 分管领导id
   */
  branchLeadId: string;

  /**
   * 名称
   */
  name: string;

  /**
   * 简称
   */
  shortName: string;

  /**
   * 在OA系统中的ID
   */
  oaId: string;

  /**
   * 是否可用
   */
  available: boolean;

  /**
   * 显示顺序
   */
  showOrder: number;

  /**
   * 是否内部
   */
  interior: boolean;
}
