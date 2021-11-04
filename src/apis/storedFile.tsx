/* Generated by restful-react */

import React from 'react';
import { Get, GetProps, useGet, UseGetProps, Mutate, MutateProps, useMutate, UseMutateProps } from 'restful-react';

import * as RestfulShesha from '../utils/fetchers';
export const SPEC_VERSION = 'v1';
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

export interface FileStreamResultAjaxResponse {
  targetUrl?: string | null;
  success?: boolean;
  error?: ErrorInfo;
  unAuthorizedRequest?: boolean;
  __abp?: boolean;
  result?: string | null;
}

export interface AjaxResponseBase {
  targetUrl?: string | null;
  success?: boolean;
  error?: ErrorInfo;
  unAuthorizedRequest?: boolean;
  __abp?: boolean;
}

export interface StoredFileDto {
  error?: string | null;
  id?: string | null;
  name?: string | null;
  fileCategory?: number | null;
  url?: string | null;
  size?: number;
  type?: string | null;
}

export interface StoredFileDtoAjaxResponse {
  targetUrl?: string | null;
  success?: boolean;
  error?: ErrorInfo;
  unAuthorizedRequest?: boolean;
  __abp?: boolean;
  result?: StoredFileDto;
}

export interface BooleanAjaxResponse {
  targetUrl?: string | null;
  success?: boolean;
  error?: ErrorInfo;
  unAuthorizedRequest?: boolean;
  __abp?: boolean;
  result?: boolean;
}

export interface StoredFileDtoListAjaxResponse {
  targetUrl?: string | null;
  success?: boolean;
  error?: ErrorInfo;
  unAuthorizedRequest?: boolean;
  __abp?: boolean;
  result?: StoredFileDto[] | null;
}

export interface StoredFileVersionInfoDto {
  id?: string;
  dateUploaded?: string | null;
  size?: number | null;
  uploadedBy?: string | null;
  fileName?: string | null;
  versionNo?: number;
  url?: string | null;
}

export interface StoredFileVersionInfoDtoListAjaxResponse {
  targetUrl?: string | null;
  success?: boolean;
  error?: ErrorInfo;
  unAuthorizedRequest?: boolean;
  __abp?: boolean;
  result?: StoredFileVersionInfoDto[] | null;
}

export interface StoredFileDownloadQueryParams {
  id?: string;
  versionNo?: number | null;
  /**
   * The requested API version
   */
  'api-version'?: string;
}

export type StoredFileDownloadProps = Omit<
  GetProps<FileStreamResultAjaxResponse, AjaxResponseBase, StoredFileDownloadQueryParams, void>,
  'path'
>;

export const StoredFileDownload = (props: StoredFileDownloadProps) => (
  <Get<FileStreamResultAjaxResponse, AjaxResponseBase, StoredFileDownloadQueryParams, void>
    path={`/api/StoredFile/Download`}
    {...props}
  />
);

export type UseStoredFileDownloadProps = Omit<
  UseGetProps<FileStreamResultAjaxResponse, AjaxResponseBase, StoredFileDownloadQueryParams, void>,
  'path'
>;

export const useStoredFileDownload = (props: UseStoredFileDownloadProps) =>
  useGet<FileStreamResultAjaxResponse, AjaxResponseBase, StoredFileDownloadQueryParams, void>(
    `/api/StoredFile/Download`,
    props
  );

export const storedFileDownload = (
  props: RestfulShesha.GetProps<FileStreamResultAjaxResponse, AjaxResponseBase, StoredFileDownloadQueryParams, void>,
  signal?: RequestInit['signal']
) =>
  RestfulShesha.get<FileStreamResultAjaxResponse, AjaxResponseBase, StoredFileDownloadQueryParams, void>(
    `/api/StoredFile/Download`,
    props,
    signal
  );

export interface StoredFileUploadQueryParams {
  /**
   * The requested API version
   */
  'api-version'?: string;
}

export type StoredFileUploadProps = Omit<
  MutateProps<StoredFileDtoAjaxResponse, AjaxResponseBase, StoredFileUploadQueryParams, void, void>,
  'path' | 'verb'
>;

export const StoredFileUpload = (props: StoredFileUploadProps) => (
  <Mutate<StoredFileDtoAjaxResponse, AjaxResponseBase, StoredFileUploadQueryParams, void, void>
    verb="POST"
    path={`/api/StoredFile/Upload`}
    {...props}
  />
);

export type UseStoredFileUploadProps = Omit<
  UseMutateProps<StoredFileDtoAjaxResponse, AjaxResponseBase, StoredFileUploadQueryParams, void, void>,
  'path' | 'verb'
>;

export const useStoredFileUpload = (props: UseStoredFileUploadProps) =>
  useMutate<StoredFileDtoAjaxResponse, AjaxResponseBase, StoredFileUploadQueryParams, void, void>(
    'POST',
    `/api/StoredFile/Upload`,
    props
  );

export const storedFileUpload = (
  props: RestfulShesha.MutateProps<
    StoredFileDtoAjaxResponse,
    AjaxResponseBase,
    StoredFileUploadQueryParams,
    void,
    void
  >,
  signal?: RequestInit['signal']
) =>
  RestfulShesha.mutate<StoredFileDtoAjaxResponse, AjaxResponseBase, StoredFileUploadQueryParams, void, void>(
    'POST',
    `/api/StoredFile/Upload`,
    props,
    signal
  );

export interface StoredFileUploadNewVersionQueryParams {
  /**
   * The requested API version
   */
  'api-version'?: string;
}

export type StoredFileUploadNewVersionProps = Omit<
  MutateProps<StoredFileDtoAjaxResponse, AjaxResponseBase, StoredFileUploadNewVersionQueryParams, void, void>,
  'path' | 'verb'
>;

export const StoredFileUploadNewVersion = (props: StoredFileUploadNewVersionProps) => (
  <Mutate<StoredFileDtoAjaxResponse, AjaxResponseBase, StoredFileUploadNewVersionQueryParams, void, void>
    verb="POST"
    path={`/api/StoredFile/UploadNewVersion`}
    {...props}
  />
);

export type UseStoredFileUploadNewVersionProps = Omit<
  UseMutateProps<StoredFileDtoAjaxResponse, AjaxResponseBase, StoredFileUploadNewVersionQueryParams, void, void>,
  'path' | 'verb'
>;

export const useStoredFileUploadNewVersion = (props: UseStoredFileUploadNewVersionProps) =>
  useMutate<StoredFileDtoAjaxResponse, AjaxResponseBase, StoredFileUploadNewVersionQueryParams, void, void>(
    'POST',
    `/api/StoredFile/UploadNewVersion`,
    props
  );

export const storedFileUploadNewVersion = (
  props: RestfulShesha.MutateProps<
    StoredFileDtoAjaxResponse,
    AjaxResponseBase,
    StoredFileUploadNewVersionQueryParams,
    void,
    void
  >,
  signal?: RequestInit['signal']
) =>
  RestfulShesha.mutate<StoredFileDtoAjaxResponse, AjaxResponseBase, StoredFileUploadNewVersionQueryParams, void, void>(
    'POST',
    `/api/StoredFile/UploadNewVersion`,
    props,
    signal
  );

export interface StoredFileDeleteQueryParams {
  fileId: string;
  ownerId?: string | null;
  ownerType?: string | null;
  propertyName?: string | null;
  /**
   * The requested API version
   */
  'api-version'?: string;
}

export type StoredFileDeleteProps = Omit<
  MutateProps<BooleanAjaxResponse, AjaxResponseBase, StoredFileDeleteQueryParams, void, void>,
  'path' | 'verb'
>;

export const StoredFileDelete = (props: StoredFileDeleteProps) => (
  <Mutate<BooleanAjaxResponse, AjaxResponseBase, StoredFileDeleteQueryParams, void, void>
    verb="DELETE"
    path={`/api/StoredFile/Delete`}
    {...props}
  />
);

export type UseStoredFileDeleteProps = Omit<
  UseMutateProps<BooleanAjaxResponse, AjaxResponseBase, StoredFileDeleteQueryParams, void, void>,
  'path' | 'verb'
>;

export const useStoredFileDelete = (props: UseStoredFileDeleteProps) =>
  useMutate<BooleanAjaxResponse, AjaxResponseBase, StoredFileDeleteQueryParams, void, void>(
    'DELETE',
    `/api/StoredFile/Delete`,
    { ...props }
  );

export const storedFileDelete = (
  props: RestfulShesha.MutateProps<BooleanAjaxResponse, AjaxResponseBase, StoredFileDeleteQueryParams, void, void>,
  signal?: RequestInit['signal']
) =>
  RestfulShesha.mutate<BooleanAjaxResponse, AjaxResponseBase, StoredFileDeleteQueryParams, void, void>(
    'DELETE',
    `/api/StoredFile/Delete`,
    props,
    signal
  );

export interface StoredFileDownloadZipQueryParams {
  allCategories?: boolean;
  ownerId: string;
  ownerType: string;
  filesCategory?: number | null;
  propertyName?: string | null;
  /**
   * The requested API version
   */
  'api-version'?: string;
}

export type StoredFileDownloadZipProps = Omit<
  GetProps<FileStreamResultAjaxResponse, AjaxResponseBase, StoredFileDownloadZipQueryParams, void>,
  'path'
>;

export const StoredFileDownloadZip = (props: StoredFileDownloadZipProps) => (
  <Get<FileStreamResultAjaxResponse, AjaxResponseBase, StoredFileDownloadZipQueryParams, void>
    path={`/api/StoredFile/DownloadZip`}
    {...props}
  />
);

export type UseStoredFileDownloadZipProps = Omit<
  UseGetProps<FileStreamResultAjaxResponse, AjaxResponseBase, StoredFileDownloadZipQueryParams, void>,
  'path'
>;

export const useStoredFileDownloadZip = (props: UseStoredFileDownloadZipProps) =>
  useGet<FileStreamResultAjaxResponse, AjaxResponseBase, StoredFileDownloadZipQueryParams, void>(
    `/api/StoredFile/DownloadZip`,
    props
  );

export const storedFileDownloadZip = (
  props: RestfulShesha.GetProps<FileStreamResultAjaxResponse, AjaxResponseBase, StoredFileDownloadZipQueryParams, void>,
  signal?: RequestInit['signal']
) =>
  RestfulShesha.get<FileStreamResultAjaxResponse, AjaxResponseBase, StoredFileDownloadZipQueryParams, void>(
    `/api/StoredFile/DownloadZip`,
    props,
    signal
  );

export interface StoredFileFilesListQueryParams {
  ownerId: string;
  ownerType: string;
  filesCategory?: number | null;
  propertyName?: string | null;
  allCategories?: boolean;
  /**
   * The requested API version
   */
  'api-version'?: string;
}

export type StoredFileFilesListProps = Omit<
  GetProps<StoredFileDtoListAjaxResponse, AjaxResponseBase, StoredFileFilesListQueryParams, void>,
  'path'
>;

export const StoredFileFilesList = (props: StoredFileFilesListProps) => (
  <Get<StoredFileDtoListAjaxResponse, AjaxResponseBase, StoredFileFilesListQueryParams, void>
    path={`/api/StoredFile/FilesList`}
    {...props}
  />
);

export type UseStoredFileFilesListProps = Omit<
  UseGetProps<StoredFileDtoListAjaxResponse, AjaxResponseBase, StoredFileFilesListQueryParams, void>,
  'path'
>;

export const useStoredFileFilesList = (props: UseStoredFileFilesListProps) =>
  useGet<StoredFileDtoListAjaxResponse, AjaxResponseBase, StoredFileFilesListQueryParams, void>(
    `/api/StoredFile/FilesList`,
    props
  );

export const storedFileFilesList = (
  props: RestfulShesha.GetProps<StoredFileDtoListAjaxResponse, AjaxResponseBase, StoredFileFilesListQueryParams, void>,
  signal?: RequestInit['signal']
) =>
  RestfulShesha.get<StoredFileDtoListAjaxResponse, AjaxResponseBase, StoredFileFilesListQueryParams, void>(
    `/api/StoredFile/FilesList`,
    props,
    signal
  );

export interface StoredFileCreateOrUpdateQueryParams {
  /**
   * The requested API version
   */
  'api-version'?: string;
}

export type StoredFileCreateOrUpdateProps = Omit<
  MutateProps<StoredFileDtoAjaxResponse, AjaxResponseBase, StoredFileCreateOrUpdateQueryParams, void, void>,
  'path' | 'verb'
>;

export const StoredFileCreateOrUpdate = (props: StoredFileCreateOrUpdateProps) => (
  <Mutate<StoredFileDtoAjaxResponse, AjaxResponseBase, StoredFileCreateOrUpdateQueryParams, void, void>
    verb="PUT"
    path={`/api/StoredFile`}
    {...props}
  />
);

export type UseStoredFileCreateOrUpdateProps = Omit<
  UseMutateProps<StoredFileDtoAjaxResponse, AjaxResponseBase, StoredFileCreateOrUpdateQueryParams, void, void>,
  'path' | 'verb'
>;

export const useStoredFileCreateOrUpdate = (props: UseStoredFileCreateOrUpdateProps) =>
  useMutate<StoredFileDtoAjaxResponse, AjaxResponseBase, StoredFileCreateOrUpdateQueryParams, void, void>(
    'PUT',
    `/api/StoredFile`,
    props
  );

export const storedFileCreateOrUpdate = (
  props: RestfulShesha.MutateProps<
    StoredFileDtoAjaxResponse,
    AjaxResponseBase,
    StoredFileCreateOrUpdateQueryParams,
    void,
    void
  >,
  signal?: RequestInit['signal']
) =>
  RestfulShesha.mutate<StoredFileDtoAjaxResponse, AjaxResponseBase, StoredFileCreateOrUpdateQueryParams, void, void>(
    'PUT',
    `/api/StoredFile`,
    props,
    signal
  );

export interface StoredFileGetQueryParams {
  id?: string;
  /**
   * The requested API version
   */
  'api-version'?: string;
}

export type StoredFileGetProps = Omit<
  GetProps<StoredFileDtoAjaxResponse, AjaxResponseBase, StoredFileGetQueryParams, void>,
  'path'
>;

export const StoredFileGet = (props: StoredFileGetProps) => (
  <Get<StoredFileDtoAjaxResponse, AjaxResponseBase, StoredFileGetQueryParams, void>
    path={`/api/StoredFile`}
    {...props}
  />
);

export type UseStoredFileGetProps = Omit<
  UseGetProps<StoredFileDtoAjaxResponse, AjaxResponseBase, StoredFileGetQueryParams, void>,
  'path'
>;

export const useStoredFileGet = (props: UseStoredFileGetProps) =>
  useGet<StoredFileDtoAjaxResponse, AjaxResponseBase, StoredFileGetQueryParams, void>(`/api/StoredFile`, props);

export const storedFileGet = (
  props: RestfulShesha.GetProps<StoredFileDtoAjaxResponse, AjaxResponseBase, StoredFileGetQueryParams, void>,
  signal?: RequestInit['signal']
) =>
  RestfulShesha.get<StoredFileDtoAjaxResponse, AjaxResponseBase, StoredFileGetQueryParams, void>(
    `/api/StoredFile`,
    props,
    signal
  );

export interface StoredFileDeleteFileQueryParams {
  id?: string;
  /**
   * The requested API version
   */
  'api-version'?: string;
}

export type StoredFileDeleteFileProps = Omit<
  MutateProps<BooleanAjaxResponse, AjaxResponseBase, StoredFileDeleteFileQueryParams, void, void>,
  'path' | 'verb'
>;

export const StoredFileDeleteFile = (props: StoredFileDeleteFileProps) => (
  <Mutate<BooleanAjaxResponse, AjaxResponseBase, StoredFileDeleteFileQueryParams, void, void>
    verb="DELETE"
    path={`/api/StoredFile`}
    {...props}
  />
);

export type UseStoredFileDeleteFileProps = Omit<
  UseMutateProps<BooleanAjaxResponse, AjaxResponseBase, StoredFileDeleteFileQueryParams, void, void>,
  'path' | 'verb'
>;

export const useStoredFileDeleteFile = (props: UseStoredFileDeleteFileProps) =>
  useMutate<BooleanAjaxResponse, AjaxResponseBase, StoredFileDeleteFileQueryParams, void, void>(
    'DELETE',
    `/api/StoredFile`,
    { ...props }
  );

export const storedFileDeleteFile = (
  props: RestfulShesha.MutateProps<BooleanAjaxResponse, AjaxResponseBase, StoredFileDeleteFileQueryParams, void, void>,
  signal?: RequestInit['signal']
) =>
  RestfulShesha.mutate<BooleanAjaxResponse, AjaxResponseBase, StoredFileDeleteFileQueryParams, void, void>(
    'DELETE',
    `/api/StoredFile`,
    props,
    signal
  );

export interface StoredFileGetEntityPropertyQueryParams {
  propertyName?: string | null;
  ownerId: string;
  ownerType: string;
  /**
   * The requested API version
   */
  'api-version'?: string;
}

export type StoredFileGetEntityPropertyProps = Omit<
  GetProps<StoredFileDtoAjaxResponse, AjaxResponseBase, StoredFileGetEntityPropertyQueryParams, void>,
  'path'
>;

export const StoredFileGetEntityProperty = (props: StoredFileGetEntityPropertyProps) => (
  <Get<StoredFileDtoAjaxResponse, AjaxResponseBase, StoredFileGetEntityPropertyQueryParams, void>
    path={`/api/StoredFile/EntityProperty`}
    {...props}
  />
);

export type UseStoredFileGetEntityPropertyProps = Omit<
  UseGetProps<StoredFileDtoAjaxResponse, AjaxResponseBase, StoredFileGetEntityPropertyQueryParams, void>,
  'path'
>;

export const useStoredFileGetEntityProperty = (props: UseStoredFileGetEntityPropertyProps) =>
  useGet<StoredFileDtoAjaxResponse, AjaxResponseBase, StoredFileGetEntityPropertyQueryParams, void>(
    `/api/StoredFile/EntityProperty`,
    props
  );

export const storedFileGetEntityProperty = (
  props: RestfulShesha.GetProps<
    StoredFileDtoAjaxResponse,
    AjaxResponseBase,
    StoredFileGetEntityPropertyQueryParams,
    void
  >,
  signal?: RequestInit['signal']
) =>
  RestfulShesha.get<StoredFileDtoAjaxResponse, AjaxResponseBase, StoredFileGetEntityPropertyQueryParams, void>(
    `/api/StoredFile/EntityProperty`,
    props,
    signal
  );

export interface StoredFileGetFileVersionsQueryParams {
  /**
   * The requested API version
   */
  'api-version'?: string;
}

export interface StoredFileGetFileVersionsPathParams {
  fileId: string;
}

export type StoredFileGetFileVersionsProps = Omit<
  GetProps<
    StoredFileVersionInfoDtoListAjaxResponse,
    AjaxResponseBase,
    StoredFileGetFileVersionsQueryParams,
    StoredFileGetFileVersionsPathParams
  >,
  'path'
> &
  StoredFileGetFileVersionsPathParams;

export const StoredFileGetFileVersions = ({ fileId, ...props }: StoredFileGetFileVersionsProps) => (
  <Get<
    StoredFileVersionInfoDtoListAjaxResponse,
    AjaxResponseBase,
    StoredFileGetFileVersionsQueryParams,
    StoredFileGetFileVersionsPathParams
  >
    path={`/api/StoredFile/StoredFile/${fileId}/Versions`}
    {...props}
  />
);

export type UseStoredFileGetFileVersionsProps = Omit<
  UseGetProps<
    StoredFileVersionInfoDtoListAjaxResponse,
    AjaxResponseBase,
    StoredFileGetFileVersionsQueryParams,
    StoredFileGetFileVersionsPathParams
  >,
  'path'
> &
  StoredFileGetFileVersionsPathParams;

export const useStoredFileGetFileVersions = ({ fileId, ...props }: UseStoredFileGetFileVersionsProps) =>
  useGet<
    StoredFileVersionInfoDtoListAjaxResponse,
    AjaxResponseBase,
    StoredFileGetFileVersionsQueryParams,
    StoredFileGetFileVersionsPathParams
  >(
    (paramsInPath: StoredFileGetFileVersionsPathParams) => `/api/StoredFile/StoredFile/${paramsInPath.fileId}/Versions`,
    { pathParams: { fileId }, ...props }
  );

export const storedFileGetFileVersions = (
  {
    fileId,
    ...props
  }: RestfulShesha.GetProps<
    StoredFileVersionInfoDtoListAjaxResponse,
    AjaxResponseBase,
    StoredFileGetFileVersionsQueryParams,
    StoredFileGetFileVersionsPathParams
  > & { fileId: string },
  signal?: RequestInit['signal']
) =>
  RestfulShesha.get<
    StoredFileVersionInfoDtoListAjaxResponse,
    AjaxResponseBase,
    StoredFileGetFileVersionsQueryParams,
    StoredFileGetFileVersionsPathParams
  >(`/api/StoredFile/StoredFile/${fileId}/Versions`, props, signal);
