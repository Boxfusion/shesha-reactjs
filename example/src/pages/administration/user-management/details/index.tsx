import { EditOutlined } from '@ant-design/icons';
import { usePersonGet } from 'api/person';
import { useRouter } from 'next/router';
import { URL_ADMINISTRATION_USER_MANAGEMENT_PAGE } from 'routes';
import React from 'react';
import { GenericDetailsPageDefault } from '@shesha/reactjs';
import { NextPageWithLayout } from 'models';
import { getLayout } from 'src/components/layouts';

interface IProps {
  id?: string;
}

const DetailsPage: NextPageWithLayout<IProps> = (props) => {
  const router = useRouter();

  return (
    <GenericDetailsPageDefault
      title="User Details"
      id={props.id}
      formPath="/administration/user-management/details"
      fetcher={usePersonGet as any}
      toolbarItems={[
        {
          title: 'Edit',
          icon: <EditOutlined />,
          onClick: () => router.push(`${URL_ADMINISTRATION_USER_MANAGEMENT_PAGE}/edit?id=${props.id}`),
        },
      ]}
    />
  );
};

DetailsPage.getLayout = getLayout;

export default DetailsPage;
