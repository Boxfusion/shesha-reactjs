import { createContext } from 'react';
import { ISidebarMenuItemProps } from './models';

export interface IUpdateChildItemsPayload {
  index: number[];
  childs: ISidebarMenuItemProps[];
}

export interface IUpdateItemSettingsPayload {
  id: string;
  settings: ISidebarMenuItemProps;
}

export interface ISidebarMenuConfiguratorStateContext {
  items: ISidebarMenuItemProps[];
  selectedItemId?: string;
}

export interface ISidebarMenuConfiguratorActionsContext {
  addItem: () => void;
  deleteItem: (uid: string) => void;
  selectItem: (uid: string) => void;
  updateChildItems: (payload: IUpdateChildItemsPayload) => void;
  getItem: (uid: string) => ISidebarMenuItemProps;
  updateItem: (payload: IUpdateItemSettingsPayload) => void;
  /* NEW_ACTION_ACTION_DECLARATIOS_GOES_HERE */
}

export const SIDEBAR_MENU_CONTEXT_INITIAL_STATE: ISidebarMenuConfiguratorStateContext = {
  items: [],
};

export const SidebarMenuConfiguratorStateContext = createContext<ISidebarMenuConfiguratorStateContext>(
  SIDEBAR_MENU_CONTEXT_INITIAL_STATE
);

export const SidebarMenuConfiguratorActionsContext = createContext<ISidebarMenuConfiguratorActionsContext>(undefined);
