import { OrganizationDTO, UserBaseDTO } from '@ng-mt-framework/api';
import { AuthorityBaseDTO } from './AuthorityBaseDTO';

/**
 * 角色详细信息 DTO
 * @Author jdiosajdoisajdas
 * @Date 2021/10/12
 */
export interface RoleDTO {
  /**
   * 对象ID，新增时应当为null, 系统会自动生成
   */
  id: string;

  /**
   * 名称, 要求唯一性
   */
  name: string;

  /**
   * 备注，说明该Role应当分配给什么样的人使用
   */
  remark?: string;

  /**
   * 创建数据的用户ID，系统根据token自动填写
   */
  createUser: UserBaseDTO;

  /**
   * 创建数据的时间，系统根据服务器时间自动填写
   */
  createdTime: string;

  /**
   * 最后修改者的ID，系统根据token自动填写
   */
  lastModifyUser: UserBaseDTO;

  /**
   * 最后的修收时间，系统根据服务器时间自动填写
   */
  lastModifiedTime: string;

  /**
   * 数据过滤路径，系统自动填写
   */
  filterPath: string;

  /**
   * 拥有该角色的所有所有组织ID
   */
  assignedOrganizations: Array<OrganizationDTO>;

  /**
   * 拥有该角色的所有所有权限ID
   */
  assignedAuthority: Array<AuthorityBaseDTO>;
}
