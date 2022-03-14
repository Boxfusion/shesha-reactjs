import { Col, Form, Input, Row } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { ScheduledJobTriggerDto } from 'api/scheduledJobTrigger';
import React, { FC } from 'react';
import { RefListDropDown } from '@shesha/reactjs';

interface IScheduledJobsTriggersFormProps {
  model: ScheduledJobTriggerDto;
  onSubmit?: (e: ScheduledJobTriggerDto) => void;
  form?: FormInstance;
}

const ScheduledJobsTriggersForm: FC<IScheduledJobsTriggersFormProps> = ({
  form,
  model,
  onSubmit,
}: IScheduledJobsTriggersFormProps) => {
  const handleSubmit = (data) => {
    const newData = model;
    newData.cronString = data.cronString;
    newData.description = data.description;
    newData.status = data.status;
    onSubmit(newData);
  };

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  return (
    <Form form={form} className="table-form" layout="horizontal" onFinish={handleSubmit} {...formItemLayout}>
      <Row>
        <Col span={12}>
          <Form.Item
            label="Cron String"
            name="cronString"
            initialValue={model.cronString}
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            initialValue={model.description}
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['status', 'itemValue']}
            initialValue={model.status?.itemValue}
            rules={[{ required: true, message: 'This field is required' }]}
            label="Status"
          >
            <RefListDropDown listNamespace="Shesha.Scheduler" listName="TriggerStatus" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default ScheduledJobsTriggersForm;
