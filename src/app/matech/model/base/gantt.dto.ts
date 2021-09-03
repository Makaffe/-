import { UserDTO } from '@ng-mt-framework/api';

export class Task {
  id: string;
  start_date?: string;
  end_date?: string;
  text: string;
  progress?: number;
  duration?: number;
  parent?: string;
  open?: boolean;
  userIds?: string[];
  auditMatterId?: string;
  color?: string;
  textColor?: string;
  progressColor?: string;
  textTmplate?: string;
  readonly: boolean;
  rowBgColor?: string;
}

export class Link {
  id: string;
  source: string;
  target: string;
  type: string;
}

export class GanttDTO {
  /**
   * 是否只读
   */
  readonly: boolean;

  id: string;

  /**
   * 任务开始时间
   */
  startTime: string;

  /**
   * 任务结束时间
   */
  endTime: string;

  /**
   * 任务名称
   */
  name: string;

  /**
   * 子结点
   */
  children?: GanttDTO[];
  /**
   * 父id
   */
  parentId?: string;

  /**
   * 审计事项
   */
  projectMatters?: any;
  projectMattersId?: string;

  /**
   * 人员
   */
  auditor?: any[];
  auditorId?: string[];

  /**
   * 任务进度
   */
  progress?: number;

  /**
   * 任务条颜色
   */
  color?: string;

  /**
   * 任务条文字颜色
   */
  textColor?: string;

  /**
   * 进度条那一行的颜色的样式名className
   */
  rowBgColor?: string;

  /**
   * 任务进度颜色
   */
  progressColor?: string;

  /**
   * 任务条文字显示样式
   */
  textTmplate?: string;
}
