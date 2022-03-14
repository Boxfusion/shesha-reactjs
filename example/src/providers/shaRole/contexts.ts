import { createContext } from 'react';
import { IFlagsState, IFlagsSetters } from 'models';
import { ShaRoleDto } from 'api/shaRole';
import { FLAGS_INITIAL_STATE } from 'providers/utils/flagsReducer';

export type IFlagProgressFlags = 'getShaRole' /* NEW_IN_PROGRESS_FLAG_GOES_HERE */;
export type IFlagSucceededFlags = 'getShaRole' /* NEW_SUCCEEDED_FLAG_GOES_HERE */;
export type IFlagErrorFlags = 'getShaRole' /* NEW_ERROR_FLAG_GOES_HERE */;
export type IFlagActionedFlags = '' /* NEW_ACTIONED_FLAG_GOES_HERE */;

export interface IShaRoleStateContext
  extends IFlagsState<IFlagProgressFlags, IFlagSucceededFlags, IFlagErrorFlags, IFlagActionedFlags> {
  readonly shaRole?: ShaRoleDto;
}

export interface IShaRoleActionsContext
  extends IFlagsSetters<IFlagProgressFlags, IFlagSucceededFlags, IFlagErrorFlags, IFlagActionedFlags> {
  getShaRole: (Id: string) => void;
  /* NEW_ACTION_ACTION_DECLARATIO_GOES_HERE */
}

export const SHA_ROLE_CONTEXT_INITIAL_STATE: IShaRoleStateContext = {
  ...FLAGS_INITIAL_STATE,
  shaRole: { name: '' },
};

export const ShaRoleStateContext = createContext<IShaRoleStateContext>(SHA_ROLE_CONTEXT_INITIAL_STATE);

export const ShaRoleActionsContext = createContext<IShaRoleActionsContext>(undefined);
