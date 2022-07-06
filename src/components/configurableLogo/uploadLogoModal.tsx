import { Modal } from 'antd';
import React from 'react';
import { SIDEBAR_MENU_ID } from '../../constants';
import { StoredFileProvider, useSheshaApplication } from '../../providers';
import FileUpload from '../fileUpload';

export interface IUploadLogoModalProps {}

export const UploadLogoModal = ({}) => {
  const { backendUrl } = useSheshaApplication();

  return (
    <Modal visible={true}>
      <StoredFileProvider
        baseUrl={backendUrl}
        ownerId={SIDEBAR_MENU_ID}
        ownerType="Shesha.Framework.ConfigurableComponent"
        uploadMode={'sync'}
        // uploadMode={ownerId ? 'async' : 'sync'}
      >
        <FileUpload allowUpload allowDelete={false} allowReplace={true} />
      </StoredFileProvider>
    </Modal>
  );
};

export default UploadLogoModal;
