/**
 * 通用分页数据, 根据调用接口返回不同的数据类型 DTO
 * @Author 111
 * @Date 2021/11/1
 */
export interface PageDataDTO<AuditReportDTO> {
  /**
   * 当前页码，从0开始计数
   */
  pageNo: number;

  /**
   * 每页纪录条数
   */
  pageSize: number;

  /**
   * 总纪录条数
   */
  totalRecords: number;

  /**
   * 总页数
   */
  totalPages: number;

  /**
   * 数据
   */
  data: Array<AuditReportDTO>;
}
