import React, { FC, useEffect, Fragment, useState } from 'react';
import { FileAddOutlined, EditOutlined, SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import { Form, Spin } from 'antd';
import { NextPage } from 'next';
import { useNotificationGet, NotificationDto } from 'api/notification';
import { useNotificationTemplateDelete } from 'api/notificationTemplate';
import { useRouter } from 'next/router';

import {
  CollapsiblePanel,
  IndexToolbar,
  DataTableProvider,
  IToolbarItem,
  ChildTable,
  IChildTableProps,
  DisplayFormItem,
  MainLayout,
  ValidationErrors,
} from '@shesha/reactjs';
import { URL_SETTINGS_NOTIFICATION_TEMPLATES } from 'routes/settingsRoutes';
import { CreateNotificationTemplateModal } from 'components';

interface IProps {
  id?: string;
}

interface IDetailsViewProps {
  model: NotificationDto;
}

const DetailsView: FC<IDetailsViewProps> = ({ model }) => {
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  const [templateModalVisible, setTemplateModalVisible] = useState(false);
  const [dataStamp, setDataStamp] = useState<number>(null);

  const { mutate: deleteTemplate } = useNotificationTemplateDelete({});
  const childTableId = 'Notification_Templates';
  const tableProps: IChildTableProps = {
    id: childTableId,
    header: 'Templates',
    toolbarItems: [
      {
        title: 'Add',
        icon: <FileAddOutlined />,
        onClick: () => setTemplateModalVisible(true),
      },
    ],
    actionColumns: [
      {
        icon: <SearchOutlined />,
        onClick: (id) => `${URL_SETTINGS_NOTIFICATION_TEMPLATES}/details?id=${id}`,
      },
      {
        icon: <EditOutlined />,
        onClick: (id) => `${URL_SETTINGS_NOTIFICATION_TEMPLATES}/edit?id=${id}`,
      },
      {
        icon: <DeleteOutlined />,
        onClick: (id, table) => {
          deleteTemplate({ id: id }).then(() => table.refreshTable());
        },
      },
    ],
  };

  const handleTemplateAdded = () => {
    setTemplateModalVisible(false);
    setDataStamp(dataStamp ? dataStamp + 1 : 1);
  };

  return (
    <Fragment>
      <CollapsiblePanel header="Notification  Details">
        <Form className="table-form" layout="horizontal" {...formItemLayout}>
          <DisplayFormItem label="Name:">{model.name}</DisplayFormItem>
          <DisplayFormItem label="Description:">{model.description}</DisplayFormItem>
        </Form>
      </CollapsiblePanel>
      <DataTableProvider tableId={tableProps.id} parentEntityId={model.id} dataStamp={dataStamp}>
        <ChildTable {...tableProps} />
      </DataTableProvider>
      {templateModalVisible && (
        <CreateNotificationTemplateModal
          notificationId={model.id}
          visible={templateModalVisible}
          onCancel={() => setTemplateModalVisible(false)}
          onSuccess={handleTemplateAdded}
        />
      )}
    </Fragment>
  );
};

const DetailsPage: NextPage<IProps> = (props) => {
  const {
    loading: loading,
    refetch: doFetch,
    error: fetchError,
    data: serverData,
  } = useNotificationGet({
    lazy: true,
  });

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
      onClick: () => router.push(`/settings/notifications/edit?id=${props.id}`),
    },
  ];

  const model = serverData?.result;

  return (
    <Spin spinning={loading} tip="Loading...">
      <MainLayout
        title={'Notification Details' + (model ? `: ${model.name}` : '')}
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
