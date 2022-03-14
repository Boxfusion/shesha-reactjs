import React from 'react';
import dynamic from 'next/dynamic';
import { getLayout } from 'src/components/layouts';
import { NextPageWithLayout } from 'models';

type FormMode = 'designer' | 'edit' | 'readonly';

interface IDynamicPageProps {
  /**
   * Form path. You can pass either this or `formId`. This is required if `formId` is not provided
   */
  path?: string;

  /**
   * Entity id. This should not be confused with the form id
   */
  id?: string;

  /**
   * Form id. You can pass either this or the `path`. This is required if `path` is not provided
   */
  formId?: string;

  /**
   * form mode.
   */
  mode?: FormMode;
}

const LazyLoadedPage = dynamic(
  async () => {
    const modules = await import('@shesha/reactjs');
    return modules.DynamicPage;
  },
  { ssr: false }
);

const DynamicPage: NextPageWithLayout<IDynamicPageProps> = (props) => {
  return <LazyLoadedPage {...props} />;
};

export default DynamicPage;

DynamicPage.getLayout = getLayout;
