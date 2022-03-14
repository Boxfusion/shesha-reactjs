import React, { FC } from 'react';
import { Form, Modal, Input, Spin } from 'antd';
import { useProvinceCreate } from 'api/province';
import { FormInstance } from 'antd/lib/form';
import { ValidationErrors } from '@shesha/reactjs';

interface EditFormProps {
  form: FormInstance;
  onSubmit: (values: any) => void;
}

const CreateForm: FC<EditFormProps> = ({ form, onSubmit }) => {
  const handleSubmit = (values) => {
    onSubmit(values);
  };

  return (
    <Form form={form} onFinish={handleSubmit} labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}>
      <Form.Item label="Name" name="name" rules={[{ required: true, message: 'This field is required' }]}>
        <Input autoFocus />
      </Form.Item>

      <Form.Item label="Comments" name="comments">
        <Input />
      </Form.Item>
    </Form>
  );
};

interface IModalProps {
  visible: boolean;
  onCancel: (form: FormInstance) => void;
  onSuccess: (form: FormInstance) => void;
}

const ProvincesModalForm: FC<IModalProps> = ({ visible, onCancel, onSuccess }) => {
  const { mutate: save, error, loading } = useProvinceCreate({});

  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    save(values).then(() => {
      onSuccess(form);
    });
  };

  const handleCancel = () => {
    onCancel(form);
  };

  return (
    <Modal
      width="60%"
      visible={visible}
      title="New Province"
      okText="Create"
      onCancel={handleCancel}
      onOk={() => form.submit()}
      confirmLoading={loading}
    >
      <Spin spinning={loading} tip="Please wait...">
        <ValidationErrors error={error} />
        <CreateForm form={form} onSubmit={handleSubmit} />
      </Spin>
    </Modal>
  );
};

export default ProvincesModalForm;
