import { Html5Outlined } from '@ant-design/icons';
import settingsFormJson from './settingsForm.json';

import { useForm, IToolboxComponent, IConfigurableFormComponent } from '@shesha/reactjs';
// import { useForm } from '../../../../providers/form';
// import { IToolboxComponent } from '../../../../providers/form/components';
// import { IFormComponent } from '../../../../providers/form/models';

import { Alert } from 'antd';
import React from 'react';

export interface IHtmlContentComponentProps extends IConfigurableFormComponent {
  content?: string;
}

const HtmlContentComponent: IToolboxComponent<IHtmlContentComponentProps> = {
  type: 'htmlContent',
  name: 'Html Content',
  icon: <Html5Outlined />,
  factory: (model: IConfigurableFormComponent) => {
    const { formMode } = useForm();

    const customProps = model as IHtmlContentComponentProps;
    if (!customProps.content) {
      if (formMode == 'designer') {
        return <Alert className="sha-designer-warning" message="Html content is not specified" type="warning" />;
      } else return null;
    }

    return (
      <div
        dangerouslySetInnerHTML={{
          __html: customProps.content,
        }}
      ></div>
    );
  },
  settingsFormMarkup: settingsFormJson as IConfigurableFormComponent[],
};

export default HtmlContentComponent;
