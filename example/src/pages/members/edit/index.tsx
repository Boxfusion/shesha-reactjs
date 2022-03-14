import React, { useEffect, useMemo } from 'react';
import { MemberResponse, useMembersGet, useMembersUpdate } from 'api/members';
import { MembershipStatus } from 'enums';
import { GenericEditPageDefault } from '@shesha/reactjs';
import { NextPageWithLayout } from 'models';
import { getLayout } from 'src/components/layouts';
import { ITagProps } from '@shesha/reactjs/dist/components/page/pageHeaderTag';

interface IProps {
  id?: string;
}

const EditPage: NextPageWithLayout<IProps> = ({ id }) => {
  const { refetch, data, loading } = useMembersGet({ queryParams: { id } });

  useEffect(() => {
    refetch();
  }, [id]);

  const member = data?.result;

  const getStatusColor = (model: MemberResponse) => {
    switch (model) {
      case MembershipStatus.Active:
        return '#87d068';
      case MembershipStatus.Suspended:
        return 'orange';
      case MembershipStatus.Cancelled:
        return '#87d068';
      default:
        return '#2db7f5';
    }
  };

  const tagList = useMemo(() => {
    const list: ITagProps[] = [
      {
        title: 'Status',
        tag: {
          color: getStatusColor(member),
          text: member?.membershipStatus?.item || 'Draft',
        },
      },
    ];

    if (member?.membershipStartDate) {
      list?.unshift({
        title: 'Date Registered',
        tag: {
          color: getStatusColor(member),
          text: member?.membershipStatus?.item || 'Draft',
        },
      });
    }

    return list;
  }, [member?.membershipStartDate]);

  return (
    <GenericEditPageDefault
      loading={loading}
      title={() => 'Membership Edit'}
      id={id}
      fetcher={useMembersGet as any}
      updater={useMembersUpdate}
      headerTagList={tagList}
      backUrl="/members"
    />
  );
};

EditPage.getLayout = getLayout;

export default EditPage;
