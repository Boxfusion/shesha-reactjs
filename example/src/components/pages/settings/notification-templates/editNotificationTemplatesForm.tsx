import React, { FC } from 'react';
import { Form, Input, Checkbox } from 'antd';
import { NotificationTemplateDto } from 'api/notificationTemplate';
import { FormInstance } from 'antd/lib/form';
import { RefListDropDown } from '@shesha/reactjs';
import NotificationAutocomplete from './notificationAutocomplete';
import { HtmlEditor } from 'components';

const HtmlInput = (props) => {
  const handleChange = event => {
    // workaround, now jodit pass a FocusEvent
    const newValue = typeof (event) === 'string'
      ? event
      : event.target.innerHTML;

    props.onChange(newValue);
  }

  return (
    <HtmlEditor
      value={props.value || ''}
      config={{
        readonly: false,
      }}
      onBlur={handleChange} // preferred to use only this option to update the content for performance reasons
    />
  );
};

const BodyEditor = ({ isHtml, ...props }) => {
  return isHtml
    ? (
      <div key="body">
        <HtmlInput {...props}></HtmlInput>
      </div>
    )
    : <Input.TextArea rows={4} autoSize={true} {...props} />
};

interface IEditNotificationTemplatesFormProps {
  model: NotificationTemplateDto;
  notificationId?: string;
  onSubmit?: (values: any) => void;
  form: FormInstance;
}

const EditNotificationTemplatesForm: FC<IEditNotificationTemplatesFormProps> = ({
  form,
  model,
  notificationId,
  onSubmit,
}) => {
  const handleSubmit = (values) => {
    onSubmit(values);
  };
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  const getFieldValue = (fieldName: string, defaultValue: any) => {
    return form.isFieldTouched(fieldName) ? form.getFieldValue(fieldName) : defaultValue;
  };
  const bodyFormat = getFieldValue('bodyFormat', { itemValue: 1 });
  const isHtml = parseInt(bodyFormat?.itemValue) == 1;

  return (
    <Form className="table-form" form={form} layout="horizontal" onFinish={handleSubmit} {...formItemLayout}>
      {!notificationId && (
        <Form.Item
          label="Notification"
          name={['notification', 'id']}
          initialValue={model.notification?.id}
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <NotificationAutocomplete displayText={model.notification?.displayText} />
        </Form.Item>
      )}
      <Form.Item
        label="Name"
        name="name"
        initialValue={model.name}
        rules={[{ required: true, message: 'This field is required' }]}
      >
        <Input autoFocus />
      </Form.Item>
      <Form.Item
        label="Send Type"
        name={'sendType'}
        initialValue={model.sendType}
        rules={[{ required: true, message: 'This field is required' }]}
      >
        <RefListDropDown listNamespace="Shesha.Core" listName="NotificationSendType" />
      </Form.Item>
      <Form.Item
        label="Subject"
        name="subject"
        initialValue={model.subject}
        rules={[{ required: false, message: 'This field is required' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Body Format"
        name={'bodyFormat'}
        initialValue={model.bodyFormat}
        rules={[{ required: true, message: 'This field is required' }]}
      >
        <RefListDropDown listNamespace="Shesha.Core" listName="NotificationTemplateFormat" />
      </Form.Item>
      <Form.Item
        label="Body"
        name="body"
        initialValue={model.body}
        rules={[{ required: true, message: 'This field is required' }]}
      >
        <BodyEditor isHtml={isHtml} />
      </Form.Item>
      <Form.Item label="Is Enabled" name="isEnabled" initialValue={model.isEnabled} valuePropName={'checked'}>
        <Checkbox />
      </Form.Item>
    </Form>
  );
};

export default EditNotificationTemplatesForm;
