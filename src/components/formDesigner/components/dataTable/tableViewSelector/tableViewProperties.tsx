import { FC, useEffect, ReactNode, useState } from 'react';
import { useTableViewSelectorConfigurator } from '../../../../../providers/tableViewSelectorConfigurator';
import { Empty, Form } from 'antd';
import { ConfigurableForm } from '../../../../../components';
import tableViewSettingsJson from './tableViewSettings.json';
import { FormMarkup } from '../../../../../providers/form/models';
import { useDebouncedCallback } from 'use-debounce';
import React from 'react';

export interface IProps {}

export const TableViewProperties: FC<IProps> = () => {
  const { selectedItemId, getItem, updateItem } = useTableViewSelectorConfigurator();
  // note: we have to memoize the editor to prevent unneeded re-rendering and loosing of the focus
  const [editor, setEditor] = useState<ReactNode>(<></>);
  const [form] = Form.useForm();

  const debouncedSave = useDebouncedCallback(
    values => {
      updateItem({ id: selectedItemId, settings: values });
    },
    // delay in ms
    300
  );

  const getEditor = () => {
    const emptyEditor = null;
    if (!selectedItemId) return emptyEditor;

    const componentModel = getItem(selectedItemId);

    const onSettingsSave = values => {
      console.log(values);
    };

    return (
      <ConfigurableForm
        layout="vertical"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        mode="edit"
        markup={tableViewSettingsJson as FormMarkup}
        onFinish={onSettingsSave}
        form={form}
        initialValues={componentModel}
        onValuesChange={debouncedSave}
      ></ConfigurableForm>
    );
  };

  useEffect(() => {
    const editor = getEditor();
    setEditor(editor);
  }, [selectedItemId]);

  useEffect(() => {
    form.resetFields();
  }, [selectedItemId]);

  if (!Boolean(selectedItemId)) {
    return (
      <div>
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Please select a component to begin editing"></Empty>
      </div>
    );
  }

  return <>{editor}</>;
};

export default TableViewProperties;
