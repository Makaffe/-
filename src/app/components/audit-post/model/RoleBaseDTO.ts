/**
 * undefined DTO
 * @Author jdiosajdoisajdas
 * @Date 2021/10/12
 */
export interface RoleBaseDTO {
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
}
