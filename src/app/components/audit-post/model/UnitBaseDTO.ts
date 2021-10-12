/**
 * 单位基本信息数据 DTO
 * @Author jdiosajdoisajdas
 * @Date 2021/10/12
 */
export interface UnitBaseDTO {
  /**
   * 对象ID，新增时应当为null, 系统会自动生成
   */
  id: string;

  /**
   * 纳税人识别号
   */
  taxpayerIdentificationNumber: string;

  /**
   * 传真号码
   */
  faxNumber: string;

  /**
   * 邮政编码
   */
  postalCode: string;

  /**
   * 单位地址
   */
  unitAddress: string;

  /**
   * 固定电话
   */
  telephone: string;

  /**
   * 备注
   */
  remark: string;

  /**
   * 开户银行
   */
  depositBank: string;

  /**
   * 名称
   */
  name: string;

  /**
   * 单位编码(只能输下划线英文字母数字,且唯一,如：_yyyy_888)
   */
  unitNumber: string;

  /**
   * 单位性质，对应字典值UNIT_NATURE
   */
  unitNature: string;

  /**
   * 简称
   */
  shortName?: string;

  /**
   * 在OA系统中的ID
   */
  oaId: string;

  /**
   * 是否可用
   */
  available: boolean;

  /**
   * 显示顺序
   */
  showOrder: number;

  /**
   * 是否内部
   */
  interior: boolean;
}
