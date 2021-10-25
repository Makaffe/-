import { RectifyProblemDTO } from '@mt-rectify-framework/comp/rectify-issue';

/**
 * RectifyTrackDTO
 * @Author
 * @Date 2021/10/19
 */
export class RectifyTrackDTO extends RectifyProblemDTO {
  /**
   * 已完成整改措施数
   */
  rectifyCount?: number;

  /**
   * 最近一次反馈时间
   */
  latelyFeedbackTime?: string;

  /**
   * 下一次反馈时间
   */
  nextFeedbackTime?: string;
}
