import { Col, Form, Input, Row } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { ScheduledJobDto } from 'api/scheduledJob';
import React, { FC } from 'react';
import { RefListDropDown } from '@shesha/reactjs';

interface IScheduledJobsEditFormProps {
  model: ScheduledJobDto;
  onSubmit?: (e: ScheduledJobDto) => void;
  form?: FormInstance;
}

const ScheduledJobsEditForm: FC<IScheduledJobsEditFormProps> = ({
  form,
  model,
  onSubmit,
}: IScheduledJobsEditFormProps) => {
  const handleSubmit = (data) => {
    onSubmit(data);
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
            label="Name"
            name="jobName"
            initialValue={model.jobName}
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Namespace"
            name="jobNamespace"
            initialValue={model.jobNamespace}
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Input disabled={true} />
          </Form.Item>
          <Form.Item label="Description" name="jobDescription" initialValue={model.jobDescription}>
            <Input />
          </Form.Item>
          <Form.Item
            name={['jobStatus', 'itemValue']}
            initialValue={model.jobStatus?.itemValue}
            rules={[{ required: true, message: 'This field is required' }]}
            label="Status"
          >
            <RefListDropDown listNamespace="Shesha.Scheduler" listName="JobStatus" />
          </Form.Item>
          <Form.Item
            name={['startupMode', 'itemValue']}
            initialValue={model.startupMode?.itemValue}
            rules={[{ required: true, message: 'This field is required' }]}
            label="Startup Mode"
          >
            <RefListDropDown listNamespace="Shesha.Scheduler" listName="StartUpMode" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default ScheduledJobsEditForm;
