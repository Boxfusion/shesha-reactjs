import React, { FC } from 'react';
import { Form, Input, Checkbox } from 'antd';
import { ReferenceListDto } from 'api/referenceList';
import { FormInstance } from 'antd/lib/form';

interface IReferenceListEditFormProps {
  form: FormInstance;
  onSubmit: (values: any) => void;
  model: ReferenceListDto;
}

const ReferenceListEditForm: FC<IReferenceListEditFormProps> = ({ form, model, onSubmit }) => {
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
        label="Namespace"
        name="namespace"
        initialValue={model.namespace}
        rules={[{ required: true, message: 'This field is required' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Description" name="description" initialValue={model.description}>
        <Input.TextArea rows={4} autoSize={true} />
      </Form.Item>
      <Form.Item label="Hard Link to Application:">
        <Checkbox checked={model.hardLinkToApplication} disabled={true}></Checkbox>
      </Form.Item>
    </Form>
  );
};

export default ReferenceListEditForm;
