import React from 'react';
import { Html5Outlined } from '@ant-design/icons';
import settingsFormJson from './settingsForm.json';
import { IToolboxComponent, IConfigurableFormComponent, ConfigurableFormItem } from '@shesha/reactjs';
import HtmlEditor from '../../htmlEditor';

export interface IHtmlEditorComponentProps extends IConfigurableFormComponent {
  content?: string;
}

const HtmlEditorComponent: IToolboxComponent<IHtmlEditorComponentProps> = {
  type: 'htmlEditor',
  name: 'Html Editor',
  icon: <Html5Outlined />,
  factory: (model: IConfigurableFormComponent) => {
    //const { formMode } = useForm();
    const customProps = model as IHtmlEditorComponentProps;

    const inputProps = {
      //placeholder: customProps.placeholder,
      disabled: customProps.disabled,
    };

    return (
      <ConfigurableFormItem model={model}>
        <HtmlEditor {...(inputProps as any)} />
        {/* <Input {...inputProps} bordered={!customProps.hideBorder}></Input> */}
      </ConfigurableFormItem>
    );
  },
  settingsFormMarkup: settingsFormJson as IConfigurableFormComponent[],
};

export default HtmlEditorComponent;
