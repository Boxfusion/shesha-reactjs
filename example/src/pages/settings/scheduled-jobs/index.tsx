import React, { FC } from 'react';
import { IndexTableFull, DataTableProvider, IShaDataTableProps, MainLayout } from '@shesha/reactjs';
import { SearchOutlined } from '@ant-design/icons';
import { URL_SETTINGS_SCHEDULED_JOBS } from 'routes/settingsRoutes';

const tableProps: IShaDataTableProps = {
  id: 'ScheduledJob_Index', // hardcoded for now
  header: 'Scheduled Jobs',
  disableCustomFilters: true,
  actionColumns: [{ icon: <SearchOutlined />, onClick: (id) => `${URL_SETTINGS_SCHEDULED_JOBS}/details?id=${id}` }],
};

interface IProps {}

const TableWithControls: FC<IProps> = () => {
  return (
    <MainLayout title="Scheduled Jobs" noPadding showHeading={false}>
      <IndexTableFull {...tableProps} />
    </MainLayout>
  );
};

const ScheduledJobsSettings = () => (
  <DataTableProvider tableId={tableProps.id}>
    <TableWithControls></TableWithControls>
  </DataTableProvider>
);

export default ScheduledJobsSettings;
