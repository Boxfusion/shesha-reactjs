/* Generated by restful-react */

import React from 'react';
import { Get, GetProps, useGet, UseGetProps, Mutate, MutateProps, useMutate, UseMutateProps } from 'restful-react';
export const SPEC_VERSION = 'v1';
export interface GuidNullableEntityWithDisplayNameDto {
  id?: string | null;
  displayText?: string | null;
}

export interface GuidEntityWithDisplayNameDto {
  id?: string;
  displayText?: string | null;
}

export interface CreateShaRoleAppointedPersonDto {
  roleId?: string;
  person?: GuidNullableEntityWithDisplayNameDto;
  regions?: GuidEntityWithDisplayNameDto[] | null;
}

export interface ShaRoleAppointedPersonDto {
  id?: string;
  roleId?: string;
  person?: GuidNullableEntityWithDisplayNameDto;
  regions?: GuidEntityWithDisplayNameDto[] | null;
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

export interface ShaRoleAppointedPersonDtoAjaxResponse {
  targetUrl?: string | null;
  success?: boolean;
  error?: ErrorInfo;
  unAuthorizedRequest?: boolean;
  __abp?: boolean;
  result?: ShaRoleAppointedPersonDto;
}

export interface AjaxResponseBase {
  targetUrl?: string | null;
  success?: boolean;
  error?: ErrorInfo;
  unAuthorizedRequest?: boolean;
  __abp?: boolean;
}

export interface GuidEntityDto {
  id?: string;
}

export interface ShaRoleAppointedPersonDtoPagedResultDto {
  items?: ShaRoleAppointedPersonDto[] | null;
  totalCount?: number;
}

export interface ShaRoleAppointedPersonDtoPagedResultDtoAjaxResponse {
  targetUrl?: string | null;
  success?: boolean;
  error?: ErrorInfo;
  unAuthorizedRequest?: boolean;
  __abp?: boolean;
  result?: ShaRoleAppointedPersonDtoPagedResultDto;
}

export interface ShaRoleAppointedPersonCreateQueryParams {
  /**
   * The requested API version
   */
  'api-version'?: string;
}

export type ShaRoleAppointedPersonCreateProps = Omit<
  MutateProps<
    ShaRoleAppointedPersonDtoAjaxResponse,
    AjaxResponseBase,
    ShaRoleAppointedPersonCreateQueryParams,
    CreateShaRoleAppointedPersonDto,
    void
  >,
  'path' | 'verb'
>;

export const ShaRoleAppointedPersonCreate = (props: ShaRoleAppointedPersonCreateProps) => (
  <Mutate<
    ShaRoleAppointedPersonDtoAjaxResponse,
    AjaxResponseBase,
    ShaRoleAppointedPersonCreateQueryParams,
    CreateShaRoleAppointedPersonDto,
    void
  >
    verb="POST"
    path={`/api/services/app/ShaRoleAppointedPerson/Create`}
    {...props}
  />
);

export type UseShaRoleAppointedPersonCreateProps = Omit<
  UseMutateProps<
    ShaRoleAppointedPersonDtoAjaxResponse,
    AjaxResponseBase,
    ShaRoleAppointedPersonCreateQueryParams,
    CreateShaRoleAppointedPersonDto,
    void
  >,
  'path' | 'verb'
>;

export const useShaRoleAppointedPersonCreate = (props: UseShaRoleAppointedPersonCreateProps) =>
  useMutate<
    ShaRoleAppointedPersonDtoAjaxResponse,
    AjaxResponseBase,
    ShaRoleAppointedPersonCreateQueryParams,
    CreateShaRoleAppointedPersonDto,
    void
  >('POST', `/api/services/app/ShaRoleAppointedPerson/Create`, props);

export interface ShaRoleAppointedPersonUpdateQueryParams {
  /**
   * The requested API version
   */
  'api-version'?: string;
}

export type ShaRoleAppointedPersonUpdateProps = Omit<
  MutateProps<
    ShaRoleAppointedPersonDtoAjaxResponse,
    AjaxResponseBase,
    ShaRoleAppointedPersonUpdateQueryParams,
    ShaRoleAppointedPersonDto,
    void
  >,
  'path' | 'verb'
>;

export const ShaRoleAppointedPersonUpdate = (props: ShaRoleAppointedPersonUpdateProps) => (
  <Mutate<
    ShaRoleAppointedPersonDtoAjaxResponse,
    AjaxResponseBase,
    ShaRoleAppointedPersonUpdateQueryParams,
    ShaRoleAppointedPersonDto,
    void
  >
    verb="PUT"
    path={`/api/services/app/ShaRoleAppointedPerson/Update`}
    {...props}
  />
);

export type UseShaRoleAppointedPersonUpdateProps = Omit<
  UseMutateProps<
    ShaRoleAppointedPersonDtoAjaxResponse,
    AjaxResponseBase,
    ShaRoleAppointedPersonUpdateQueryParams,
    ShaRoleAppointedPersonDto,
    void
  >,
  'path' | 'verb'
>;

export const useShaRoleAppointedPersonUpdate = (props: UseShaRoleAppointedPersonUpdateProps) =>
  useMutate<
    ShaRoleAppointedPersonDtoAjaxResponse,
    AjaxResponseBase,
    ShaRoleAppointedPersonUpdateQueryParams,
    ShaRoleAppointedPersonDto,
    void
  >('PUT', `/api/services/app/ShaRoleAppointedPerson/Update`, props);

export interface ShaRoleAppointedPersonDeleteQueryParams {
  /**
   * The requested API version
   */
  'api-version'?: string;
}

export type ShaRoleAppointedPersonDeleteProps = Omit<
  MutateProps<void, unknown, ShaRoleAppointedPersonDeleteQueryParams, GuidEntityDto, void>,
  'path' | 'verb'
>;

export const ShaRoleAppointedPersonDelete = (props: ShaRoleAppointedPersonDeleteProps) => (
  <Mutate<void, unknown, ShaRoleAppointedPersonDeleteQueryParams, GuidEntityDto, void>
    verb="POST"
    path={`/api/services/app/ShaRoleAppointedPerson/Delete`}
    {...props}
  />
);

export type UseShaRoleAppointedPersonDeleteProps = Omit<
  UseMutateProps<void, unknown, ShaRoleAppointedPersonDeleteQueryParams, GuidEntityDto, void>,
  'path' | 'verb'
>;

export const useShaRoleAppointedPersonDelete = (props: UseShaRoleAppointedPersonDeleteProps) =>
  useMutate<void, unknown, ShaRoleAppointedPersonDeleteQueryParams, GuidEntityDto, void>(
    'POST',
    `/api/services/app/ShaRoleAppointedPerson/Delete`,
    props
  );

export interface ShaRoleAppointedPersonGetQueryParams {
  id?: string;
  /**
   * The requested API version
   */
  'api-version'?: string;
}

export type ShaRoleAppointedPersonGetProps = Omit<
  GetProps<ShaRoleAppointedPersonDtoAjaxResponse, AjaxResponseBase, ShaRoleAppointedPersonGetQueryParams, void>,
  'path'
>;

export const ShaRoleAppointedPersonGet = (props: ShaRoleAppointedPersonGetProps) => (
  <Get<ShaRoleAppointedPersonDtoAjaxResponse, AjaxResponseBase, ShaRoleAppointedPersonGetQueryParams, void>
    path={`/api/services/app/ShaRoleAppointedPerson/Get`}
    {...props}
  />
);

export type UseShaRoleAppointedPersonGetProps = Omit<
  UseGetProps<ShaRoleAppointedPersonDtoAjaxResponse, AjaxResponseBase, ShaRoleAppointedPersonGetQueryParams, void>,
  'path'
>;

export const useShaRoleAppointedPersonGet = (props: UseShaRoleAppointedPersonGetProps) =>
  useGet<ShaRoleAppointedPersonDtoAjaxResponse, AjaxResponseBase, ShaRoleAppointedPersonGetQueryParams, void>(
    `/api/services/app/ShaRoleAppointedPerson/Get`,
    props
  );

export interface ShaRoleAppointedPersonGetAllQueryParams {
  keyword?: string | null;
  skipCount?: number;
  maxResultCount?: number;
  /**
   * The requested API version
   */
  'api-version'?: string;
}

export type ShaRoleAppointedPersonGetAllProps = Omit<
  GetProps<
    ShaRoleAppointedPersonDtoPagedResultDtoAjaxResponse,
    AjaxResponseBase,
    ShaRoleAppointedPersonGetAllQueryParams,
    void
  >,
  'path'
>;

export const ShaRoleAppointedPersonGetAll = (props: ShaRoleAppointedPersonGetAllProps) => (
  <Get<
    ShaRoleAppointedPersonDtoPagedResultDtoAjaxResponse,
    AjaxResponseBase,
    ShaRoleAppointedPersonGetAllQueryParams,
    void
  >
    path={`/api/services/app/ShaRoleAppointedPerson/GetAll`}
    {...props}
  />
);

export type UseShaRoleAppointedPersonGetAllProps = Omit<
  UseGetProps<
    ShaRoleAppointedPersonDtoPagedResultDtoAjaxResponse,
    AjaxResponseBase,
    ShaRoleAppointedPersonGetAllQueryParams,
    void
  >,
  'path'
>;

export const useShaRoleAppointedPersonGetAll = (props: UseShaRoleAppointedPersonGetAllProps) =>
  useGet<
    ShaRoleAppointedPersonDtoPagedResultDtoAjaxResponse,
    AjaxResponseBase,
    ShaRoleAppointedPersonGetAllQueryParams,
    void
  >(`/api/services/app/ShaRoleAppointedPerson/GetAll`, props);
