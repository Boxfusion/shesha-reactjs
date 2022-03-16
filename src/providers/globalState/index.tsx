import React, { useReducer, useContext, PropsWithChildren } from 'react';
import reducer from './reducer';
import {
  GlobalStateActionsContext,
  GlobalStateStateContext,
  GLOBAL_STATE_CONTEXT_INITIAL_STATE,
  ISetStatePayload,
} from './contexts';

import { setStateAction, clearStateAction } from './actions';

export interface IGlobalStateProvider {}

function GlobalStateProvider({ children }: PropsWithChildren<IGlobalStateProvider>) {
  const [state, dispatch] = useReducer(reducer, { ...GLOBAL_STATE_CONTEXT_INITIAL_STATE });

  const setState = (payload: ISetStatePayload) => dispatch(setStateAction(payload));

  const clearState = (stateKey: string) => dispatch(clearStateAction(stateKey));

  const getStateByKey = (key: string) => (state?.globalState || {})[key];

  return (
    <GlobalStateStateContext.Provider value={state}>
      <GlobalStateActionsContext.Provider
        value={{
          setState,
          clearState,
          getStateByKey,
          /* NEW_ACTION_GOES_HERE */
        }}
      >
        {children}
      </GlobalStateActionsContext.Provider>
    </GlobalStateStateContext.Provider>
  );
}

function useGlobalStateState() {
  const context = useContext(GlobalStateStateContext);

  if (context === undefined) {
    throw new Error('useGlobalStateState must be used within a GlobalStateProvider');
  }

  return context;
}

function useGlobalStateActions() {
  const context = useContext(GlobalStateActionsContext);

  if (context === undefined) {
    throw new Error('useGlobalStateActions must be used within a GlobalStateProvider');
  }

  return context;
}

function useGlobalState() {
  return {
    ...useGlobalStateState(),
    ...useGlobalStateActions(),
  };
}

export default GlobalStateProvider;

export { GlobalStateProvider, useGlobalStateState, useGlobalStateActions, useGlobalState };
