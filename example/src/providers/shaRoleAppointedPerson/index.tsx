import React, { FC, useReducer, useContext, PropsWithChildren } from 'react';
import { shaRoleAppointedPersonReducer } from './reducer';
import {
  ShaRoleAppointedPersonActionsContext,
  ShaRoleAppointedPersonStateContext,
  SHA_ROLE_APPOINTED_PERSON_CONTEXT_INITIAL_STATE,
} from './contexts';
import { getFlagSetters } from '../utils/flagsSetters';
import {
  deleteShaRoleAppointedPersonRequestAction,
  deleteShaRoleAppointedPersonErrorAction,
  createShaRoleAppointedPersonRequestAction,
  createShaRoleAppointedPersonSuccessAction,
  createShaRoleAppointedPersonErrorAction,
  /* NEW_ACTION_IMPORT_GOES_HERE */
} from './actions';
import {
  useShaRoleAppointedPersonDelete,
  useShaRoleAppointedPersonCreate,
  GuidEntityDto,
  CreateShaRoleAppointedPersonDto,
} from 'api/shaRoleAppointedPerson';

const ShaRoleAppointedPersonProvider: FC<PropsWithChildren<any>> = ({ children }) => {
  const [state, dispatch] = useReducer(shaRoleAppointedPersonReducer, SHA_ROLE_APPOINTED_PERSON_CONTEXT_INITIAL_STATE);

  const { mutate: shaRolePersonDeleteHttp } = useShaRoleAppointedPersonDelete({});

  const { mutate: shaRolePersonCreateHttp } = useShaRoleAppointedPersonCreate({});

  const deleteShaRoleAppointedPerson = (id: GuidEntityDto) => {
    dispatch(deleteShaRoleAppointedPersonRequestAction());

    return shaRolePersonDeleteHttp(id).catch(() => {
      dispatch(deleteShaRoleAppointedPersonErrorAction());
    });
  };

  const createShaRoleAppointedPerson = (shaRoleAppointedPerson: CreateShaRoleAppointedPersonDto) => {
    dispatch(createShaRoleAppointedPersonRequestAction());

    shaRolePersonCreateHttp(shaRoleAppointedPerson)
      .then(data => {
        if (data.success) {
          dispatch(createShaRoleAppointedPersonSuccessAction());
        } else {
          dispatch(createShaRoleAppointedPersonErrorAction());
        }
      })
      .catch(() => {
        dispatch(createShaRoleAppointedPersonErrorAction());
      });
  };
  /* NEW_ACTION_DECLARATION_GOES_HERE */

  return (
    <ShaRoleAppointedPersonStateContext.Provider value={state}>
      <ShaRoleAppointedPersonActionsContext.Provider
        value={{
          ...getFlagSetters(dispatch),
          deleteShaRoleAppointedPerson,
          createShaRoleAppointedPerson,
          /* NEW_ACTION_GOES_HERE */
        }}
      >
        {children}
      </ShaRoleAppointedPersonActionsContext.Provider>
    </ShaRoleAppointedPersonStateContext.Provider>
  );
};

function useShaRoleAppointedPersonState() {
  const context = useContext(ShaRoleAppointedPersonStateContext);

  if (context === undefined) {
    throw new Error('useShaRoleAppointedPersonState must be used within a ShaRoleAppointedPersonProvider');
  }

  return context;
}

function useShaRoleAppointedPersonActions() {
  const context = useContext(ShaRoleAppointedPersonActionsContext);

  if (context === undefined) {
    throw new Error('useShaRoleAppointedPersonActions must be used within a ShaRoleAppointedPersonProvider');
  }

  return context;
}

function useShaRoleAppointedPerson() {
  return { ...useShaRoleAppointedPersonState(), ...useShaRoleAppointedPersonActions() };
}

export {
  ShaRoleAppointedPersonProvider,
  useShaRoleAppointedPersonState,
  useShaRoleAppointedPersonActions,
  useShaRoleAppointedPerson,
};
