import React from 'react';
import dynamic from 'next/dynamic';
import { NextPageWithLayout } from 'models';
import { getLayout } from 'src/components/layouts';

const LazyLoadedPage = dynamic(
  async () => {
    const modules = await import('@shesha/module-reports');
    return modules.ReportViewerPage;
  },
  { ssr: false }
);

export const Page: NextPageWithLayout<{ id: string }> = ({ id }) => {
  return <LazyLoadedPage id={id} />;
};

Page.getLayout = getLayout;

export default Page;
