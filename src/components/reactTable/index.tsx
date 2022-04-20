import React, { FC, useEffect, useRef } from 'react';
import classNames from 'classnames';
import {
  useResizeColumns,
  useFlexLayout,
  useRowSelect,
  CellPropGetter,
  TableHeaderProps,
  TableCellProps,
  useSortBy,
  usePagination,
  Row,
  useTable,
} from 'react-table';
import { LoadingOutlined } from '@ant-design/icons';
import { Empty, Spin } from 'antd';
import _ from 'lodash';
import { IReactTableProps } from './interfaces';
import { nanoid } from 'nanoid/non-secure';
import { usePrevious } from 'react-use';
// const headerProps = (props, { column }) => getStyles(props, column.align);

const cellProps: CellPropGetter<object> = (props, { cell }) => getStyles(props, cell.column.align);

const getStyles = (props: Partial<TableHeaderProps | TableCellProps>, align = 'left') => [
  props,
  {
    style: {
      justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
      alignItems: 'flex-start',
      display: 'flex',
    },
  },
];

const IndeterminateCheckbox = React.forwardRef(({ indeterminate, ...rest }: any, ref) => {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    // @ts-ignore
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return <input type="checkbox" ref={resolvedRef} {...rest} />;
});

const ReactTable: FC<IReactTableProps> = ({
  columns = [],
  data = [],
  useMultiSelect = false,
  loading = false,
  defaultSorting = [],
  defaultCanSort = false,
  manualPagination = true,
  manualFilters,
  selectedRowIndex,
  // defaultColumn,
  // changeSelectedIds,
  disableSortBy = false,
  pageCount,
  // tableRef,
  onFetchData,
  onSelectRow,
  onRowDoubleClick,
  onResizedChange,
  onSelectedIdsChanged,
  scrollBodyHorizontally = false,
  height = 250,
}) => {
  const defaultColumn = React.useMemo(
    () => ({
      // When using the useFlexLayout:
      minWidth: 30, // minWidth is only used as a limit for resizing
      width: 150, // width is used for both the flex-basis and flex-grow
      maxWidth: 200, // maxWidth is only used as a limit for resizing
    }),
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: {
        sortBy: defaultSorting || [],
        hiddenColumns: columns
          .map((column: any) => {
            if ([column.isVisible, column.show].includes(false)) return column.accessor || column.id;
          })
          ?.filter(Boolean),
      },
      defaultCanSort,
      manualFilters,
      manualPagination,
      disableSortBy,
      pageCount,
    },
    useSortBy,
    useResizeColumns,
    useFlexLayout,
    usePagination,
    useRowSelect,
    // useBlockLayout,
    ({ useInstanceBeforeDimensions, allColumns }) => {
      if (useMultiSelect) {
        allColumns.push(localColumns => [
          // Let's make a column for selection
          {
            id: 'selection',
            disableResizing: true,
            minWidth: 35,
            width: 35,
            maxWidth: 35,
            disableSortBy: true,
            // The header can use the table's getToggleAllRowsSelectedProps method
            // to render a checkbox
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <span>
                <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
              </span>
            ),
            // The cell can use the individual row's getToggleRowSelectedProps method
            // to the render a checkbox
            Cell: ({ row }) => (
              <span>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </span>
            ),
          },
          ...localColumns,
        ]);
      }
      useInstanceBeforeDimensions?.push(({ headerGroups: localHeaderGroups }) => {
        if (Array.isArray(localHeaderGroups)) {
          // fix the parent group of the selection button to not be resizable
          const selectionGroupHeader = localHeaderGroups[0]?.headers[0];
          if (selectionGroupHeader) {
            selectionGroupHeader.canResize = false;
          }
        }
      });
    }
  );

  const { pageIndex, pageSize, selectedRowIds } = state;

  const previousSelectedRowIds = usePrevious(selectedRowIds);

  useEffect(() => {
    if (
      selectedRowIds &&
      typeof onSelectedIdsChanged === 'function' &&
      !_.isEqual(previousSelectedRowIds, selectedRowIds)
    ) {
      const arrays: string[] = data
        ?.map(({ Id }, index) => {
          if (selectedRowIds[index]) {
            return Id;
          }

          return null;
        })
        ?.filter(Boolean);

      onSelectedIdsChanged(arrays);
    }
  }, [selectedRowIds]);

  // Listen for changes in pagination and use the state to fetch our new data
  useEffect(() => {
    if (onFetchData) {
      // onFetchData();
    }
  }, [onFetchData, pageIndex, pageSize]);

  const onResizeClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => event?.stopPropagation();

  const handleSelectRow = (row: Row<object>) => {
    if (onSelectRow) {
      if (row?.index === selectedRowIndex) {
        onSelectRow(null, null);
      } else onSelectRow(row?.index, row?.original);
    }
  };

  useEffect(() => {
    if (onResizedChange) {
      onResizedChange(state?.columnResizing);
    }
  }, [state?.columnResizing]);

  const handleDoubleClickRow = (row: Row<object>) => {
    if (onRowDoubleClick) {
      onRowDoubleClick(row?.original);
    }
  };

  return (
    <Spin
      spinning={loading}
      indicator={
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <LoadingOutlined style={{ fontSize: 24 }} spin />
          <span style={{ marginLeft: 12, fontSize: 14, color: 'black' }}>loading...</span>
        </span>
      }
    >
      <div className="sha-react-table">
        <table {...getTableProps()} className="sha-table">
          {columns?.length > 1 &&
            headerGroups.map(headerGroup => (
              <span
                {...headerGroup.getHeaderGroupProps({
                  // style: { paddingRight: '15px' },
                })}
                className={classNames('tr tr-head')}
              >
                {headerGroup?.headers?.map(column => {
                  return (
                    <span
                      key={nanoid()}
                      // {...column.getHeaderProps(headerProps)}
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className={classNames('th', {
                        'sorted-asc': column.isSorted && column.isSortedDesc,
                        'sorted-desc': column.isSorted && !column.isSortedDesc,
                      })}
                    >
                      {column.render('Header')}

                      {/* Use column.getResizerProps to hook up the events correctly */}
                      {column.canResize && (
                        <span
                          {...column.getResizerProps()}
                          className={classNames('resizer', { isResizing: column.isResizing })}
                          onClick={onResizeClick}
                        />
                      )}
                    </span>
                  );
                })}
              </span>
            ))}

          <span
            className="tbody"
            style={{
              height: scrollBodyHorizontally ? height || 250 : 'unset',
              overflowY: scrollBodyHorizontally ? 'auto' : 'unset',
            }}
            {...getTableBodyProps()}
          >
            {rows?.length === 0 && !loading && (
              <span className="sha-table-empty">
                <Empty description="There is no data for this table" />
              </span>
            )}

            {rows.map((row, rowIndex) => {
              prepareRow(row);

              return (
                <span
                  key={nanoid()}
                  onClick={() => handleSelectRow(row)}
                  onDoubleClick={() => handleDoubleClickRow(row)}
                  {...row.getRowProps()}
                  className={classNames(
                    'tr tr-body',
                    { 'tr-odd': rowIndex % 2 === 0 },
                    { 'sha-tr-selected': selectedRowIndex === row?.index }
                  )}
                >
                  {row.cells.map(cell => {
                    return (
                      <span key={nanoid()} {...cell.getCellProps(cellProps)} className="td">
                        {cell.render('Cell')}
                      </span>
                    );
                  })}
                </span>
              );
            })}
          </span>
        </table>
      </div>
    </Spin>
  );
};

export default ReactTable;
