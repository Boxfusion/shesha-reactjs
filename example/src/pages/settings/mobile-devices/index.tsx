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
import { FormInstance } from 'antd/lib/form';
import { SearchOutlined, EditOutlined } from '@ant-design/icons';
import { CreateMobileDeviceModal } from 'components';
import { URL_SETTINGS_MOBILE_DEVICES } from 'routes/settingsRoutes';

const tableProps: IShaDataTableProps = {
  id: 'MobileDevices_Index', // hardcoded for now
  header: 'Mobile Devices',
  disableCustomFilters: true,
  actionColumns: [
    { icon: <SearchOutlined />, onClick: (id) => `${URL_SETTINGS_MOBILE_DEVICES}/details?id=${id}` },
    { icon: <EditOutlined />, onClick: (id) => `${URL_SETTINGS_MOBILE_DEVICES}/edit?id=${id}` },
  ],
};

interface IProps {}

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

  const handleEntityCreated = (form: FormInstance) => {
    setCreateModalVisible(false);
    form.resetFields();
    refreshTable();
  };

  const handleCancel = (form: FormInstance) => {
    setCreateModalVisible(false);
    form.resetFields();
  };

  return (
    <MainLayout title="Mobile Devices">
      <IndexTableFull {...tableProps} toolbarItems={toolbarItems} />

      <CreateMobileDeviceModal visible={createModalVisible} onCancel={handleCancel} onSuccess={handleEntityCreated} />
    </MainLayout>
  );
};

const MobileDevicesSettings = () => (
  <DataTableProvider tableId={tableProps.id}>
    <TableWithControls></TableWithControls>
  </DataTableProvider>
);

export default MobileDevicesSettings;
