import React, { FC, useEffect } from 'react';
import { Form, Modal, Spin } from 'antd';
import {
  useReferenceListItemCreate,
  useReferenceListItemUpdate,
  useReferenceListItemGet,
  ReferenceListItemDto,
} from 'api/referenceListItem';
import ReferenceListItemEditForm from './referenceListItemEditForm';
import { FormInstance } from 'antd/lib/form';
import { ValidationErrors } from '@shesha/reactjs';

interface IReferenceListItemEditModalProps {
  id?: string;
  listId?: string;
  visible: boolean;
  onCancel: (form: FormInstance) => void;
  onSuccess: (form: FormInstance) => void;
}

const ReferenceListItemEditModal: FC<IReferenceListItemEditModalProps> = ({
  visible,
  onCancel,
  onSuccess,
  id,
  listId: listId,
}) => {
  const [form] = Form.useForm();

  const idProvided = Boolean(id);

  const {
    mutate: save,
    error: savingError,
    loading: saving,
  } = idProvided ? useReferenceListItemUpdate({}) : useReferenceListItemCreate({});

  const {
    refetch: fetchModel,
    loading: loading,
    error: loadingError,
    data: serverData,
  } = useReferenceListItemGet({
    lazy: true,
  });
  useEffect(() => {
    if (id) {
      fetchModel({ queryParams: { id: id } }).then(() => {
        form.resetFields();
      });
    } else form.resetFields();
  }, [id]);

  const model = idProvided && Boolean(serverData) ? serverData?.result : {};

  const handleSubmit = (values) => {
    const data = { ...values } as ReferenceListItemDto;
    if (listId) data.referenceList = { id: listId };
    if (id) data.id = id;
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
      title={idProvided ? 'Edit item' : 'Create new item'}
      okText={idProvided ? 'Save' : 'Create'}
      onCancel={handleCancel}
      onOk={() => form.submit()}
      confirmLoading={saving || loading}
    >
      <Spin spinning={saving || loading} tip="Please wait...">
        <ValidationErrors error={savingError} />
        <ValidationErrors error={loadingError}></ValidationErrors>
        <ReferenceListItemEditForm model={model} listId={listId} onSubmit={handleSubmit} form={form} />
      </Spin>
    </Modal>
  );
};

export default ReferenceListItemEditModal;
