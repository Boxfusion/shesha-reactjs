import { EditOutlined, StopOutlined } from '@ant-design/icons';
import { Alert, Divider, Modal, Tag } from 'antd';
import { MutateMethod } from 'restful-react';
import React, { createRef, useState } from 'react';
import {
  MemberResponse,
  MemberResponseAjaxResponse,
  MembersActivateQueryParams,
  useMembersActivate,
  useMembersGet,
  useMembersSuspend,
} from 'api/members';
import moment from 'moment';
import { useRouter } from 'next/router';
import { URL_MEMBERS_EDIT_PAGE } from 'routes';
import { DetailsViewHeaderControls, GenericDetailsPageDefault } from '@shesha/reactjs';
import { MembershipStatus } from 'enums';
import { DetailsPageHandleRefType } from '@shesha/reactjs/dist/components/crudViews/detailsPage';
import { NextPageWithLayout } from 'models';
import { getLayout } from 'src/components/layouts';

interface IDetailsPageProps {
  id?: string;
}

const DetailsPage: NextPageWithLayout<IDetailsPageProps> = ({ id }) => {
  const ref = createRef<DetailsPageHandleRefType>();
  const router = useRouter();
  const [member, setMember] = useState<MemberResponse>(null);

  const { mutate: suspendMember, loading: isSuspending } = useMembersSuspend({ queryParams: { memberId: id } });

  const { mutate: activateMember, loading: isActivating } = useMembersActivate({ queryParams: { memberId: id } });

  const getStatusColor = () => {
    switch (member?.membershipStatus?.itemValue) {
      case MembershipStatus.Active:
        return '#87d068';
      case MembershipStatus.Suspended:
        return 'orange';
      case MembershipStatus.Cancelled:
        return '#f50';
      default:
        return '#2db7f5';
    }
  };

  const onActivateOrSuspend = () => {
    let mutate = activateMember;

    if (member?.membershipStatus?.itemValue === MembershipStatus.Active) {
      mutate = suspendMember;

      Modal.confirm({
        title: 'Suspend Membership',
        content: (
          <div>
            <Alert type="warning" message="Please note that this action will affect the status of the membership" />
            <Divider />
            Are you sure you want to suspend the membership for {member?.name} {member?.surname}
          </div>
        ),
        onOk: () => doAction(mutate),
      });
    } else {
      doAction(mutate);
    }
  };
  // TData, TRequestBody, TQueryParams, TPathParams
  const doAction = (mutate: MutateMethod<MemberResponseAjaxResponse, void, MembersActivateQueryParams, void>) => {
    mutate().then((res) => setMember(res?.result));
  };

  return (
    <GenericDetailsPageDefault
      title={(data: MemberResponse) => `Membership Details: ${data?.name} ${data?.surname}`}
      id={id}
      fetcher={useMembersGet as any}
      formPath="/members/details"
      onDataLoaded={setMember}
      ref={ref}
      loading={isSuspending || isActivating}
      headerControls={() => (
        <DetailsViewHeaderControls
          items={[
            {
              name: 'Date Registered',
              value: member?.membershipStartDate ? moment(member?.membershipStartDate).format('lll') : null,
              hide: !member?.membershipStartDate,
            },
            {
              name: 'Status',
              value: <Tag color={getStatusColor()}>{member?.membershipStatus?.item || 'Draft'}</Tag>,
              hide: !member,
            },
          ]}
          backUrl="/members"
        />
      )}
      toolbarItems={[
        {
          title: member?.membershipStatus?.itemValue === MembershipStatus.Active ? 'Suspend Membership' : 'Activate',
          icon: <StopOutlined />,
          onClick: onActivateOrSuspend,
        },
        {
          title: 'Edit',
          icon: <EditOutlined />,
          onClick: () => router.push(`${URL_MEMBERS_EDIT_PAGE}/?id=${id}`),
        },
      ]}
    />
  );
};

DetailsPage.getLayout = getLayout;

export default DetailsPage;
