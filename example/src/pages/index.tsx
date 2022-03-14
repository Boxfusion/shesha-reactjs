import { useMembersCreate } from 'api/members';
import React from 'react';
import { GenericIndexPageDefault } from '@shesha/reactjs';
import { NextPageWithLayout } from 'models';
import { getLayout } from 'src/components/layouts';

const IndexPage: NextPageWithLayout = () => {
  return (
    <GenericIndexPageDefault
      title="Members"
      tableConfigId="Members_Index"
      detailsUrl={(id) => `/members/details?id=${id}`}
      editUrl={(id) => `/members/edit?id=${id}`}
      createModalProps={{
        updater: useMembersCreate,
        formPath: '/members/create',
        title: 'Capture Member Details',
      }}
    />
  );
};

IndexPage.getLayout = getLayout;

export default IndexPage;
