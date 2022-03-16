import { FileSearchOutlined } from '@ant-design/icons';
import React, { Key } from 'react';
import { IToolboxComponent } from '../../../../interfaces';
import { DataTypes } from '../../../../interfaces/dataTypes';
import { useForm } from '../../../../providers/form';
import { FormMarkup, IConfigurableFormComponent } from '../../../../providers/form/models';
import { evaluateValue, replaceTags, validateConfigurableComponentSettings } from '../../../../providers/form/utils';
import Autocomplete, { AutocompleteDataSourceType, ISelectOption } from '../../../autocomplete';
import ConfigurableFormItem from '../formItem';
import settingsFormJson from './settingsForm.json';

interface IQueryParamProp {
  id: string;
  param?: string;
  value?: Key;
}

interface IQueryParams {
  // tslint:disable-next-line:typedef-whitespace
  [name: string]: Key;
}

export interface IAutocompleteProps extends IConfigurableFormComponent {
  entityTypeShortAlias?: string;
  hideBorder?: boolean;
  dataSourceUrl?: string;
  dataSourceType: AutocompleteDataSourceType;
  mode?: 'tags' | 'multiple';
  useRawValues: boolean;
  queryParams: IQueryParamProp[];
  keyPropName?: string;
  valuePropName?: string;

  quickviewEnabled?: boolean;
  quickviewFormPath?: string;
  quickviewDisplayPropertyName?: string;
  quickviewGetEntityUrl?: string;
  quickviewWidth?: number;
}

const settingsForm = settingsFormJson as FormMarkup;

const AutocompleteComponent: IToolboxComponent<IAutocompleteProps> = {
  type: 'autocomplete',
  name: 'Autocomplete',
  icon: <FileSearchOutlined />,
  dataTypeSupported: ({ dataType }) => dataType === DataTypes.entityReference,
  factory: (model: IAutocompleteProps) => {
    const { queryParams } = model;
    const { formData, formMode, isComponentDisabled } = useForm();
    const dataSourceUrl = model.dataSourceUrl
      ? replaceTags(model.dataSourceUrl, { data: formData })
      : model.dataSourceUrl;

    const disabled = isComponentDisabled(model);

    const getQueryParams = (): IQueryParams => {
      const queryParamObj: IQueryParams = {};

      if (queryParams?.length) {
        queryParams?.forEach(({ param, value }) => {
          const valueAsString = value as string;
          if (param?.length && valueAsString.length) {
            queryParamObj[param] = /{.*}/i.test(valueAsString)
              ? evaluateValue(valueAsString, { data: formData })
              : value;
          }
        });

        return queryParamObj;
      }

      return null;
    };

    const getFetchedItemData = (
      item: object,
      useRawValues: boolean,
      value: string = 'value',
      displayText: string = 'displayText'
    ) =>
      useRawValues
        ? item[value]
        : {
          id: item[value],
          displayText: item[displayText],
        };

    const getOptionFromFetchedItem = (item: object): ISelectOption => {
      const { dataSourceType, keyPropName, useRawValues, valuePropName } = model;

      if (dataSourceType === 'url' && keyPropName && valuePropName) {
        return {
          value: item[keyPropName],
          label: item[valuePropName],
          data: getFetchedItemData(item, useRawValues, keyPropName, valuePropName),
        };
      }

      return {
        value: item['value'],
        label: item['displayText'],
        data: getFetchedItemData(item, useRawValues),
      };
    };

    const autocompleteProps = {
      typeShortAlias: model?.entityTypeShortAlias,
      allowInherited: true /*hardcoded for now*/,
      disabled,
      bordered: !model.hideBorder,
      dataSourceUrl,
      dataSourceType: model.dataSourceType,
      mode: model?.mode,
      queryParams: getQueryParams(),
      readOnly: model?.readOnly || formMode === 'readonly',
      getOptionFromFetchedItem,

      quickviewEnabled: model?.quickviewEnabled,
      quickviewFormPath: model?.quickviewFormPath,
      quickviewDisplayPropertyName: model?.quickviewDisplayPropertyName,
      quickviewGetEntityUrl: model?.quickviewGetEntityUrl,
      quickviewWidth: model?.quickviewWidth,
    };

    // todo: implement other types of datasources!
    return (
      <ConfigurableFormItem model={model}>
        {
          model.useRawValues ? (
            <Autocomplete.Raw {...autocompleteProps} />
          ) : (
            <Autocomplete.EntityDto {...autocompleteProps} />
          )
        }
      </ConfigurableFormItem>
    );
  },
  settingsFormMarkup: settingsForm,
  validateSettings: model => validateConfigurableComponentSettings(settingsForm, model),
  initModel: model => {
    const customProps: IAutocompleteProps = {
      ...model,
      dataSourceType: 'entitiesList',
      useRawValues: false,
    };
    return customProps;
  },
  linkToModelMetadata: (model, metadata): IAutocompleteProps => {
    return {
      ...model,
      useRawValues: true,
      dataSourceType: 'entitiesList',
      entityTypeShortAlias: metadata.entityType,
      mode: undefined,
    };
  },
};

export default AutocompleteComponent;
