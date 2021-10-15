/**
 * 新增或修改OA发文模板基础信息 DTO
 * @Author 的架
 * @Date 2021/10/14
 */
export interface OASendTemplateEditInfoDTO {
  /**
   * 对象ID，新增时应当为null, 系统会自动生成
   */
  id: string;

  /**
   * 名称
   */
  name: string;

  /**
   * 内容
   */
  content: string;

  /**
   * OA发文模板类型
   */
  oaSendTemplateTypeId: string;
}
