import React, { useState } from 'react';
import {
  ApplicationResponse,
  useApplicationsAccept,
  useApplicationsGet,
  useApplicationsReject,
} from 'api/applications';
import moment from 'moment';
import { DetailsViewHeaderControls, GenericDetailsPageDefault } from '@shesha/reactjs';
import { ApplicationStatus } from 'enums';
import { STATUS_COLORS } from 'src/app-constants/statusColors';
import { Tag } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { NextPageWithLayout } from 'models';
import { getLayout } from 'src/components/layouts';

interface IDetailsPageProps {
  id?: string;
}

const DetailsPage: NextPageWithLayout<IDetailsPageProps> = ({ id }) => {
  const [application, setApplication] = useState<ApplicationResponse>(null);

  const { mutate: acceptApplicationMutate, loading: isAcceptingApplication } = useApplicationsAccept({
    queryParams: { applicationId: id },
  });

  const { mutate: rejectApplicationMutate, loading: isRejectingApplication } = useApplicationsReject({
    queryParams: { applicationId: id },
  });

  const getApplicationStatusBadge = () => {
    let statusColor = STATUS_COLORS.red;

    switch (application?.applicationStatus?.itemValue) {
      case ApplicationStatus.Submitted:
        statusColor = STATUS_COLORS.lightBlue;
        break;
      case ApplicationStatus.Processing:
        statusColor = STATUS_COLORS.blue;
        break;
      case ApplicationStatus.Successful:
        statusColor = STATUS_COLORS.green;
        break;
      default:
        statusColor = STATUS_COLORS.red;
        break;
    }

    return <Tag color={statusColor}>{application?.applicationStatus?.item?.toUpperCase()}</Tag>;
  };

  const onAcceptApplication = () =>
    acceptApplicationMutate()
      .then((response) => {
        setApplication(response?.result);
      })
      .catch(() => {});

  const onRejectApplication = () =>
    rejectApplicationMutate()
      .then((response) => {
        setApplication(response?.result);
      })
      .catch(() => {});

  return (
    <GenericDetailsPageDefault
      loading={isAcceptingApplication || isRejectingApplication}
      title={(data: ApplicationResponse) => `Application Details: ${data?.name} ${data?.surname}`}
      id={id}
      fetcher={useApplicationsGet as any}
      formPath="/applications/details"
      onDataLoaded={setApplication}
      headerControls={(model: ApplicationResponse) => (
        <DetailsViewHeaderControls
          items={[
            {
              name: 'Date Submitted',
              value: model?.applicationDate ? moment(model?.applicationDate).format('lll') : null,
              hide: !model?.applicationDate,
            },
            {
              name: 'Application Status',
              value: getApplicationStatusBadge(),
              hide: !model,
            },
          ]}
          backUrl="/applications"
        />
      )}
      toolbarItems={[
        {
          title: 'Accept Application',
          icon: <CheckOutlined />,
          onClick: onAcceptApplication,
          hide: application?.applicationStatus?.itemValue !== ApplicationStatus.Submitted,
        },
        {
          title: 'Reject Application',
          icon: <CloseOutlined />,
          onClick: onRejectApplication,
          hide: application?.applicationStatus?.itemValue !== ApplicationStatus.Submitted,
        },
      ]}
    />
  );
};

DetailsPage.getLayout = getLayout;

export default DetailsPage;
