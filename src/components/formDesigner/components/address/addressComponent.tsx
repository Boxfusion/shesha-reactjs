import React, { FC } from 'react';
import { IToolboxComponent } from '../../../../interfaces';
import { FormMarkup, IConfigurableFormComponent } from '../../../../providers/form/models';
import { HomeOutlined } from '@ant-design/icons';
import { InputProps } from 'antd/lib/input';
import ConfigurableFormItem from '../formItem';
import settingsFormJson from './settingsForm.json';
import { AutoCompletePlaces } from '../../../';
import { validateConfigurableComponentSettings } from '../../../../providers/form/utils';

export interface IAddressCompomentProps extends IConfigurableFormComponent {
  placeholder?: string;
  prefix?: string;
  suffix?: string;
  hideBorder?: boolean;
}

const settingsForm = settingsFormJson as FormMarkup;

const AddressCompoment: IToolboxComponent<IAddressCompomentProps> = {
  type: 'address',
  name: 'Address',
  icon: <HomeOutlined />,
  factory: (model: IAddressCompomentProps) => {
    return (
      <ConfigurableFormItem model={model}>
        <AutoCompletePlacesField {...model}></AutoCompletePlacesField>
      </ConfigurableFormItem>
    );
  },
  settingsFormMarkup: settingsForm,
  validateSettings: model => validateConfigurableComponentSettings(settingsForm, model),
};

interface IAutoCompletePlacesFieldProps extends IAddressCompomentProps {
  value?: any;
  onChange?: any;
}

const AutoCompletePlacesField: FC<IAutoCompletePlacesFieldProps> = props => {
  let inputProps: InputProps = {
    placeholder: props.placeholder,
    prefix: props.prefix,
    suffix: props.suffix,
    disabled: props.disabled,
    bordered: !props.hideBorder,
  };
  return (
    <AutoCompletePlaces
      className="search-input text-center"
      value={props.value}
      onChange={props.onChange}
      {...inputProps}
    />
  );
};

export default AddressCompoment;
