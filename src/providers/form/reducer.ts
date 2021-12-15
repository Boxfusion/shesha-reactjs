import {
  FORM_CONTEXT_INITIAL_STATE,
  IFormStateContext,
  IComponentAddPayload,
  IComponentDeletePayload,
  IComponentUpdatePayload,
  ISetVisibleComponentsPayload,
  IFormLoadPayload,
  IFormLoadByIdPayload,
  IFormLoadByPathPayload,
  IUpdateChildComponentsPayload,
  ISetFormDataPayload,
  IRegisterActionsPayload,
  IFormSettings,
  ISetSelectedComponentPayload,
  IComponentUpdateSettingsValidationPayload,
  IAddDataPropertyPayload,
} from './contexts';
import { IConfigurableFormComponent, IFormProps, FormMode, IFlatComponentsStructure } from './models';
import { FormActionEnums } from './actions';
import { handleActions } from 'redux-actions';
import { camelize, convertActions, findToolboxComponent } from './utils';
import undoable, { includeAction } from 'redux-undo';
import { IFormValidationErrors, IToolboxComponentGroup } from '../../interfaces';
import { IDataSource } from '../formDesigner/models';
import { nanoid } from 'nanoid/non-secure';
import { IPropertyMetadata } from '../metadata/models';

const addComponentToFlatStructure = (structure: IFlatComponentsStructure, formComponent: IConfigurableFormComponent, containerId: string, index: number): IFlatComponentsStructure => {
  const allComponents = { ...structure.allComponents, [formComponent.id]: formComponent };

  const currentLevel = containerId;

  const containerComponents = structure.componentRelations[currentLevel]
    ? [...structure.componentRelations[currentLevel]]
    : [];
  containerComponents.splice(index, 0, formComponent.id);
  const componentRelations = { ...structure.componentRelations, [currentLevel]: containerComponents };

  return {
    allComponents,
    componentRelations
  };
}

const createComponentForProperty = (components: IToolboxComponentGroup[], propertyMetadata: IPropertyMetadata): IConfigurableFormComponent => {
  const toolboxComponent = findToolboxComponent(components, c => (c.dataTypes ?? []).indexOf(propertyMetadata.dataType) > -1);
  if (!Boolean(toolboxComponent))
    return null;

  // find appropriate toolbox component
  // create instance of the component
  // init default values for the component
  // init component according to the metadata

  let formComponent: IConfigurableFormComponent = {
    id: nanoid(),
    type: toolboxComponent.type,
    name: camelize(propertyMetadata.path),
    label: propertyMetadata.label,
    labelAlign: 'right',
    //parentId: containerId,
    hidden: false,
    customVisibility: null,
    visibilityFunc: _data => true,
  };
  if (toolboxComponent.initModel)
    formComponent = toolboxComponent.initModel(formComponent);
  if (toolboxComponent.linkToModelMetadata)
    formComponent = toolboxComponent.linkToModelMetadata(formComponent, propertyMetadata);

  return formComponent;
}

const reducer = handleActions<IFormStateContext, any>(
  {
    [FormActionEnums.DataPropertyAdd]: (state: IFormStateContext, action: ReduxActions.Action<IAddDataPropertyPayload>) => {
      const { payload: { propertyMetadata, index, containerId } } = action;

      const formComponent = createComponentForProperty(state.toolboxComponentGroups, propertyMetadata);
      if (!Boolean(formComponent))
        return state;

      formComponent.parentId = containerId; // set parent
      const newStructure = addComponentToFlatStructure(state, formComponent, containerId, index);

      return {
        ...state,
        allComponents: newStructure.allComponents,
        componentRelations: newStructure.componentRelations,
        selectedComponentId: formComponent.id,
      };
    },
    [FormActionEnums.ComponentAdd]: (state: IFormStateContext, action: ReduxActions.Action<IComponentAddPayload>) => {
      const { payload } = action;

      // create component instance
      const { componentType, index, containerId } = payload;

      // access to the list of toolbox  components
      const toolboxComponent = findToolboxComponent(state.toolboxComponentGroups, c => c.type === componentType);
      if (!toolboxComponent) return state;

      // create new component
      let count = 0;
      for (let key in state.allComponents) {
        if (state.allComponents[key].type == toolboxComponent.type) count++;
      }
      const componentName = `${toolboxComponent.name}${count + 1}`;

      let formComponent: IConfigurableFormComponent = {
        id: nanoid(),
        type: toolboxComponent.type,
        name: camelize(componentName),
        label: componentName,
        labelAlign: 'right',
        parentId: containerId,
        hidden: false,
        customVisibility: null,
        visibilityFunc: _data => true,
      };
      if (toolboxComponent.initModel)
        formComponent = toolboxComponent.initModel(formComponent);

      const newStructure = addComponentToFlatStructure(state, formComponent, containerId, index);

      return {
        ...state,
        allComponents: newStructure.allComponents,
        componentRelations: newStructure.componentRelations,
        selectedComponentId: formComponent.id,
      };
    },

    [FormActionEnums.ComponentDelete]: (
      state: IFormStateContext,
      action: ReduxActions.Action<IComponentDeletePayload>
    ) => {
      const { payload } = action;

      const { [payload.componentId]: component, ...allComponents } = state.allComponents;

      // delete self as parent
      let componentRelations = { ...state.componentRelations };
      delete componentRelations[payload.componentId];

      // delete self as child
      if (component.parentId) {
        const parentRelations = [...componentRelations[component.parentId]];
        const childIndex = parentRelations.indexOf(payload.componentId);
        parentRelations.splice(childIndex, 1);

        componentRelations[component.parentId] = parentRelations;
      } else console.warn(`component ${payload.componentId} has no parent`);

      return {
        ...state,
        allComponents: allComponents,
        componentRelations: componentRelations,
        selectedComponentId: state.selectedComponentId === payload.componentId ? null : state.selectedComponentId, // clear selection if we delete current component
      };
    },

    [FormActionEnums.ComponentUpdate]: (
      state: IFormStateContext,
      action: ReduxActions.Action<IComponentUpdatePayload>
    ) => {
      const { payload } = action;

      const component = state.allComponents[payload.componentId];
      const newComponent = { ...component, ...payload.settings } as IConfigurableFormComponent;

      const toolboxComponent = findToolboxComponent(state.toolboxComponentGroups, c => c.type === component.type);

      let newComponents = { ...state.allComponents, [payload.componentId]: newComponent };
      let componentRelations = { ...state.componentRelations };

      if (toolboxComponent.getContainers) {
        // update child components

        const oldContainers = toolboxComponent.getContainers(component);
        const newContainers = toolboxComponent.getContainers(newComponent);

        // remove deleted containers
        oldContainers.forEach(oldContainer => {
          if (newContainers.find(nc => nc.id == oldContainer.id) == null) {
            delete newComponents[oldContainer.id];

            delete componentRelations[oldContainer.id];
          }
        });

        // create or update new containers
        newContainers.forEach(c => {
          const existingContainer = newComponents[c.id] || { name: '', type: '' };
          newComponents[c.id] = { ...existingContainer, ...c };
        });

        // update component child ids
        componentRelations[payload.componentId] = newContainers.map(c => c.id);
      }

      return {
        ...state,
        allComponents: newComponents,
        componentRelations: componentRelations,
      };
    },

    [FormActionEnums.LoadRequest]: (state: IFormStateContext, action: ReduxActions.Action<IFormLoadPayload>) => {
      const { payload } = action;

      return {
        ...state,
        id: (payload as IFormLoadByIdPayload)?.id || state.id,
        path: (payload as IFormLoadByPathPayload)?.path || state.id,
      };
    },

    [FormActionEnums.LoadSuccess]: (state: IFormStateContext, action: ReduxActions.Action<IFormProps>) => {
      const { payload } = action;

      return {
        ...state,
        id: payload.id,
        path: payload.path,
        name: payload.name,
        description: payload.description,
        allComponents: payload.allComponents,
        componentRelations: payload.componentRelations,
        formSettings: payload.formSettings,
      };
    },

    [FormActionEnums.SetFormMode]: (state: IFormStateContext, action: ReduxActions.Action<FormMode>) => {
      const { payload } = action;

      return {
        ...state,
        formMode: payload,
      };
    },

    [FormActionEnums.SetDebugMode]: (state: IFormStateContext, action: ReduxActions.Action<boolean>) => {
      const { payload } = action;

      return {
        ...state,
        isDebug: payload,
      };
    },

    [FormActionEnums.StartDragging]: (state: IFormStateContext) => {
      return {
        ...state,
        isDragging: true,
      };
    },
    [FormActionEnums.EndDragging]: (state: IFormStateContext) => {
      return {
        ...state,
        isDragging: false,
      };
    },

    [FormActionEnums.SetVisibleComponents]: (
      state: IFormStateContext,
      action: ReduxActions.Action<ISetVisibleComponentsPayload>
    ) => {
      const { payload } = action;

      return {
        ...state,
        visibleComponentIds: payload.componentIds,
      };
    },

    [FormActionEnums.SetFormData]: (state: IFormStateContext, action: ReduxActions.Action<ISetFormDataPayload>) => {
      const { payload } = action;

      // note: merge is used to keep initial values of fields which have no corresponding components on the form (e.g. id, parentId)
      const newData = payload.mergeValues && state.formData ? { ...state.formData, ...payload.values } : payload.values;

      return {
        ...state,
        formData: newData,
      };
    },

    [FormActionEnums.SetValidationErrors]: (
      state: IFormStateContext,
      action: ReduxActions.Action<IFormValidationErrors>
    ) => {
      const { payload } = action;

      return {
        ...state,
        validationErrors: payload ? { ...payload } : null,
      };
    },

    [FormActionEnums.UpdateChildComponents]: (
      state: IFormStateContext,
      action: ReduxActions.Action<IUpdateChildComponentsPayload>
    ) => {
      const { payload } = action;

      // 2. update parentId in new components list
      let updatedComponents = {};
      let updatedRelations: { [index: string]: string[] } = {
        [payload.containerId]: payload.componentIds,
      };

      payload.componentIds.forEach(id => {
        const component = state.allComponents[id];
        if (component.parentId != payload.containerId) {
          // NOTE: we don't need it because when the user moves a component from one container to another the react-sortable make two calls to update new parent and old parent
          // update old parent
          // const oldParentKey = component.parentId || ROOT_COMPONENT_KEY;
          // updatedRelations[oldParentKey] = state.componentRelations[oldParentKey].filter(i => i !== id);

          // update parent in the current component
          const newComponent: IConfigurableFormComponent = { ...component, parentId: payload.containerId };
          updatedComponents[id] = newComponent;
        }
      });
      const allComponents = { ...state.allComponents, ...updatedComponents };
      const componentRelations = { ...state.componentRelations, ...updatedRelations };

      return {
        ...state,
        componentRelations: componentRelations,
        allComponents: allComponents,
      };
    },

    [FormActionEnums.SetSelectedComponent]: (
      state: IFormStateContext,
      action: ReduxActions.Action<ISetSelectedComponentPayload>
    ) => {
      const { payload } = action;

      return {
        ...state,
        selectedComponentId: payload.id,
        selectedComponentRef: payload.componentRef,
        activeDataSourceId: payload.dataSourceId,
      };
    },

    [FormActionEnums.ChangeMarkup]: (
      state: IFormStateContext,
      action: ReduxActions.Action<IFlatComponentsStructure>
    ) => {
      const { payload } = action;

      return {
        ...state,
        allComponents: payload.allComponents,
        componentRelations: payload.componentRelations,
      };
    },

    [FormActionEnums.RegisterActions]: (
      state: IFormStateContext,
      action: ReduxActions.Action<IRegisterActionsPayload>
    ) => {
      const {
        payload: { id, actions: actionsToRegister },
      } = action;

      const componentActions = convertActions(id, actionsToRegister);
      const otherActions = state.actions.filter(a => a.owner !== id);

      return {
        ...state,
        actions: [...otherActions, ...componentActions],
      };
    },

    [FormActionEnums.UpdateFormSettings]: (state: IFormStateContext, action: ReduxActions.Action<IFormSettings>) => {
      const { payload } = action;

      return {
        ...state,
        formSettings: payload,
      };
    },

    [FormActionEnums.ComponentUpdateSettingsValidation]: (
      state: IFormStateContext,
      action: ReduxActions.Action<IComponentUpdateSettingsValidationPayload>
    ) => {
      const { payload } = action;

      const component = state.allComponents[payload.componentId];
      const newComponent: IConfigurableFormComponent = {
        ...component,
        settingsValidationErrors: payload.validationErrors,
      };

      return {
        ...state,
        allComponents: { ...state.allComponents, [payload.componentId]: newComponent },
      };
    },

    [FormActionEnums.AddDataSource]: (state: IFormStateContext, action: ReduxActions.Action<IDataSource>) => {
      const { payload } = action;

      return {
        ...state,
        dataSources: [...state.dataSources, payload],
      };
    },

    [FormActionEnums.RemoveDataSource]: (state: IFormStateContext, action: ReduxActions.Action<string>) => {
      const { payload } = action;

      const newDataSources = state.dataSources.filter(ds => ds.id !== payload);

      return {
        ...state,
        dataSources: [...newDataSources],
      };
    },
  },

  FORM_CONTEXT_INITIAL_STATE
);

const undoableReducer = undoable(reducer, {
  filter: includeAction([
    FormActionEnums.DataPropertyAdd,
    FormActionEnums.ComponentAdd,
    FormActionEnums.ComponentDelete,
    FormActionEnums.ComponentUpdate,
    FormActionEnums.EndDragging,
    FormActionEnums.LoadSuccess,
  ]),
  limit: 20, // set a limit for the size of the history
});

export default undoableReducer;
