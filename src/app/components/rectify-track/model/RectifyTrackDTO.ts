import { UserBaseDTO } from '@ng-mt-framework/api';

/**
 * OA发文模板信息 DTO
 * @Author jdoaisjdoaisjdoais
 * @Date 2021/10/13
 */
export interface RectifyTrackDTO {
  /**
   * 整改问题名称,支持模糊查询
   */
  rectifyProblemName: string;

  /**
   * 整改部门id
   */
  rectifyDepartmentId: string;

  /**
   * 问题状态
   */
  sendStatus: string;

  /**
   * 移交状态
   */
  transferStatus: string;

  /**
   * 开始时间
   */
  startTime: string;

  /**
   * 截止时间
   */
  endTime: string;

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
}
