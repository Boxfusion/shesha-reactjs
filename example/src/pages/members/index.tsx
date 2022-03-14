import { useMembersCreate } from 'api/members';
import React from 'react';
import { GenericIndexPageDefault, OnSuccessActionType } from '@shesha/reactjs';
import { NextPageWithLayout } from 'models';
import { getLayout } from 'src/components/layouts';

const MembersIndexPage: NextPageWithLayout = () => {
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
        OnSuccessAction: OnSuccessActionType.Return
      }}
    />
  );
};

MembersIndexPage.getLayout = getLayout;

export default MembersIndexPage;
