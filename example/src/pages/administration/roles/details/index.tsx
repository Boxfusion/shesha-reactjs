import { UserAddOutlined } from '@ant-design/icons';
import { Col, Form, Row } from 'antd';
import { ShaRoleDto } from 'api/shaRole';
import { AppointedPersonPickerModal } from 'components';
import { ChildTable, CollapsiblePanel, DisplayFormItem, IChildTableProps, Page } from '@shesha/reactjs';
import { useRouter } from 'next/router';
import { useShaRole, useShaRoleAppointedPerson } from 'providers';
import { DataTableProvider, useUi } from '@shesha/reactjs';
import React, { FC, useEffect, useState } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { getLayout } from 'src/components/layouts';

interface IProps {
  readonly role: ShaRoleDto;
}

const RoleDetailsPage = () => {
  const {
    query: { id },
  } = useRouter();

  const { getShaRole, shaRole } = useShaRole();

  useEffect(() => {
    getShaRole(id.toString());
  }, []);

  return shaRole.hasOwnProperty('id') && <DetailsRoles role={shaRole} />;
};

const DetailsRoles: FC<IProps> = ({ role }) => {
  const [dataStamp, setDataStamp] = useState(null);
  const { formItemLayout, togglePersonPickerVisible } = useUi();

  const {
    deleteShaRoleAppointedPerson,
    succeeded: { createShaRoleAppointedPerson: createPersonSuccess },
  } = useShaRoleAppointedPerson();

  useEffect(() => {
    if (createPersonSuccess) {
      togglePersonPickerVisible(false);
      setDataStamp(dataStamp ? dataStamp + 1 : 1);
    }
  }, [createPersonSuccess]);

  const onExtraClick = () => {
    togglePersonPickerVisible(true);
  };

  const tableProps: IChildTableProps = {
    id: 'ShaRole_AppointedPersons',
    header: 'Members',
    toolbarItems: [
      {
        title: 'Add',
        icon: <UserAddOutlined />,
        onClick: onExtraClick,
      },
    ],
    actionColumns: [
      // {
      //   icon: <EditOutlined />,
      //   onClick: () => {
      //     togglePersonPickerVisible(true);
      //   }
      // },
      {
        icon: <DeleteOutlined />,
        onClick: (id, table) => {
          deleteShaRoleAppointedPerson({ id }).then(() => table.refreshTable());
        },
      },
    ],
  };

  return (
    <Page title="User Roles">
      <Row gutter={[12, 12]}>
        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
          <CollapsiblePanel header="Role Details">
            <Form className="table-form" layout="horizontal" {...formItemLayout}>
              <DisplayFormItem label="Name:">{role.name}</DisplayFormItem>
              <DisplayFormItem label="Description:">{role.description}</DisplayFormItem>
            </Form>
          </CollapsiblePanel>
        </Col>

        <Col xs={24} sm={24} md={24} lg={16} xl={16}>
          <DataTableProvider tableId={tableProps.id} parentEntityId={role.id} dataStamp={dataStamp}>
            <ChildTable {...tableProps} />
          </DataTableProvider>
        </Col>
      </Row>

      <AppointedPersonPickerModal roleId={role.id} />
    </Page>
  );
};

RoleDetailsPage.getLayout = getLayout;

export default RoleDetailsPage;
