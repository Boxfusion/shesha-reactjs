import React, { FC, useEffect, useState } from 'react';
import { Col, Input, Button, Modal, Form } from 'antd';
import { useBackupData } from 'providers/maintenance';
import FormItem from 'antd/lib/form/FormItem';
import { useFormState } from 'react-use-form-state';
import { FORM_HELP_ERROR_MSG } from 'src/app-constants/messages';
import { DataTableProvider, IndexTable, CollapsiblePanel } from '@shesha/reactjs';
import { BackupPageContainer } from './styles';

interface IMaintenanceBackupProps {}

interface BackupDto {
  filename: string;
}

type IBackupDtoType = keyof BackupDto;

const MaintenanceBackup: FC<IMaintenanceBackupProps> = () => {
  const [formState, { text }] = useFormState<BackupDto>({});
  const [needGetBackupData, setNeedGetBackupData] = useState<boolean>(false);
  const [isBackuping, setIsBackuping] = useState<boolean>(false);
  const [backupFile, setBackupFile] = useState<string>('');
  const [isRestoring, setIsRestoring] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [dataStamp, setDataStamp] = useState(0);

  const {
    getBackupData,
    backupData,
    getBackup,
    backupResponse,
    getRestore,
    restoreResponse,
    getDelete,
    deleteResponse,
  } = useBackupData();

  useEffect(() => {
    if (needGetBackupData) {
      setNeedGetBackupData(true);
    }
  }, []);

  useEffect(() => {
    getBackupData();
  }, [needGetBackupData]);

  useEffect(() => {
    if (backupResponse.backupPath) {
      setIsBackuping(false);
      completeModal('Backup completed');
      refreshTable();
    }
    if (backupResponse.errorMessage) {
      setIsBackuping(false);
      errorModal(backupResponse.errorMessage);
    }
  }, [backupResponse]);

  useEffect(() => {
    if (restoreResponse.backupPath) {
      setIsRestoring(false);
      completeModal('Restore completed');
    }
    if (restoreResponse.errorMessage) {
      setIsRestoring(false);
      errorModal(restoreResponse.errorMessage);
    }
  }, [restoreResponse]);

  useEffect(() => {
    if (deleteResponse.backupPath) {
      setIsDeleting(false);
      completeModal('Delete completed');
      refreshTable();
    }
    if (deleteResponse.errorMessage) {
      setIsDeleting(false);
      errorModal(deleteResponse.errorMessage);
    }
  }, [deleteResponse]);

  const handleBackupClick = () => {
    setIsBackuping(true);
    const filename = text('filename')?.value;
    if (filename) {
      getBackup(filename);
    }
  };

  const handleRestoreClick = () => {
    const filename = backupFile;
    confirmModal('Are you sure you need to restore `' + filename + '`?', () => {
      setIsRestoring(true);
      if (filename) {
        getRestore(filename);
      }
    });
  };

  const handleDeleteClick = () => {
    const filename = backupFile;
    confirmModal('Are you sure you need to delete `' + filename + '`?', () => {
      setIsDeleting(true);
      if (filename) {
        getDelete(filename);
      }
    });
  };

  const handleSelectRow = (...row) => {
    setBackupFile(row[1].FileName);
  };

  const getInputValidationMessage = (key: IBackupDtoType) => {
    return formState.touched[key] && !formState.validity[key] ? 'error' : '';
  };

  const completeModal = (text) => {
    Modal.info({
      title: 'Completed',
      content: <div>{text}</div>,
      onOk() {},
    });
  };

  const errorModal = (text) => {
    Modal.error({
      title: 'Error',
      content: <div>{text}</div>,
      onOk() {},
    });
  };

  const confirmModal = (text, okHandler) => {
    Modal.confirm({
      title: 'Confirmation',
      content: <div>{text}</div>,
      onOk() {
        if (okHandler) okHandler();
      },
      onCancel() {},
    });
  };

  const refreshTable = () => setDataStamp(new Date().getTime());

  return (
    <BackupPageContainer gutter={[12, 12]} className="maintenance-back-up-container">
      <Col span={12}>
        <CollapsiblePanel header="Backup" expandIconPosition="right">
          <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
            <FormItem label="Backups path:">{backupData.backupPath}</FormItem>
            <FormItem
              label="Backup file name:"
              validateStatus={getInputValidationMessage('filename')}
              help={FORM_HELP_ERROR_MSG}
            >
              <Input {...text('filename')} placeholder="Backup file name" required />
            </FormItem>

            <FormItem {...{ wrapperCol: { offset: 8, span: 16 } }}>
              <Button
                type="primary"
                htmlType="submit"
                //className="login-form-button"
                block
                onClick={handleBackupClick}
                disabled={!formState.validity['filename']}
                loading={isBackuping}
              >
                {isBackuping ? 'Backup in progress....' : 'Backup datatbase'}
              </Button>
            </FormItem>
          </Form>
        </CollapsiblePanel>
      </Col>

      <Col span={12}>
        <CollapsiblePanel header="Restore" expandIconPosition="right">
          <div className="table-container">
            <div className="maintenance-table-body">
              <DataTableProvider
                tableId="BackupFiles_Index"
                getDataPath="/api/services/app/Maintenance/GetData"
                onSelectRow={handleSelectRow}
                dataStamp={dataStamp}
              >
                <IndexTable id="BackupFiles_Index" />
              </DataTableProvider>
            </div>

            <div className="maintenance-table-btn-container">
              <FormItem {...{ wrapperCol: { span: 24 } }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  //className="login-form-button"
                  block
                  onClick={handleRestoreClick}
                  disabled={!backupFile}
                  loading={isRestoring}
                >
                  {isRestoring ? 'Restore in progress....' : 'Restore datatbase'}
                </Button>
              </FormItem>
              <FormItem {...{ wrapperCol: { span: 24 } }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  //className="login-form-button"
                  block
                  onClick={handleDeleteClick}
                  disabled={!backupFile}
                  loading={isDeleting}
                >
                  {isDeleting ? 'Delete in progress....' : 'Delete backup file'}
                </Button>
              </FormItem>
            </div>
          </div>
        </CollapsiblePanel>
      </Col>
    </BackupPageContainer>
  );
};

export default MaintenanceBackup;
