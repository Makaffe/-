import { DataScopeDTO } from '@ng-mt-framework/api';

/**
 * undefined DTO
 * @Author jdiosajdoisajdas
 * @Date 2021/10/12
 */
export interface PositionBaseDTO {
  /**
   * 对象ID，新增时应当为null, 系统会自动生成
   */
  id: string;

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

  /**
   * 岗位对应的可访问的组织架构数据
   */
  accessibleOrganizations: Array<DataScopeDTO>;
}
