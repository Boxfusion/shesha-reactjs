import React, { FC } from 'react';
import { IndexTableFull, DataTableProvider, IShaDataTableProps, MainLayout } from '@shesha/reactjs';
import { SearchOutlined } from '@ant-design/icons';
import { URL_SETTINGS_SCHEDULED_JOB_EXECUTIONS } from 'src/routes/settingsRoutes';

const tableProps: IShaDataTableProps = {
  id: 'ScheduledJobs_ExecutionLog', // hardcoded for now
  header: 'Scheduled Job Executions',
  disableCustomFilters: true,
  actionColumns: [
    { icon: <SearchOutlined />, onClick: (id) => `${URL_SETTINGS_SCHEDULED_JOB_EXECUTIONS}/details?id=${id}` },
  ],
};

interface IProps {}

const TableWithControls: FC<IProps> = () => {
  return (
    <MainLayout title="Scheduled Job Executions" noPadding showHeading={false}>
      <IndexTableFull {...tableProps} />
    </MainLayout>
  );
};

const ScheduledJobsSettings = () => (
  <DataTableProvider tableId={tableProps.id}>
    <TableWithControls />
  </DataTableProvider>
);

export default ScheduledJobsSettings;
