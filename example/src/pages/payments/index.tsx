import React from 'react';
import { GenericIndexPageDefault } from '@shesha/reactjs';
import { NextPageWithLayout } from 'models';
import { getLayout } from 'src/components/layouts';

const Dashboard: NextPageWithLayout = () => <GenericIndexPageDefault tableConfigId="Payments_Index" title="Payments" />;

Dashboard.getLayout = getLayout;

export default Dashboard;
