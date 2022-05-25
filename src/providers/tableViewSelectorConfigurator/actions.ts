import { createAction } from 'redux-actions';
import { IUpdateChildItemsPayload, IUpdateItemSettingsPayload } from './contexts';
//import { ITableViewSelectorConfiguratorStateContext } from './contexts';

export enum TableViewSelectorActionEnums {
  AddItem = 'ADD_BUTTON',
  DeleteItem = 'DELETE_BUTTON',

  AddGroup = 'ADD_GROUP',
  DeleteGroup = 'DELETE_GROUP',

  UpdateItem = 'UPDATE_ITEM',
  SelectFilter = 'SELECT_ITEM',

  UpdateChildItems = 'UPDATE_CHILD_ITEMS',
  /* NEW_ACTION_TYPE_GOES_HERE */
}

export const addButtonAction = createAction(TableViewSelectorActionEnums.AddItem);

export const deleteButtonAction = createAction<string, string>(TableViewSelectorActionEnums.DeleteItem, p => p);

export const addGroupAction = createAction(TableViewSelectorActionEnums.AddGroup);
export const deleteGroupAction = createAction<string, string>(TableViewSelectorActionEnums.DeleteGroup, p => p);

export const selectItemAction = createAction<string, string>(TableViewSelectorActionEnums.SelectFilter, p => p);

export const updateChildItemsAction = createAction<IUpdateChildItemsPayload, IUpdateChildItemsPayload>(
  TableViewSelectorActionEnums.UpdateChildItems,
  p => p
);

export const updateItemAction = createAction<IUpdateItemSettingsPayload, IUpdateItemSettingsPayload>(
  TableViewSelectorActionEnums.UpdateItem,
  p => p
);

/* NEW_ACTION_GOES_HERE */
