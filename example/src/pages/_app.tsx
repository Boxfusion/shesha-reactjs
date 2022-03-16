require('@shesha/reactjs/dist/styles.less');
require('antd/dist/antd.less');
require('src/styles/custom-n-progress.less');

import React from 'react';
import App, { AppProps } from 'next/app';
import { MaintenanceProvider, ShaRoleAppointedPersonProvider, ShaRoleProvider } from 'providers';
import {
  AppConfiguratorProvider,
  UiProvider,
  AuthorizationSettingsProvider,
  StoredFilesProvider,
  ShaApplicationProvider,
  MetadataDispatcherProvider,
} from '@shesha/reactjs';
import { useRouter } from 'next/router';
import { CustomNProgress } from 'components';
import { customComponents } from 'src/components/designer.config';
import { BASE_URL } from 'src/api/utils/constants';
import { StyledThemeProvider } from 'src/definitions/styled-components';
import { NextPageWithLayout } from 'models';

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      {/* <GlobalStyle /> */}
      <StyledThemeProvider>
        <ShaApplicationProvider backendUrl={BASE_URL} router={router as any} toolboxComponentGroups={customComponents}>
          <AppConfiguratorProvider>
            <CustomNProgress />
            <>
              <AuthorizationSettingsProvider>
                <ShaRoleProvider>
                  <ShaRoleAppointedPersonProvider>
                    <MaintenanceProvider>
                      <MetadataDispatcherProvider>
                        <StoredFilesProvider baseUrl={BASE_URL} ownerId={''} ownerType={''}>
                          <UiProvider>{getLayout(<Component {...pageProps} {...(router?.query || {})} />)}</UiProvider>
                        </StoredFilesProvider>
                      </MetadataDispatcherProvider>
                    </MaintenanceProvider>
                  </ShaRoleAppointedPersonProvider>
                </ShaRoleProvider>
              </AuthorizationSettingsProvider>
            </>
          </AppConfiguratorProvider>
        </ShaApplicationProvider>
      </StyledThemeProvider>
    </>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.

MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps };
};

export default MyApp;
