import React, { FC, useState } from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Story } from '@storybook/react';
import Autocomplete, { IAutocompleteProps } from './';
import { Button, Form } from 'antd';
import AuthContainer from '../authedContainer';
import { ShaApplicationProvider } from '../../providers';

export default {
  title: 'Components/Autocomplete',
  component: Autocomplete,
} as Meta;

const backendUrl = process.env.STORYBOOK_BASE_URL; // TODO: Make this configurable

interface IStoryArgs extends IAutocompleteProps {
  /** 
   * Test Value, is used only by this story for the `Set Test Value Button` 
   * */
  testValue?: any;
  /** 
   * Initial Value, is used only by this story
   * */
  initialValue?: any;
}

interface ITemplateProps extends IStoryArgs {
  children: React.ReactNode;
}

const BaseTemplate: FC<ITemplateProps> = props => {
  const { testValue, children } = props;
  const label = 'Autocomplete';
  const name = 'autocomplete';
  const [state, setState] = useState(null);

  const [form] = Form.useForm();

  const onFinish = (data: any) => {
    console.log('onFinish data ', data);
    setState(data);
  };

  return (
    <ShaApplicationProvider backendUrl={backendUrl}>
      <AuthContainer>
        <div style={{ width: 500 }}>
          <Form
            {...{
              labelCol: {
                xs: { span: 24 },
                md: { span: 8 },
                sm: { span: 8 },
              },
              wrapperCol: {
                xs: { span: 24 },
                md: { span: 16 },
                sm: { span: 16 },
              },
            }}
            onFinish={onFinish}
            form={form}
          >
            <Form.Item label={label} name={name} initialValue={props.initialValue}>
              {children}
            </Form.Item>

            {Boolean(testValue) && (
              <Button
                onClick={() =>
                  form?.setFieldsValue({
                    [name]: testValue,
                  })
                }
              >
                Set Test Value
              </Button>
            )}

            <Button onClick={() => form?.resetFields()} style={{ margin: '0 12px' }}>
              Reset
            </Button>

            <Button onClick={() => form?.submit()} type="primary">
              Submit
            </Button>

          </Form>
        </div>

        {Boolean(state) && (
          <div>
            <pre>{JSON.stringify(state, null, 2)}</pre>
          </div>
        )}
      </AuthContainer>
    </ShaApplicationProvider>
  );
};

// Create a master template for mapping args to render the Button component
const RawTemplate: Story<IStoryArgs> = args => {
  const { testValue, initialValue, ...autocompleteProps} = args;
  return (
    <BaseTemplate {...args}>
      <Autocomplete.Raw
        {...autocompleteProps}
      />
    </BaseTemplate>
  );
};

const EntityDtoTemplate: Story<IStoryArgs> = args => {
  const { testValue, initialValue, ...autocompleteProps} = args;
  return (
    <BaseTemplate {...args}>
      <Autocomplete.EntityDto
        {...autocompleteProps}
      />
    </BaseTemplate>
  );
};

const singleEntityDtoBaseProps: IStoryArgs = {
  dataSourceType: 'url',
  dataSourceUrl: '/api/v1/BursMan/ScheduleVisits/MembersAutocomplete',
  testValue: {
    "id": "291B86BE-27F1-41A0-8BFD-F867A3B38E32",
    "displayText": "Friday Green"
  }
};
//#region Single Entity DTO
const singleEntityDtoProps: IStoryArgs = {
  ...singleEntityDtoBaseProps
};
export const SingleEntityDto = EntityDtoTemplate.bind({});
SingleEntityDto.args = { ...singleEntityDtoProps };
//#endregion

//#region Single Entity DTO with initial value
const singleEntityDtoWithInitialValueProps: IStoryArgs = {
  ...singleEntityDtoBaseProps,
  initialValue: {
    "id": "6FB28E47-591E-46ED-90B5-13A88C69C759",
    "displayText": "Dimakatso Masetlane"
  }
};
export const SingleEntityDtoWithInitialValue = EntityDtoTemplate.bind({});
SingleEntityDtoWithInitialValue.args = { ...singleEntityDtoWithInitialValueProps };
//#endregion

const multipleEntityDtoBaseProps: IStoryArgs = {
  dataSourceType: 'url',
  dataSourceUrl: '/api/v1/BursMan/ScheduleVisits/MembersAutocomplete',
  mode: 'multiple',
  testValue: [{
    "id": "7F3076A1-E766-41A4-A05B-90E70A01D8AE",
    "displayText": "Cinisile Mathonsi"
  },
  {
    "id": "291B86BE-27F1-41A0-8BFD-F867A3B38E32",
    "displayText": "Friday Green"
  }]
};

//#region Multiple Entity DTO
const multipleEntityDtoProps: IStoryArgs = {
  ...multipleEntityDtoBaseProps
};
export const MultipleEntityDto = EntityDtoTemplate.bind({});
MultipleEntityDto.args = { ...multipleEntityDtoProps };
//#endregion

//#region Multiple Entity with initial value DTO
const multipleEntityDtoWithInitialValueProps: IStoryArgs = {
  ...multipleEntityDtoBaseProps,
  initialValue: [
    {
      "id": "42756BFC-0789-4AA3-91AC-68FEF3B8D5F1",
      "displayText": "DJ Khaled"
    },
    {
      "id": "8DA3928A-6E03-4260-8961-C3D0B5A33C42",
      "displayText": "Jane Smith"
    }
  ]
};
export const MultipleEntityDtoWithInitialValue = EntityDtoTemplate.bind({});
MultipleEntityDtoWithInitialValue.args = { ...multipleEntityDtoWithInitialValueProps };
//#endregion

//#region Tags Entity DTO
const tagsEntityDtoProps: IStoryArgs = {
  dataSourceType: 'url',
  dataSourceUrl: '/api/v1/BursMan/ScheduleVisits/MembersAutocomplete',
  mode: 'tags',
  testValue: [{
    "id": "7F3076A1-E766-41A4-A05B-90E70A01D8AE",
    "displayText": "Cinisile Mathonsi"
  },
  {
    "id": "291B86BE-27F1-41A0-8BFD-F867A3B38E32",
    "displayText": "Friday Green"
  }]
};
export const TagsEntityDto = EntityDtoTemplate.bind({});
TagsEntityDto.args = { ...tagsEntityDtoProps };
//#endregion

//#region Single Raw
const singleRawProps: IStoryArgs = {
  dataSourceType: 'url',
  dataSourceUrl: '/api/v1/BursMan/ScheduleVisits/MembersAutocomplete',
  testValue: "7F3076A1-E766-41A4-A05B-90E70A01D8AE",
};
export const SingleRaw = RawTemplate.bind({});
SingleRaw.args = { ...singleRawProps };
//#endregion

//#region Single Raw with initial value
const singleRawWithInitialValueProps: IStoryArgs = {
  dataSourceType: 'url',
  dataSourceUrl: '/api/v1/BursMan/ScheduleVisits/MembersAutocomplete',
  testValue: "7F3076A1-E766-41A4-A05B-90E70A01D8AE",
  initialValue: "42756BFC-0789-4AA3-91AC-68FEF3B8D5F1",
};
export const SingleRawWithInitialValue = RawTemplate.bind({});
SingleRawWithInitialValue.args = { ...singleRawWithInitialValueProps };
//#endregion

//#region Multiple Raw
const multipleRawProps: IStoryArgs = {
  dataSourceType: 'url',
  dataSourceUrl: '/api/v1/BursMan/ScheduleVisits/MembersAutocomplete',
  mode: 'multiple',
  testValue: ["7F3076A1-E766-41A4-A05B-90E70A01D8AE", "42756BFC-0789-4AA3-91AC-68FEF3B8D5F1"],
};
export const MultipleRaw = RawTemplate.bind({});
MultipleRaw.args = { ...multipleRawProps };
//#endregion

//#region Multiple Raw with initial value
const multipleRawWithInitialValueProps: IStoryArgs = {
  dataSourceType: 'url',
  dataSourceUrl: '/api/v1/BursMan/ScheduleVisits/MembersAutocomplete',
  mode: 'multiple',
  initialValue: ["7F3076A1-E766-41A4-A05B-90E70A01D8AE", "42756BFC-0789-4AA3-91AC-68FEF3B8D5F1"],
};
export const MultipleRawWithInitialValue = RawTemplate.bind({});
MultipleRawWithInitialValue.args = { ...multipleRawWithInitialValueProps };
//#endregion