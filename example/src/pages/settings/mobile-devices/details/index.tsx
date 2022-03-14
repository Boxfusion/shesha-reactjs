import React, { FC, useEffect } from 'react';
import { Form, Spin, Checkbox } from 'antd';
import { NextPage } from 'next';
import { IndexToolbar, IToolbarItem, MainLayout, ValidationErrors } from '@shesha/reactjs';
import { useRouter } from 'next/router';
import { useMobileDeviceGet, MobileDeviceDto } from 'api/mobileDevice';
import { EditOutlined } from '@ant-design/icons';
import { CollapsiblePanel } from '@shesha/reactjs';
import { URL_SETTINGS_MOBILE_DEVICES } from 'routes/settingsRoutes';

interface IProps {
  id?: string;
}

interface IDetailsViewProps {
  model: MobileDeviceDto;
}

const DetailsView: FC<IDetailsViewProps> = ({ model }) => {
  const formItemLayout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 },
  };

  return (
    <CollapsiblePanel header="Mobile Device Details">
      <Form className="table-form" layout="horizontal" {...formItemLayout}>
        <Form.Item label="Name:">{model.name}</Form.Item>

        <Form.Item label="IMEI:">{model.imei}</Form.Item>

        <Form.Item label="Is Locked:">
          <Checkbox checked={model.isLocked} disabled={true}></Checkbox>
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

  // fetch data on page load
  useEffect(() => {
    fetchData();
  }, []);

  const router = useRouter();
  const toolbarItems: IToolbarItem[] = [
    {
      title: 'Edit',
      icon: <EditOutlined />,
      onClick: () => router.push(`${URL_SETTINGS_MOBILE_DEVICES}/edit?id=${props.id}`),
    },
  ];

  const model = serverData?.result;

  return (
    <Spin spinning={loading} tip="Loading...">
      <MainLayout
        title="Mobile Device Details"
        description=""
        showHeading={false}
        toolbar={<IndexToolbar items={toolbarItems} />}
      >
        <ValidationErrors error={fetchError} />
        {model && <DetailsView model={model}></DetailsView>}
      </MainLayout>
    </Spin>
  );
};

export default DetailsPage;
