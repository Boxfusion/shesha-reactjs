import React, { FC, useEffect } from 'react';
import { Form, Spin, Row, Col, Breadcrumb } from 'antd';
import { NextPage } from 'next';
import Link from 'next/link';
import { IndexToolbar, IToolbarItem, MainLayout, ValidationErrors } from '@shesha/reactjs';
import { useScheduledJobExecutionGet, ScheduledJobExecutionDto } from 'api/scheduledJobExecution';
import { useScheduledJobExecution } from 'providers';
import moment from 'moment';
import { ScheduledJobExecutionProvider } from 'providers';
import { CollapsiblePanel } from '@shesha/reactjs';
import {
  CloseCircleFilled,
  CheckCircleFilled,
  DownloadOutlined,
  ClockCircleOutlined,
  QuestionCircleOutlined,
  StopOutlined,
  LoadingOutlined,
  PauseCircleOutlined,
} from '@ant-design/icons';
import { ScheduledJobExecutionLog } from 'components';
import { URL_SETTINGS_SCHEDULED_JOBS } from 'routes/settingsRoutes';

interface IProps {
  id?: string;
}

interface IDetailsViewProps {
  model: ScheduledJobExecutionDto;
}

const JobExecutionToolbar: FC<IProps> = () => {
  const { downloadLogFileRequest } = useScheduledJobExecution();

  const toolbarItems: IToolbarItem[] = [
    {
      title: 'Download Log',
      icon: <DownloadOutlined />,
      onClick: () => {
        downloadLogFileRequest();
      },
    },
  ];
  return <IndexToolbar items={toolbarItems} />;
};

const DetailsView: FC<IDetailsViewProps> = ({ model }) => {
  const formItemLayout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 },
  };

  const routes = [
    {
      path: URL_SETTINGS_SCHEDULED_JOBS,
      breadcrumbName: 'Scheduled Job',
    },
  ];

  return (
    <React.Fragment>
      {false && (
        <Breadcrumb
          itemRender={(route) => <Link href={route.path}>{route.breadcrumbName}</Link>}
          routes={routes}
        ></Breadcrumb>
      )}
      {/* <ScheduledJobExecutionProvider id={model.id}> */}
      <Row gutter={[16, 16]} style={{ height: '100%' }}>
      <Col span={18}>
          <ScheduledJobExecutionLog id={model.id} />
        </Col>
        <Col span={6}>
          <div style={{ height: '100%', overflowY: 'auto' }}>
            <CollapsiblePanel header="Summary">
              <Form className="table-form" layout="horizontal" {...formItemLayout}>
                <Form.Item label="Status:">{model.status?.item}</Form.Item>

                <Form.Item label="Started on:">
                  {model.startedOn ? moment(model.startedOn).format('DD/MM/YYYY HH:mm:ss') : null}
                </Form.Item>
                <Form.Item label="Finished on:">
                  {model.finishedOn ? moment(model.finishedOn).format('DD/MM/YYYY HH:mm:ss') : null}
                </Form.Item>
                <Form.Item label="Started by:">{model.startedBy?.displayText}</Form.Item>
                {false && (
                  <div>
                    <CheckCircleFilled style={{ fontSize: '18px', color: '#55a362' }} />
                    <CloseCircleFilled style={{ fontSize: '18px', color: '#cd4a45' }} />
                    <LoadingOutlined style={{ fontSize: '18px', color: '#0078d4' }} />
                    <QuestionCircleOutlined style={{ fontSize: '18px' }} />
                    <ClockCircleOutlined style={{ fontSize: '18px', color: '#cd4a45' }} />
                    <StopOutlined style={{ fontSize: '18px' }} />
                    <PauseCircleOutlined style={{ fontSize: '18px' }} />
                  </div>
                )}
              </Form>
            </CollapsiblePanel>
          </div>
        </Col>
      </Row>
      {/* </ScheduledJobExecutionProvider> */}
    </React.Fragment>
  );
};

const DetailsPage: NextPage<IProps> = (props) => {
  const {
    loading: loading,
    refetch: doFetch,
    error: fetchError,
    data: serverData,
  } = useScheduledJobExecutionGet({
    lazy: true,
  }); // todo: check headers issue (RestfulProvider is added, but they are empty)

  const fetchData = async () => {
    await doFetch({ queryParams: { id: props.id } });
  };

  // fetch data on page load
  useEffect(() => {
    fetchData();
  }, []);

  const model = serverData?.result;

  return (
    <Spin spinning={loading} tip="Loading...">
      <ScheduledJobExecutionProvider id={model?.id}>
        <MainLayout
          title="Scheduled Job Execution"
          description=""
          showHeading={false}
          toolbar={model && <JobExecutionToolbar id={model?.id} />}
        >
          <ValidationErrors error={fetchError} />
          {model && <DetailsView model={model}></DetailsView>}
        </MainLayout>
      </ScheduledJobExecutionProvider>
    </Spin>
  );
};

export default DetailsPage;
