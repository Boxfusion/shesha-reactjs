/* Generated by restful-react */

import React from 'react';
import { Get, GetProps, useGet, UseGetProps, Mutate, MutateProps, useMutate, UseMutateProps } from 'restful-react';
export const SPEC_VERSION = 'v1';
/**
 * Province Dto
 */
export interface ProvinceDto {
  id?: string;
  name?: string | null;
  comments?: string | null;
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

export interface ProvinceDtoAjaxResponse {
  targetUrl?: string | null;
  success?: boolean;
  error?: ErrorInfo;
  unAuthorizedRequest?: boolean;
  __abp?: boolean;
  result?: ProvinceDto;
}

export interface AjaxResponseBase {
  targetUrl?: string | null;
  success?: boolean;
  error?: ErrorInfo;
  unAuthorizedRequest?: boolean;
  __abp?: boolean;
}

export interface ProvinceDtoPagedResultDto {
  items?: ProvinceDto[] | null;
  totalCount?: number;
}

export interface ProvinceDtoPagedResultDtoAjaxResponse {
  targetUrl?: string | null;
  success?: boolean;
  error?: ErrorInfo;
  unAuthorizedRequest?: boolean;
  __abp?: boolean;
  result?: ProvinceDtoPagedResultDto;
}

export interface ProvinceUpdateQueryParams {
  /**
   * The requested API version
   */
  'api-version'?: string;
}

export type ProvinceUpdateProps = Omit<
  MutateProps<ProvinceDtoAjaxResponse, AjaxResponseBase, ProvinceUpdateQueryParams, ProvinceDto, void>,
  'path' | 'verb'
>;

export const ProvinceUpdate = (props: ProvinceUpdateProps) => (
  <Mutate<ProvinceDtoAjaxResponse, AjaxResponseBase, ProvinceUpdateQueryParams, ProvinceDto, void>
    verb="PUT"
    path={`/api/services/dsdNpo/Province/Update`}
    {...props}
  />
);

export type UseProvinceUpdateProps = Omit<
  UseMutateProps<ProvinceDtoAjaxResponse, AjaxResponseBase, ProvinceUpdateQueryParams, ProvinceDto, void>,
  'path' | 'verb'
>;

export const useProvinceUpdate = (props: UseProvinceUpdateProps) =>
  useMutate<ProvinceDtoAjaxResponse, AjaxResponseBase, ProvinceUpdateQueryParams, ProvinceDto, void>(
    'PUT',
    `/api/services/dsdNpo/Province/Update`,
    props
  );

export interface ProvinceGetQueryParams {
  id?: string;
  /**
   * The requested API version
   */
  'api-version'?: string;
}

export type ProvinceGetProps = Omit<
  GetProps<ProvinceDtoAjaxResponse, AjaxResponseBase, ProvinceGetQueryParams, void>,
  'path'
>;

export const ProvinceGet = (props: ProvinceGetProps) => (
  <Get<ProvinceDtoAjaxResponse, AjaxResponseBase, ProvinceGetQueryParams, void>
    path={`/api/services/dsdNpo/Province/Get`}
    {...props}
  />
);

export type UseProvinceGetProps = Omit<
  UseGetProps<ProvinceDtoAjaxResponse, AjaxResponseBase, ProvinceGetQueryParams, void>,
  'path'
>;

export const useProvinceGet = (props: UseProvinceGetProps) =>
  useGet<ProvinceDtoAjaxResponse, AjaxResponseBase, ProvinceGetQueryParams, void>(
    `/api/services/dsdNpo/Province/Get`,
    props
  );

export interface ProvinceGetAllQueryParams {
  sorting?: string | null;
  skipCount?: number;
  maxResultCount?: number;
  /**
   * The requested API version
   */
  'api-version'?: string;
}

export type ProvinceGetAllProps = Omit<
  GetProps<ProvinceDtoPagedResultDtoAjaxResponse, AjaxResponseBase, ProvinceGetAllQueryParams, void>,
  'path'
>;

export const ProvinceGetAll = (props: ProvinceGetAllProps) => (
  <Get<ProvinceDtoPagedResultDtoAjaxResponse, AjaxResponseBase, ProvinceGetAllQueryParams, void>
    path={`/api/services/dsdNpo/Province/GetAll`}
    {...props}
  />
);

export type UseProvinceGetAllProps = Omit<
  UseGetProps<ProvinceDtoPagedResultDtoAjaxResponse, AjaxResponseBase, ProvinceGetAllQueryParams, void>,
  'path'
>;

export const useProvinceGetAll = (props: UseProvinceGetAllProps) =>
  useGet<ProvinceDtoPagedResultDtoAjaxResponse, AjaxResponseBase, ProvinceGetAllQueryParams, void>(
    `/api/services/dsdNpo/Province/GetAll`,
    props
  );

export interface ProvinceCreateQueryParams {
  /**
   * The requested API version
   */
  'api-version'?: string;
}

export type ProvinceCreateProps = Omit<
  MutateProps<ProvinceDtoAjaxResponse, AjaxResponseBase, ProvinceCreateQueryParams, ProvinceDto, void>,
  'path' | 'verb'
>;

export const ProvinceCreate = (props: ProvinceCreateProps) => (
  <Mutate<ProvinceDtoAjaxResponse, AjaxResponseBase, ProvinceCreateQueryParams, ProvinceDto, void>
    verb="POST"
    path={`/api/services/dsdNpo/Province/Create`}
    {...props}
  />
);

export type UseProvinceCreateProps = Omit<
  UseMutateProps<ProvinceDtoAjaxResponse, AjaxResponseBase, ProvinceCreateQueryParams, ProvinceDto, void>,
  'path' | 'verb'
>;

export const useProvinceCreate = (props: UseProvinceCreateProps) =>
  useMutate<ProvinceDtoAjaxResponse, AjaxResponseBase, ProvinceCreateQueryParams, ProvinceDto, void>(
    'POST',
    `/api/services/dsdNpo/Province/Create`,
    props
  );

export interface ProvinceDeleteQueryParams {
  id?: string;
  /**
   * The requested API version
   */
  'api-version'?: string;
}

export type ProvinceDeleteProps = Omit<
  MutateProps<void, unknown, ProvinceDeleteQueryParams, void, void>,
  'path' | 'verb'
>;

export const ProvinceDelete = (props: ProvinceDeleteProps) => (
  <Mutate<void, unknown, ProvinceDeleteQueryParams, void, void>
    verb="DELETE"
    path={`/api/services/dsdNpo/Province/Delete`}
    {...props}
  />
);

export type UseProvinceDeleteProps = Omit<
  UseMutateProps<void, unknown, ProvinceDeleteQueryParams, void, void>,
  'path' | 'verb'
>;

export const useProvinceDelete = (props: UseProvinceDeleteProps) =>
  useMutate<void, unknown, ProvinceDeleteQueryParams, void, void>('DELETE', `/api/services/dsdNpo/Province/Delete`, {
    ...props,
  });
