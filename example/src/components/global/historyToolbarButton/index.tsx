import React, { FC, useState } from 'react';
import { Drawer } from 'antd';
import { DataTableProvider, IndexTable } from '@shesha/reactjs';
import { HistoryOutlined } from '@ant-design/icons';
import { nanoid } from 'nanoid';

export interface IHistoryContext {
  EntityTypeFullName: string;
  EntityId: string;
  EntityName?: string;
}

const HistoryToolbarButton: FC<IHistoryContext> = (props: IHistoryContext) => {
  const [historyModalVisible, setHistoryModalVisible] = useState<boolean>(false);
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const handleHistoryClose = () => {
    setHistoryModalVisible(false);
  };

  const handleButtonClick = () => {
    setIsOpened(true);
    setHistoryModalVisible(true);
  };

  return (
    <div className="index-toolbar" key={nanoid()}>
      <HistoryOutlined onClick={handleButtonClick} />
      {isOpened && (
        <Drawer
          title={props?.EntityName ? 'History of ' + props?.EntityName : 'History'}
          placement="right"
          closable={true}
          onClose={handleHistoryClose}
          visible={historyModalVisible}
          width="50%"
        >
          <DataTableProvider tableId="EntityHistoryFull_Index" getDataPath="/api/services/app/EntityHistory/GetData">
            <IndexTable id="EntityHistoryFull_Index" />
          </DataTableProvider>
        </Drawer>
      )}
    </div>
  );
};

export default HistoryToolbarButton;
