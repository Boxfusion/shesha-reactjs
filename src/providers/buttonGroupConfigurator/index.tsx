import React, { FC, useReducer, useContext, PropsWithChildren } from 'react';
import buttonGroupReducer from './reducer';
import {
  IUpdateChildItemsPayload,
  IUpdateItemSettingsPayload,
  ButtonGroupConfiguratorActionsContext,
  ButtonGroupConfiguratorStateContext,
  BUTTON_GROUP_CONTEXT_INITIAL_STATE,
} from './contexts';
import {
  addButtonAction,
  deleteButtonAction,
  addGroupAction,
  deleteGroupAction,
  selectItemAction,
  updateChildItemsAction,
  updateItemAction,
  /* NEW_ACTION_IMPORT_GOES_HERE */
} from './actions';
import { ButtonGroupItemProps } from './models';
import { getItemById } from './utils';

export interface IButtonGroupConfiguratorProviderPropsBase {
  baseUrl?: string;
}

export interface IButtonGroupConfiguratorProviderProps {
  items: ButtonGroupItemProps[];
  value?: any;
  onChange?: (value: any) => void;
}

const ButtonGroupConfiguratorProvider: FC<PropsWithChildren<IButtonGroupConfiguratorProviderProps>> = props => {
  const {
    // onChange,
    // value,
    children,
  } = props;

  const [state, dispatch] = useReducer(buttonGroupReducer, {
    ...BUTTON_GROUP_CONTEXT_INITIAL_STATE,
    items: props.items,
  });

  const addButton = () => {
    dispatch(addButtonAction());
  };

  const deleteButton = (uid: string) => {
    dispatch(deleteButtonAction(uid));
  };

  const addGroup = () => {
    dispatch(addGroupAction());
  };

  const deleteGroup = (uid: string) => {
    dispatch(deleteGroupAction(uid));
  };

  const selectItem = (uid: string) => {
    dispatch(selectItemAction(uid));
  };

  const updateChildItems = (payload: IUpdateChildItemsPayload) => {
    dispatch(updateChildItemsAction(payload));
  };

  const getItem = (uid: string): ButtonGroupItemProps => {
    return getItemById(state.items, uid);
  };

  const updateItem = (payload: IUpdateItemSettingsPayload) => {
    dispatch(updateItemAction(payload));
  };
  /*
  const getChildItems = (path: string[]): ButtonGroupItemProps[] => {
    if (path == null || path.length === 0)
      return state.items;
    
    let parent: ButtonGroupItemProps = null;
    path.forEach(item => {
      state.items
    })
    reduce(state.items, (prev, curr) => )
    return null;
  }
  */
  /* NEW_ACTION_DECLARATION_GOES_HERE */

  return (
    <ButtonGroupConfiguratorStateContext.Provider value={state}>
      <ButtonGroupConfiguratorActionsContext.Provider
        value={{
          addButton,
          deleteButton,
          addGroup,
          deleteGroup,
          selectItem,
          updateChildItems,
          getItem,
          updateItem,
          //getChildItems,
          /* NEW_ACTION_GOES_HERE */
        }}
      >
        {children}
      </ButtonGroupConfiguratorActionsContext.Provider>
    </ButtonGroupConfiguratorStateContext.Provider>
  );
};

function useButtonGroupConfiguratorState() {
  const context = useContext(ButtonGroupConfiguratorStateContext);

  if (context === undefined) {
    throw new Error('useButtonGroupConfiguratorState must be used within a ButtonGroupConfiguratorProvider');
  }

  return context;
}

function useButtonGroupConfiguratorActions() {
  const context = useContext(ButtonGroupConfiguratorActionsContext);

  if (context === undefined) {
    throw new Error('useButtonGroupConfiguratorActions must be used within a ButtonGroupConfiguratorProvider');
  }

  return context;
}

function useButtonGroupConfigurator() {
  return { ...useButtonGroupConfiguratorState(), ...useButtonGroupConfiguratorActions() };
}

export { ButtonGroupConfiguratorProvider, useButtonGroupConfigurator };
