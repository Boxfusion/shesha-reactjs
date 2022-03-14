import React, { FC, useState } from 'react';
import { Modal, Form, Input, Spin, Select } from 'antd';
import { usePersonCreate } from 'api/person';
import { FormInstance } from 'antd/lib/form';
import { ValidationErrors } from '@shesha/reactjs';

interface TestFormProps {
  onSubmit: (e: any) => void;
  form: FormInstance;
}

const { Option } = Select;

const CreateForm: FC<TestFormProps> = ({ form, onSubmit }) => {
  const [typeOfAccount, setTypeOfAccount] = useState(null);
  const handleSubmit = (e) => {
    onSubmit({ ...e });
  };

  return (
    <Form form={form} onFinish={handleSubmit} labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}>
      <Form.Item label="Username" name="username" rules={[{ required: true, message: 'This field is required' }]}>
        <Input autoFocus />
      </Form.Item>
      <Form.Item
        label="Type of account"
        name={['typeOfAccount', 'itemValue']}
        rules={[{ required: true, message: 'This field is required' }]}
      >
        <Select
          onChange={(e) => {
            setTypeOfAccount(e);
            console.log(e);
          }}
        >
          <Option value={0}>External (Active Directory)</Option>
          <Option value={1}>Internal (SQL account)</Option>
        </Select>
      </Form.Item>
      {typeOfAccount == 1 && [
        <Form.Item
          label="Password"
          key="1"
          name="password"
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <Input type="password" autoComplete="new-password" />
        </Form.Item>,
        <Form.Item
          label="Password Confirmation"
          key="2"
          name="passwordConfirmation"
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <Input type="password" autoComplete="new-password" />
        </Form.Item>,
      ]}

      <Form.Item label="First Name" name="firstName" rules={[{ required: true, message: 'This field is required' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Last Name" name="lastName" rules={[{ required: true, message: 'This field is required' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Email" name="emailAddress" rules={[{ required: true, message: 'This field is required' }]}>
        <Input type="email" />
      </Form.Item>
      <Form.Item label="Mobile No" name="mobileNumber" rules={[{ required: true, message: 'This field is required' }]}>
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

const ModalForm: FC<IModalProps> = ({ visible, onCancel, onSuccess }) => {
  const [form] = Form.useForm();
  const { mutate: save, error, loading } = usePersonCreate({});

  const handleSubmit = (values) => {
    save(values).then(() => {
      onSuccess(form);
    });
  };
  const handleOnOk = () => {
    form.submit();
  };
  const handleCancel = () => {
    onCancel(form);
  };

  return (
    <Modal
      width="60%"
      visible={visible}
      title="New User"
      okText="Create"
      onCancel={handleCancel}
      onOk={handleOnOk}
      confirmLoading={loading}
    >
      <Spin spinning={loading} tip="Please wait...">
        <ValidationErrors error={error} />
        <CreateForm form={form} onSubmit={handleSubmit} />
      </Spin>
    </Modal>
  );
};
export default ModalForm;
