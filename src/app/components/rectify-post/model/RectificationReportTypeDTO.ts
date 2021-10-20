/**
 * RectificationReportTypeDTO
 * @Author gyl
 * @Date 2021/10/19
 */
export class RectificationReportTypeDTO {
  constructor(item?: RectificationReportTypeDTO) {
    this.id = item && item.id ? item.id : null;
    this.name = item && item.name ? item.name : null;
    this.remark = item && item.remark ? item.remark : null;
    this.showOrder = item && item.showOrder ? item.showOrder : null;
    this.children = item && item.children ? item.children : [];
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
   * 描述
   */
  remark: string;

  /**
   * 子级
   */
  children: Array<RectificationReportTypeDTO>;

  /**
   * 父级
   */
  parent: RectificationReportTypeDTO;

  /**
   * 父级ID
   */
  parentId: string;

  /**
   * 显示顺序
   */
  showOrder: number;

}
