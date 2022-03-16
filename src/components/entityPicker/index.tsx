import React, { FC, Fragment, ReactNode, useEffect, useState } from 'react';
import { Modal, Input, Button, ButtonProps } from 'antd';
import IndexTable from '../indexTable';
import { IAnyObject } from '../../interfaces';
import DataTableProvider, { useDataTable } from '../../providers/dataTable';
import GlobalTableFilter from '../globalTableFilter';
import TablePager from '../tablePager';
import _ from 'lodash';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import { EllipsisOutlined } from '@ant-design/icons';
import { IConfigurableColumnsBase } from '../../providers/datatableColumnsConfigurator/models';

interface IWrappedEntityPickerProps {
  tableId?: string;
  entityType?: string;
  parentEntityId?: string;
  onDblClick?: (data: any) => void;
}

export interface IEntityPickerProps extends Omit<IWrappedEntityPickerProps, 'onDblClick'> {
  formId?: string;
  onChange?: (value: string, data: IAnyObject) => void;
  onSelect?: (data: IAnyObject) => void;
  value?: any;
  displayEntityKey?: string;
  disabled?: boolean;
  loading?: boolean;
  name?: string;
  size?: SizeType;
  title?: string;
  useButtonPicker?: boolean;
  pickerButtonProps?: ButtonProps;
  defaultValue?: string;
  entityFooter?: ReactNode;
  configurableColumns?: IConfigurableColumnsBase[]; // Type it later
}

export interface IEntityPickerState {
  showModal?: boolean;
  selectedRowIndex?: number;
  selectedValue?: string;
  selectedRow?: IAnyObject;
}

const INITIAL_STATE: IEntityPickerState = {
  selectedRowIndex: -1,
  selectedValue: '',
  selectedRow: null,
};

export const EntityPickerInner: FC<IEntityPickerProps> = ({
  tableId,
  entityType,
  displayEntityKey = 'displayName',
  onChange,
  disabled,
  loading,
  value,
  name,
  size,
  useButtonPicker,
  pickerButtonProps,
  onSelect,
  defaultValue,
  title = 'Select Item',
  entityFooter,
  configurableColumns,
  formId,
}) => {
  const [state, setState] = useState<IEntityPickerState>({
    showModal: false,
    ...INITIAL_STATE,
  });

  const { registerConfigurableColumns } = useDataTable();

  useEffect(() => {
    // This is important for form designer configured picker
    // register columns
    if (formId && configurableColumns) {
      registerConfigurableColumns(formId, configurableColumns);
    }
  }, [formId, configurableColumns]);

  if (!tableId && !entityType) {
    throw new Error(
      'Please make sure that either tableId or entityType is configured for the entity picker to work properly'
    );
  }

  const toggleModalVisibility = () =>
    setState(current => ({
      ...current,
      ...INITIAL_STATE,
      showModal: !current?.showModal,
      selectedValue: current?.selectedValue,
    }));

  const onDblClick = (row: IAnyObject) => {
    if (onSelect) {
      onSelect(row);
    } else {
      handleOnChange(row);
      setSelectedRow(row);
    }

    toggleModalVisibility();
  };

  const onSelectRow = (index: number, row: IAnyObject) => {
    handleOnChange(row);

    setSelectedRow(row, index);
  };

  const handleOnChange = (row: IAnyObject) => {
    if (onChange && !_.isEmpty(row)) {
      onChange(row && (row.id || row.Id), row);
    }
  };

  const onModalOk = () => {
    if (onSelect && state?.selectedRow) {
      onSelect(state?.selectedRow);
    }

    toggleModalVisibility();
  };

  const handleCancel = () => {
    clearAll();
    toggleModalVisibility();
  };

  const clearAll = () => {
    setState({ ...state, selectedRowIndex: -1, selectedValue: '' });

    if (onChange) {
      onChange(null, null);
    }
  };

  const setSelectedRow = (selectedRow: IAnyObject, selectedRowIndex?: number) => {
    let selectedValue = value;

    if (selectedRow && Object.keys(selectedRow).length) {
      selectedValue = displayEntityKey
        ? selectedRow[displayEntityKey]
        : selectedRow?.displayName || selectedRow?.DisplayName || selectedRow?.name || selectedRow?.Name;
    }

    setState({
      ...state,
      selectedValue,
      selectedRow,
      selectedRowIndex: selectedRowIndex === null ? state?.selectedRowIndex : selectedRowIndex,
    });
  };

  const handleButtonPickerClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event?.stopPropagation();
    setState({ ...state, showModal: true });
  };

  const footer = (
    <Fragment>
      {entityFooter}
      <Button onClick={handleCancel}>Close</Button>
    </Fragment>
  );

  return (
    <div className="entity-picker-container">
      <div>
        {useButtonPicker ? (
          <Button onClick={handleButtonPickerClick} size={size} {...(pickerButtonProps || {})}>
            {title}
          </Button>
        ) : (
          <Input.Group compact className="picker-input-group">
            <Input
              allowClear
              className="picker-input-group-input"
              value={state?.selectedValue || value}
              onChange={clearAll}
              disabled={disabled}
              name={name}
              size={size}
              defaultValue={defaultValue}
            />

            <Button
              onClick={toggleModalVisibility}
              className="picker-input-group-ellipsis"
              disabled={disabled}
              loading={loading ?? false}
              size={size}
              icon={<EllipsisOutlined />}
            />
          </Input.Group>
        )}
      </div>

      <Modal
        title={title || 'Select Item'}
        className="entity-picker-modal"
        visible={state?.showModal}
        onOk={onModalOk}
        onCancel={handleCancel}
        width="60%"
        okText="Select"
        footer={footer}
      >
        <>
          <GlobalTableFilter
            searchProps={{ size: 'middle', autoFocus: true, placeholder: 'Search by Title, Type or Keyword...' }}
          />

          <div className="entity-picker-modal-pager-container">
            <TablePager />
          </div>

          <IndexTable onSelectRow={onSelectRow} onDblClick={onDblClick} selectedRowIndex={state?.selectedRowIndex} />
        </>
      </Modal>
    </div>
  );
};

const EntityPicker: FC<IEntityPickerProps> = props => {
  const { tableId, parentEntityId, entityType } = props;
  return (
    <DataTableProvider
      tableId={tableId}
      // onDblClick={onDblClick}
      parentEntityId={parentEntityId}
      entityType={entityType}
    >
      <EntityPickerInner {...props} />
    </DataTableProvider>
  );
};

export default EntityPicker;
