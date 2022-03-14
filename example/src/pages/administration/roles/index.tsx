import React from 'react';
import { URL_ADMINISTRATION_ROLES_PAGE } from 'routes';
import { IShaDataTableProps, SimpleIndexPageDefault } from '@shesha/reactjs';
import { SearchOutlined } from '@ant-design/icons';
import { NextPageWithLayout } from 'models';
import { getLayout } from 'src/components/layouts';

const tableId = 'ShaRoles_Index';

const RolesIndexPage: NextPageWithLayout = () => {
  const tableProps: IShaDataTableProps = {
    id: tableId, // hardcoded for now
    header: 'Roles',
    disableCustomFilters: true,
    actionColumns: [
      { icon: <SearchOutlined />, onClick: (id: string) => `${URL_ADMINISTRATION_ROLES_PAGE}/details?id=${id}` },
    ],
  };

  return <SimpleIndexPageDefault {...tableProps} title="Roles" tableConfigId={tableId} />;
};

RolesIndexPage.getLayout = getLayout;

export default RolesIndexPage;
