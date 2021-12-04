/* Generated by restful-react */

import React from 'react';
import { Get, GetProps, useGet, UseGetProps, Mutate, MutateProps, useMutate, UseMutateProps } from 'restful-react';

import * as RestfulShesha from '../utils/fetchers';
export const SPEC_VERSION = 'v1';
export interface ApplicationInfoDto {
  version?: string | null;
  releaseDate?: string;
  features?: {
    [key: string]: boolean;
  } | null;
}

export interface UserLoginInfoDto {
  id?: number;
  accountFound?: boolean;
  userName?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  fullName?: string | null;
  picture?: string | null;
  email?: string | null;
  mobileNumber?: string | null;
  hasRegistered?: boolean;
  loginProvider?: string | null;
  homeUrl?: string | null;
  isSelfServiceUser?: boolean;
  grantedPermissions?: string[] | null;
}

export interface TenantLoginInfoDto {
  id?: number;
  tenancyName?: string | null;
  name?: string | null;
}

export interface GetCurrentLoginInformationsOutput {
  application?: ApplicationInfoDto;
  user?: UserLoginInfoDto;
  tenant?: TenantLoginInfoDto;
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

export interface GetCurrentLoginInformationsOutputAjaxResponse {
  targetUrl?: string | null;
  success?: boolean;
  error?: ErrorInfo;
  unAuthorizedRequest?: boolean;
  __abp?: boolean;
  result?: GetCurrentLoginInformationsOutput;
}

export interface AjaxResponseBase {
  targetUrl?: string | null;
  success?: boolean;
  error?: ErrorInfo;
  unAuthorizedRequest?: boolean;
  __abp?: boolean;
}

export interface StringListAjaxResponse {
  targetUrl?: string | null;
  success?: boolean;
  error?: ErrorInfo;
  unAuthorizedRequest?: boolean;
  __abp?: boolean;
  result?: string[] | null;
}

export type SessionGetCurrentLoginInformationsProps = Omit<
  GetProps<GetCurrentLoginInformationsOutputAjaxResponse, AjaxResponseBase, void, void>,
  'path'
>;

export const SessionGetCurrentLoginInformations = (props: SessionGetCurrentLoginInformationsProps) => (
  <Get<GetCurrentLoginInformationsOutputAjaxResponse, AjaxResponseBase, void, void>
    path={`/api/services/app/Session/GetCurrentLoginInformations`}
    {...props}
  />
);

export type UseSessionGetCurrentLoginInformationsProps = Omit<
  UseGetProps<GetCurrentLoginInformationsOutputAjaxResponse, AjaxResponseBase, void, void>,
  'path'
>;

export const useSessionGetCurrentLoginInformations = (props: UseSessionGetCurrentLoginInformationsProps) =>
  useGet<GetCurrentLoginInformationsOutputAjaxResponse, AjaxResponseBase, void, void>(
    `/api/services/app/Session/GetCurrentLoginInformations`,
    props
  );

export type sessionGetCurrentLoginInformationsProps = Omit<
  RestfulShesha.GetProps<GetCurrentLoginInformationsOutputAjaxResponse, AjaxResponseBase, void, void>,
  'queryParams'
>;
export const sessionGetCurrentLoginInformations = (props: sessionGetCurrentLoginInformationsProps) =>
  RestfulShesha.get<GetCurrentLoginInformationsOutputAjaxResponse, AjaxResponseBase, void, void>(
    `/api/services/app/Session/GetCurrentLoginInformations`,
    undefined,
    props
  );

export type SessionGetGrantedShaRolesProps = Omit<
  GetProps<StringListAjaxResponse, AjaxResponseBase, void, void>,
  'path'
>;

/**
 * I am using this method to get user roles and it is being used on login of a user and also when changing work Order Type, Please contact me(Moses) before removing it
 */
export const SessionGetGrantedShaRoles = (props: SessionGetGrantedShaRolesProps) => (
  <Get<StringListAjaxResponse, AjaxResponseBase, void, void>
    path={`/api/services/app/Session/GetGrantedShaRoles`}
    {...props}
  />
);

export type UseSessionGetGrantedShaRolesProps = Omit<
  UseGetProps<StringListAjaxResponse, AjaxResponseBase, void, void>,
  'path'
>;

/**
 * I am using this method to get user roles and it is being used on login of a user and also when changing work Order Type, Please contact me(Moses) before removing it
 */
export const useSessionGetGrantedShaRoles = (props: UseSessionGetGrantedShaRolesProps) =>
  useGet<StringListAjaxResponse, AjaxResponseBase, void, void>(`/api/services/app/Session/GetGrantedShaRoles`, props);

export type sessionGetGrantedShaRolesProps = Omit<
  RestfulShesha.GetProps<StringListAjaxResponse, AjaxResponseBase, void, void>,
  'queryParams'
>;
/**
 * I am using this method to get user roles and it is being used on login of a user and also when changing work Order Type, Please contact me(Moses) before removing it
 */
export const sessionGetGrantedShaRoles = (props: sessionGetGrantedShaRolesProps) =>
  RestfulShesha.get<StringListAjaxResponse, AjaxResponseBase, void, void>(
    `/api/services/app/Session/GetGrantedShaRoles`,
    undefined,
    props
  );

export type SessionClearPermissionsCacheProps = Omit<MutateProps<void, unknown, void, void, void>, 'path' | 'verb'>;

/**
 * Clears permissions cache
 */
export const SessionClearPermissionsCache = (props: SessionClearPermissionsCacheProps) => (
  <Mutate<void, unknown, void, void, void>
    verb="POST"
    path={`/api/services/app/Session/ClearPermissionsCache`}
    {...props}
  />
);

export type UseSessionClearPermissionsCacheProps = Omit<
  UseMutateProps<void, unknown, void, void, void>,
  'path' | 'verb'
>;

/**
 * Clears permissions cache
 */
export const useSessionClearPermissionsCache = (props: UseSessionClearPermissionsCacheProps) =>
  useMutate<void, unknown, void, void, void>('POST', `/api/services/app/Session/ClearPermissionsCache`, props);

export type sessionClearPermissionsCacheProps = Omit<
  RestfulShesha.MutateProps<void, unknown, void, void, void>,
  'data'
>;
/**
 * Clears permissions cache
 */
export const sessionClearPermissionsCache = (props: sessionClearPermissionsCacheProps) =>
  RestfulShesha.mutate<void, unknown, void, void, void>(
    'POST',
    `/api/services/app/Session/ClearPermissionsCache`,
    undefined,
    props
  );
