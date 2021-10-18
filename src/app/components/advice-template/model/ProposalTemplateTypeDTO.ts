<<<<<<< HEAD
/**
 * ProposalTemplateTypeDTO
 * @Author gyl
 * @Date 2021/10/15
 */
export class ProposalTemplateTypeDTO {
  constructor(item?: ProposalTemplateTypeDTO) {
    this.id = item && item.id ? item.id : null;
    this.name = item && item.name ? item.name : null;
    this.remark = item && item.remark ? item.remark : null;
    this.children = item && item.children.length > 0 ? item.children : [];
    this.parent = item && item.parent ? item.parent : null;
    this.parentId = item && item.parentId ? item.parentId : null;
  }
=======
import { UserBaseDTO } from '@ng-mt-framework/api';
import { ProposalTemplateTypeBaseDTO } from './ProposalTemplateTypeBaseDTO';

/**
 * 建议模板类型信息 DTO
 * @Author makaffe
 * @Date 2021/10/18
 */
export interface ProposalTemplateTypeDTO {
  /**
   * 子集
   */
  children: Array<ProposalTemplateTypeDTO>;

>>>>>>> master
  /**
   * 对象ID，新增时应当为null, 系统会自动生成
   */
  id: string;

  /**
   * 名称
   */
  name: string;

  /**
   * 备注
   */
  remark: string;

  /**
<<<<<<< HEAD
   * 子级
   */
  children: Array<ProposalTemplateTypeDTO>;
=======
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
   * 数据过滤路径，系统自动填写
   */
  filterPath: string;
>>>>>>> master

  /**
   * 父级
   */
<<<<<<< HEAD
  parent: ProposalTemplateTypeDTO;

  /**
   * 父级ID
   */
  parentId: string;

=======
  parent: ProposalTemplateTypeBaseDTO;

  /**
   *  父级Id
   */
  parentId: string;
>>>>>>> master
}
