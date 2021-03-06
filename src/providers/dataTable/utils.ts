import { evaluateComplexStringWithResult } from './../form/utils';
import { ColumnSorting, IStoredFilter, SortDirection } from './interfaces';
import { IMatchData } from '../form/utils';

// Filters should read properties as camelCase ?:(
export const evaluateDynamicFilters = (filters: IStoredFilter[], mappings: IMatchData[]) => {
  if (filters?.length === 0 || !mappings?.length) return filters;

  return filters.map(filter => {
    const expressionString = JSON.stringify(filter?.expression);

    if (expressionString?.includes('{{')) {
      const { result, success, unevaluatedExpressions } = evaluateComplexStringWithResult(expressionString, mappings);

      return {
        ...filter,
        expression: JSON.parse(result),
        allFieldsEvaluatedSuccessfully: success,
        unevaluatedExpressions,
      };
    }

    return filter;
  });
};

export const hasDynamicFilter = (filters: IStoredFilter[]) => {
  if (filters?.length === 0) return false;

  const found = filters?.find(({ expression }) => {
    const _expression = typeof expression === 'string' ? expression : JSON.stringify(expression);

    return _expression?.includes('{{') && _expression?.includes('}}');
  });

  return Boolean(found);
};

export const cleanPropertyName = (keyValue: string) => keyValue?.replace(/\./g, '_');

export const sortDirection2ColumnSorting = (value?: SortDirection): ColumnSorting => {
  switch (value) {
    case 0:
      return 'asc';
    case 1:
      return 'desc';
    default:
      return null;
  }
};
export const columnSorting2SortDirection = (value?: ColumnSorting): SortDirection => {
  switch (value) {
    case 'asc':
      return 0;
    case 'desc':
      return 1;
    default:
      return null;
  }
};
