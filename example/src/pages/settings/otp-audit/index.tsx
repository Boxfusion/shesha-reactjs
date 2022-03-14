import React, { FC } from 'react';
import { IndexTableFull, DataTableProvider, IShaDataTableProps, MainLayout } from '@shesha/reactjs';
import { SearchOutlined } from '@ant-design/icons';
import { URL_SETTINGS_OTP_AUDIT } from 'routes/settingsRoutes';

interface IProps {}

const tableProps: IShaDataTableProps = {
  id: 'OtpAuditItems_Index', // hardcoded for now
  header: 'One-Time-Pins Audit',
  disableCustomFilters: true,
  actionColumns: [{ icon: <SearchOutlined />, onClick: (id) => `${URL_SETTINGS_OTP_AUDIT}/details?id=${id}` }],
};

const TableWithControls: FC<IProps> = () => {
  return (
    <MainLayout title="One-Time-Pins Audit" noPadding showHeading={false}>
      <IndexTableFull {...tableProps} />
    </MainLayout>
  );
};

export const IndexView: FC<IProps> = () => {
  return (
    <DataTableProvider tableId={tableProps.id}>
      <TableWithControls></TableWithControls>
    </DataTableProvider>
  );
};

export default IndexView;
