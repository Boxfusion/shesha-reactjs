import React, { FC } from 'react';
import { ConfigurableComponent } from '../configurableComponent';
import CustomErrorBoundary from '../customErrorBoundary';
import { UploadLogoModal, IUploadLogoModalProps } from './uploadLogoModal';

export const ConfigurableLogo: FC = () => {
  const editor = () => {
    return <UploadLogoModal />;
  };
  return (
    <ConfigurableComponent<IUploadLogoModalProps> defaultSettings={undefined} settingsEditor={{ render: editor }}>
      {(componentState, BlockOverlay) => (
        <CustomErrorBoundary>
          <div className={`logo ${componentState.wrapperClassName}`}>
            <BlockOverlay />
            <a href="/">
              <img src="/images/app-logo.png" />
            </a>
          </div>
        </CustomErrorBoundary>
      )}
    </ConfigurableComponent>
  );
};

export default ConfigurableLogo;
