import React from 'react';
import { CollapsiblePanel, GenericIndexPageDefault, Page } from '@shesha/reactjs';
import { NextPageWithLayout } from 'models';
import { getLayout } from 'src/components/layouts';
import { Typography, PageHeader } from 'antd';
import { Fragment } from 'react';

const { Text, Paragraph, Link } = Typography;

const IndexPage: NextPageWithLayout = () => {
  return (
    <Page title="Landing page for Shesha ReactJS">
      <CollapsiblePanel header="Landing page">
        <Text>
          you have landed on the demo landing page for <Link href="https://shesha.io/">Shesha ReactJS</Link>
        </Text>

        <Paragraph>
          You can now play around with some components, create dynamic pages and components and see how they will look
          in a real application
        </Paragraph>

        <Paragraph>Use this approach if you are testing a feature that cannot be tested on the Storybook</Paragraph>
      </CollapsiblePanel>
    </Page>
  );
};

IndexPage.getLayout = getLayout;

export default IndexPage;
