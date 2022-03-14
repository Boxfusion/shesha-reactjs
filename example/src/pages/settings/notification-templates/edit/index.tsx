import React, { useEffect } from 'react';
import { Form, Spin } from 'antd';
import { NextPage } from 'next';
import { useNotificationTemplateGet, useNotificationTemplateUpdate } from 'api/notificationTemplate';
import { IndexToolbar, IToolbarItem, MainLayout, ValidationErrors } from '@shesha/reactjs';
import { useRouter } from 'next/router';
import { SaveOutlined, CloseOutlined } from '@ant-design/icons';
import { CollapsiblePanel } from '@shesha/reactjs';
import { EditNotificationTemplatesForm } from 'components';

interface IProps {
  id?: string;
}

const DetailsPage: NextPage<IProps> = (props) => {
  const {
    loading: loading,
    refetch: doFetch,
    error: fetchError,
    data: serverData,
  } = useNotificationTemplateGet({
    lazy: true,
  });

  const fetchData = async () => {
    await doFetch({ queryParams: { id: props.id } });
  };

  const [form] = Form.useForm();

  // fetch data on page load
  useEffect(() => {
    fetchData();
  }, []);

  const { mutate: save, loading: saving, error: savingError } = useNotificationTemplateUpdate({});

  const goBack = () => {
    // todo: return to previous one with fallback to details
    router.push(`/settings/notification-templates/details?id=${props.id}`);
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
        title={'Edit Notification Template' + (model ? `: ${model.name}` : '')}
        toolbar={<IndexToolbar items={toolbarItems} />}
      >
        <ValidationErrors error={fetchError} />
        <ValidationErrors error={savingError} />
        {model && (
          <CollapsiblePanel header="Notification Template">
            <EditNotificationTemplatesForm form={form} model={model} onSubmit={handleSubmit} />
          </CollapsiblePanel>
        )}
      </MainLayout>
    </Spin>
  );
};

export default DetailsPage;
