import React, { FC } from 'react';
import { Modal, Form, Spin } from 'antd';
import { useNotificationTemplateCreate, NotificationTemplateDto } from 'api/notificationTemplate';
import { FormInstance } from 'antd/lib/form';
import { ValidationErrors } from '@shesha/reactjs';
import EditNotificationTemplatesForm from './editNotificationTemplatesForm';

const defaultModel: NotificationTemplateDto = {
  isEnabled: true,
  bodyFormat: { item: 'html', itemValue: 1 },
  sendType: { item: 'email', itemValue: 1 },
};

interface ICreateNotificationTemplateModalProps {
  notificationId?: string;
  visible: boolean;
  onCancel: () => void;
  onSuccess: (form: FormInstance) => void;
}

const CreateNotificationTemplateModal: FC<ICreateNotificationTemplateModalProps> = ({
  visible,
  onCancel,
  onSuccess,
  notificationId,
}) => {
  const [form] = Form.useForm();

  const { mutate: save, error, loading } = useNotificationTemplateCreate({});

  const submitForm = () => {
    form.submit();
  };

  const handleSubmit = (values) => {
    const data = { ...values };
    if (notificationId) data.notification = { id: notificationId };
    save(data).then(() => {
      onSuccess(form);
    });
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Modal
      width="60%"
      visible={visible}
      title="New Notification Template"
      okText="Create"
      onCancel={handleCancel}
      onOk={submitForm}
      confirmLoading={loading}
    >
      <Spin spinning={loading} tip="Please wait...">
        <ValidationErrors error={error} />
        <EditNotificationTemplatesForm
          model={defaultModel}
          notificationId={notificationId}
          onSubmit={handleSubmit}
          form={form}
        />
      </Spin>
    </Modal>
  );
};

export default CreateNotificationTemplateModal;
