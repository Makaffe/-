import { AbstractBaseEntity } from '@mt-framework-ng/core';
import { RectifyProblemDTO } from '../../rectify-issue/model/rectify-problem-dto';

/**
 * Generated By SmartSwagger DTO
 * @Author chenzhongde
 * @Date 2021/11/3
 */
export interface RectifyProblemUrgeDTO extends AbstractBaseEntity {
  /**
   * 便于分类统计
   */
  type?: string;

  /**
   * 内容
   */
  content?: string;

  /**
   * 阅读日期
   */
  readTime?: string;

  /**
   * 关联所属问题对象
   */
  rectifyProblem?: RectifyProblemDTO;
}
