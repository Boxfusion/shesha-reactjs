import React, { FC, useEffect, useState } from 'react';
import { Spin, Row, Col, Modal, Form } from 'antd';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useScheduledJobGet, ScheduledJobDto, useScheduledJobStartJob } from 'api/scheduledJob';
import { useScheduledJobTriggerDelete } from 'api/scheduledJobTrigger';
import {
  DataTableProvider,
  IToolbarItem,
  IndexToolbar,
  ChildTable,
  IChildTableProps,
  MainLayout,
  ValidationErrors,
} from '@shesha/reactjs';
import { EditOutlined, PlayCircleOutlined, PlusOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { useUi } from '@shesha/reactjs';
import { URL_SETTINGS_SCHEDULED_JOBS, URL_SETTINGS_SCHEDULED_JOB_EXECUTIONS } from 'routes/settingsRoutes';
import { CollapsiblePanel } from '@shesha/reactjs';
import EditTriggerModal from 'src/components/pages/settings/scheduled-job-trigger/editTriggerModal';

interface IProps {
  id?: string;
}

interface IDetailsViewProps {
  model: ScheduledJobDto;
}

const DetailsView: FC<IDetailsViewProps> = ({ model }) => {
  const [dataStamp, setDataStamp] = useState(null);
  const [triggerModalVisible, setTriggerModalVisible] = useState(false);
  const [selectedTriggerId, setSelectedTriggerId] = useState(null);

  const handleTriggerAdded = () => {
    setTriggerModalVisible(false);
    setDataStamp(dataStamp ? dataStamp + 1 : 1);
  };

  const { formItemLayout } = useUi();

  const onExtraClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation();

    setSelectedTriggerId(null);
    setTriggerModalVisible(true);
  };

  const { mutate: deleteTrigger } = useScheduledJobTriggerDelete({});

  const triggersTableProps: IChildTableProps = {
    id: 'ScheduledJob_Triggers',
    header: 'Triggers',
    toolbarItems: [
      {
        title: 'Add',
        icon: <PlusOutlined />,
        onClick: onExtraClick,
      },
    ],
    actionColumns: [
      {
        icon: <EditOutlined />,
        onClick: (id) => {
          setSelectedTriggerId(id);
          setTriggerModalVisible(true);
        },
      },
      {
        icon: <DeleteOutlined />,
        onClick: (id, table) => {
          deleteTrigger({ id }).then(() => table.refreshTable());
        },
      },
    ],
  };
  const executionsTableProps: IChildTableProps = {
    id: 'ScheduledJob_Executions',
    header: 'Executions',
    actionColumns: [
      {
        icon: <SearchOutlined />,
        onClick: (id) => `${URL_SETTINGS_SCHEDULED_JOB_EXECUTIONS}/details?id=${id}`,
      },
    ],
  };

  return (
    <React.Fragment>
      <Row gutter={[12, 12]}>
        <Col span={12}>
          <CollapsiblePanel header="Job Details">
            <Form className="table-form" layout="horizontal" {...formItemLayout}>
              <Form.Item label="Name:">{model.jobName}</Form.Item>
              <Form.Item label="Namespace:">{model.jobNamespace}</Form.Item>
              <Form.Item label="Description:">{model.jobDescription}</Form.Item>
              <Form.Item label="Status:">{model.jobStatus?.item}</Form.Item>
              <Form.Item label="Startup Mode:">{model.startupMode?.item}</Form.Item>
            </Form>
          </CollapsiblePanel>
        </Col>

        <Col span={12}>
          <DataTableProvider tableId={triggersTableProps.id} parentEntityId={model.id} dataStamp={dataStamp}>
            <ChildTable {...triggersTableProps} />
          </DataTableProvider>
        </Col>

        <Col span={12}>
          <DataTableProvider tableId={executionsTableProps.id} parentEntityId={model.id} /*dataStamp={dataStamp}*/>
            <ChildTable {...executionsTableProps} />
          </DataTableProvider>
        </Col>
      </Row>

      {triggerModalVisible && (
        <EditTriggerModal
          visible={triggerModalVisible}
          onCancel={() => setTriggerModalVisible(false)}
          onSuccess={handleTriggerAdded}
          triggerId={selectedTriggerId}
          jobId={model.id}
        />
      )}
    </React.Fragment>
  );
};

const DetailsPage: NextPage<IProps> = (props) => {
  const {
    loading: loading,
    refetch: doFetch,
    error: fetchError,
    data: serverData,
  } = useScheduledJobGet({
    lazy: true,
  }); // todo: check headers issue (RestfulProvider is added, but they are empty)

  const { loading: startingJob, mutate: startJob } = useScheduledJobStartJob({});

  const fetchData = async () => {
    await doFetch({ queryParams: { id: props.id } });
  };

  const startScheduledJob = (id: string) => {
    startJob(null, { queryParams: { id } })
      .then((response) => {
        if (response.success === true) {
          router.push(`${URL_SETTINGS_SCHEDULED_JOB_EXECUTIONS}/details?id=${response.result}`);
        } else {
          Modal.error({ content: 'Failed to start job' });
        }
      })
      .catch(() => {
        Modal.error({ content: 'Sorry, job could not be started.' });
      });
  };

  // fetch data on page load
  useEffect(() => {
    fetchData();
  }, []);

  const router = useRouter();
  const toolbarItems: IToolbarItem[] = [
    {
      title: 'Edit',
      icon: <EditOutlined />,
      onClick: () => router.push(`${URL_SETTINGS_SCHEDULED_JOBS}/edit?id=${props.id}`),
    },
    {
      title: 'Start Job',
      icon: <PlayCircleOutlined />,
      onClick: () => startScheduledJob(props.id),
    },
  ];

  const model = serverData?.result;

  return (
    <Spin spinning={loading || startingJob} tip="Loading...">
      <MainLayout
        title="Scheduled Job Details"
        description=""
        showHeading={false}
        toolbar={<IndexToolbar items={toolbarItems} />}
      >
        <ValidationErrors error={fetchError?.data as any} />
        {model && <DetailsView model={model} />}
      </MainLayout>
    </Spin>
  );
};

export default DetailsPage;
