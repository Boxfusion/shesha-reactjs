import { useFormGet, useFormUpdate } from 'api/form';
import { NextPage } from 'next';
import { GenericEditPage } from '@shesha/reactjs';

const FormsEditPage: NextPage<{ id: string }> = ({ id }) => {
  return (
    <GenericEditPage
      formPath="/settings/forms/edit"
      id={id}
      fetcher={(args) => useFormGet({ ...args, id })}
      updater={useFormUpdate}
    />
  );
};

export default FormsEditPage;
