
import { STColumnTag } from '@delon/abc';

/**
 * 列表状态栏
 */
export class Status {
  public static TAG: STColumnTag = {
    已审批: { text: '已审批', color: 'green' },
    未通过: { text: '未通过', color: 'red' },
    进行中: { text: '进行中', color: 'blue' },
    草稿: { text: '草稿', color: '' },
    待审批: { text: '待审批', color: 'orange' },
    未分配: { text: '未分配', color: 'blue' },
    已分配: { text: '已分配', color: 'green' },
    未核实: { text: '未核实', color: 'blue' },
    已核实: { text: '已核实', color: 'green' },
    已审核: { text: '已审核', color: 'green' },
    待审核: { text: '待审核', color: 'orange' },
    已完成: { text: '已完成', color: 'green' },
    未完成: { text: '未完成', color: 'red' },
    已整改: { text: '已整改', color: 'green' },
    未整改: { text: '未完成', color: 'red' },
    CREATED: { text: '已生成', color: 'green' },
    NO_CREATE: { text: '未生成', color: '' },
    QUOTE: { text: '已引用', color: 'orange' },
    INVALID: { text: '已作废', color: 'red' },

    FAIL: { text: '未通过', color: 'red' },
    DRAFT: { text: '草稿', color: '' },
    FILED: { text: '已归档', color: 'lime' },
    CANCELING: { text: '取消中', color: 'gold' },
    CANCELED: { text: '已取消', color: 'volcano' },
    UNDERWAY: { text: '进行中', color: 'blue' },
    END: { text: '已结束', color: 'purple' },
    AUDITING: { text: '审核中', color: 'orange' },
    BACK: { text: '退回', color: 'volcano' },
    AUDITED: { text: '已审核', color: 'green' },
    SENT: { text: '已发送', color: 'green' },
    PASSED: { text: '已通过', color: 'green' },

    // 审计整改的整改状态 x 4
    NO_STARTED: { text: '未启动', color: '' },
    STARTED: { text: '已启动', color: 'cyan' },
    PROCESSING: { text: '整改中', color: 'blue' },
    APPROVING: { text: '待审批', color: 'orange' },
    PASS : { text: '已审批', color: 'green' },

    // 审计作业->首页->进入工作台->审计终结->项目台账的状态颜色
    NOT_FILLED: { text: '未填写', color: '' },
    FILLED: { text: '已填写', color: 'blue' },
    DONE: { text: '已完成', color: 'pink' },

    // 整改启动
    true: { text: '已启动', color: 'green' },
    false: { text: '未启动', color: '' },
    // 美的置业
    待确认: { text: '待确认', color: 'orange' },
    跟进中: { text: '跟进中', color: 'blue' },
  };

  /**
   * 项目状态下拉
   */
  public static ProjectStatusList = [
    { label: '草稿', value: 'DRAFT' },
    { label: '待审批', value: 'APPROVING' },
    { label: '已审批', value: 'PASS ' },
    { label: '已归档', value: 'FILED' },
    { label: '已启动', value: 'STARTED' },
    { label: '取消中', value: 'CANCELING' },
    { label: '已取消', value: 'CANCELED' },
    { label: '进行中', value: 'UNDERWAY' },
    { label: '已结束', value: 'END' },
    { label: '未通过', value: 'FAIL' },
  ];

  /**
   * 审计报告状态下拉
   */
  public static ProjectDocumentStatusList = [
    { label: '草稿', value: 'DRAFT' },
    { label: '待审批', value: 'APPROVING' },
    { label: '已审批', value: 'PASS ' },
  ];

  // 审计报告来源下拉内容
  public static projectDocumentSourceList = [
    { label: '报告初稿', value: 'PROJECT_REPORT_1' },
    { label: '征求意见稿', value: 'PROJECT_REPORT_2' },
    { label: '报告修订稿', value: 'PROJECT_REPORT_3' },
    { label: '报告终稿', value: 'PROJECT_REPORT_4' },
    { label: '后续跟踪审计报告', value: 'FOLLOW_UP_AUDIT_REPORT' },
    { label: '其他文书', value: 'PROJECT_SCHEMA,PROJECT_NOTIFICATION,PROJECT_REPORT' },
  ];
}
