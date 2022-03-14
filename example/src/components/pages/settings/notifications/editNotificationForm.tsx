import React, { FC } from 'react';
import { Form } from 'antd';
import { Input } from 'antd';
import { NotificationDto } from 'api/notification';
import { FormInstance } from 'antd/lib/form';

interface IEditNotificationFormProps {
  model: NotificationDto;
  onSubmit?: (values: any) => void;
  form: FormInstance;
}

const EditNotificationForm: FC<IEditNotificationFormProps> = ({ form, model, onSubmit }) => {
  const handleSubmit = (values) => {
    onSubmit(values);
  };

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  return (
    <Form form={form} className="table-form" layout="horizontal" onFinish={handleSubmit} {...formItemLayout}>
      <Form.Item
        label="Name"
        name="name"
        initialValue={model.name}
        rules={[{ required: true, message: 'This field is required' }]}
      >
        <Input autoFocus />
      </Form.Item>

      <Form.Item label="Description" name="description" initialValue={model.description}>
        <Input.TextArea rows={4} autoSize={true} />
      </Form.Item>
    </Form>
  );
};

export default EditNotificationForm;
