import React, { FC, useEffect, useRef, useContext, useState } from 'react';
import {
  DragDropContext,
  DropResult,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from 'react-beautiful-dnd';

import { IColumnProps } from './columns';
import { Table, Space, Popconfirm, Button, Form, InputNumber } from 'antd';
import { MenuOutlined, PlusOutlined } from '@ant-design/icons';
import { v4 as uuid } from 'uuid';

export interface IProps {
  value?: object;
  onChange?: any;
}

const EditableContext = React.createContext(null);
const DragHandleContext = React.createContext(null);
const EditableCell = ({ title, editable, children, dataIndex, record, handleSave, ...restProps }) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        {/* <Input ref={inputRef} onPressEnter={save} onBlur={save} /> */}
        <InputNumber ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

const getItemStyle = (draggableStyle: any, isDragging: boolean): {} => ({
  padding: '2px',
  userSelect: 'none',
  background: isDragging ? 'white' : 'inherit',
  border: isDragging ? '1px dashed #000' : 'none',
  ...draggableStyle,
});

const DraggableBodyRowInner = ({ columns, className, style, ...restProps }) => {
  const [form] = Form.useForm();

  // function findIndex base on Table rowKey props and should always be a right array index
  const rowKey = restProps['data-row-key'];
  const index = columns.findIndex(x => x.id === restProps['data-row-key']);
  return (
    <Draggable key={rowKey} draggableId={rowKey} index={index}>
      {(providedDraggable: DraggableProvided, snapshotDraggable: DraggableStateSnapshot) => (
        <Form form={form} component={false}>
          <DragHandleContext.Provider value={{ ...providedDraggable.dragHandleProps }}>
            <EditableContext.Provider value={form}>
              <tr
                className="editable-row"
                ref={providedDraggable.innerRef}
                {...providedDraggable.draggableProps}
                style={getItemStyle(providedDraggable.draggableProps.style, snapshotDraggable.isDragging)}
                {...restProps}
              ></tr>
            </EditableContext.Provider>
          </DragHandleContext.Provider>
        </Form>
      )}
    </Draggable>
  );
};

export const ColumnsList: FC<IProps> = ({ value, onChange }) => {
  const columns = value as IColumnProps[];

  const DragHandle = props => <MenuOutlined style={{ color: '#999' }} {...props} />;

  const handleDeleteTab = (key: string) => {
    const newColumns = columns.filter(column => column.id !== key);
    onChange(newColumns);
  };

  const handleAddColumn = () => {
    const newColumn: IColumnProps = {
      id: uuid(),
      flex: 6,
      offset: 0,
      push: 0,
      pull: 0,
      components: [],
    };
    const newColumns = [...columns, newColumn];
    onChange(newColumns);
  };

  const handleSaveCell = row => {
    const newData = [...columns];
    const index = newData.findIndex(item => row.id === item.id);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });

    onChange(newData);
  };

  const cols = [
    {
      title: '',
      dataIndex: 'sort',
      width: 30,
      render: (_text, _record, _index) => {
        const dragHandleProps = useContext(DragHandleContext);
        return <DragHandle {...dragHandleProps} />;
      },
    },
    {
      title: 'Width',
      dataIndex: 'flex',
      editable: true,
      width: '20%',
    },
    {
      title: 'Offset',
      dataIndex: 'offset',
      width: '20%',
      editable: true,
    },
    {
      title: 'Push',
      dataIndex: 'push',
      width: '20%',
      editable: true,
    },
    {
      title: 'Pull',
      dataIndex: 'pull',
      width: '20%',
      editable: true,
    },
    {
      title: '',
      dataIndex: 'operations',
      render: (_, record) =>
        columns.length >= 1 ? (
          <Popconfirm title="Are you sure want to delete this tab?" onConfirm={() => handleDeleteTab(record.id)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];
  const tableColumns = cols.map(col => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: record => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: handleSaveCell,
      }),
    };
  });

  const getListStyle = (_isDraggingOver: boolean) => ({
    //background: isDraggingOver ? "lightgrey" : "inherit",
    //overflow: "scroll" as "scroll",
  });

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId == source.droppableId && source.index == destination.index) return;

    const reorder = (list: IColumnProps[], startIndex: number, endIndex: number): IColumnProps[] => {
      const result = [...list];
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);

      return result;
    };

    if (source.droppableId === destination.droppableId) {
      let newColumns = reorder(columns, source.index, destination.index);

      onChange(newColumns);
    }
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={'columns'}>
          {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
            <div ref={provided.innerRef} {...provided.droppableProps} style={getListStyle(snapshot.isDraggingOver)}>
              <Table
                scroll={{ x: 'mex-content' }}
                bordered
                pagination={false}
                dataSource={columns}
                columns={tableColumns}
                rowKey={r => r.id}
                components={{
                  body: {
                    row: ({ className, style, ...restProps }) => (
                      <DraggableBodyRowInner
                        columns={columns}
                        className={className}
                        style={style}
                        {...restProps}
                      ></DraggableBodyRowInner>
                    ),
                    cell: EditableCell,
                  },
                }}
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div>
        <Button type="default" onClick={handleAddColumn} icon={<PlusOutlined />}>
          Add Column
        </Button>
      </div>
    </Space>
  );
};

export default ColumnsList;
