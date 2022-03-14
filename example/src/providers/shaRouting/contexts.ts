import { createContext } from 'react';
import { IFlagsState, IFlagsSetters } from 'models';
import { Router } from 'next/router';

export type IFlagProgressFlags = '__DEFAULT__' /* NEW_IN_PROGRESS_FLAG_GOES_HERE */;
export type IFlagSucceededFlags = '__DEFAULT__' /* NEW_SUCCEEDED_FLAG_GOES_HERE */;
export type IFlagErrorFlags = '__DEFAULT__' /* NEW_ERROR_FLAG_GOES_HERE */;
export type IFlagActionedFlags = '__DEFAULT__' /* NEW_ACTIONED_FLAG_GOES_HERE */;

export interface IShaRoutingStateContext
  extends IFlagsState<IFlagProgressFlags, IFlagSucceededFlags, IFlagErrorFlags, IFlagActionedFlags> {
  router?: Router;
}

export interface IShaRoutingActionsContext
  extends IFlagsSetters<IFlagProgressFlags, IFlagSucceededFlags, IFlagErrorFlags, IFlagActionedFlags> {
  /* NEW_ACTION_ACTION_DECLARATIO_GOES_HERE */
}

export const SHA_ROUTING_CONTEXT_INITIAL_STATE: IShaRoutingStateContext = {
  isInProgress: {},
  succeeded: {},
  error: {},
  actioned: {},
};

export const ShaRoutingStateContext = createContext<IShaRoutingStateContext>(SHA_ROUTING_CONTEXT_INITIAL_STATE);

export const ShaRoutingActionsContext = createContext<IShaRoutingActionsContext>(undefined);
