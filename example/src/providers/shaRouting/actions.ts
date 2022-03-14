import { createAction } from 'redux-actions';
import { IShaRoutingStateContext } from './contexts';

export enum ShaRoutingActionEnums {
  DefaultAction = 'DEFAULT_ACTION',
  /* NEW_ACTION_TYPE_GOES_HERE */
}

export const defaultAction = createAction<IShaRoutingStateContext>(ShaRoutingActionEnums.DefaultAction, () => ({}));

/* NEW_ACTION_GOES_HERE */
