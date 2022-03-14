import React, { FC } from 'react';
import { Modal, Form, Spin } from 'antd';
import { useReferenceListCreate, ReferenceListDto } from 'api/referenceList';
import { FormInstance } from 'antd/lib/form';
import { ValidationErrors } from '@shesha/reactjs';
import ReferenceListEditForm from './referenceListEditForm';

const defaultModel: ReferenceListDto = {};

interface IReferenceListCreateModalProps {
  visible: boolean;
  onCancel: (form: FormInstance) => void;
  onSuccess: (form: FormInstance) => void;
}

const ReferenceListCreateModal: FC<IReferenceListCreateModalProps> = ({ visible, onCancel, onSuccess }) => {
  const [form] = Form.useForm();

  const { mutate: save, error, loading } = useReferenceListCreate({});

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
      title="New Reference List"
      okText="Create"
      onCancel={handleCancel}
      onOk={submitForm}
      confirmLoading={loading}
    >
      <Spin spinning={loading} tip="Please wait...">
        <ValidationErrors error={error} />
        <ReferenceListEditForm model={defaultModel} onSubmit={handleSubmit} form={form} />
      </Spin>
    </Modal>
  );
};

export default ReferenceListCreateModal;
