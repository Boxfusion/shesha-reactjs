import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd/lib/form';
import {
  IndexTableFull,
  DataTableProvider,
  useDataTableActions,
  IToolbarItem,
  IShaDataTableProps,
  MainLayout,
} from '@shesha/reactjs';
import { SearchOutlined, EditOutlined } from '@ant-design/icons';
import { CreateNotificationModal } from 'components';

const tableProps: IShaDataTableProps = {
  id: 'Notifications_Index', // hardcoded for now
  header: 'Notifications',
  disableCustomFilters: true,
  actionColumns: [
    { icon: <SearchOutlined />, onClick: (id) => `/settings/notifications/details?id=${id}` },
    { icon: <EditOutlined />, onClick: (id) => `/settings/notifications/edit?id=${id}` },
  ],
};

const TableWithControls = () => {
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);

  const { refreshTable } = useDataTableActions();

  const toolbarItems: IToolbarItem[] = [
    {
      title: 'Create New',
      icon: <PlusOutlined />,
      onClick: () => setCreateModalVisible(true),
    },
  ];

  const handleUserCreated = (form: FormInstance) => {
    setCreateModalVisible(false);
    form.resetFields();
    refreshTable();
  };

  const handleCancel = () => {
    setCreateModalVisible(false);
  };

  return (
    <MainLayout title="Notifications" noPadding showHeading={false}>
      <IndexTableFull {...tableProps} toolbarItems={toolbarItems} />
      <CreateNotificationModal visible={createModalVisible} onCancel={handleCancel} onSuccess={handleUserCreated} />
    </MainLayout>
  );
};

export const IndexView = () => {
  return (
    <DataTableProvider tableId={tableProps.id}>
      <TableWithControls></TableWithControls>
    </DataTableProvider>
  );
};

export default IndexView;
