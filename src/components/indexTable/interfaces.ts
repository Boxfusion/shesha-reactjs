import { IndexColumnDataType } from './../../providers/dataTable/interfaces';
import { ReactNode } from 'react';
import { ICrudProps, IDataTableInstance } from '../../providers/dataTable/interfaces';

export type TableActionColumnType = 'create' | 'read' | 'update' | 'delete' | 'cancel'; // CRUD and cancel

export interface ITableActionColumns {
  icon?: ReactNode;
  type?: TableActionColumnType;
  onClick?: (id: string, context: IDataTableInstance) => string | void | Promise<any>;
}

export interface ITableCustomTypesRender {
  key: string;
  render: (data: any) => ReactNode;
}

export interface ITableCustomTypeEditor {
  key: string;
  property: string;
  render: (data: IColumnEditFieldProps) => ReactNode;
}

export interface IColumnEditFieldProps {
  id: string;
  name: string;
  caption?: string;
  referenceListName?: string;
  referenceListNamespace?: string;
  entityReferenceTypeShortAlias?: string;
  dataType: IndexColumnDataType;
  value?: any;
  onChange: (key: string, value: any) => void;
}

export interface IShaDataTableProps extends ICrudProps {
  id: string;
  useMultiselect?: boolean;
  disableCustomFilters?: boolean;
  actionColumns?: ITableActionColumns[];
  /**
   * @deprecated pass this on an `IndexTableProvider` level
   */

  header?: string;
  deleteConfirmationMessage?: string;
  selectedRowIndex?: number;
  onSelectRow?: (index: number, row: any) => void;
  onDblClick?: (data: any) => void;
  customTypeRenders?: ITableCustomTypesRender[];
  customTypeEditors?: ITableCustomTypeEditor[];
  onRowsChanged?: (rows: object[]) => void;
}