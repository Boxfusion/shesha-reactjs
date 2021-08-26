import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Story } from '@storybook/react';
import ChildDataTable, { IndexTableFull } from './';
import DataTableProvider from '../../providers/dataTable';
import { SearchOutlined } from '@ant-design/icons';
import { IShaDataTableProps, ShaApplicationProvider } from '../..';
import AuthContainer from '../authedContainer';
import { useRef } from 'react';

export default {
  title: 'Components/IndexTableFull',
  component: ChildDataTable,
  argTypes: {},
} as Meta;

const tableProps: IShaDataTableProps = {
  id: 'Applications_Admin_DG_Final_Index',
  // id: 'Persons_Index',
  header: 'List of People',
  crud: true,
  actionColumns: [
    {
      icon: <SearchOutlined />,
      onClick: id => {
        alert('clicked row with Id = ' + id);
      },
    },
  ],
  onExportSuccess: () => {
    console.log('Components/IndexTableFull export succeeded');
  },
  onExportError: () => {
    console.log('Components/IndexTableFull export error');
  }
};

const backendUrl = process.env.STORYBOOK_BASE_URL; // TODO: Make this configurable

// Create a master template for mapping args to render the Button component
const Template: Story<IShaDataTableProps> = args => {
  const tableRef = useRef();
  
  return (
    <ShaApplicationProvider backendUrl={backendUrl}>
      <AuthContainer layout>
        <DataTableProvider tableId={args.id} title="Users" {...args}>
          {/* <TableHack></TableHack> */}
          <IndexTableFull {...tableProps} {...args} tableRef={tableRef} />
        </DataTableProvider>
      </AuthContainer>
    </ShaApplicationProvider>
  );
};

export const SimpleChildTable = Template.bind({});
SimpleChildTable.args = { ...tableProps };
