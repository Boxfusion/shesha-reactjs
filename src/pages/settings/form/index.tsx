import { ExportOutlined, ImportOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Form, message, Modal } from 'antd';
import Upload, { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import React, { FC, Fragment, useRef, useState } from 'react';
import { useMutate } from 'restful-react';
import { GenericIndexPageDefault, IIndexTableFullProps, OnSuccessActionType } from '../../../components';
import { IShaDataTableProps } from '../../../interfaces';
import { DataTableFullInstance } from '../../../providers/dataTable/contexts';

import { useCreateForm } from './defaults/utils';

interface IFormsIndexPageProps {
  tableProps?: Omit<IIndexTableFullProps, 'id'>;
}

interface IPageState {
  isCreateModalVisible?: boolean;
  isUploadImportModalVisible?: boolean;
  selectedRowIds?: string[];
  uploadFile?: UploadChangeParam<UploadFile>;
}

const FormsIndexPage: FC<IFormsIndexPageProps> = ({ tableProps }) => {
  const tableRef = useRef<DataTableFullInstance>();

  const [state, setState] = useState<IPageState>({});

  const { mutate: exportJsonConfigs } = useMutate({
    verb: 'POST',
    path: `/api/services/Forms/Export`,
  });

  const { mutate: uploadJSONFileAsync } = useMutate({
    verb: 'POST',
    path: `/api/services/Forms/Import`,
  });

  const tableConfig: IShaDataTableProps = {
    id: 'Forms_Index', // hardcoded for now
    header: 'Forms',
    disableCustomFilters: true,
  };

  const toggleImportToJsonDialog = () =>
    setState(prev => ({ ...prev, isUploadImportModalVisible: !prev?.isUploadImportModalVisible }));

  const handleExportJsonClick = () => {
    exportJsonConfigs({ components: state.selectedRowIds }).then(response => {
      const url = window.URL.createObjectURL(new Blob([JSON.stringify(response)]));
      const link = document.createElement('a');
      link.href = url;
      const timestamp = Date.now();
      const fileName = `exportJsonConfig` + timestamp + `.json`;
      link.setAttribute('download', fileName);

      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    });
  };

  const onSelectedIdsChanged = (selectedRowIds: string[]) => setState(prev => ({ ...prev, selectedRowIds }));

  const noSelections = state?.selectedRowIds?.length === 0;

  const handleUpload = (uploadFile: UploadChangeParam<UploadFile>) => {
    setState(prev => ({ ...prev, uploadFile }));
  };

  const handleFileUploadAsync = () => {
    console.log('Handling file upload!');
    const formData = new FormData();
    formData.append('file', state.uploadFile?.fileList[0]?.originFileObj);
    uploadJSONFileAsync(formData)
      .then(response => {
        console.log('Response: ' + response);
        message
          .loading('Config import in progress..', 2.5)
          .then(() => message.warn('Existing configs with same path will be overridden', 2.5))
          .then(() => message.success('Configs imported successfully', 2.5))
          .then(() => setState({ isUploadImportModalVisible: false }))
          .then(tableRef?.current?.refreshTable);
      })
      .catch(e => message.error('Failed to import configs' + e));
  };

  const toolbarItems = [
    {
      title: 'Export Configs',
      icon: <ExportOutlined />,
      onClick: handleExportJsonClick,
      disabled: noSelections,
    },
    {
      title: 'Import Configs',
      icon: <ImportOutlined />,
      onClick: toggleImportToJsonDialog,
    },
  ];

  return (
    <Fragment>
      <GenericIndexPageDefault
        createModalProps={{
          title: 'Create Form',
          updater: useCreateForm,
          formPath: `/settings/forms/create`,
          OnSuccessAction: OnSuccessActionType.GoToUrl,
          onSuccessUrl: data => {
            console.log('returnUrlOnSuccess data :>> ', data);

            return `/settings/forms/designer?id=${data?.result?.id}`;
          },
        }}
        detailsUrl={id => `/settings/forms/designer?id=${id}`}
        editUrl={id => `/settings/forms/edit?id=${id}`}
        title="Forms"
        tableConfigId={tableConfig?.id}
        // props for the index table. selected row IDs. Does not expose selectedRowIds
        {...tableConfig}
        tableProps={{
          onSelectedIdsChanged,
          toolbarItems,
          useMultiselect: true,
          ...tableProps,
          tableRef,
        }}
      />

      <Modal
        title="Upload Import File"
        visible={state.isUploadImportModalVisible}
        onOk={handleFileUploadAsync}
        onCancel={toggleImportToJsonDialog}
      >
        <Form>
          <Form.Item name="file" label="Select File">
            <Upload beforeUpload={() => false} multiple={false} onChange={handleUpload}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default FormsIndexPage;
