/**
 * ProposalTemplateTypeDTO
 * @Author gyl
 * @Date 2021/10/15
 */
export class ProposalTemplateTypeDTO {
  constructor(item?: ProposalTemplateTypeDTO) {
    this.id = item && item.id ? item.id : null;
    this.name = item && item.name ? item.name : null;
    this.remark = item && item.remark ? item.remark : null;
    this.children = item && item.children.length > 0 ? item.children : [];
    this.parent = item && item.parent ? item.parent : null;
    this.parentId = item && item.parentId ? item.parentId : null;
  }
  /**
   * 对象ID，新增时应当为null, 系统会自动生成
   */
  id: string;

  /**
   * 名称
   */
  name: string;

  /**
   * 备注
   */
  remark: string;

  /**
   * 子级
   */
  children: Array<ProposalTemplateTypeDTO>;

  /**
   * 父级
   */
  parent: ProposalTemplateTypeDTO;

  /**
   * 父级ID
   */
  parentId: string;

}
