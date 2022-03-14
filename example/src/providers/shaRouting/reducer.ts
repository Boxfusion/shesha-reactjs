import { IShaRoutingStateContext } from './contexts';
import { ShaRoutingActionEnums } from './actions';
import flagsReducer from '../utils/flagsReducer';

export function shaRoutingReducer(
  incomingState: IShaRoutingStateContext,
  action: ReduxActions.Action<IShaRoutingStateContext>
): IShaRoutingStateContext {
  //#region Register flags reducer
  const state = flagsReducer(incomingState, action);

  const { type, payload } = action;
  //#endregion

  switch (type) {
    case ShaRoutingActionEnums.DefaultAction:
      /* NEW_ACTION_ENUM_GOES_HERE */
      return {
        ...state,
        ...payload,
      };

    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
}
