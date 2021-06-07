/* Generated by restful-react */

import React from 'react';
import { Get, GetProps, useGet, UseGetProps } from 'restful-react';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

/**
 * Generic DTO of the simple autocomplete item
 */
export interface AutocompleteItemDto {
  value?: string | null;
  displayText?: string | null;
}

export interface ValidationErrorInfo {
  message?: string | null;
  members?: string[] | null;
}

export interface ErrorInfo {
  code?: number;
  message?: string | null;
  details?: string | null;
  validationErrors?: ValidationErrorInfo[] | null;
}

export interface AutocompleteItemDtoListAjaxResponse {
  result?: AutocompleteItemDto[] | null;
  targetUrl?: string | null;
  success?: boolean;
  error?: ErrorInfo;
  unAuthorizedRequest?: boolean;
  __abp?: boolean;
}

export interface AjaxResponseBase {
  targetUrl?: string | null;
  success?: boolean;
  error?: ErrorInfo;
  unAuthorizedRequest?: boolean;
  __abp?: boolean;
}

export interface AutocompleteListQueryParams {
  term?: string | null;
  typeShortAlias?: string | null;
  allowInherited?: boolean;
  selectedValue?: string | null;
}

export type AutocompleteListProps = Omit<
  GetProps<AutocompleteItemDtoListAjaxResponse, AjaxResponseBase, AutocompleteListQueryParams>,
  'path'
>;

export const AutocompleteList = (props: AutocompleteListProps) => (
  <Get<AutocompleteItemDtoListAjaxResponse, AjaxResponseBase, AutocompleteListQueryParams>
    path={`/api/Autocomplete/List`}
    {...props}
  />
);

export type UseAutocompleteListProps = Omit<
  UseGetProps<AutocompleteItemDtoListAjaxResponse, AutocompleteListQueryParams>,
  'path'
>;

export const useAutocompleteList = (props: UseAutocompleteListProps) =>
  useGet<AutocompleteItemDtoListAjaxResponse, AjaxResponseBase, AutocompleteListQueryParams>(
    `/api/Autocomplete/List`,
    props
  );