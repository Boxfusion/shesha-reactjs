import React, { FC } from 'react';
import { Modal, Button, Skeleton } from 'antd';
import { useShaRoleAppointedPerson } from 'providers';
import { useUi, DataTableProvider, IndexTable, GlobalTableFilter, TablePager, ValidationErrors } from '@shesha/reactjs';

interface IProps {
  readonly roleId: string;
}

const AppointedPersonPickerModal: FC<IProps> = ({ roleId }) => {
  const { togglePersonPickerVisible, isPersonPickerVisible } = useUi();

  const {
    createShaRoleAppointedPerson,
    isInProgress: { createShaRoleAppointedPerson: isCreatingPerson },
    error: { createShaRoleAppointedPerson: isCreatingError },
  } = useShaRoleAppointedPerson();

  const onDbClick = (row) => {
    if (row) {
      createShaRoleAppointedPerson({ roleId, person: { id: row?.Id } });
    }
  };

  const tableId = 'Persons_Picker';

  return (
    <Modal
      width="60%"
      visible={isPersonPickerVisible}
      title="Select User"
      okText="Add"
      onCancel={() => togglePersonPickerVisible(false)}
      confirmLoading={isCreatingPerson}
      footer={<Button onClick={() => togglePersonPickerVisible(false)}>Cancel</Button>}
    >
      <div className="sha-table-picker">
        <Skeleton className="appointed-person-picker-modal" loading={isCreatingPerson}>
          <ValidationErrors error={isCreatingError} />
          <DataTableProvider tableId={tableId} onDblClick={onDbClick}>
            <GlobalTableFilter searchProps={{ size: 'middle', autoFocus: true, placeholder: 'Search by name...' }} />
            <div className="ant-row sha-table-picker-pager">
              <TablePager />
            </div>
            <IndexTable id={tableId} />
          </DataTableProvider>
        </Skeleton>
      </div>
    </Modal>
  );
};
export default AppointedPersonPickerModal;
