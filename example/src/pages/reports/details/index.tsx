import React from 'react';
import { NextPageWithLayout } from 'models';
import dynamic from 'next/dynamic';
import { getLayout } from 'src/components/layouts';

const LazyLoadedPage = dynamic(
  async () => {
    const modules = await import('@shesha/module-reports');
    return modules.ReportDetailsPage;
  },
  { ssr: false }
);

export const Page: NextPageWithLayout<{ id: string }> = ({ id }) => {
  return <LazyLoadedPage id={id} />;
};

Page.getLayout = getLayout;

export default Page;
