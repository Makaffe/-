// tslint:disable-next-line:no-empty-interface
export interface RectifyProblemTypeEditInfoDTO {
  /**
   * 类型id
   */
  id?: string;

  /**
   * 类型名字
   */
  name: string;

  /**
   * 备注
   */
  remark?: string;

  /**
   * 父id
   */
  parentId?: string;

  /**
   * 父
   */
  parent?: RectifyProblemTypeEditInfoDTO;
}
