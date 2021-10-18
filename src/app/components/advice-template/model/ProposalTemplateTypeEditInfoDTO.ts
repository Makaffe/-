/**
 * 增加或修改建议模板类型基本信息 DTO
 * @Author makaffe
 * @Date 2021/10/18
 */
export interface ProposalTemplateTypeEditInfoDTO {
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
