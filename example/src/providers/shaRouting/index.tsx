import React, { FC, useReducer, useContext, PropsWithChildren } from 'react';
import { shaRoutingReducer } from './reducer';
import { ShaRoutingActionsContext, ShaRoutingStateContext, SHA_ROUTING_CONTEXT_INITIAL_STATE } from './contexts';
import { getFlagSetters } from '../utils/flagsSetters';
import { Router } from 'next/router';

export interface IRoutingProviderProvider {
  router: Router;
}

const ShaRoutingProvider: FC<PropsWithChildren<any>> = ({ children, router }) => {
  const [state, dispatch] = useReducer(shaRoutingReducer, SHA_ROUTING_CONTEXT_INITIAL_STATE);

  /* NEW_ACTION_DECLARATION_GOES_HERE */

  return (
    <ShaRoutingStateContext.Provider value={{ ...state, router }}>
      <ShaRoutingActionsContext.Provider value={{ ...getFlagSetters(dispatch) /* NEW_ACTION_GOES_HERE */ }}>
        {children}
      </ShaRoutingActionsContext.Provider>
    </ShaRoutingStateContext.Provider>
  );
};

function useShaRoutingState() {
  const context = useContext(ShaRoutingStateContext);

  if (context === undefined) {
    throw new Error('useShaRoutingState must be used within a ShaRoutingProvider');
  }

  return context;
}

function useShaRoutingActions() {
  const context = useContext(ShaRoutingActionsContext);

  if (context === undefined) {
    throw new Error('useShaRoutingActions must be used within a ShaRoutingProvider');
  }

  return context;
}

function useShaRouting() {
  return { ...useShaRoutingState(), ...useShaRoutingActions() };
}

export { ShaRoutingProvider, useShaRoutingState, useShaRoutingActions, useShaRouting };
