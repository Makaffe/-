import { UserBaseDTO } from '@ng-mt-framework/api';

/**
 * 系统文件类 DTO
 * @Author 111
 * @Date 2021/11/1
 */
export interface SystemFileDTO {
  /**
   * 现文件名
   */
  name: string;

  /**
   * 原文件名
   */
  originalName: string;

  /**
   * 文件大小
   */
  size: number;

  /**
   * 文件分类，由使用者自行定义
   */
  type: string;

  /**
   * ID
   */
  id: string;

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
   * 引用id
   */
  referenceId: string;

  /**
      * 文档是否转换为图片（如果为true，可通过三种方式预览结果(都需要配置Nginx把trans_imgs代理到files目录同目录下才能显示图片)：
1，通过/api/base/files/{fileId}/transImage）接口获取图片列表放入自己的页面中预览（最自由）；
2，通过nginx代理的 trans_imgs/{file.name}/images-preview.html 获取简易预览的HTML，可直接放入Iframe，也可放入本身页面DIV容器；（半自由）；
3，通过nginx代理的 trans_imgs/{file.name}/images-preview-full.html 获取完整的预览HTML，只能放入Iframe，或者通过window.open打开单独页面。（存在限制）
      */
  transImage: boolean;

  /**
   * 文档是否进行ocr识别
   */
  ocrTxt: boolean;
}
