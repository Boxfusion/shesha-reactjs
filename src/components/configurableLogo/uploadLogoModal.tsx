import { Modal } from 'antd';
import React, { FC, useEffect } from 'react';
import { SIDEBAR_MENU_ID } from '../../constants';
import { StoredFileProvider, useSheshaApplication, useStoredFile } from '../../providers';
import { ISettingsEditorProps } from '../configurableComponent';
import FileUpload from '../fileUpload';

export interface IUploadLogoModalProps extends ISettingsEditorProps<any> {
  fileId: string;
  onSave: (fileId: string) => void;
  onCancel: () => void;
  onLogoLoaded: (fileId: string) => {};
}

export const UploadLogoModal = ({ onCancel, onSave, onLogoLoaded, ...props }) => {
  const { backendUrl } = useSheshaApplication();
  const { fileInfo } = useStoredFile();

  useEffect(() => {
    if (onLogoLoaded) {
      onLogoLoaded(`${backendUrl}${fileInfo?.url}`);
    }
  }, [fileInfo]);

  return (
    <Modal visible={true} onCancel={onCancel} onOk={onSave} title="Configure Application Logo">
      <UploadLogoModalInner {...props} />
    </Modal>
  );
};

export const UploadLogoModalInner = ({ fileId = '964f51d7-033c-4aa8-83d0-b3df3903f000' }) => {
  const { backendUrl } = useSheshaApplication();

  return (
    <StoredFileProvider
      baseUrl={backendUrl}
      ownerId={SIDEBAR_MENU_ID}
      ownerType="Shesha.Framework.ConfigurableComponent"
      uploadMode={'async'}
      fileId={fileId}
      // uploadMode={ownerId ? 'async' : 'sync'}
    >
      <FileUpload allowUpload allowDelete={false} allowReplace={true} />
    </StoredFileProvider>
  );
};

export default UploadLogoModal;
