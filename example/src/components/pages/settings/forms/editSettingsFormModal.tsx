import React, { FC } from 'react';
import { Form, Input } from 'antd';
import { FormDto } from 'api/form';
import { FormInstance } from 'antd/lib/form';

interface IEditFormModalProps {
  form: FormInstance;
  onSubmit: (values: any) => void;
  model: FormDto;
}

const EditSettingsFormModal: FC<IEditFormModalProps> = ({ form, model, onSubmit }) => {
  const formItemLayout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 },
  };

  return (
    <Form form={form} onFinish={onSubmit} className="table-form" layout="horizontal" {...formItemLayout}>
      <Form.Item
        label="Name"
        name="name"
        initialValue={model.name}
        rules={[{ required: true, message: 'This field is required' }]}
      >
        <Input autoFocus />
      </Form.Item>
      <Form.Item
        label="Path"
        name="path"
        initialValue={model.path}
        //rules={[{ required: true, message: 'This field is required' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Description" name="description" initialValue={model.description}>
        <Input.TextArea rows={4} autoSize={true} />
      </Form.Item>
    </Form>
  );
};

export default EditSettingsFormModal;
