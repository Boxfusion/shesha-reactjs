import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Story } from '@storybook/react';
import { ShaApplicationProvider } from '../../providers';
import AuthContainer from '../authedContainer';
import { GenericEditPage, IGenericEditPageProps } from '../..';
import { usePersonTestGet, usePersonTestUpdate } from '../../apis/personTest';
import { addStory } from '../../stories/utils';

export default {
  title: 'Components/CrudViews/EditView',
  component: GenericEditPage,
} as Meta;

const backendUrl = process.env.STORYBOOK_BASE_URL; // Just for configuring Storybook

// Create a master template for mapping args to render the Button component
const Template: Story<IGenericEditPageProps> = (props) => {
  const onDataLoaded = (model) => {
    console.log(model);
  }
  return (
    <ShaApplicationProvider backendUrl={backendUrl}>
      <AuthContainer layout>
        <>
          <GenericEditPage
            title={() => 'User Edit'}
            id={props.id}
            fetcher={props.fetcher}
            updater={props.updater}
            formPath={props.formPath}
            onDataLoaded={onDataLoaded}
          />
        </>
      </AuthContainer>
    </ShaApplicationProvider>
  );
};

export const Base = addStory(Template, {
  id: 'B3B60F2E-5B88-4F44-B8EB-D3987A8483D9',
  formPath: '/persons/edit',
  fetcher: usePersonTestGet,
  updater: usePersonTestUpdate,
});