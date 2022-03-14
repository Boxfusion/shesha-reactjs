import React, { FC } from 'react';
import { Form, Input, InputNumber } from 'antd';
import { ReferenceListItemDto } from 'api/referenceListItem';
import { FormInstance } from 'antd/lib/form';

interface IReferenceListItemEditFormProps {
  form: FormInstance;
  model: ReferenceListItemDto;
  listId?: string;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ReferenceListItemEditForm: FC<IReferenceListItemEditFormProps> = ({ form, model, onSubmit }) => {
  const handleSubmit = (values) => {
    onSubmit(values);
  };

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  return (
    <Form className="table-form" layout="horizontal" form={form} onFinish={handleSubmit} {...formItemLayout}>
      <Form.Item
        label="Item"
        name="item"
        initialValue={model.item}
        rules={[{ required: true, message: 'This field is required' }]}
      >
        <Input autoFocus />
      </Form.Item>
      <Form.Item
        label="Value"
        name="itemValue"
        initialValue={model.itemValue}
        rules={[{ required: true, message: 'This field is required' }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        label="Order Index"
        name="orderIndex"
        initialValue={model.orderIndex}
        rules={[{ required: true, message: 'This field is required' }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item label="Description" name="description" initialValue={model.description}>
        <Input.TextArea rows={4} autoSize={true} />
      </Form.Item>
    </Form>
  );
};

export default ReferenceListItemEditForm;
