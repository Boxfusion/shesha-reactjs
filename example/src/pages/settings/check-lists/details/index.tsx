import React from 'react';
import { EditOutlined } from '@ant-design/icons';
import { useCheckListGet } from 'api/checkList';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { URL_SETTINGS_CHECK_LISTS } from 'routes';
import { GenericDetailsPage } from '@shesha/reactjs';
import { CheckListItems } from 'components';

interface IProps {
  id?: string;
}

const DetailsPage: NextPage<IProps> = (props) => {
  const router = useRouter();

  return (
    <GenericDetailsPage
      title={() => 'Check List Details'}
      id={props.id}
      fetcher={useCheckListGet}
      toolbarItems={[
        {
          title: 'Edit',
          icon: <EditOutlined />,
          onClick: () => router.push(`${URL_SETTINGS_CHECK_LISTS}/edit?id=${props.id}`),
        },
      ]}
      footer={(model) => <CheckListItems checklistId={model.id} />}
    />
  );
};

export default DetailsPage;
