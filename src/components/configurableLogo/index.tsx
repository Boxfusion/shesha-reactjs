import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useLocalStorage } from '../../hooks';
import { ConfigurableComponent, ISettingsEditorProps } from '../configurableComponent';
import CustomErrorBoundary from '../customErrorBoundary';
import { UploadLogoModal, IUploadLogoModalProps } from './uploadLogoModal';

// const customFileProps = {
//   fileId: '4f5f7ecf-a8e2-45f7-9d16-fa8e2c3fb50c',
//   ownerId: 'dfb0d47e-a3f5-4a36-bd75-c386937e04b0',
//   ownerType: 'Shesha.Framework.ConfigurableComponent',
// };

export const ConfigurableLogo: FC = () => {
  const [logoPath, setLogoPath] = useState('');
  const [persistedAppLogo, setPersistedAppLogo] = useLocalStorage('APP_LOGO', ''); // display this while you're still wating for the logo to load

  useEffect(() => {
    if (logoPath) {
      setPersistedAppLogo(logoPath);
    }
  }, [logoPath]);

  const onLogoLoaded = useCallback((loadedLogo: string) => {
    setLogoPath(loadedLogo);
  }, []);

  const actualLogoPath = useMemo(() => {
    return logoPath?.length ? logoPath : persistedAppLogo; // || Default logo
  }, [logoPath, persistedAppLogo]);

  const editor = (editorProps: ISettingsEditorProps<any>) => {
    return (
      <UploadLogoModal
        fileId="4f5f7ecf-a8e2-45f7-9d16-fa8e2c3fb50c"
        onSave={editorProps?.onSave}
        onCancel={editorProps?.onCancel}
        onLogoLoaded={onLogoLoaded}
      />
    );
  };
  return (
    <ConfigurableComponent<IUploadLogoModalProps> defaultSettings={undefined} settingsEditor={{ render: editor }}>
      {(componentState, BlockOverlay) => (
        <CustomErrorBoundary>
          <div className={`logo ${componentState.wrapperClassName}`}>
            <BlockOverlay />
            <a href="/">
              <img src={actualLogoPath} />
              {/* <img src="/images/app-logo.png" /> */}
            </a>
          </div>
        </CustomErrorBoundary>
      )}
    </ConfigurableComponent>
  );
};

export default ConfigurableLogo;
