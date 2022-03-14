import { GenericEditPage } from '@shesha/reactjs';
import { useCheckListGet, useCheckListUpdate } from 'api/checkList';
import { NextPage } from 'next';
import React from 'react';

interface IProps {
  id?: string;
}

const EditPage: NextPage<IProps> = (props) => {
  return (
    <GenericEditPage
      title={() => 'Check List Edit'}
      id={props.id}
      fetcher={useCheckListGet}
      updater={useCheckListUpdate}
    />
  );
};

export default EditPage;
