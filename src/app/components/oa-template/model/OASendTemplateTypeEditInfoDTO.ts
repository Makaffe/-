/**
 * 增加或修改OA发文模板类型基本信息 DTO
 * @Author jdoaisjdoaisjdoais
 * @Date 2021/10/13
 */
export interface OASendTemplateTypeEditInfoDTO {
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
