import React, { FC, useState } from 'react';
import { useDataTableActions, DataTableProvider, ChildTable, IChildTableProps } from '@shesha/reactjs';
import { FileAddOutlined } from '@ant-design/icons';
import EditModal from './referenceListItemEditModal';
import { useMutate } from 'restful-react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

interface IReferenceListItemsTableProps {
  listId: string;
}

const tableId = 'ReferenceList_Items';

const TableInternal: FC<IReferenceListItemsTableProps> = ({ listId: jobId }) => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const { mutate: deleteItem } = useMutate({
    verb: 'DELETE',
    path: `/api/services/app/ReferenceListItem/Delete`,
  });

  const tableProps: IChildTableProps = {
    id: tableId,
    header: 'List Items',
    toolbarItems: [
      {
        title: 'Add',
        icon: <FileAddOutlined />,
        onClick: () => setEditModalVisible(true),
      },
    ],
    actionColumns: [
      {
        icon: <EditOutlined />,
        onClick: (id) => {
          setSelectedItemId(id);
          setEditModalVisible(true);
        },
      },
      {
        icon: <DeleteOutlined />,
        onClick: (id, table) => {
          deleteItem('', { queryParams: { id: id } }).then(() => table.refreshTable());
        },
      },
    ],
  };

  const { refreshTable } = useDataTableActions();
  const handleEditSuccess = () => {
    setEditModalVisible(false);
    setSelectedItemId(null);
    refreshTable();
  };

  const handleEditCancel = () => {
    setEditModalVisible(false);
    setSelectedItemId(null);
  };

  return (
    <React.Fragment>
      <ChildTable {...tableProps} />

      {editModalVisible && (
        <EditModal
          id={selectedItemId}
          listId={jobId}
          visible={editModalVisible}
          onCancel={handleEditCancel}
          onSuccess={handleEditSuccess}
        />
      )}
    </React.Fragment>
  );
};

const ReferenceListItemsTable: FC<IReferenceListItemsTableProps> = ({ listId: jobId }) => {
  return (
    <DataTableProvider tableId={tableId} parentEntityId={jobId}>
      <TableInternal listId={jobId}></TableInternal>
    </DataTableProvider>
  );
};

export default ReferenceListItemsTable;
