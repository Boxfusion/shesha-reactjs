import { usePersonGet, usePersonUpdate } from 'api/person';
import React from 'react';
import { GenericEditPageDefault } from '@shesha/reactjs';
import { NextPageWithLayout } from 'models';
import { getLayout } from 'src/components/layouts';
interface IEditPageProps {
  id?: string;
}

const EditPage: NextPageWithLayout<IEditPageProps> = ({ id }) => {
  return (
    <GenericEditPageDefault title={() => 'User Edit'} id={id} fetcher={usePersonGet as any} updater={usePersonUpdate} />
  );
};

EditPage.getLayout = getLayout;

export default EditPage;
