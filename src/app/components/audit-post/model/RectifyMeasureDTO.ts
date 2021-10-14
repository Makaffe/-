import { SystemFileDTO, UserBaseDTO } from '@ng-mt-framework/api';
import { RectifyProblemDTO } from '../../rectify-issue/model/rectify-problem-dto';
import { RectifyMeasureReplyDTO } from './RectifyMeasureReplyDTO';

/**
 * 整改措施信息 DTO
 * @Author jdiosajdoisajdas
 * @Date 2021/10/12
 */
export interface RectifyMeasureDTO {
  /**
   * 对象ID，新增时应当为null, 系统会自动生成
   */
  id: string;

  /**
   * 措施状态
   */
  status: string;

  /**
   * 措施类型
   */
  type: string;

  /**
   * 整改措施内容
   */
  content: string;

  /**
   * 创建数据的用户ID，系统根据token自动填写
   */
  createUser: UserBaseDTO;

  /**
   * 创建数据的时间，系统根据服务器时间自动填写
   */
  createdTime: string;

  /**
   * 整改拟完成时间
   */
  rectifyCompleteTime: string;

  /**
   * 最后修改者的ID，系统根据token自动填写
   */
  lastModifyUser: UserBaseDTO;

  /**
   * 整改进度
   */
  rectifyProgress: number;

  /**
   * 最后的修收时间，系统根据服务器时间自动填写
   */
  lastModifiedTime: string;

  /**
   * 数据过滤路径，系统自动填写
   */
  filterPath: string;

  /**
   * 整改措施回复
   */
  rectifyMeasureReply: RectifyMeasureReplyDTO;

  /**
   * 整改措施
   */
  rectifyProblems: Array<RectifyProblemDTO>;

  /**
   * 关联文件
   */
  systemFiles: Array<SystemFileDTO>;
}
