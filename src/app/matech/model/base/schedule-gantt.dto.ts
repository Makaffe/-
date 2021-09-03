export class SchduleGanntDTO {
  /**
   * 项目名称集合
   */
  categories: string[];
  /**
   * 项目开展情况数据
   */
  data: Array<ScheduleDetailDTO>;
}
export class ScheduleDetailDTO {
  name: string;
  value: Array<any>;
}
