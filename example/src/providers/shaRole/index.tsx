import React, { FC, useReducer, useContext, PropsWithChildren, useEffect } from 'react';
import { shaRoleReducer } from './reducer';
import { ShaRoleActionsContext, ShaRoleStateContext, SHA_ROLE_CONTEXT_INITIAL_STATE } from './contexts';
import { getFlagSetters } from '../utils/flagsSetters';
import {
  getShaRoleRequestAction,
  getShaRoleSuccessAction,
  getShaRoleErrorAction,
  /* NEW_ACTION_IMPORT_GOES_HERE */
} from './actions';
import { useShaRoleGet } from 'api/shaRole';

const ShaRoleProvider: FC<PropsWithChildren<any>> = ({ children }) => {
  const [state, dispatch] = useReducer(shaRoleReducer, SHA_ROLE_CONTEXT_INITIAL_STATE);
  const {
    loading: isFetchingShaRole,
    data: shaRoleResponse,
    error: shaRoleError,
    refetch: fetchShaRoleHttp,
  } = useShaRoleGet({ lazy: true });

  useEffect(() => {
    if (shaRoleResponse && !isFetchingShaRole && !shaRoleError) {
      dispatch(getShaRoleSuccessAction(shaRoleResponse.result));
    } else if (shaRoleError) {
      dispatch(getShaRoleErrorAction());
    }
  }, [isFetchingShaRole]);

  const getShaRole = (id: string) => {
    dispatch(getShaRoleRequestAction());
    fetchShaRoleHttp({ queryParams: { id } });
  };

  /* NEW_ACTION_DECLARATION_GOES_HERE */

  return (
    <ShaRoleStateContext.Provider value={state}>
      <ShaRoleActionsContext.Provider
        value={{
          ...getFlagSetters(dispatch),
          getShaRole,
          /* NEW_ACTION_GOES_HERE */
        }}
      >
        {children}
      </ShaRoleActionsContext.Provider>
    </ShaRoleStateContext.Provider>
  );
};

function useShaRoleState() {
  const context = useContext(ShaRoleStateContext);

  if (context === undefined) {
    throw new Error('useShaRoleState must be used within a ShaRoleProvider');
  }

  return context;
}

function useShaRoleActions() {
  const context = useContext(ShaRoleActionsContext);

  if (context === undefined) {
    throw new Error('useShaRoleActions must be used within a ShaRoleProvider');
  }

  return context;
}

function useShaRole() {
  return { ...useShaRoleState(), ...useShaRoleActions() };
}

export { ShaRoleProvider, useShaRoleState, useShaRoleActions, useShaRole };
