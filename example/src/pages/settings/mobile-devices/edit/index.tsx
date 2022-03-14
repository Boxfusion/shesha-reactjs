import React, { FC, useEffect } from 'react';
import { Form, Spin, Input, Checkbox } from 'antd';
import { NextPage } from 'next';
import { useMobileDeviceGet, MobileDeviceDto, useMobileDeviceUpdate } from 'api/mobileDevice';
import { IndexToolbar, IToolbarItem, CollapsiblePanel, ValidationErrors, MainLayout } from '@shesha/reactjs';
import { useRouter } from 'next/router';
import { SaveOutlined, CloseOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd/lib/form';
import { URL_SETTINGS_MOBILE_DEVICES } from 'routes/settingsRoutes';

interface IProps {
  id?: string;
}

interface IEditFormProps {
  form: FormInstance;
  model: MobileDeviceDto;
  onSubmit?: (e: MobileDeviceDto) => void;
}

const EditForm: FC<IEditFormProps> = ({ form, model, onSubmit }) => {
  const formItemLayout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 },
  };

  const handleSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <CollapsiblePanel header="Mobile Device Details">
      <Form className="table-form" layout="horizontal" {...formItemLayout} form={form} onFinish={handleSubmit}>
        <Form.Item
          label="Device Name"
          name="name"
          initialValue={model.name}
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <Input autoFocus />
        </Form.Item>
        <Form.Item
          label="IMEI"
          name="imei"
          initialValue={model.imei}
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Is Locked:" name="isLocked" valuePropName="checked" initialValue={model.isLocked}>
          <Checkbox />
        </Form.Item>
      </Form>
    </CollapsiblePanel>
  );
};

const DetailsPage: NextPage<IProps> = (props) => {
  const {
    loading: loading,
    refetch: doFetch,
    error: fetchError,
    data: serverData,
  } = useMobileDeviceGet({
    lazy: true,
  }); // todo: check headers issue (RestfulProvider is added, but they are empty)

  const fetchData = async () => {
    await doFetch({ queryParams: { id: props.id } });
  };

  const [form] = Form.useForm();

  // fetch data on page load
  useEffect(() => {
    fetchData();
  }, []);

  const { mutate: save, loading: saving, error: savingError } = useMobileDeviceUpdate({});

  const goBack = () => {
    // todo: return to previous one with fallback to details
    router.push(`${URL_SETTINGS_MOBILE_DEVICES}/details?id=${props.id}`);
  };

  const router = useRouter();
  const toolbarItems: IToolbarItem[] = [
    {
      title: 'Save',
      icon: <SaveOutlined />,
      onClick: () => {
        form.submit();
      },
    },
    {
      title: 'Close',
      icon: <CloseOutlined />,
      onClick: () => goBack(),
    },
  ];

  const handleSubmit = (values) => {
    const postData = { ...values, id: model.id };
    save(postData).then(() => {
      goBack();
    });
  };

  const model = serverData?.result;

  return (
    <Spin spinning={loading || saving} tip="Please wait...">
      <MainLayout
        title={'Edit Mobile Device' + (model ? `: ${model.name}` : '')}
        showHeading={false}
        toolbar={<IndexToolbar items={toolbarItems} />}
      >
        <ValidationErrors error={fetchError} />
        <ValidationErrors error={savingError} />
        {model && <EditForm form={form} model={model} onSubmit={handleSubmit} />}
      </MainLayout>
    </Spin>
  );
};

export default DetailsPage;
