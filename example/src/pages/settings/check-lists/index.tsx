import React from 'react';
import { GenericIndexPage } from '@shesha/reactjs';
import { useCheckListCreate } from 'api/checkList';
import { URL_SETTINGS_CHECK_LISTS } from 'routes';

const IndexPage = () => (
  <GenericIndexPage
    title="Check Lists"
    tableConfigId="CheckList_Index"
    detailsUrl={(id) => `${URL_SETTINGS_CHECK_LISTS}/details?id=${id}`}
    editUrl={(id) => `${URL_SETTINGS_CHECK_LISTS}/edit?id=${id}`}
    createModalProps={{
      title: 'Create Check List',
      updater: useCheckListCreate,
      formPath: `${URL_SETTINGS_CHECK_LISTS}/create`,
    }}
  />
);

export default IndexPage;
