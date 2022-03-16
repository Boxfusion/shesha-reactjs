import { IToolboxComponent } from '../../../../interfaces';
import { FormMarkup, IConfigurableFormComponent } from '../../../../providers/form/models';
import { ProfileOutlined } from '@ant-design/icons';
import { Radio, Checkbox, Col, Row } from 'antd';
import ConfigurableFormItem from '../formItem';
import settingsFormJson from './settingsForm.json';
import React, { CSSProperties, FC, useEffect, useState } from 'react';
import { validateConfigurableComponentSettings } from '../../../../providers/form/utils';
import { DataTypes } from '../../../../interfaces/dataTypes';
import { ReferenceListItemDto, useReferenceListGetItems } from '../../../../apis/referenceList';
import { getCachedItems, saveListItems } from '../../../refListDropDown/utils';

export interface ICheckItem {
  id: string;
  name: string;
  value: string;
}

export type DataSourceType = 'values' | 'referenceList';

export interface ICheckboxGoupProps extends IConfigurableFormComponent {
  items?: ICheckItem[];
  mode?: 'single' | 'multiple';
  referenceListNamespace?: string;
  referenceListName?: string;
  dataSourceType: DataSourceType;
  orientation?: 'vertical' | 'inline';
  values?: ICheckItem[];
}

const settingsForm = settingsFormJson as FormMarkup;

const CheckboxGroupComponent: IToolboxComponent<ICheckboxGoupProps> = {
  type: 'checkboxGroup',
  name: 'Checkbox group',
  icon: <ProfileOutlined />,
  dataTypeSupported: ({ dataType }) => dataType === DataTypes.referenceListItem,
  factory: (model: ICheckboxGoupProps) => {
    // const { items = [] } = model;
    // const checkItems = items.map(item => ({ label: item.name, value: item.value }));
    return (
      <ConfigurableFormItem model={model}>
        <RefListCheckboxGroup {...model} />
      </ConfigurableFormItem>
    );
  },
  settingsFormMarkup: settingsForm,
  validateSettings: model => validateConfigurableComponentSettings(settingsForm, model),
  initModel: model => {
    const customProps: ICheckboxGoupProps = {
      ...model,
      dataSourceType: 'values',
    };
    return customProps;
  },
  linkToModelMetadata: (model, metadata): ICheckboxGoupProps => {
    return {
      ...model,
      dataSourceType: metadata.dataType === DataTypes.referenceListItem ? 'referenceList' : 'values',
      referenceListNamespace: metadata.referenceListNamespace,
      referenceListName: metadata.referenceListName,
      mode: 'single',
    };
  },
};

/** A component for displaying reference list item as Checkbox Group */
export const RefListCheckboxGroup: FC<ICheckboxGoupProps> = ({
  dataSourceType,
  referenceListNamespace,
  referenceListName,
  mode,
  items,
  values,
  orientation,
}) => {
  const { refetch: fetchItems, data: listItemsResult } = useReferenceListGetItems({ lazy: true });
  const [cachedListItems, setCachedListItems] = useState<ReferenceListItemDto[]>([]);

  const checkBoxStyle: CSSProperties = orientation === 'vertical' ? {} : {};

  const checkBoxSpan = orientation === 'vertical' ? 24 : 0;

  const radioStyle: CSSProperties =
    orientation === 'vertical' ? { display: 'block', height: '30px', lineHeight: '30px' } : {};

  useEffect(() => {
    if (referenceListName && referenceListNamespace) {
      const cachedItems = getCachedItems(referenceListName, referenceListNamespace);

      if (cachedItems?.length) {
        setCachedListItems(cachedItems);
      } else {
        fetchItems({ queryParams: { name: referenceListName, namespace: referenceListNamespace } });
      }
    }
  }, [referenceListName, referenceListNamespace]);

  useEffect(() => {
    if (listItemsResult?.result) {
      saveListItems(referenceListName, referenceListNamespace, listItemsResult?.result);
    }
  }, [listItemsResult]);

  const listItems = cachedListItems?.length ? cachedListItems : listItemsResult?.result;

  const options = listItems;

  const getOptions = (): ICheckItem[] => {
    return values;
  };

  const valueOptions = getOptions() || [];

  if (dataSourceType === 'referenceList') {
    return mode === 'multiple' ? (
      <Checkbox.Group>
        <Row>
          {options?.map(({ id, item, itemValue }) => (
            <Col key={itemValue} span={checkBoxSpan}>
              <Checkbox key={id} value={itemValue} style={checkBoxStyle}>
                {item}
              </Checkbox>
            </Col>
          ))}
        </Row>
      </Checkbox.Group>
    ) : (
      <Radio.Group>
        {options?.map(({ id, item, itemValue }) => (
          <Radio key={id} value={itemValue} style={radioStyle}>
            {item}
          </Radio>
        ))}
      </Radio.Group>
    );
  } else {
    console.log('Selected mode is values');
    console.log(valueOptions);
    return mode === 'multiple' ? (
      <Checkbox.Group>
        {items?.map(({ id, name, value }) => (
          <Checkbox key={id} name={name} style={checkBoxStyle}>
            {value}
          </Checkbox>
        ))}
      </Checkbox.Group>
    ) : (
      <Radio.Group>
        {items?.map(({ id, name, value }) => (
          <Radio key={id} value={value} name={name} style={radioStyle}>
            {value}
          </Radio>
        ))}
      </Radio.Group>
    );
  }
};

export default CheckboxGroupComponent;
