import { UserBaseDTO } from '@ng-mt-framework/api';
import { AuditReportTypeBaseDTO } from './AuditReportTypeBaseDTO';

/**
 * 审计报告类型信息 DTO
 * @Author 111
 * @Date 2021/11/1
 */
export interface AuditReportTypeDTO {
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
   * 父级
   */
  parent: AuditReportTypeBaseDTO;

  /**
   * 子集
   */
  children: Array<AuditReportTypeDTO>;
}
