import React from 'react';
import { NextPage } from 'next';
import { resetServerContext } from 'react-beautiful-dnd';
import { FormDesigner, FormProvider, MainLayout } from '@shesha/reactjs';

interface IDesignerPageProps {
  id?: string;
  path?: string;
}

const DesignerPage: NextPage<IDesignerPageProps> = ({ id, path }) => {
  return (
    <MainLayout title="Form Designer" showHeading={false} style={{ padding: 0 }} noPadding>
      <FormProvider id={id} path={path} mode="designer">
        <FormDesigner />
      </FormProvider>
    </MainLayout>
  );
};

DesignerPage.getInitialProps = async () => {
  resetServerContext();

  return {};
};

export default DesignerPage;
