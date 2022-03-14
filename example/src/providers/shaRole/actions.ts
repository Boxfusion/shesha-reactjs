import { createAction } from 'redux-actions';
import { IShaRoleStateContext } from './contexts';
import { ShaRoleDto } from 'api/shaRole';

export enum ShaRoleActionEnums {
  GetShaRoleRequest = 'GET_SHA_ROLE_REQUEST',
  GetShaRoleSuccess = 'GET_SHA_ROLE_SUCCESS',
  GetShaRoleError = 'GET_SHA_ROLE_ERROR',
  /* NEW_ACTION_TYPE_GOES_HERE */
}
//#region GetShaRole
export const getShaRoleRequestAction = createAction<IShaRoleStateContext>(
  ShaRoleActionEnums.GetShaRoleRequest,
  () => ({})
);

export const getShaRoleSuccessAction = createAction<IShaRoleStateContext, ShaRoleDto>(
  ShaRoleActionEnums.GetShaRoleSuccess,
  shaRole => ({ shaRole })
);

export const getShaRoleErrorAction = createAction<IShaRoleStateContext>(ShaRoleActionEnums.GetShaRoleError, () => ({}));
//#endregion
/* NEW_ACTION_GOES_HERE */
