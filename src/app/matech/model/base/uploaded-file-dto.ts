/**
 * 文件上传dto
 */
export class UploadedFileDTO {
  id?: string;

  /**
   * 文件名
   */
  name?: string;

  /**
   * 原文件名
   */
  originalName?: string;

  /**
   * 文件大小
   */
  size?: string;

  /**
   * 文件大小
   */
  type?: string;

  /**
   * 引用id
   */
  referenceId?: string;

  /**
   * 上传时间
   */
  uploadTime?: string;
}
