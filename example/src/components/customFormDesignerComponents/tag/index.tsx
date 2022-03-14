import React from 'react';
import { BgColorsOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import { tagSettingsForm } from './settings';
import {
  IConfigurableFormComponent,
  IToolboxComponent,
  useForm,
  validateConfigurableComponentSettings,
} from '@shesha/reactjs';

export interface ITagProps extends IConfigurableFormComponent {
  color?: string; // Show have a color picker instead
  text?: string;
}

const TagFormComponent: IToolboxComponent<ITagProps> = {
  type: 'tag',
  name: 'Tag custom',
  icon: <BgColorsOutlined />,
  factory: (model: IConfigurableFormComponent) => {
    const { formMode, visibleComponentIds } = useForm();
    const { color, text } = model as ITagProps;

    const hiddenByCondition = visibleComponentIds && !visibleComponentIds.includes(model.id);
    const isHidden = formMode !== 'designer' && (model.hidden || hiddenByCondition);
    if (isHidden) return null;

    return <Tag color={color}>{text}</Tag>;
  },
  settingsFormMarkup: tagSettingsForm,
  validateSettings: (model) => validateConfigurableComponentSettings(tagSettingsForm, model),
};

export default TagFormComponent;
