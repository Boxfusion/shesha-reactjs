import React, { FC, useEffect } from 'react';
import { Modal, Form, Spin, Input } from 'antd';
import { FormInstance } from 'antd/lib/form';
import {
  useScheduledJobTriggerCreate,
  useScheduledJobTriggerUpdate,
  useScheduledJobTriggerGet,
  ScheduledJobTriggerDto,
} from 'api/scheduledJobTrigger';
import { RefListDropDown, ValidationErrors } from '@shesha/reactjs';

interface IEditModalProps {
  form: FormInstance;
  onSubmit: (values: any) => void;
  model: ScheduledJobTriggerDto;
}

const EditorForm: FC<IEditModalProps> = ({ model, onSubmit, form }) => {
  const handleFinish = (values) => {
    onSubmit(values);
  };
  const loading = false;

  return (
    <Spin spinning={loading} tip="Please wait...">
      <Form form={form} onFinish={handleFinish} labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}>
        <Form.Item
          name={['status', 'itemValue']}
          label="Status"
          initialValue={model?.status?.itemValue}
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <RefListDropDown listNamespace="Shesha.Scheduler" listName="TriggerStatus" />
        </Form.Item>
        <Form.Item
          name="cronString"
          label="CRON string"
          initialValue={model?.cronString}
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          initialValue={model?.description}
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <Input.TextArea rows={4} autoSize={true} />
        </Form.Item>
      </Form>
    </Spin>
  );
};

interface IModalProps {
  visible: boolean;
  jobId: string;
  triggerId?: string;
  onCancel: () => void;
  onSuccess: () => void;
}

const EditTriggerModal: FC<IModalProps> = ({ visible, onCancel, onSuccess, jobId, triggerId }) => {
  const [form] = Form.useForm();

  const {
    refetch: fetchTrigger,
    loading: loading,
    data: triggerData,
    error: fetchError,
  } = useScheduledJobTriggerGet({
    lazy: true,
  });
  useEffect(() => {
    if (triggerId) {
      form.resetFields();
      fetchTrigger({ queryParams: { id: triggerId } }).then(() => {
        form.resetFields();
      });
    } else form.resetFields();
  }, [triggerId]);
  const mutator = triggerId ? useScheduledJobTriggerUpdate({}) : useScheduledJobTriggerCreate({});

  const { mutate: save, error, loading: saving } = mutator;

  const handleSubmit = (values: ScheduledJobTriggerDto) => {
    const postData = { ...model, ...values, job: { id: jobId } };
    save(postData).then(() => {
      onSuccess();
    });
  };

  const handleCancel = () => {
    onCancel();
    form.resetFields();
  };

  const model = triggerData?.result;
  return (
    <Modal
      width="60%"
      visible={visible}
      title="Scheduled Job Trigger"
      okText="Save"
      onCancel={handleCancel}
      onOk={() => form.submit()}
      confirmLoading={loading}
    >
      <Spin spinning={loading || saving} tip="Please wait...">
        {fetchError && <ValidationErrors error={fetchError} />}
        {error && <ValidationErrors error={error} />}
        <EditorForm model={model} onSubmit={handleSubmit} form={form} />
      </Spin>
    </Modal>
  );
};

export default EditTriggerModal;
