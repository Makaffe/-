import { UserBaseDTO } from '@ng-mt-framework/api';
import { DepartmentBaseDTO } from './DepartmentBaseDTO';
import { PositionBaseDTO } from './PositionBaseDTO';
import { RoleBaseDTO } from './RoleBaseDTO';
import { UnitBaseDTO } from './UnitBaseDTO';

/**
 * 组织信息 DTO
 * @Author jdiosajdoisajdas
 * @Date 2021/10/12
 */
export interface OrganizationDTO {
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
  shortName?: string;

  /**
   * 组织架构类型, 标识关联是单位，部门，还是岗位
   */
  organizationType: string;

  /**
   * 子资源列表
   */
  children: Array<OrganizationDTO>;

  /**
   * 父组织ID
   */
  parent: OrganizationDTO;

  /**
   * 是否可用，与关联的对象相同
   */
  available: boolean;

  /**
   * 是否内部
   */
  interior: boolean;

  /**
   * 关联的单位，如果类型是单位的话
   */
  unit: UnitBaseDTO;

  /**
   * 关联的部门，如果类型是部门的话
   */
  department: DepartmentBaseDTO;

  /**
   * 关联的岗位，如果类型是岗位的话
   */
  position: PositionBaseDTO;

  /**
   * 显示顺序
   */
  showOrder: number;

  /**
   * 拥有该组织的所有角色ID
   */
  assignedRoles: Array<RoleBaseDTO>;

  /**
   * 子集是否可选
   */
  childrenSelect: boolean;

  /**
   * 数据过滤路径
   */
  filterPath: string;

  /**
   * 是否可选
   */
  select: boolean;

  /**
   * 结点路径
   */
  treePath: string;

  /**
   * 父组织ID
   */
  parentId: string;

  /**
   * 属于组织员工对应的用户
   */
  userBaseDTOS: Array<UserBaseDTO>;
}
