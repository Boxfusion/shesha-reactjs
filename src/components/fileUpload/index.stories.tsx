import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Story } from '@storybook/react';
import { StoredFileProvider } from '../../providers';
import { ICustomFileProps } from '../customFile';
import { FileUpload } from './';
import StoryApp from '../storyBookApp';

export default {
  title: 'Components/Temp/StoredFileUpload',
  component: FileUpload,
} as Meta;

const customFileProps = {
  fileId: '4f5f7ecf-a8e2-45f7-9d16-fa8e2c3fb50c',
  ownerId: 'dfb0d47e-a3f5-4a36-bd75-c386937e04b0',
  ownerType: 'Shesha.Framework.ConfigurableComponent',
};

const backendUrl = process.env.STORYBOOK_BASE_URL; // TODO: Make this configurable

// Create a master template for mapping args to render the Button component
const Template: Story<ICustomFileProps> = args => (
  <StoryApp>
    <StoredFileProvider
      // propertyName="Photo"
      baseUrl={backendUrl}
      {...args}
    >
      <FileUpload />
    </StoredFileProvider>
  </StoryApp>
);

export const Basic = Template.bind({});
Basic.args = { ...customFileProps };
