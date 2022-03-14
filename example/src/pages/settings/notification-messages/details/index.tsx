import React, { FC, useEffect } from 'react';
import { Form, Spin } from 'antd';
import { NextPage } from 'next';
import Link from 'next/link';
import { useNotificationMessageGet, NotificationMessageDto } from 'api/notificationMessage';
import moment from 'moment';
import { URL_ADMINISTRATION_USER_MANAGEMENT_PAGE } from 'routes';
import { CollapsiblePanel, DisplayFormItem, MainLayout, ValidationErrors } from '@shesha/reactjs';
import { HtmlEditor } from 'components';

interface IProps {
  id?: string;
}

interface IDetailsViewProps {
  model: NotificationMessageDto;
}

const DetailsView: FC<IDetailsViewProps> = ({ model }) => {
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  const onHtmlEditorChange = () => {};

  return (
    <CollapsiblePanel header="Notification Message Details">
      <Form className="table-form" layout="horizontal" {...formItemLayout}>
        <DisplayFormItem label="Notification:">
          {model.notification != null && (
            <Link href={`/settings/notifications/details?id=${model.notification.id}`}>
              <a>{model.notification.displayText}</a>
            </Link>
          )}
        </DisplayFormItem>
        <DisplayFormItem label="Template:">
          {model.template != null && (
            <Link href={`/settings/notification-templates/details?id=${model.template.id}`}>
              <a>{model.template.displayText}</a>
            </Link>
          )}
        </DisplayFormItem>
        <DisplayFormItem label="Sender:">
          {model.sender != null && (
            <Link href={`${URL_ADMINISTRATION_USER_MANAGEMENT_PAGE}/details?id=${model.sender.id}`}>
              <a>{model.sender.displayText}</a>
            </Link>
          )}
        </DisplayFormItem>
        <DisplayFormItem label="Recipient:">
          {model.recipient != null && (
            <Link href={`${URL_ADMINISTRATION_USER_MANAGEMENT_PAGE}/details?id=${model.recipient.id}`}>
              <a>{model.recipient.displayText}</a>
            </Link>
          )}
        </DisplayFormItem>
        <DisplayFormItem label="Send Type:">{model.sendType?.item}</DisplayFormItem>
        <DisplayFormItem label="Recipient text:">{model.recipientText}</DisplayFormItem>

        <DisplayFormItem label="Subject:">{model.subject}</DisplayFormItem>
        {/* <DisplayFormItem label="Body Format:">{model.bodyFormat?.item}</DisplayFormItem> */}
        <DisplayFormItem label="Body:">
          {/* <HtmlEditor value={model.body} config={{ readonly: true }} onChange={onHtmlEditorChange} /> */}
          <HtmlEditor value={model.body} onChange={onHtmlEditorChange} />
        </DisplayFormItem>

        <DisplayFormItem label="Send Date:">
          {model.sendDate ? moment(model.sendDate).format('DD/MM/YYYY HH:mm:ss') : null}
        </DisplayFormItem>
        <DisplayFormItem label="Status:">{model.status?.item}</DisplayFormItem>
        <DisplayFormItem label="Error Message:">{model.errorMessage}</DisplayFormItem>
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
  } = useNotificationMessageGet({
    lazy: true,
  });

  const fetchData = async () => {
    await doFetch({ queryParams: { id: props.id } });
  };

  // fetch data on page load
  useEffect(() => {
    fetchData();
  }, []);

  const model = serverData?.result;

  return (
    <Spin spinning={loading} tip="Loading...">
      <MainLayout title={'Notification Message Details'} description="">
        <ValidationErrors error={fetchError} />
        {model && <DetailsView model={model}></DetailsView>}
      </MainLayout>
    </Spin>
  );
};

export default DetailsPage;
