import { IShaRoleAppointedPersonStateContext } from './contexts';
import { ShaRoleAppointedPersonActionEnums } from './actions';
import flagsReducer from '../utils/flagsReducer';

export function shaRoleAppointedPersonReducer(
  incomingState: IShaRoleAppointedPersonStateContext,
  action: ReduxActions.Action<IShaRoleAppointedPersonStateContext>
): IShaRoleAppointedPersonStateContext {
  //#region Register flags reducer
  const state = flagsReducer(incomingState, action);

  const { type, payload } = action;
  //#endregion

  switch (type) {
    case ShaRoleAppointedPersonActionEnums.DeleteShaRoleAppointedPersonRequest:
    case ShaRoleAppointedPersonActionEnums.DeleteShaRoleAppointedPersonSuccess:
    case ShaRoleAppointedPersonActionEnums.DeleteShaRoleAppointedPersonError:
    case ShaRoleAppointedPersonActionEnums.CreateShaRoleAppointedPersonRequest:
    case ShaRoleAppointedPersonActionEnums.CreateShaRoleAppointedPersonSuccess:
    case ShaRoleAppointedPersonActionEnums.CreateShaRoleAppointedPersonError:
      /* NEW_ACTION_ENUM_GOES_HERE */

      return {
        ...state,
        ...payload,
      };

    default: {
      return state;
    }
  }
}
