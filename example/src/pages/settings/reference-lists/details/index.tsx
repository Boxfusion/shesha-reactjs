import React, { FC, useEffect } from 'react';
import { Form, Spin, Checkbox } from 'antd';
import { NextPage } from 'next';
import { CollapsiblePanel, IndexToolbar, IToolbarItem, MainLayout, ValidationErrors } from '@shesha/reactjs';
import { useRouter } from 'next/router';
import { useReferenceListGet, ReferenceListDto } from 'api/referenceList';
import { EditOutlined } from '@ant-design/icons';
import { ReferenceListItemsTable } from 'components';

interface IProps {
  id?: string;
}

interface IDetailsViewProps {
  model: ReferenceListDto;
}

const DetailsView: FC<IDetailsViewProps> = ({ model }) => {
  const formItemLayout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 },
  };

  return (
    <React.Fragment>
      <CollapsiblePanel header="Reference List Details">
        <Form className="table-form" layout="horizontal" {...formItemLayout}>
          <Form.Item label="Name:">{model.name}</Form.Item>
          <Form.Item label="Namespace:">{model.namespace}</Form.Item>
          <Form.Item label="Description:">{model.description}</Form.Item>
          <Form.Item label="Hard Link to Application:">
            <Checkbox checked={model.hardLinkToApplication} disabled={true}></Checkbox>
          </Form.Item>
        </Form>
      </CollapsiblePanel>

      <ReferenceListItemsTable listId={model.id} />
    </React.Fragment>
  );
};

const DetailsPage: NextPage<IProps> = (props) => {
  const {
    loading: loading,
    refetch: doFetch,
    error: fetchError,
    data: serverData,
  } = useReferenceListGet({
    lazy: true,
  });

  const fetchData = async () => {
    await doFetch({ queryParams: { id: props.id } });
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
      onClick: () => router.push(`/settings/reference-lists/edit?id=${props.id}`),
    },
  ];

  const model = serverData?.result;

  return (
    <Spin spinning={loading} tip="Loading...">
      <MainLayout
        title="Reference List Details"
        description=""
        showHeading={false}
        toolbar={<IndexToolbar items={toolbarItems} />}
      >
        <ValidationErrors error={fetchError} />
        {model && <DetailsView model={model}></DetailsView>}
      </MainLayout>
    </Spin>
  );
};

export default DetailsPage;
