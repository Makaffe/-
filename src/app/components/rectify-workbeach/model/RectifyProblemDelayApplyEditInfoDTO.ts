
export class RectifyProblemDelayApplyEditInfoDTO {

  constructor(item?: RectifyProblemDelayApplyEditInfoDTO) {
    this.id = item ? this.id : null;
    this.status = item ? this.status : 'DRAFT';
    this.applyReason = item ? this.applyReason : null;
    this.delayEndTime = item ? this.delayEndTime : null;
    this.replyTime = item ? this.replyTime : null;
    this.replyComments = item ? this.replyComments : null;
    this.beforeRectifyEndTime = item ? this.beforeRectifyEndTime : null;
    this.replyUserId = item ? this.replyUserId : null;
    this.attachFileIds = item ? this.attachFileIds : null;

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

        /**
         * 申请批复人编码
         */
         replyUserId?: string;

         /**
          * 文件
          */
         attachFileIds?: Array<RectifyProblemDelayApplyEditInfoDTO>;
}
