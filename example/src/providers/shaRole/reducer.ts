import { IShaRoleStateContext } from './contexts';
import { ShaRoleActionEnums } from './actions';
import flagsReducer from '../utils/flagsReducer';

export function shaRoleReducer(
  incomingState: IShaRoleStateContext,
  action: ReduxActions.Action<IShaRoleStateContext>
): IShaRoleStateContext {
  //#region Register flags reducer
  const state = flagsReducer(incomingState, action);

  const { type, payload } = action;
  //#endregion

  switch (type) {
    case ShaRoleActionEnums.GetShaRoleRequest:
    case ShaRoleActionEnums.GetShaRoleSuccess:
    case ShaRoleActionEnums.GetShaRoleError:
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
