import { RectifyProblemDTO } from '@mt-rectify-framework/comp/rectify-issue';
import { UserBaseDTO } from '@ng-mt-framework/api';

// tslint:disable-next-line:no-empty-interface
export interface ProblemTypeDTO {
  id: string;

  name: string;

  remark: string;

  createUser?: UserBaseDTO;

  createdTime?: string;

  lastModifyUser?: UserBaseDTO;

  lastModifyTime?: string;

  filterPath?: string;

  parent?: ProblemTypeDTO;

  children?: ProblemTypeDTO;
}
