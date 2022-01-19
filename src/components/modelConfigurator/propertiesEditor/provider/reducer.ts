import {
  IPropertiesEditorStateContext,
  IUpdateChildItemsPayload,
  IUpdateItemSettingsPayload,
  PROPERTIES_EDITOR_CONTEXT_INITIAL_STATE,
} from './contexts';
import { ModelActionEnums } from './actions';
import { handleActions } from 'redux-actions';
import { getItemPositionById } from './utils';
import { IModelItem } from '../../../../interfaces/modelConfigurator';
import { ModelPropertyDto } from '../../../../apis/modelConfigurations';

const mapPropertyToModelItem = (property: ModelPropertyDto): IModelItem => {
  const result = {
    id: property.id,
    name: property.name,
    label: property.label,
    description: property.description,
    dataType: property.dataType,
    dataFormat: property.dataFormat,
    entityType: property.entityType,
    referenceListName: property.referenceListName,
    referenceListNamespace: property.referenceListNamespace,
    source: property.source,
    properties: property.properties.map<IModelItem>(p => mapPropertyToModelItem(p)),
  }

  return result;  
}

const modelReducer = handleActions<IPropertiesEditorStateContext, any>(
  {
    [ModelActionEnums.AddItem]: (
      state: IPropertiesEditorStateContext,
      action: ReduxActions.Action<IModelItem>
    ) => {
      const { payload } = action

      const itemProps: IModelItem = {
        name: `New property`,
        ...payload,
      };

      const newItems = [...state.items];

      const parent = null;

      if (parent) {
        parent.childItems = [...parent.childItems, itemProps];
      } else newItems.push(itemProps);

      return {
        ...state,
        items: newItems,
        selectedItemId: itemProps.id,
      };
    },

    [ModelActionEnums.DeleteItem]: (
      state: IPropertiesEditorStateContext,
      action: ReduxActions.Action<string>
    ) => {
      const { payload } = action;

      const items = removeIdDeep([...state.items], payload);

      return {
        ...state,
        items,
        selectedItemId: state.selectedItemId === payload ? null : state.selectedItemId,
      };
    },

    [ModelActionEnums.SelectItem]: (
      state: IPropertiesEditorStateContext,
      action: ReduxActions.Action<string>
    ) => {
      // console.log('[ModelActionEnums.SelectItem]');
      const { payload } = action;

      return {
        ...state,
        selectedItemId: payload,
      };
    },

    [ModelActionEnums.UpdateItem]: (
      state: IPropertiesEditorStateContext,
      action: ReduxActions.Action<IUpdateItemSettingsPayload>
    ) => {
      const { payload } = action;

      const newItems = [...state.items];

      const position = getItemPositionById(newItems, payload.id);

      if (!position) return state;

      let newArray = position.ownerArray;

      newArray[position.index] = {
        ...newArray[position.index],
        ...payload.settings,
      };

      return {
        ...state,
        items: newItems,
      };
    },

    [ModelActionEnums.UpdateChildItems]: (
      state: IPropertiesEditorStateContext,
      action: ReduxActions.Action<IUpdateChildItemsPayload>
    ) => {
      // console.log('[ModelActionEnums.UpdateChildItems]');
      const {
        payload: { index, childs: childIds },
      } = action;
      if (!Boolean(index) || index.length == 0) {
        return {
          ...state,
          items: childIds,
        };
      }
      // copy all items
      const newItems = [...state.items];
      // blockIndex - full index of the current container
      const blockIndex = [...index];
      // lastIndex - index of the current element in its' parent
      const lastIndex = blockIndex.pop();

      // search for a parent item
      const lastArr = blockIndex.reduce((arr, i) => arr[i]['properties'], newItems);

      // and set a list of childs
      lastArr[lastIndex]['properties'] = childIds;

      return {
        ...state,
        items: newItems,
      };
    },
  },

  PROPERTIES_EDITOR_CONTEXT_INITIAL_STATE
);

export default modelReducer;

function removeIdDeep(list: IModelItem[], idToRemove: string) {
  const filtered = list.filter(entry => entry.id !== idToRemove);
  return filtered.map(entry => {
    if (!entry.properties) return entry;
    return { ...entry, childItems: removeIdDeep(entry.properties, idToRemove) };
  });
}