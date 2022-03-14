import React, { FC, useState } from 'react';
import {
  IndexTableFull,
  DataTableProvider,
  useDataTableActions,
  IToolbarItem,
  IShaDataTableProps,
  MainLayout,
} from '@shesha/reactjs';
import { PlusOutlined } from '@ant-design/icons';
import { SearchOutlined, EditOutlined } from '@ant-design/icons';
import { CreateNotificationTemplateModal } from 'components';

interface IProps {}

const tableProps: IShaDataTableProps = {
  id: 'NotificationTemplates_Index', // hardcoded for now
  header: 'Notification Templates',
  disableCustomFilters: true,
  actionColumns: [
    { icon: <SearchOutlined />, onClick: (id) => `/settings/notification-templates/details?id=${id}` },
    { icon: <EditOutlined />, onClick: (id) => `/settings/notification-templates/edit?id=${id}` },
  ],
};

const TableWithControls: FC<IProps> = () => {
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);

  const { refreshTable } = useDataTableActions();

  const toolbarItems: IToolbarItem[] = [
    {
      title: 'Create New',
      icon: <PlusOutlined />,
      onClick: () => setCreateModalVisible(true),
    },
  ];

  const handleTemplateCreated = () => {
    setCreateModalVisible(false);
    refreshTable();
  };

  const handleCancel = () => {
    setCreateModalVisible(false);
  };

  return (
    <MainLayout title="Notification Templates" showHeading={false} noPadding>
      <IndexTableFull {...tableProps} toolbarItems={toolbarItems} />

      <CreateNotificationTemplateModal
        visible={createModalVisible}
        onCancel={handleCancel}
        onSuccess={handleTemplateCreated}
      />
    </MainLayout>
  );
};

export const IndexView: FC<IProps> = () => {
  return (
    <DataTableProvider tableId={tableProps.id}>
      <TableWithControls />
    </DataTableProvider>
  );
};

export default IndexView;
