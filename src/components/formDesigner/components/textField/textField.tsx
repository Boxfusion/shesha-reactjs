import { IToolboxComponent } from '../../../../interfaces';
import { FormMarkup, IConfigurableFormComponent } from '../../../../providers/form/models';
import { CodeOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { InputProps } from 'antd/lib/input';
import ConfigurableFormItem from '../formItem';
import settingsFormJson from './settingsForm.json';
import React from 'react';
import { validateConfigurableComponentSettings } from '../../../../providers/form/utils';
import { DataTypes, StringFormats } from '../../../../interfaces/dataTypes';

type TextType = 'text' | 'password';
export interface ITextFieldProps extends IConfigurableFormComponent {
  placeholder?: string;
  prefix?: string;
  suffix?: string;
  hideBorder?: boolean;
  initialValue?: string;
  passEmptyStringByDefault?: boolean;
  textType?: TextType;
  maxLength?: number;
}

const settingsForm = settingsFormJson as FormMarkup;

const renderInput = (type: TextType) => {
  switch (type) {
    case 'password':
      return Input.Password;
    default:
      return Input;
  }
};

const TextField: IToolboxComponent<ITextFieldProps> = {
  type: 'textField',
  name: 'Text field',
  icon: <CodeOutlined />,
  dataTypeSupported: ({ dataType, dataFormat }) => dataType === DataTypes.string && dataFormat === StringFormats.singleline,
  factory: (model: ITextFieldProps) => {
    const inputProps: InputProps = {
      placeholder: model.placeholder,
      prefix: model.prefix,
      suffix: model.suffix,
      disabled: model.disabled,
      bordered: !model.hideBorder,
      maxLength: model.maxLength,
    };

    const InputComponentType = renderInput(model.textType);

    return (
      <ConfigurableFormItem
        model={model}
        initialValue={(model?.passEmptyStringByDefault && '') || model?.initialValue}
      >
        <InputComponentType {...inputProps} />
      </ConfigurableFormItem>
    );
  },
  settingsFormMarkup: settingsForm,
  validateSettings: model => validateConfigurableComponentSettings(settingsForm, model),
  initModel: model => (
    { 
      textType: 'text',
      ...model
    }
  ),
  linkToModelMetadata: (model, metadata): ITextFieldProps => {
    return {
      ...model,
      label: metadata.label,
      description: metadata.description,
      maxLength: metadata.maxLength,
      textType: metadata.dataFormat === StringFormats.password ? 'password' : 'text',
    };
  },
};

export default TextField;
