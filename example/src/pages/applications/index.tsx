import React from 'react';
import { GenericIndexPageDefault } from '@shesha/reactjs';
import { getLayout } from 'src/components/layouts';

const IndexPage = () => {
  return (
    <GenericIndexPageDefault
      title="Applications"
      tableConfigId="GmaApplications_Index"
      detailsUrl={(id) => `/applications/details?id=${id}`}
    />
  );
};

IndexPage.getLayout = getLayout;

export default IndexPage;
