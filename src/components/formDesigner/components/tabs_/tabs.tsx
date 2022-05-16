import { IToolboxComponent } from '../../../../interfaces';
import { FormMarkup, IConfigurableFormComponent, IFormComponentContainer } from '../../../../providers/form/models';
import { FolderOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import ComponentsContainer from '../../componentsContainer';
import settingsFormJson from './settingsForm.json';
import React from 'react';
import { validateConfigurableComponentSettings } from '../../../../providers/form/utils';
import { useForm } from '../../../../providers';
import { TabsType } from 'antd/lib/tabs';
import { nanoid } from 'nanoid/non-secure';

const { TabPane } = Tabs;

export interface ITabProps {
  id: string;
  key: string;
  title: string;
  components: IConfigurableFormComponent[];
}

export interface ITabsComponentProps extends IConfigurableFormComponent {
  tabs: ITabProps[];
  defaultActiveKey?: string;
  tabType?: TabsType;
}

const settingsForm = settingsFormJson as FormMarkup;

const TabsComponent: IToolboxComponent<ITabsComponentProps> = {
  type: 'tabs',
  name: 'Tabs',
  icon: <FolderOutlined />,
  factory: model => {
    const { isComponentHidden } = useForm();

    const size = 'small';
    const { tabs, defaultActiveKey, tabType = 'card' } = model as ITabsComponentProps;

    if (isComponentHidden(model)) return null;

    const actionKey = defaultActiveKey || (tabs?.length && tabs[0]?.key);

    return (
      <Tabs defaultActiveKey={actionKey} size={size} type={tabType}>
        {tabs?.map(({ id, key, title }) => (
          <TabPane key={key} tab={title}>
            <ComponentsContainer containerId={id} />
          </TabPane>
        ))}
      </Tabs>
    );
  },
  initModel: model => {
    const tabsModel: ITabsComponentProps = {
      ...model,
      name: 'custom Name',
      tabs: [{ id: nanoid(), title: 'Tab 1', key: 'tab1', components: [] }],
    };
    return tabsModel;
  },
  settingsFormMarkup: settingsForm,
  validateSettings: model => validateConfigurableComponentSettings(settingsForm, model),
  customContainerNames: ['tabs'],

  getContainers: model => {
    const { tabs } = model as ITabsComponentProps;
    return tabs.map<IFormComponentContainer>(t => ({ id: t.id }));
  },
};

export default TabsComponent;
