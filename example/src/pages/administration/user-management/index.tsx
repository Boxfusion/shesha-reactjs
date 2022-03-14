import { GenericIndexPageDefault } from '@shesha/reactjs';
import React from 'react';
import { usePersonCreate } from 'api/person';
import { URL_ADMINISTRATION_USER_MANAGEMENT_PAGE } from 'routes';
import { NextPageWithLayout } from 'models';
import { getLayout } from 'src/components/layouts';

const IndexPage: NextPageWithLayout = () => (
  <GenericIndexPageDefault
    title="Users"
    tableConfigId="Persons_Index"
    detailsUrl={(id) => `${URL_ADMINISTRATION_USER_MANAGEMENT_PAGE}/details?id=${id}`}
    editUrl={(id) => `${URL_ADMINISTRATION_USER_MANAGEMENT_PAGE}/edit?id=${id}`}
    createModalProps={{
      title: 'Create User',
      updater: usePersonCreate,
      formPath: `${URL_ADMINISTRATION_USER_MANAGEMENT_PAGE}/create`,
    }}
  />
);

IndexPage.getLayout = getLayout;

export default IndexPage;
