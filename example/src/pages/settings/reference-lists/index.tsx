import { PlusOutlined } from '@ant-design/icons';
import {
  IndexTableFull,
  DataTableProvider,
  useDataTableActions,
  IToolbarItem,
  IShaDataTableProps,
  MainLayout,
} from '@shesha/reactjs';
import React, { FC, useState } from 'react';
import { FormInstance } from 'antd/lib/form';
import { SearchOutlined, EditOutlined } from '@ant-design/icons';
import { ReferenceListCreateModal } from 'components';

const tableProps: IShaDataTableProps = {
  id: 'ReferenceLists_Index', // hardcoded for now
  header: 'Reference Lists',
  actionColumns: [
    { icon: <SearchOutlined />, onClick: (id) => `/settings/reference-lists/details?id=${id}` },
    { icon: <EditOutlined />, onClick: (id) => `/settings/reference-lists/edit?id=${id}` },
  ],
  disableCustomFilters: true,
};

interface IProps {}

const TableWithControls: FC<IProps> = () => {
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);

  const { refreshTable } = useDataTableActions();

  const toolbarItems: IToolbarItem[] = [
    {
      title: 'Create New',
      icon: <PlusOutlined />,
      onClick: () => setCreateModalVisible(true),
    },
  ];

  const handleEntityCreated = (form: FormInstance) => {
    setCreateModalVisible(false);
    form.resetFields();
    refreshTable();
  };

  const handleCancel = (form: FormInstance) => {
    setCreateModalVisible(false);
    form.resetFields();
  };

  return (
    <MainLayout title="Reference Lists" noPadding showHeading={false}>
      <IndexTableFull {...tableProps} toolbarItems={toolbarItems} />

      <ReferenceListCreateModal visible={createModalVisible} onCancel={handleCancel} onSuccess={handleEntityCreated} />
    </MainLayout>
  );
};

const ReferenceListsSettings = () => (
  <DataTableProvider tableId={tableProps.id}>
    <TableWithControls></TableWithControls>
  </DataTableProvider>
);

export default ReferenceListsSettings;
