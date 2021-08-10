import React, { FC } from 'react';
import { Modal } from 'antd';
import { ISettingsEditorProps } from '../configurableComponent';
import { ISideBarMenuProps } from '.';
import { SidebarMenuConfiguratorProvider, useSidebarMenuConfigurator } from '../../providers/sidebarMenuConfigurator';
import SidebarConfigurator from './configurator';

export interface IProps extends ISettingsEditorProps<ISideBarMenuProps> {
  title?: string;
}

export const ComponentSettingsModal: FC<IProps> = (props) => {
  return (
    <SidebarMenuConfiguratorProvider items={props.settings.items}>
      <ComponentSettingsModalInner
        {...props}
      >
      </ComponentSettingsModalInner>
    </SidebarMenuConfiguratorProvider>
  );
};

export const ComponentSettingsModalInner: FC<IProps> = ({ title, onSave, onCancel }) => {
  const { items } = useSidebarMenuConfigurator();
  
  const onOk = () => {
    onSave({ items: items });
  }

  return (
    <Modal
      width="60%" 
      visible={true}
      title={title}
      onCancel={onCancel}
      onOk={onOk}
    >
      <SidebarConfigurator></SidebarConfigurator>
    </Modal>
  );
}

export default ComponentSettingsModal;
