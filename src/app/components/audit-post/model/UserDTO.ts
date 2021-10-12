import { OrganizationDTO, UserBaseDTO } from '@ng-mt-framework/api';
import { AuthorityBaseDTO } from './AuthorityBaseDTO';
import { DepartmentBaseDTO } from './DepartmentBaseDTO';
import { EmployeeBaseDTO } from './EmployeeBaseDTO';
import { PositionBaseDTO } from './PositionBaseDTO';
import { RoleBaseDTO } from './RoleBaseDTO';
import { UnitBaseDTO } from './UnitBaseDTO';

/**
 * 用户信息 DTO
 * @Author jdiosajdoisajdas
 * @Date 2021/10/12
 */
export interface UserDTO {
  /**
   * undefined
   */
  password: string;

  /**
   * 对象ID，新增时应当为null, 系统会自动生成
   */
  id: string;

  /**
   * 登录账号, 要求在创建时验证唯一性
   */
  account: string;

  /**
   * 姓名
   */
  name: string;

  /**
   * 密码失效时间, null表示永久有效
   */
  passwordExpireDate: string;

  /**
   * 账号是否激活
   */
  enabled: boolean;

  /**
   * 账号失效时间，null表示永久有效
   */
  accountExpireDate: string;

  /**
   * 是否本地登录账号，非本地账号需要连接OA或其他系统验证登录
   */
  localAccount: boolean;

  /**
   * 备注
   */
  remark: string;

  /**
   * 手机号码
   */
  phoneNumber: string;

  /**
   * 最后修改密码的时间，系统自动生成
   */
  changePasswordTime: string;

  /**
   * 账号是否被锁住（通常是连续输错密码）
   */
  accountLocked: boolean;

  /**
   * 权限（所属角色和所属组织的权限）
   */
  authorities: Array<string>;

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
   * 用户所属员工
   */
  assignedEmployee?: EmployeeBaseDTO;

  /**
   * 拥有该用户的所有角色
   */
  assignedRoles: Array<RoleBaseDTO>;

  /**
   * 拥有该用户的所有权限
   */
  assignedAuthority: Array<AuthorityBaseDTO>;

  /**
   * 当前用户所属最顶级organization
   */
  topOrganizationDTOS: Array<OrganizationDTO>;

  /**
   * 当前用户所处的工作单位
   */
  unitDTO: UnitBaseDTO;

  /**
   * 当前用户所处的工作部门
   */
  departmentDTO: DepartmentBaseDTO;

  /**
   * 当前用户所处的工作岗位
   */
  positionDTO: PositionBaseDTO;

  /**
   * 当前用户所属最末级organization
   */
  endOrganizationDTOS: Array<OrganizationDTO>;
}
