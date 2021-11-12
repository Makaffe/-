import { RectifyProblemTypeDTO } from './../../rectify-issue/model/RectifyProblemTypeDTO';
import { ProposalTemplateTypeDTO } from './ProposalTemplateTypeDTO';

/**
 * ProposalTemplateDTO
 * @Author gyl
 * @Date 2021/10/15
 */
export class ProposalTemplateDTO {
  constructor(item?: ProposalTemplateDTO) {
    this.id = item && item.id ? item.id : null;
    this.auditProposal = item && item.auditProposal ? item.auditProposal : null;
    this.name = item && item.name ? item.name : null;
    this.problemType = item && item.problemType ? item.problemType : null;
    this.proposalTemplateType = item && item.proposalTemplateType ? item.proposalTemplateType : new ProposalTemplateTypeDTO();
    this.proposalTemplateTypeId = item && item.proposalTemplateTypeId ? item.proposalTemplateTypeId : null;
    this.rectifyProblemTypeId = item && item.rectifyProblemType ? item.rectifyProblemType.id : null;
  }
  /**
   * 对象ID，新增时应当为null, 系统会自动生成
   */
  id: string;

  /**
   * 审计建议
   */
  auditProposal: string;

  /**
   * 名称
   */
  name: string;

  /**
   * 问题类型，枚举
   */
  problemType: string;

  /**
   * 建议模板类型
   */
  proposalTemplateType: ProposalTemplateTypeDTO;

  /**
   * 建议模板类型id
   */
  proposalTemplateTypeId: string;

  /**
   * 审计问题类型
   */
  rectifyProblemType?: RectifyProblemTypeDTO;
  rectifyProblemTypeId?: string;


}
