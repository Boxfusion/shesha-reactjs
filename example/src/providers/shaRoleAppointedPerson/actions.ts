import { createAction } from 'redux-actions';
import { IShaRoleAppointedPersonStateContext } from './contexts';

export enum ShaRoleAppointedPersonActionEnums {
  DeleteShaRoleAppointedPersonRequest = 'DELETE_SHA_ROLE_APPOINTED_PERSON_REQUEST',
  DeleteShaRoleAppointedPersonSuccess = 'DELETE_SHA_ROLE_APPOINTED_PERSON_SUCCESS',
  DeleteShaRoleAppointedPersonError = 'DELETE_SHA_ROLE_APPOINTED_PERSON_ERROR',
  CreateShaRoleAppointedPersonRequest = 'CREATE_SHA_ROLE_APPOINTED_PERSON_REQUEST',
  CreateShaRoleAppointedPersonSuccess = 'CREATE_SHA_ROLE_APPOINTED_PERSON_SUCCESS',
  CreateShaRoleAppointedPersonError = 'CREATE_SHA_ROLE_APPOINTED_PERSON_ERROR',
  /* NEW_ACTION_TYPE_GOES_HERE */
}
//#region DeleteShaRoleAppointedPerson
export const deleteShaRoleAppointedPersonRequestAction = createAction<IShaRoleAppointedPersonStateContext>(
  ShaRoleAppointedPersonActionEnums.DeleteShaRoleAppointedPersonRequest,
  () => ({})
);

export const deleteShaRoleAppointedPersonSuccessAction = createAction<IShaRoleAppointedPersonStateContext>(
  ShaRoleAppointedPersonActionEnums.DeleteShaRoleAppointedPersonSuccess,
  () => ({})
);

export const deleteShaRoleAppointedPersonErrorAction = createAction<IShaRoleAppointedPersonStateContext>(
  ShaRoleAppointedPersonActionEnums.DeleteShaRoleAppointedPersonError,
  () => ({})
);
//#endregion
//#region CreateShaRoleAppointedPerson
export const createShaRoleAppointedPersonRequestAction = createAction<IShaRoleAppointedPersonStateContext>(
  ShaRoleAppointedPersonActionEnums.CreateShaRoleAppointedPersonRequest,
  () => ({})
);

export const createShaRoleAppointedPersonSuccessAction = createAction<IShaRoleAppointedPersonStateContext>(
  ShaRoleAppointedPersonActionEnums.CreateShaRoleAppointedPersonSuccess,
  () => ({})
);

export const createShaRoleAppointedPersonErrorAction = createAction<IShaRoleAppointedPersonStateContext>(
  ShaRoleAppointedPersonActionEnums.CreateShaRoleAppointedPersonError,
  () => ({})
);
//#endregion
/* NEW_ACTION_GOES_HERE */
