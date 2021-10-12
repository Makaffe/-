/**
 * 通用API出错时，返回的错误信息数据 DTO
 * @Author jdiosajdoisajdas
 * @Date 2021/10/12
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
