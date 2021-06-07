import {
  IFlatComponentsStructure,
  IConfigurableFormComponent,
  ROOT_COMPONENT_KEY,
  IComponentsDictionary,
  IComponentsContainer,
  IFormActions,
  IFormAction,
  FormMarkup,
  FormMarkupWithSettings,
} from './models';
import Mustache from 'mustache';
import { IToolboxComponentBase, IToolboxComponentGroup, IToolboxComponents } from '../../interfaces';
import Schema, { Rules, ValidateSource } from 'async-validator';
import { DEFAULT_FORM_SETTINGS, IFormSettings } from './contexts';

/** Convert components tree to flat structure.
 * In flat structure we store components settings and their relations separately:
 *    allComponents - dictionary (key:value) of components. key - Id of the component, value - conponent settings
 *    componentRelations - dictionary of component relations. key - id of the container, value - ordered list of subcomponent ids
 * */
export const componentsTreeToFlatStructure = (toolboxComponents: IToolboxComponents, components: IConfigurableFormComponent[]): IFlatComponentsStructure => {
  let result: IFlatComponentsStructure = {
    allComponents: {},
    componentRelations: {},
  };

  const processComponent = (component: IConfigurableFormComponent, parentId?: string) => {
    // prepare component runtime
    result.allComponents[component.id] = {
      ...component,
      parentId,
      visibilityFunc: getCustomVisibilityFunc(component),
    };

    const level = result.componentRelations[parentId] || [];
    level.push(component.id);
    result.componentRelations[parentId] = level;

    if (component.type) {
      const componentRegistration = toolboxComponents[component.type];

      // custom containers
      let customContainerNames = componentRegistration?.customContainerNames || [];
      let subContainers: IComponentsContainer[] = [];
      customContainerNames.forEach(containerName => {
        const containers = component[containerName] as IComponentsContainer[];
        if (containers) subContainers = [...subContainers, ...containers];
      });
      if (component['components']) subContainers.push({ id: component.id, components: component['components'] });

      subContainers.forEach(subContainer => {
        if (subContainer && subContainer.components) {
          subContainer.components.forEach(c => {
            processComponent(c, subContainer.id);
          });
        }
      });
    }
  };

  if (components) {
    components.forEach(component => {
      processComponent(component, ROOT_COMPONENT_KEY);
    });
  }

  return result;
};

/** Convert flat components structure to a component tree */
export const componentsFlatStructureToTree = (toolboxComponents: IToolboxComponents, flat: IFlatComponentsStructure): IConfigurableFormComponent[] => {
  let tree: IConfigurableFormComponent[] = [];
  
  const processComponent = (container: IConfigurableFormComponent[], ownerId: string) => {
    const componentIds = flat.componentRelations[ownerId];

    if (!componentIds) return;

    // iterate all component ids on the current level
    componentIds.forEach(id => {
      // extract current component and add to hierarchy
      let component = { ...flat.allComponents[id] };
      container.push(component);

      //  process all childs if any
      if (id in flat.componentRelations) {
        let childComponents: IConfigurableFormComponent[] = [];
        processComponent(childComponents, id);
        component['components'] = childComponents;
      }

      // note: this function may be called for custom container without type
      if (component.type) {
        const componentRegistration = toolboxComponents[component.type];

        const customContainers = componentRegistration.customContainerNames || [];
        customContainers.forEach(containerName => {
          const childContainers = component[containerName] as IComponentsContainer[];

          if (childContainers) {
            childContainers.forEach(c => {
              let childComponents: IConfigurableFormComponent[] = [];
              processComponent(childComponents, c.id);
              c.components = childComponents;
            });
          }
        });
      }
    });
  };

  processComponent(tree, ROOT_COMPONENT_KEY);

  return tree;
};

export const getCustomVisibilityFunc = ({ customVisibility, name }: IConfigurableFormComponent) => {
  if (customVisibility) {
    try {
      const customVisibilityExecutor = customVisibility ? new Function('value, data', customVisibility) : null;

      const getIsVisible = function(data = {}) {
        if (customVisibilityExecutor) {
          try {
            return customVisibilityExecutor(data[name], data);
          } catch (e) {
            console.warn(`Custom Visibility of field ${name} throws exception: ${e}`);
            return true;
          }
        }

        return true;
        //return !(component.contextData && component.contextData.isEmpty && component.contextData.readOnly && component.hideWhenEmpty);
      };

      return getIsVisible;
    } catch (e) {
      return () => {
        console.warn(`Incorrect syntax of the 'Custom Visibility', field name: ${name}, error: ${e}`);
      };
    }
  } else
    return () => true;
};

export const evaluateString = (template, data) => {
  return template ? Mustache.render(template, data) : template;
};

export const getVisibilityFunc2 = (expression, name) => {
  if (expression) {
    try {
      const customVisibilityExecutor = expression ? new Function('data, context', expression) : null;

      const getIsVisible = function(data = {}, context = {}) {
        if (customVisibilityExecutor) {
          try {
            return customVisibilityExecutor(data, context);
          } catch (e) {
            console.warn(`Custom Visibility of ${name} throws exception: ${e}`);
            return true;
          }
        }

        return true;
      };

      return getIsVisible;
    } catch (e) {
      return () => {
        console.warn(`Incorrect syntax of the 'Custom Visibility', component: ${name}, error: ${e}`);
      };
    }
  } else return () => true;
};

/**
 * Return ids of visible components according to the custom visibility
 */
export const getVisibleComponentIds = (components: IComponentsDictionary, values: any): string[] => {
  //@ts-ignore
  let visibleComponents: string[] = [];
  for (let key in components) {
    const component = components[key] as IConfigurableFormComponent;
    if (!component || component.hidden) continue;

    const isVisible = component.visibilityFunc == null || component.visibilityFunc(values);
    if (isVisible) visibleComponents.push(key);
  }

  return visibleComponents;
};

/**
 * Return field name for the antd form by a given expression
 * @param expression field name in dot notation e.g. 'supplier.name' or 'fullName'
 */
export const getFieldNameFromExpression = (expression: string) => {
  if (!expression) return '';

  return expression.includes('.') ? expression.split('.') : expression;
};

/**
 * Return valudation rules for the specified form component
 */
export const getValidationRules = (component: IConfigurableFormComponent) => {
  const { validate } = component;
  let rules = [];

  // todo: implement more generic way (e.g. using validation providers)

  if (validate) {
    if (validate.required)
      rules.push({
        required: true,
        message: 'This field is required',
      });

    if (validate.minValue)
      rules.push({
        min: validate.minValue,
        type: 'number',
      });

    if (validate.maxValue)
      rules.push({
        max: validate.maxValue,
        type: 'number',
      });

    if (validate.minLength)
      rules.push({
        min: validate.minLength,
        type: 'string',
      });

    if (validate.maxLength)
      rules.push({
        max: validate.maxLength,
        type: 'string',
      });
  }

  return rules;
};

/* Convert string to camelCase */
export const camelize = str => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
};

const DICTIONARY_ACCESSOR_REGEX = /(^[\s]*\{(?<key>[\w]+)\.(?<accessor>[^\}]+)\}[\s]*$)/;

export const evaluateValue = (value: string, dictionary: any) => {
  if (!value) return value;

  const match = value.match(DICTIONARY_ACCESSOR_REGEX);
  if (!match) return value;

  if (!dictionary) return null;

  const container = dictionary[match.groups.key];
  if (!container) return null;

  const evaluatedValue = container[match.groups.accessor];

  return evaluatedValue;
};

const TAGS_REGEX = /{(?<key>[\w]+)\.(?<accessor>[^\}]+)\}/;

export const replaceTags = (value: string, dictionary: any) => {
  if (!value) return value;

  const match = value.match(TAGS_REGEX);
  if (!match) return value;

  if (!dictionary) return null;

  const result = value.replace(TAGS_REGEX, (_match, key, accessor) => {
    const container = dictionary[key] || {};
    return container[accessor] || '';
  });

  return result;
};

export const convertActions = (ownerId: string, actions: IFormActions): IFormAction[] => {
  let result: IFormAction[] = [];
  for (let key in actions) {
    result.push({
      owner: ownerId,
      name: key,
      body: actions[key],
    });
  }
  return result;
};

export const toolbarGroupsToComponents = (availableComponents: IToolboxComponentGroup[]): IToolboxComponents => {
  let allComponents: IToolboxComponents = {};
  if (availableComponents){
    availableComponents.forEach(group => {
      group.components.forEach(component => {
        allComponents[component.type] = component;
      });
    });
  }
  return allComponents;
}

export const findToolboxComponent = (availableComponents: IToolboxComponentGroup[], type: string): IToolboxComponentBase => {
  if (availableComponents){
    for (let gIdx = 0; gIdx < availableComponents.length; gIdx++) {
      const group = availableComponents[gIdx];
      for (let cIdx = 0; cIdx < group.components.length; cIdx++) {
        if (group.components[cIdx].type === type)
          return group.components[cIdx];
      }
    }
  }
 
  return null;
}

/** backward compatibility */
export const getComponentsAndSettings = (markup: FormMarkup): FormMarkupWithSettings => {
  return {
    components: getComponentsFromMarkup(markup),
    formSettings: getFromSettingsFromMarkup(markup),
  };
};

export const getComponentsFromMarkup = (markup: FormMarkup): IConfigurableFormComponent[] => {
  if (!markup)
    return [];
  return Array.isArray(markup)
    ? markup as IConfigurableFormComponent[]
    : (markup as FormMarkupWithSettings).components;
}

export const getFromSettingsFromMarkup = (markup: FormMarkup): IFormSettings => {
  return Array.isArray(markup) || !Boolean(markup)
    ? DEFAULT_FORM_SETTINGS
    : (markup as FormMarkupWithSettings).formSettings;
}


export const validateForm = (rules: Rules, values: ValidateSource): Promise<void> => {
  const validator = new Schema(rules);

  return validator.validate(values);
}

export const getFormValidationRules = (markup: FormMarkup): Rules => {
  const components = getComponentsFromMarkup(markup);

  const rules: Rules = {};
  components.forEach(component => {
    rules[component.name] = getValidationRules(component);
  });

  return rules;
}

export const validateConfigurableComponentSettings = (markup: FormMarkup, values: ValidateSource): Promise<void> => {
  const rules = getFormValidationRules(markup);
  const validator = new Schema(rules);

  return validator.validate(values);
}