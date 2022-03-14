import React from 'react';
import dynamic from 'next/dynamic';
import { NextPageWithLayout } from 'models';
import { getLayout } from 'src/components/layouts';

const LazyLoadedPage = dynamic(
  async () => {
    const modules = await import('@shesha/module-reports');
    return modules.AllReportsPage;
  },
  { ssr: false }
);

const Page:NextPageWithLayout = () => <LazyLoadedPage />;

Page.getLayout = getLayout;

export default Page;
