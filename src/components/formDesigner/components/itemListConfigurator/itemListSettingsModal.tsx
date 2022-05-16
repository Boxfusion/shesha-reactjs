import React, { FC, Fragment, ReactNode, useState } from 'react';
import { Button, Modal } from 'antd';
import { ItemListConfigurator } from './configurator';
import { ItemListConfiguratorProvider, useItemListConfigurator } from '../../../..';
import { IConfigurableItemBase, IItemsOptions } from '../../../../providers/itemListConfigurator/contexts';
import { FormMarkup } from '../../../../providers/form/models';

export interface IItemListSettingsModalProps {
  value?: object;
  onChange?: any;
  allowAddGroups?: boolean;
  render?: ReactNode | (() => ReactNode);
  title?: ReactNode | string;
  heading?: ReactNode | (() => ReactNode);
  options?: IItemsOptions;
  callToAction?: string;
  itemTypeMarkup?: FormMarkup;
  groupTypeMarkup?: FormMarkup;
}

export const ItemListSettingsModalInner: FC<Omit<
  IItemListSettingsModalProps,
  'options' | 'itemTypeMarkup' | 'groupTypeMarkup'
>> = ({ onChange, allowAddGroups, render, title = 'Configure Item', heading, callToAction = 'Customize items' }) => {
  const [showModal, setShowModal] = useState(false);
  const { items } = useItemListConfigurator();

  const toggleModalVisibility = () => setShowModal(prev => !prev);

  const onOkClick = () => {
    if (typeof onChange === 'function') onChange(items);
    toggleModalVisibility();
  };

  return (
    <Fragment>
      <Button onClick={toggleModalVisibility}>{callToAction}</Button>

      <Modal
        width="60%"
        visible={showModal}
        title={title}
        okText="Save"
        onCancel={toggleModalVisibility}
        onOk={onOkClick}
      >
        <ItemListConfigurator allowAddGroups={allowAddGroups} heading={heading} render={render} />
      </Modal>
    </Fragment>
  );
};

export const ItemListSettingsModal: FC<IItemListSettingsModalProps> = ({
  options,
  itemTypeMarkup,
  groupTypeMarkup,
  ...rest
}) => {
  return (
    <ItemListConfiguratorProvider
      items={(rest?.value as IConfigurableItemBase[]) || []}
      options={options}
      itemTypeMarkup={itemTypeMarkup}
      groupTypeMarkup={groupTypeMarkup}
    >
      <ItemListSettingsModalInner {...rest} />
    </ItemListConfiguratorProvider>
  );
};

export default ItemListSettingsModal;
