import { SystemFileDTO, UserBaseDTO } from "@ng-mt-framework/api";

export class RectifyProblemDelayApplyDTO {

  constructor(item?: RectifyProblemDelayApplyDTO) {
    this.id = item ? this.id : null;
    this.status = item ? this.status : 'DRAFT';
    this.applyReason = item ? this.applyReason : null;
    this.delayEndTime = item ? this.delayEndTime : null;
    this.replyTime = item ? this.replyTime : null;
    this.replyComments = item ? this.replyComments : null;
    this.beforeRectifyEndTime = item ? this.beforeRectifyEndTime : null;
    this.createUser = item ? this.createUser : null;
    this.createdTime = item ? this.createdTime : null;
    this.lastModifyUser = item ? this.lastModifyUser : null;
    this.filterPath = item ? this.filterPath : null;
    this.replyUser = item ? this.replyUser : null;
    this.attachFiles = item ? this.attachFiles : null;

  }

  /**
   * 对象ID，新增时应当为null, 系统会自动生成
   */
  id: string;

  /**
   * 状态
   */
   status: string;

   /**
    * 申请原因
    */
    applyReason?: string;

    /**
     * 提交延期截至日期
     */
     delayEndTime?: string;

     /**
      * 批复日期
      */
      replyTime?: string;

      /**
       * 批复意见
       */
       replyComments?: string;

       /**
        * 申请原因
        */
        beforeRectifyEndTime?: string;

        createUser: UserBaseDTO;

        /**
         * 创建数据的时间，系统根据服务器时间自动填写
         */
         createdTime: string;

         lastModifyUser: UserBaseDTO;

         /**
          * 最后的修收时间，系统根据服务器时间自动填写
          */
          lastModifiedTime: string;

          /**
           * 数据过滤路径，系统自动填写
           */
           filterPath: string;

           replyUser?: UserBaseDTO;

           /**
            * 关联附件编码集合
            */
            attachFiles?: Array<SystemFileDTO>;
}
