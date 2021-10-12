import { RoleDTO, UserBaseDTO, UserDTO } from '@ng-mt-framework/api';
import { RectifyMeasureDTO } from './RectifyMeasureDTO';

/**
 * 整改措施回复信息 DTO
 * @Author jdiosajdoisajdas
 * @Date 2021/10/12
 */
export interface RectifyMeasureReplyDTO {
  /**
   * 对象ID，新增时应当为null, 系统会自动生成
   */
  id: string;

  /**
   * 回复内容
   */
  replyContent: string;

  /**
   * 创建数据的用户ID，系统根据token自动填写
   */
  createUser: UserBaseDTO;

  /**
   * 创建数据的时间，系统根据服务器时间自动填写
   */
  createdTime: string;

  /**
   * 最后修改者的ID，系统根据token自动填写
   */
  lastModifyUser: UserBaseDTO;

  /**
   * 最后的修收时间，系统根据服务器时间自动填写
   */
  lastModifiedTime: string;

  /**
   * 数据过滤路径，系统自动填写
   */
  filterPath: string;

  /**
   * 整改措施
   */
  rectifyMeasures: Array<RectifyMeasureDTO>;

  /**
   * 所属的角色
   */
  roles: Array<RoleDTO>;

  /**
   * 关联的用户
   */
  users: Array<UserDTO>;
}
