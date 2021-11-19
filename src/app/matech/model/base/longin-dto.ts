/**
 * LonginInfoDTO
 */
export interface LonginDTO {
  /**
   * 登录账号
   */
  account: string;

  /**
   * 密码
   */
  password: string;

  /**
   * 组织机构的类型(用来设置后端保存数据表的时候的filterPath过滤路径)
   */
  organizationType?: 'UNIT' | 'DEPARTMENT' | 'POSITION';

  /**
   * 用户部门类型
   */
  userDeptType?: 'AUDIT_DEPT' | 'DISCIPLINE_INSPECTION_DEPT' | 'RECTIFY_DEPT';

  /**
   * 验证码
   */
  validCode?: string;

  /**
   * 标识id
   */
  markId?: string;

  /**
   * 登录终端平台标识
   */
  from?: string;
}
