/**
 * 通用API出错时，返回的错误信息数据 DTO
 * @Author 111
 * @Date 2021/11/1
 */
export interface CommonErrorDTO {
  /**
   * 错误信息
   */
  message: string;

  /**
   * 异常堆栈信息
   */
  exception: string;
}
