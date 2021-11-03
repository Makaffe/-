import { UserBaseDTO } from '@ng-mt-framework/api';
import { RectifyProblemTypeEditInfoDTO } from './RectifyProblemTypeEditInfoDTO';

export interface RectifyProblemTypeDTO {
  /**
   * 对象ID，新增时应当为null, 系统会自动生成
   */
  id: string;

  /**
   * 问题类型名称
   */
  name: string;

  /**
   * 备注
   */
  remark: string;

  /**
   * 父节点
   */
  parent?: RectifyProblemTypeEditInfoDTO;

  children?: Array<RectifyProblemTypeEditInfoDTO>;

  /**
   * 创建数据的用户ID，系统根据token自动填写
   */
  createUser?: UserBaseDTO;

  /**
   * 创建数据的时间，系统根据服务器时间自动填写
   */
  createdTime?: string;

  /**
   * 最后修改者的ID，系统根据token自动填写
   */
  lastModifyUser?: UserBaseDTO;

  /**
   * 最后的修收时间，系统根据服务器时间自动填写
   */
  lastModifiedTime?: string;

  /**
   * 数据过滤路径，系统自动填写
   */
  filterPath?: string;
}
