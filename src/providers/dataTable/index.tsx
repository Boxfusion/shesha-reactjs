import React, { FC, useContext, PropsWithChildren, useEffect, useRef } from 'react';
import useThunkReducer from 'react-hook-thunk-reducer';
import { dataTableReducer } from './reducer';
import axios from 'axios';
import FileSaver from 'file-saver';
import {
  DataTableActionsContext,
  DataTableStateContext,
  DATA_TABLE_CONTEXT_INITIAL_STATE,
  IDataTableStateContext,
  IDataTableUserConfig,
  DEFAULT_DT_USER_CONFIG,
  DEFAULT_TABLE_CONFIG_RESULT,
} from './contexts';
import { getFlagSetters } from '../utils/flagsSetters';
import {
  fetchTableConfigAction,
  fetchTableConfigSuccessAction,
  fetchTableDataAction,
  fetchTableDataSuccessAction,
  fetchTableDataErrorAction,
  setCurrentPageAction,
  changePageSizeAction,
  toggleColumnVisibilityAction,
  toggleColumnFilterAction,
  changeFilterOptionAction,
  changeFilterAction,
  applyFilterAction,
  changeQuickSearchAction,
  toggleSaveFilterModalAction,
  exportToExcelRequestAction,
  exportToExcelSuccessAction,
  exportToExcelErrorAction,
  /* NEW_ACTION_IMPORT_GOES_HERE */
  changeSelectedRowAction,
  changeSelectedStoredFilterIdsAction,
  setPredefinedFiltersAction,
  changeSelectedIdsAction,
  setCreateOrEditRowDataAction,
  updateLocalTableDataAction,
  deleteRowItemAction,
  registerConfigurableColumnsAction,
  fetchColumnsSuccessSuccessAction,
  setCrudConfigAction,
} from './actions';
import {
  ITableDataResponse,
  IndexColumnFilterOption,
  IGetDataPayload,
  ColumnFilter,
  IFilterItem,
  IEditableRowState,
  ICrudProps,
  IStoredFilter,
  ITableFilter,
  ITableCrudConfig,
} from './interfaces';
import { useMutate, useGet } from 'restful-react';
import _ from 'lodash';
import { GetColumnsInput, DataTableColumnDtoListAjaxResponse } from '../../apis/dataTable';
import { IResult } from '../../interfaces/result';
import { useLocalStorage } from '../../hooks';
import { useAuth } from '../auth';
import { nanoid } from 'nanoid/non-secure';
import { useDebouncedCallback } from 'use-debounce';
import {
  IConfigurableColumnsBase,
  IConfigurableColumnsProps,
  IDataColumnsProps,
} from '../datatableColumnsConfigurator/models';
import { useSheshaApplication } from '../sheshaApplication';

interface IDataTableProviderProps extends ICrudProps {
  /** Table configuration Id */
  tableId?: string;

  /** Type of entity */
  entityType?: string;

  /** Id of the user config, is used for saving of the user settings (sorting, paging etc) to the local storage. `tableId` is used if missing  */
  userConfigId?: string;

  /** Table title */
  title?: string;

  /** Id of the parent entity */
  parentEntityId?: string;

  /**
   * @deprecated pass this on an `IndexTable` level
   */
  onDblClick?: (data: any) => void;

  /**
   * @deprecated pass this on an `IndexTable` level
   */
  onSelectRow?: (index: number, row: any) => void;

  /**
   * Called when fetch data or refresh is complete is complete
   */
  onFetchDataSuccess?: () => void;

  /**
   * @deprecated pass this on an `IndexTable` level
   */
  selectedRow?: any;
  dataStamp?: number;
  getDataPath?: string;
  getExportToExcelPath?: string;
  defaultFilter?: IFilterItem[];
}

const DataTableProvider: FC<PropsWithChildren<IDataTableProviderProps>> = ({
  children,
  tableId,
  userConfigId,
  title,
  parentEntityId,
  onDblClick,
  onSelectRow,
  selectedRow,
  dataStamp,
  getDataPath,
  getExportToExcelPath,
  defaultFilter,
  entityType,
  onFetchDataSuccess,
}) => {
  const [state, dispatch] = useThunkReducer(dataTableReducer, {
    ...DATA_TABLE_CONTEXT_INITIAL_STATE,
    tableId,
    entityType,
    title,
    parentEntityId,
  });

  const { backendUrl } = useSheshaApplication();
  const tableIsReady = useRef(false);
  const { headers } = useAuth();

  const { mutate: fetchDataTableDataInternal } = useMutate<IResult<ITableDataResponse>>({
    verb: 'POST',
    path: getDataPath ?? '/api/DataTable/GetData',
    requestOptions: {
      headers,
    },
  });

  const fetchDataTableData = (payload: IGetDataPayload) => {
    // save current user configuration to local storage
    const userConfigToSave = {
      pageSize: payload.pageSize,
      currentPage: payload.currentPage,
      quickSearch: payload.quickSearch,
      columns: state.columns,
      tableSorting: payload.sorting,
      selectedStoredFilterIds: payload.selectedStoredFilterIds || state?.selectedStoredFilterIds,
      tableFilter: payload.filter,
    };

    setUserDTSettings(userConfigToSave);

    // convert filters
    const allFilters = [...(state.predefinedFilters || []), ...(state.storedFilters || [])];

    const filters = payload.selectedStoredFilterIds
      .map(id => allFilters.find(f => f.id === id))
      .filter(f => Boolean(f));

    const expandedPayload: IGetDataPayload = { ...payload, selectedFilters: filters };

    // Check against state.selectedStoredFilterIds as well
    if (filters?.length === 0 && state?.predefinedFilters?.length) {
      const foundSelectedFilter = state?.predefinedFilters?.find(({ defaultSelected }) => defaultSelected);

      if (foundSelectedFilter) {
        expandedPayload.selectedStoredFilterIds = [foundSelectedFilter?.id];
        expandedPayload.selectedFilters = [foundSelectedFilter];
      }
    }

    return fetchDataTableDataInternal(expandedPayload);
  };

  const { loading: isFetchingTableConfig, data: tableConfig, refetch: fetTableConfig } = useGet({
    lazy: true,
    queryParams: {
      id: tableId,
    },
    requestOptions: {
      headers,
    },
    path: '/api/DataTable/GetConfiguration',
  });

  const [userDTSettingsInner, setUserDTSettings] = useLocalStorage<IDataTableUserConfig>(userConfigId || tableId, null);
  const userDTSettings = defaultFilter
    ? { ...DEFAULT_DT_USER_CONFIG, tableFilter: defaultFilter }
    : userDTSettingsInner;

  // refresh table data on change of the `dataStamp` property
  useEffect(() => {
    if (dataStamp) {
      refreshTable();
    }
  }, [dataStamp]);

  const configIsReady =
    tableId && !isFetchingTableConfig && state.tableConfigLoaded && tableConfig && (state?.columns?.length || 0) > 0;

  // fetch table data when config is ready or something changed (selected filter, changed current page etc.)
  useEffect(() => {
    if (tableId) {
      // fetch using table config
      if (configIsReady) {
        tableIsReady.current = true; // is used to prevent unneeded data fetch by the ReactTable. Any data fetch requests before this line should be skipped
        refreshTable();
      }
    } else if (entityType) {
      // fecth using entity type
      tableIsReady.current = true; // is used to prevent unneeded data fetch by the ReactTable. Any data fetch requests before this line should be skipped
      refreshTable();
    }
  }, [
    state.tableFilter,
    state.currentPage,
    state.selectedStoredFilterIds,
    state.selectedPageSize,
    isFetchingTableConfig,
    state.tableConfigLoaded,
    state.entityType,
    state.columns,
  ]);

  const refreshTable = () => {
    if ((configIsReady || columnsAreReady) && tableIsReady.current === true) {
      fetchTableData();
    }
  };

  const debouncedFetch = useDebouncedCallback(
    (payload: any) => {
      fetchDataTableData(payload)
        .then(data => {
          if (onFetchDataSuccess && typeof onFetchDataSuccess === 'function') {
            onFetchDataSuccess();
          }
          dispatch(fetchTableDataSuccessAction(data.result));
        })
        .catch(e => {
          console.log(e);
          dispatch(fetchTableDataErrorAction());
        });
    },
    // delay in ms
    300
  );

  const columnsAreReady = !tableId && entityType && state?.columns?.length > 0;

  const fetchTableData = (payload?: IGetDataPayload) => {
    const internalPayload = {
      ...getFetchTableDataPayload(),
      ...(payload ?? {}),
      parentEntityId,
    };

    // note: we have two sources of the payload - ReactTable and our provider
    // so we have to save the payload on every fetch request but skip data fetch in some cases
    dispatch(fetchTableDataAction(internalPayload)); // todo: remove this line, it's needed just to save the Id

    if ((configIsReady || columnsAreReady) && tableIsReady.current === true) {
      debouncedFetch(internalPayload);
    }
  };

  // fetch table data when configuration is available
  useEffect(() => {
    if (!isFetchingTableConfig && tableConfig) {
      dispatch(
        fetchTableConfigSuccessAction({
          tableConfig: tableConfig.result ?? {
            id: tableId,
            ...DEFAULT_TABLE_CONFIG_RESULT,
          },
          userConfig: userDTSettings,
        })
      );

      //#region HACK - the value is not populated. I need to investigate why and remove this manual setting
      defaultFilter?.forEach(element => {
        changeFilter(element?.columnId, element?.filter);
      });
      //#endregion
    }
  }, [isFetchingTableConfig, tableConfig]);

  // fetch table config on first render
  useEffect(() => {
    if (tableId) fetTableConfig();
  }, [tableId]);

  useEffect(() => {
    // Save the settings whenever the columns change
    if (!_.isEmpty(userDTSettings) && state?.columns?.length > 0) {
      setUserDTSettings({
        ...userDTSettings,
        columns: state?.columns,
      });
    }
  }, [state?.columns]);

  const getFetchTableDataPayloadInternal = (localState: IDataTableStateContext): IGetDataPayload => {
    // Add default filter to table filter
    const filter = localState?.tableFilter || [];

    const properties = getDataProperties(localState.configurableColumns);

    const payload: IGetDataPayload = {
      id: tableId,
      entityType,
      properties,
      pageSize: localState.selectedPageSize,
      currentPage: localState.currentPage,
      sorting: localState.tableSorting,
      quickSearch: localState.quickSearch,
      filter, //state.tableFilter,
      parentEntityId,
      selectedStoredFilterIds: localState.selectedStoredFilterIds || [],
    };
    return payload;
  };

  const getFetchTableDataPayload = (): IGetDataPayload => {
    return getFetchTableDataPayloadInternal(state);
  };

  const exportToExcel = () => {
    const payload = getFetchTableDataPayload();

    dispatch(exportToExcelRequestAction());

    axios({
      url: `${backendUrl}` + (getExportToExcelPath ?? `/api/DataTable/ExportToExcel`),
      method: 'POST',
      data: payload,
      responseType: 'blob', // important
      headers,
    })
      .then(response => {
        dispatch(exportToExcelSuccessAction());
        FileSaver.saveAs(new Blob([response.data]), 'Export.xlsx');
      })
      .catch(() => {
        dispatch(exportToExcelErrorAction());
      });
  };

  const fetchTableConfig = (id: string) => dispatch(fetchTableConfigAction(id));

  const setCurrentPage = (val: number) => {
    dispatch(setCurrentPageAction(val));
  };

  const changePageSize = (val: number) => {
    dispatch(changePageSizeAction(val));
  };

  const toggleColumnVisibility = (columnId: string) => {
    dispatch(toggleColumnVisibilityAction(columnId));
  };

  const toggleColumnFilter = (ids: string[]) => dispatch(toggleColumnFilterAction(ids));

  const changeFilterOption = (filterColumnId: string, filterOptionValue: IndexColumnFilterOption) =>
    dispatch(changeFilterOptionAction({ filterColumnId, filterOptionValue }));

  const changeFilter = (filterColumnId: string, filterValue: ColumnFilter) =>
    dispatch(changeFilterAction({ filterColumnId, filterValue }));

  const applyFilters = () => {
    const { tableFilterDirty } = state;

    dispatch(applyFilterAction(tableFilterDirty));
  };

  /** change quick search text without refreshing of the table data */
  const changeQuickSearch = (val: string) => {
    dispatch(changeQuickSearchAction(val));
  };

  /** change quick search and refresh table data */
  const performQuickSearch = (val: string) => {
    // note: use thunk to get state after update
    dispatch((dispatchThunk, getState) => {
      dispatchThunk(changeQuickSearchAction(val));
      dispatchThunk(setCurrentPageAction(1));

      const payload = getFetchTableDataPayloadInternal(getState());
      fetchTableData(payload);
    });
  };

  const toggleSaveFilterModal = (visible: boolean) => {
    dispatch(toggleSaveFilterModalAction(visible));
  };

  const clearFilters = () => {
    if (Boolean(userDTSettings)) {
      const newUserSTSettings = { ...userDTSettings };
      delete newUserSTSettings.pageSize;
      delete newUserSTSettings.currentPage;
      delete newUserSTSettings.quickSearch;
      delete newUserSTSettings.tableFilter;

      setUserDTSettings(newUserSTSettings);
    }

    dispatch(toggleColumnFilterAction([]));
    dispatch(applyFilterAction([]));
  };

  const changeSelectedRow = (val: number) => {
    dispatch(changeSelectedRowAction(val));
  };

  const changeSelectedStoredFilterIds = (selectedStoredFilterIds: string[]) => {
    dispatch(changeSelectedStoredFilterIdsAction(selectedStoredFilterIds));
  };

  const setPredefinedFilters = (filters: IStoredFilter[]) => {
    dispatch(setPredefinedFiltersAction(filters));
  };

  const changeSelectedIds = (selectedIds: string[]) => {
    dispatch(changeSelectedIdsAction(selectedIds));
  };

  const initializeNewDataCreation = () => {
    const id = nanoid();

    const data = { Id: '' };

    state?.columns?.forEach(column => {
      switch (column.dataType) {
        case 'boolean':
          data[column.accessor] = false;
          break;
        case 'date':
        case 'string':
          data[column.accessor] = '';
          break;
        case 'number':
          data[column.accessor] = 0;
          break;
        case 'refList':
          data[column.accessor] = { item: null, itemValue: null };
          break;
        case 'entityReference':
          data[column.accessor] = { id: null, displayText: null };
          break;
        case 'multiValueRefList':
          data[column.accessor] = [];
          break;
        default:
          break;
      }
    });

    data.Id = id;

    setCrudRowData({
      id,
      data,
      mode: 'create',
    });
  };

  /**
   *
   * @param newOrEditableRowData - data to update. If empty, it'll initialize new item creation
   */
  const setCrudRowData = (newOrEditableRowData?: IEditableRowState) => {
    if (newOrEditableRowData && typeof newOrEditableRowData !== 'function') {
      dispatch(setCreateOrEditRowDataAction(newOrEditableRowData));
    } else {
      initializeNewDataCreation();
    }
  };

  const cancelCreateOrEditRowData = () => {
    dispatch(setCreateOrEditRowDataAction(null));
  };

  const updateLocalTableData = () => {
    dispatch(updateLocalTableDataAction());
  };

  const deleteRowItem = (idOfItemToDeleteOrUpdate: string) => {
    dispatch(deleteRowItemAction(idOfItemToDeleteOrUpdate));
  };

  const getDataProperties = (columns: IConfigurableColumnsBase[]) => {
    const dataFields = columns.filter(
      c =>
        c.itemType === 'item' &&
        (c as IConfigurableColumnsProps).columnType === 'data' &&
        Boolean((c as IDataColumnsProps).propertyName)
    ) as IDataColumnsProps[];

    const properties = dataFields.map(f => f.propertyName);

    return properties;
  };

  useEffect(() => {
    const { configurableColumns } = state;
    if (!entityType) return;

    const properties = getDataProperties(configurableColumns);
    if (properties.length === 0) {
      // don't fetch data from server when properties is empty
      dispatch(fetchColumnsSuccessSuccessAction({ columns: [], configurableColumns, userConfig: userDTSettings }));
      return;
    }

    // fetch columns config from server
    const getColumnsPayload: GetColumnsInput = {
      entityType,
      properties,
    };

    axios({
      method: 'POST',
      url: `${backendUrl}/api/DataTable/GetColumns`,
      data: getColumnsPayload,
      headers,
    })
      .then(response => {
        const responseData = response.data as DataTableColumnDtoListAjaxResponse;

        if (responseData.success) {
          dispatch(
            fetchColumnsSuccessSuccessAction({
              columns: responseData.result,
              configurableColumns,
              userConfig: userDTSettings,
            })
          );
        }
      })
      .catch(e => {
        console.log(e);
        //dispatch(exportToExcelErrorAction());
      });
  }, [state.configurableColumns, state.entityType]);

  const registerConfigurableColumns = (ownerId: string, columns: IConfigurableColumnsBase[]) => {
    dispatch(registerConfigurableColumnsAction({ ownerId, columns }));
  };

  const getCurrentFilter = (): ITableFilter[] => {
    return state.tableFilterDirty || state.tableFilter || [];
  };

  const getDataSourceType = () => {
    return !tableId && entityType ? 'entity' : 'tableConfig';
  };

  const setCrudConfig = (config: ITableCrudConfig) => {
    dispatch(setCrudConfigAction(config));
  };

  /* NEW_ACTION_DECLARATION_GOES_HERE */

  return (
    <DataTableStateContext.Provider value={{ ...state, onDblClick, onSelectRow, selectedRow }}>
      <DataTableActionsContext.Provider
        value={{
          ...getFlagSetters(dispatch),
          fetchTableConfig,
          fetchTableData,
          setCurrentPage,
          changePageSize,
          toggleColumnVisibility,
          toggleColumnFilter,
          changeFilterOption,
          changeFilter,
          applyFilters,
          clearFilters,
          getDataPayload: getFetchTableDataPayload,
          exportToExcel,
          changeQuickSearch,
          performQuickSearch,
          toggleSaveFilterModal,
          changeSelectedRow,
          changeSelectedStoredFilterIds,
          setPredefinedFilters,
          changeSelectedIds,
          refreshTable,
          setCrudRowData,
          cancelCreateOrEditRowData,
          updateLocalTableData,
          deleteRowItem,
          registerConfigurableColumns,
          getCurrentFilter,
          getDataSourceType,
          setCrudConfig,
          /* NEW_ACTION_GOES_HERE */
        }}
      >
        {children}
      </DataTableActionsContext.Provider>
    </DataTableStateContext.Provider>
  );
};

function useDataTableState() {
  const context = useContext(DataTableStateContext);

  if (context === undefined) {
    throw new Error('useDataTableState must be used within a DataTableProvider');
  }

  return context;
}

function useDataTableActions() {
  const context = useContext(DataTableActionsContext);

  if (context === undefined) {
    throw new Error('useDataTableActions must be used within a DataTableProvider');
  }

  return context;
}

function useDataTableStore() {
  return { ...useDataTableState(), ...useDataTableActions() };
}

const useDataTable = useDataTableStore;

export default DataTableProvider;

export { DataTableProvider, useDataTableState, useDataTableActions, useDataTable, useDataTableStore };
