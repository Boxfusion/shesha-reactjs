import React, { FC } from 'react';
import { IndexTableFull, DataTableProvider, MainLayout } from '@shesha/reactjs';

const tableProps = {
  id: 'LogonAudit_Index', // hardcoded for now
  header: 'Logon Audit',
  disableCustomFilters: true,
};

interface IProps {}

const TableWithControls: FC<IProps> = () => {
  return (
    <MainLayout title="Logon Audit" noPadding showHeading={false}>
      <IndexTableFull {...tableProps} />
    </MainLayout>
  );
};

const LogonAuditPage = () => (
  <DataTableProvider tableId={tableProps.id}>
    <TableWithControls></TableWithControls>
  </DataTableProvider>
);

export default LogonAuditPage;
