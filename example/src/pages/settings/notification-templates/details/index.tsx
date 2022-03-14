import React, { FC, useEffect } from 'react';
import { Form, Spin } from 'antd';
import { NextPage } from 'next';
import { useNotificationTemplateGet, NotificationTemplateDto } from 'api/notificationTemplate';
import {
  CollapsiblePanel,
  DisplayFormItem,
  IndexToolbar,
  IToolbarItem,
  MainLayout,
  ValidationErrors,
} from '@shesha/reactjs';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { EditOutlined } from '@ant-design/icons';
import { HtmlEditor } from 'components';

const HtmlInput = (props) => {
  return (
    <HtmlEditor
      value={props.value || ''}
      // // @ts-ignore
      // config={{ readonly: true }}
      // onBlur={newContent => props.onChange(newContent)} // preferred to use only this option to update the content for performance reasons
    />
  );
};

interface IProps {
  id?: string;
}

interface IDetailsViewProps {
  model: NotificationTemplateDto;
}

const DetailsView: FC<IDetailsViewProps> = ({ model }) => {
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  return (
    <CollapsiblePanel header="Notification Template Details">
      <Form className="table-form" layout="horizontal" {...formItemLayout}>
        <DisplayFormItem label="Notification:">
          {model.notification != null && (
            <Link href={`/settings/notifications/details?id=${model.notification.id}`}>
              <a>{model.notification.displayText}</a>
            </Link>
          )}
        </DisplayFormItem>
        <DisplayFormItem label="Name:">{model.name}</DisplayFormItem>
        <DisplayFormItem label="Send Type:">{model.sendType?.item}</DisplayFormItem>
        <DisplayFormItem label="Subject:">{model.subject}</DisplayFormItem>
        <DisplayFormItem label="Body Format:">{model.bodyFormat?.item}</DisplayFormItem>
        <DisplayFormItem label="Body:">
          <HtmlInput value={model.body}></HtmlInput>
        </DisplayFormItem>
        <DisplayFormItem label="Is Enabled:">{model.isEnabled ? 'Yes' : 'No'}</DisplayFormItem>
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
  } = useNotificationTemplateGet({
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
      onClick: () => router.push(`/settings/notification-templates/edit?id=${props.id}`),
    },
  ];

  const model = serverData?.result;

  return (
    <Spin spinning={loading} tip="Loading...">
      <MainLayout
        title={'NotificationTemplate Details' + (model ? `: ${model.name}` : '')}
        description=""
        toolbar={<IndexToolbar items={toolbarItems} />}
      >
        <ValidationErrors error={fetchError} />
        {model && <DetailsView model={model}></DetailsView>}
      </MainLayout>
    </Spin>
  );
};

export default DetailsPage;
