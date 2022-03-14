import React, { FC } from 'react';
import { Modal, Form, Spin } from 'antd';
import { useFormCreate, FormDto } from 'api/form';
import { FormInstance } from 'antd/lib/form';
import { ValidationErrors } from '@shesha/reactjs';
import EditSettingsFormModal from './editSettingsFormModal';

const defaultModel: FormDto = {};

interface ICreateFormModalProps {
  visible: boolean;
  onCancel: (form: FormInstance) => void;
  onSuccess: (form: FormInstance) => void;
}

const CreateSettingsFormModal: FC<ICreateFormModalProps> = ({ visible, onCancel, onSuccess }) => {
  const [form] = Form.useForm();

  const { mutate: save, error, loading } = useFormCreate({});

  const submitForm = () => {
    form.submit();
  };

  const handleSubmit = (values) => {
    const data = { ...values };
    save(data).then(() => {
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
      title="New Form"
      okText="Create"
      onCancel={handleCancel}
      onOk={submitForm}
      confirmLoading={loading}
    >
      <Spin spinning={loading} tip="Please wait...">
        <ValidationErrors error={error} />
        <EditSettingsFormModal model={defaultModel} onSubmit={handleSubmit} form={form} />
      </Spin>
    </Modal>
  );
};
export default CreateSettingsFormModal;
