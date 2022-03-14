import { CloseOutlined, SaveOutlined } from '@ant-design/icons';
import { Form, Spin } from 'antd';
import { ScheduledJobDto, useScheduledJobGet, useScheduledJobUpdate } from 'api/scheduledJob';
import { IndexToolbar, IToolbarItem, MainLayout, ValidationErrors } from '@shesha/reactjs';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { CollapsiblePanel } from '@shesha/reactjs';
import { ScheduledJobsEditForm } from 'components';
import { URL_SETTINGS_SCHEDULED_JOBS } from 'routes/settingsRoutes';

interface IProps {
  id?: string;
}

const DetailsPage: NextPage<IProps> = (props) => {
  const {
    loading: loading,
    refetch: doFetch,
    error: fetchError,
    data: serverData,
  } = useScheduledJobGet({
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

  const { mutate: save, loading: saving /*, error: savingError*/ } = useScheduledJobUpdate({});

  const goBack = () => {
    // todo: return to previous one with fallback to details
    router.push(`${URL_SETTINGS_SCHEDULED_JOBS}/details?id=${props.id}`);
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

  const model: ScheduledJobDto = serverData?.result;
  const handleSubmit = (values: ScheduledJobDto) => {
    const postData = { ...values, id: model.id };
    save(postData).then(() => {
      goBack();
    });
  };

  return (
    <Spin spinning={loading || saving} tip="Please wait...">
      <MainLayout title={'Edit Scheduled Job'} toolbar={<IndexToolbar items={toolbarItems} />}>
        <ValidationErrors error={fetchError} />

        {model && (
          <CollapsiblePanel header="Scheduled Job Details">
            <ScheduledJobsEditForm form={form} model={model} onSubmit={handleSubmit} />
          </CollapsiblePanel>
        )}
      </MainLayout>
    </Spin>
  );
};

export default DetailsPage;
