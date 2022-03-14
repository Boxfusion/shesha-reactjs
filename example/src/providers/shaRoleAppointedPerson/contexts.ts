import { createContext } from 'react';
import { IFlagsState, IFlagsSetters } from 'models';
import { GuidEntityDto, CreateShaRoleAppointedPersonDto } from 'api/shaRoleAppointedPerson';
import { FLAGS_INITIAL_STATE } from 'providers/utils/flagsReducer';

export type IFlagProgressFlags =
  | 'deleteShaRoleAppointedPerson'
  | 'createShaRoleAppointedPerson' /* NEW_IN_PROGRESS_FLAG_GOES_HERE */;
export type IFlagSucceededFlags =
  | 'deleteShaRoleAppointedPerson'
  | 'createShaRoleAppointedPerson' /* NEW_SUCCEEDED_FLAG_GOES_HERE */;
export type IFlagErrorFlags =
  | 'deleteShaRoleAppointedPerson'
  | 'createShaRoleAppointedPerson' /* NEW_ERROR_FLAG_GOES_HERE */;
export type IFlagActionedFlags = '' /* NEW_ACTIONED_FLAG_GOES_HERE */;

export interface IShaRoleAppointedPersonStateContext
  extends IFlagsState<IFlagProgressFlags, IFlagSucceededFlags, IFlagErrorFlags, IFlagActionedFlags> {}

export interface IShaRoleAppointedPersonActionsContext
  extends IFlagsSetters<IFlagProgressFlags, IFlagSucceededFlags, IFlagErrorFlags, IFlagActionedFlags> {
  deleteShaRoleAppointedPerson: (id: GuidEntityDto) => Promise<any>;
  createShaRoleAppointedPerson: (shaRoleAppointedPerson: CreateShaRoleAppointedPersonDto) => void;
  /* NEW_ACTION_ACTION_DECLARATIO_GOES_HERE */
}

export const SHA_ROLE_APPOINTED_PERSON_CONTEXT_INITIAL_STATE: IShaRoleAppointedPersonStateContext = {
  ...FLAGS_INITIAL_STATE,
};

export const ShaRoleAppointedPersonStateContext = createContext<IShaRoleAppointedPersonStateContext>(
  SHA_ROLE_APPOINTED_PERSON_CONTEXT_INITIAL_STATE
);

export const ShaRoleAppointedPersonActionsContext = createContext<IShaRoleAppointedPersonActionsContext>(undefined);
