import React, { FC } from 'react';
import { Modal, Spin, Button } from 'antd';

interface IModalProps {
  visible: boolean;
  onCancel?: () => void;
  onSelected?: (val: string) => void;
}

const UserPicker: FC<IModalProps> = ({ visible, onCancel }) => {
  const loading = false;

  const handleSubmit = () => {};

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Modal
      width="60%"
      visible={visible}
      title="Select User"
      okText="Add"
      onCancel={handleCancel}
      onOk={handleSubmit}
      confirmLoading={loading}
      footer={<Button onClick={handleCancel}>Cancel</Button>}
    >
      <Spin spinning={loading} tip="Please wait...">
        {/* <DataTableProvider tableId="Persons_Picker" showStandardPagination={true} onDblClick={handleDblClick}> */}
        {/* <IndexTable id="Persons_Picker" /> */}
        {/* </DataTableProvider> */}
      </Spin>
    </Modal>
  );
};
export default UserPicker;
