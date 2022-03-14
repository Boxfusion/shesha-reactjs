import React from 'react';
import { Page } from '@shesha/reactjs';
import { MaintenanceBackup } from 'components';
import { NextPageWithLayout } from 'models';
import { getLayout } from 'src/components/layouts';

const MaintenancePage: NextPageWithLayout = () => {
  return (
    <Page title="Maintenance">
      <MaintenanceBackup />
    </Page>
  );
};

MaintenancePage.getLayout = getLayout;

export default MaintenancePage;
