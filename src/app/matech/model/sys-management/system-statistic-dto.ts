
/**
 * 系统管理相关统计 DTO
 */
export interface SystemStatisticsDTO {
  /**
   * CPU利用率
   */
  cpuUseRatio: number;

  /**
   * 内存使用率
   */
  memoryUsage: number;

  /**
   * jvmCPU利用率
   */
  jvmCpuUseRatio: number;

  /**
   * jvm内存使用率
   */
  jvmMemoryUsage: number;
}
