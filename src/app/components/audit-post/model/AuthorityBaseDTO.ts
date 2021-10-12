/**
 * undefined DTO
 * @Author jdiosajdoisajdas
 * @Date 2021/10/12
 */
export interface AuthorityBaseDTO {
  /**
   * 对象ID，新增时应当为null, 系统会自动生成
   */
  id: string;

  /**
   * 权限编号, 要求唯一性。需要使用"数据类型_操作类型"的形式, 操作类型为CRUD, 建议使用CREATE, RETRIEVE, UPDATE, DELETE
   */
  code: string;

  /**
   * 权限名称
   */
  name: string;

  /**
   * 备注，说明该权限有何作用
   */
  remark?: string;

  /**
   * 权限所属的类型
   */
  type: string;
}
