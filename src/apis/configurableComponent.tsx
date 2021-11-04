/* Generated by restful-react */

import React from 'react';
import { Get, GetProps, useGet, UseGetProps, Mutate, MutateProps, useMutate, UseMutateProps } from 'restful-react';

import * as RestfulShesha from '../utils/fetchers';
export const SPEC_VERSION = 'v1';
export interface ConfigurableComponentDto {
  id?: string;
  path?: string | null;
  name?: string | null;
  description?: string | null;
  settings?: string | null;
  modelType?: string | null;
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

export interface ConfigurableComponentDtoAjaxResponse {
  targetUrl?: string | null;
  success?: boolean;
  error?: ErrorInfo;
  unAuthorizedRequest?: boolean;
  __abp?: boolean;
  result?: ConfigurableComponentDto;
}

export interface AjaxResponseBase {
  targetUrl?: string | null;
  success?: boolean;
  error?: ErrorInfo;
  unAuthorizedRequest?: boolean;
  __abp?: boolean;
}

export interface ConfigurableComponentUpdateSettingsInput {
  id?: string;
  settings?: string | null;
}

export interface ConfigurableComponentGetQueryParams {
  /**
   * The requested API version
   */
  'api-version'?: string;
}

export interface ConfigurableComponentGetPathParams {
  id: string;
}

export type ConfigurableComponentGetProps = Omit<
  GetProps<
    ConfigurableComponentDtoAjaxResponse,
    AjaxResponseBase,
    ConfigurableComponentGetQueryParams,
    ConfigurableComponentGetPathParams
  >,
  'path'
> &
  ConfigurableComponentGetPathParams;

export const ConfigurableComponentGet = ({ id, ...props }: ConfigurableComponentGetProps) => (
  <Get<
    ConfigurableComponentDtoAjaxResponse,
    AjaxResponseBase,
    ConfigurableComponentGetQueryParams,
    ConfigurableComponentGetPathParams
  >
    path={`/api/services/ConfigurableComponents/${id}`}
    {...props}
  />
);

export type UseConfigurableComponentGetProps = Omit<
  UseGetProps<
    ConfigurableComponentDtoAjaxResponse,
    AjaxResponseBase,
    ConfigurableComponentGetQueryParams,
    ConfigurableComponentGetPathParams
  >,
  'path'
> &
  ConfigurableComponentGetPathParams;

export const useConfigurableComponentGet = ({ id, ...props }: UseConfigurableComponentGetProps) =>
  useGet<
    ConfigurableComponentDtoAjaxResponse,
    AjaxResponseBase,
    ConfigurableComponentGetQueryParams,
    ConfigurableComponentGetPathParams
  >((paramsInPath: ConfigurableComponentGetPathParams) => `/api/services/ConfigurableComponents/${paramsInPath.id}`, {
    pathParams: { id },
    ...props,
  });

export const configurableComponentGet = (
  {
    id,
    ...props
  }: RestfulShesha.GetProps<
    ConfigurableComponentDtoAjaxResponse,
    AjaxResponseBase,
    ConfigurableComponentGetQueryParams,
    ConfigurableComponentGetPathParams
  > & { id: string },
  signal?: RequestInit['signal']
) =>
  RestfulShesha.get<
    ConfigurableComponentDtoAjaxResponse,
    AjaxResponseBase,
    ConfigurableComponentGetQueryParams,
    ConfigurableComponentGetPathParams
  >(`/api/services/ConfigurableComponents/${id}`, props, signal);

export interface ConfigurableComponentUpdateQueryParams {
  /**
   * The requested API version
   */
  'api-version'?: string;
}

export type ConfigurableComponentUpdateProps = Omit<
  MutateProps<
    ConfigurableComponentDtoAjaxResponse,
    AjaxResponseBase,
    ConfigurableComponentUpdateQueryParams,
    ConfigurableComponentDto,
    void
  >,
  'path' | 'verb'
>;

export const ConfigurableComponentUpdate = (props: ConfigurableComponentUpdateProps) => (
  <Mutate<
    ConfigurableComponentDtoAjaxResponse,
    AjaxResponseBase,
    ConfigurableComponentUpdateQueryParams,
    ConfigurableComponentDto,
    void
  >
    verb="PUT"
    path={`/api/services/ConfigurableComponents`}
    {...props}
  />
);

export type UseConfigurableComponentUpdateProps = Omit<
  UseMutateProps<
    ConfigurableComponentDtoAjaxResponse,
    AjaxResponseBase,
    ConfigurableComponentUpdateQueryParams,
    ConfigurableComponentDto,
    void
  >,
  'path' | 'verb'
>;

export const useConfigurableComponentUpdate = (props: UseConfigurableComponentUpdateProps) =>
  useMutate<
    ConfigurableComponentDtoAjaxResponse,
    AjaxResponseBase,
    ConfigurableComponentUpdateQueryParams,
    ConfigurableComponentDto,
    void
  >('PUT', `/api/services/ConfigurableComponents`, props);

export const configurableComponentUpdate = (
  props: RestfulShesha.MutateProps<
    ConfigurableComponentDtoAjaxResponse,
    AjaxResponseBase,
    ConfigurableComponentUpdateQueryParams,
    ConfigurableComponentDto,
    void
  >,
  signal?: RequestInit['signal']
) =>
  RestfulShesha.mutate<
    ConfigurableComponentDtoAjaxResponse,
    AjaxResponseBase,
    ConfigurableComponentUpdateQueryParams,
    ConfigurableComponentDto,
    void
  >('PUT', `/api/services/ConfigurableComponents`, props, signal);

export interface ConfigurableComponentCreateQueryParams {
  /**
   * The requested API version
   */
  'api-version'?: string;
}

export type ConfigurableComponentCreateProps = Omit<
  MutateProps<
    ConfigurableComponentDtoAjaxResponse,
    AjaxResponseBase,
    ConfigurableComponentCreateQueryParams,
    ConfigurableComponentDto,
    void
  >,
  'path' | 'verb'
>;

export const ConfigurableComponentCreate = (props: ConfigurableComponentCreateProps) => (
  <Mutate<
    ConfigurableComponentDtoAjaxResponse,
    AjaxResponseBase,
    ConfigurableComponentCreateQueryParams,
    ConfigurableComponentDto,
    void
  >
    verb="POST"
    path={`/api/services/ConfigurableComponents`}
    {...props}
  />
);

export type UseConfigurableComponentCreateProps = Omit<
  UseMutateProps<
    ConfigurableComponentDtoAjaxResponse,
    AjaxResponseBase,
    ConfigurableComponentCreateQueryParams,
    ConfigurableComponentDto,
    void
  >,
  'path' | 'verb'
>;

export const useConfigurableComponentCreate = (props: UseConfigurableComponentCreateProps) =>
  useMutate<
    ConfigurableComponentDtoAjaxResponse,
    AjaxResponseBase,
    ConfigurableComponentCreateQueryParams,
    ConfigurableComponentDto,
    void
  >('POST', `/api/services/ConfigurableComponents`, props);

export const configurableComponentCreate = (
  props: RestfulShesha.MutateProps<
    ConfigurableComponentDtoAjaxResponse,
    AjaxResponseBase,
    ConfigurableComponentCreateQueryParams,
    ConfigurableComponentDto,
    void
  >,
  signal?: RequestInit['signal']
) =>
  RestfulShesha.mutate<
    ConfigurableComponentDtoAjaxResponse,
    AjaxResponseBase,
    ConfigurableComponentCreateQueryParams,
    ConfigurableComponentDto,
    void
  >('POST', `/api/services/ConfigurableComponents`, props, signal);

export interface ConfigurableComponentUpdateSettingsQueryParams {
  /**
   * The requested API version
   */
  'api-version'?: string;
}

export interface ConfigurableComponentUpdateSettingsPathParams {
  id: string;
}

export type ConfigurableComponentUpdateSettingsProps = Omit<
  MutateProps<
    void,
    unknown,
    ConfigurableComponentUpdateSettingsQueryParams,
    ConfigurableComponentUpdateSettingsInput,
    ConfigurableComponentUpdateSettingsPathParams
  >,
  'path' | 'verb'
> &
  ConfigurableComponentUpdateSettingsPathParams;

export const ConfigurableComponentUpdateSettings = ({ id, ...props }: ConfigurableComponentUpdateSettingsProps) => (
  <Mutate<
    void,
    unknown,
    ConfigurableComponentUpdateSettingsQueryParams,
    ConfigurableComponentUpdateSettingsInput,
    ConfigurableComponentUpdateSettingsPathParams
  >
    verb="PUT"
    path={`/api/services/ConfigurableComponents/${id}/Settings`}
    {...props}
  />
);

export type UseConfigurableComponentUpdateSettingsProps = Omit<
  UseMutateProps<
    void,
    unknown,
    ConfigurableComponentUpdateSettingsQueryParams,
    ConfigurableComponentUpdateSettingsInput,
    ConfigurableComponentUpdateSettingsPathParams
  >,
  'path' | 'verb'
> &
  ConfigurableComponentUpdateSettingsPathParams;

export const useConfigurableComponentUpdateSettings = ({ id, ...props }: UseConfigurableComponentUpdateSettingsProps) =>
  useMutate<
    void,
    unknown,
    ConfigurableComponentUpdateSettingsQueryParams,
    ConfigurableComponentUpdateSettingsInput,
    ConfigurableComponentUpdateSettingsPathParams
  >(
    'PUT',
    (paramsInPath: ConfigurableComponentUpdateSettingsPathParams) =>
      `/api/services/ConfigurableComponents/${paramsInPath.id}/Settings`,
    { pathParams: { id }, ...props }
  );

export const configurableComponentUpdateSettings = (
  {
    id,
    ...props
  }: RestfulShesha.MutateProps<
    void,
    unknown,
    ConfigurableComponentUpdateSettingsQueryParams,
    ConfigurableComponentUpdateSettingsInput,
    ConfigurableComponentUpdateSettingsPathParams
  > & { id: string },
  signal?: RequestInit['signal']
) =>
  RestfulShesha.mutate<
    void,
    unknown,
    ConfigurableComponentUpdateSettingsQueryParams,
    ConfigurableComponentUpdateSettingsInput,
    ConfigurableComponentUpdateSettingsPathParams
  >('PUT', `/api/services/ConfigurableComponents/${id}/Settings`, props, signal);
