import { useAreaCreate } from 'api/area';
import React from 'react';
import { GenericIndexPageDefault } from '@shesha/reactjs';
import { NextPageWithLayout } from 'models';
import { getLayout } from 'src/components/layouts';

const IndexPage: NextPageWithLayout = () => {
  return (
    <GenericIndexPageDefault
      title="All Areas"
      tableConfigId="Areas_Index"
      createModalProps={{
        title: 'Create Area',
        updater: useAreaCreate,
        formPath: '/areas/create',
      }}
    />
  );
};

IndexPage.getLayout = getLayout;

export default IndexPage;
