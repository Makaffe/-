/**
 * 数据范围 DTO
 * @Author jdiosajdoisajdas
 * @Date 2021/10/12
 */
export interface DataScopeDTO {
  /**
   * ID
   */
  id: string;

  /**
   * 组织id
   */
  organizationId: string;

  /**
   * 数据类型
   */
  dataType: string;

  /**
   * 数据范围的资源类型，对应字典值DATA_SCOPE_RESOURCE_TYPE(如：LOG,USER,NOTICE)
   */
  resourceType: string;

  /**
   * 组织过滤数据路径 xx-xx-xx
   */
  organizationFilterPath: string;
}
