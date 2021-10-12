/**
 * undefined DTO
 * @Author jdiosajdoisajdas
 * @Date 2021/10/12
 */
export interface EmployeeBaseDTO {
  /**
   * ID
   */
  id: string;

  /**
   * 员工编号
   */
  code: string;

  /**
   * 邮箱
   */
  email: string;

  /**
   * 手机号码
   */
  phoneNumber: string;

  /**
   * 固定电话
   */
  telephone: string;

  /**
   * 员工姓名
   */
  name: string;

  /**
   * 出生日期
   */
  birthDate: string;

  /**
   * 性别
   */
  gender: string;

  /**
   * 学历
   */
  degreeType: string;

  /**
   * 职称
   */
  professionalTitle: string;

  /**
   * 入职日期
   */
  joinTime: string;

  /**
   * 员工在OA系统中的ID
   */
  oaId: string;

  /**
   * 员工在OA系统中的登录账号
   */
  oaAccount: string;

  /**
   * 员工在OA系统中的密码
   */
  oaPassword: string;

  /**
   * 员工的可用状态
   */
  available: boolean;

  /**
   * 显示顺序
   */
  showOrder: number;

  /**
   * 默认组织(岗位)id
   */
  defaultOrganizationId: string;
}
