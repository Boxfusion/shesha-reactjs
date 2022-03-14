import React, { FC } from 'react';
import { IndexTableFull, DataTableProvider, IShaDataTableProps, MainLayout } from '@shesha/reactjs';
import { SearchOutlined } from '@ant-design/icons';
import { URL_SETTINGS_NOTIFICATIONS_AUDIT } from 'routes/settingsRoutes';

interface ITableWithControlsProps {}

const tableProps: IShaDataTableProps = {
  id: 'NotificationMessages_Index', // hardcoded for now
  header: 'Notifications Audit',
  disableCustomFilters: true,
  actionColumns: [{ icon: <SearchOutlined />, onClick: (id) => `${URL_SETTINGS_NOTIFICATIONS_AUDIT}/details?id=${id}` }],
};

const TableWithControls: FC<ITableWithControlsProps> = () => {
  return (
    <MainLayout title="Notifications Audit" showHeading={false} noPadding>
      <IndexTableFull {...tableProps} />
    </MainLayout>
  );
};

export const IndexView: FC<ITableWithControlsProps> = () => {
  return (
    <DataTableProvider tableId={tableProps.id}>
      <TableWithControls />
    </DataTableProvider>
  );
};

export default IndexView;
