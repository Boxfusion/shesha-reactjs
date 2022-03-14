import React, { ReactElement } from 'react';
import { MainLayout, SidebarMenuDefaultsProvider } from '@shesha/reactjs';
import { SIDEBAR_MENU_ITEMS } from 'routes';

/**
 * Returns the component wrapped up in a layout
 * @param page the page to be rendered within the layout
 * @returns the component wrapped up in a layout
 */
export const getLayout = (page: ReactElement): JSX.Element => {
  return (
    <SidebarMenuDefaultsProvider items={SIDEBAR_MENU_ITEMS}>
      <MainLayout noPadding>{page}</MainLayout>
    </SidebarMenuDefaultsProvider>
  );
};

export default getLayout;
