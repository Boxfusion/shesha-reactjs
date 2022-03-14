import React, { FC } from 'react';
import { Form, Modal, Input, Spin } from 'antd';
import { useMobileDeviceCreate } from 'api/mobileDevice';
import { FormInstance } from 'antd/lib/form';
import { ValidationErrors } from '@shesha/reactjs';

interface ICreateMobileDeviceFormProps {
  form: FormInstance;
  onSubmit: (values: any) => void;
}

const CreateMobileDeviceForm: FC<ICreateMobileDeviceFormProps> = ({ form, onSubmit }) => {
  const handleSubmit = (values) => {
    onSubmit(values);
  };

  return (
    <Form form={form} onFinish={handleSubmit} labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}>
      <Form.Item label="Device Name" name="name" rules={[{ required: true, message: 'This field is required' }]}>
        <Input autoFocus />
      </Form.Item>
      <Form.Item label="IMEI" name="imei" rules={[{ required: true, message: 'This field is required' }]}>
        <Input />
      </Form.Item>
    </Form>
  );
};

interface ICreateMobileDeviceModalProps {
  visible: boolean;
  onCancel: (form: FormInstance) => void;
  onSuccess: (form: FormInstance) => void;
}

const CreateMobileDeviceModal: FC<ICreateMobileDeviceModalProps> = ({ visible, onCancel, onSuccess }) => {
  const { mutate: save, error, loading } = useMobileDeviceCreate({});

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
      title="New Mobile Device"
      okText="Create"
      onCancel={handleCancel}
      onOk={() => form.submit()}
      confirmLoading={loading}
    >
      <Spin spinning={loading} tip="Please wait...">
        <ValidationErrors error={error} />
        <CreateMobileDeviceForm form={form} onSubmit={handleSubmit} />
      </Spin>
    </Modal>
  );
};

export default CreateMobileDeviceModal;
