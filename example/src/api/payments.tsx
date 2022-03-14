/* Generated by restful-react */

import React from 'react';
import { Get, GetProps, useGet, UseGetProps, Mutate, MutateProps, useMutate, UseMutateProps } from 'restful-react';
export const SPEC_VERSION = 'v1';
export interface GuidNullableEntityWithDisplayNameDto {
  id?: string | null;
  displayText?: string | null;
}

export interface ReferenceListItemValueDto {
  item?: string | null;
  itemValue?: number | null;
}

export interface PaymentInput {
  id?: string;
  member?: GuidNullableEntityWithDisplayNameDto;
  paymentAmount?: number | null;
  paymentMethod?: ReferenceListItemValueDto;
}

export interface PaymentResponse {
  id?: string;
  member?: GuidNullableEntityWithDisplayNameDto;
  paymentRef?: string | null;
  paymentDate?: string | null;
  paymentAmount?: number | null;
  paymentStatus?: ReferenceListItemValueDto;
  paymentMethod?: ReferenceListItemValueDto;
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

export interface PaymentResponseAjaxResponse {
  targetUrl?: string | null;
  success?: boolean;
  error?: ErrorInfo;
  unAuthorizedRequest?: boolean;
  __abp?: boolean;
  result?: PaymentResponse;
}

export interface AjaxResponseBase {
  targetUrl?: string | null;
  success?: boolean;
  error?: ErrorInfo;
  unAuthorizedRequest?: boolean;
  __abp?: boolean;
}

export interface PaymentResponsePagedResultDto {
  items?: PaymentResponse[] | null;
  totalCount?: number;
}

export interface PaymentResponsePagedResultDtoAjaxResponse {
  targetUrl?: string | null;
  success?: boolean;
  error?: ErrorInfo;
  unAuthorizedRequest?: boolean;
  __abp?: boolean;
  result?: PaymentResponsePagedResultDto;
}

export interface PaymentsCreateQueryParams {
  /**
   * The requested API version
   */
  'api-version'?: string;
}

export type PaymentsCreateProps = Omit<
  MutateProps<PaymentResponseAjaxResponse, AjaxResponseBase, PaymentsCreateQueryParams, PaymentInput, void>,
  'path' | 'verb'
>;

export const PaymentsCreate = (props: PaymentsCreateProps) => (
  <Mutate<PaymentResponseAjaxResponse, AjaxResponseBase, PaymentsCreateQueryParams, PaymentInput, void>
    verb="POST"
    path={`/api/services/Gma/Payments/Create`}
    {...props}
  />
);

export type UsePaymentsCreateProps = Omit<
  UseMutateProps<PaymentResponseAjaxResponse, AjaxResponseBase, PaymentsCreateQueryParams, PaymentInput, void>,
  'path' | 'verb'
>;

export const usePaymentsCreate = (props: UsePaymentsCreateProps) =>
  useMutate<PaymentResponseAjaxResponse, AjaxResponseBase, PaymentsCreateQueryParams, PaymentInput, void>(
    'POST',
    `/api/services/Gma/Payments/Create`,
    props
  );

export interface PaymentsGetQueryParams {
  id?: string;
  /**
   * The requested API version
   */
  'api-version'?: string;
}

export type PaymentsGetProps = Omit<
  GetProps<PaymentResponseAjaxResponse, AjaxResponseBase, PaymentsGetQueryParams, void>,
  'path'
>;

export const PaymentsGet = (props: PaymentsGetProps) => (
  <Get<PaymentResponseAjaxResponse, AjaxResponseBase, PaymentsGetQueryParams, void>
    path={`/api/services/Gma/Payments/Get`}
    {...props}
  />
);

export type UsePaymentsGetProps = Omit<
  UseGetProps<PaymentResponseAjaxResponse, AjaxResponseBase, PaymentsGetQueryParams, void>,
  'path'
>;

export const usePaymentsGet = (props: UsePaymentsGetProps) =>
  useGet<PaymentResponseAjaxResponse, AjaxResponseBase, PaymentsGetQueryParams, void>(
    `/api/services/Gma/Payments/Get`,
    props
  );

export interface PaymentsGetAllQueryParams {
  'member.displayText'?: string | null;
  'member.id'?: string | null;
  paymentRef?: string | null;
  paymentDate?: string | null;
  paymentAmount?: number | null;
  'paymentStatus.item'?: string | null;
  'paymentStatus.itemValue'?: number | null;
  'paymentMethod.item'?: string | null;
  'paymentMethod.itemValue'?: number | null;
  id?: string;
  /**
   * The requested API version
   */
  'api-version'?: string;
}

export type PaymentsGetAllProps = Omit<
  GetProps<PaymentResponsePagedResultDtoAjaxResponse, AjaxResponseBase, PaymentsGetAllQueryParams, void>,
  'path'
>;

export const PaymentsGetAll = (props: PaymentsGetAllProps) => (
  <Get<PaymentResponsePagedResultDtoAjaxResponse, AjaxResponseBase, PaymentsGetAllQueryParams, void>
    path={`/api/services/Gma/Payments/GetAll`}
    {...props}
  />
);

export type UsePaymentsGetAllProps = Omit<
  UseGetProps<PaymentResponsePagedResultDtoAjaxResponse, AjaxResponseBase, PaymentsGetAllQueryParams, void>,
  'path'
>;

export const usePaymentsGetAll = (props: UsePaymentsGetAllProps) =>
  useGet<PaymentResponsePagedResultDtoAjaxResponse, AjaxResponseBase, PaymentsGetAllQueryParams, void>(
    `/api/services/Gma/Payments/GetAll`,
    props
  );

export interface PaymentsUpdateQueryParams {
  /**
   * The requested API version
   */
  'api-version'?: string;
}

export type PaymentsUpdateProps = Omit<
  MutateProps<PaymentResponseAjaxResponse, AjaxResponseBase, PaymentsUpdateQueryParams, PaymentInput, void>,
  'path' | 'verb'
>;

export const PaymentsUpdate = (props: PaymentsUpdateProps) => (
  <Mutate<PaymentResponseAjaxResponse, AjaxResponseBase, PaymentsUpdateQueryParams, PaymentInput, void>
    verb="PUT"
    path={`/api/services/Gma/Payments/Update`}
    {...props}
  />
);

export type UsePaymentsUpdateProps = Omit<
  UseMutateProps<PaymentResponseAjaxResponse, AjaxResponseBase, PaymentsUpdateQueryParams, PaymentInput, void>,
  'path' | 'verb'
>;

export const usePaymentsUpdate = (props: UsePaymentsUpdateProps) =>
  useMutate<PaymentResponseAjaxResponse, AjaxResponseBase, PaymentsUpdateQueryParams, PaymentInput, void>(
    'PUT',
    `/api/services/Gma/Payments/Update`,
    props
  );

export interface PaymentsDeleteQueryParams {
  id?: string;
  /**
   * The requested API version
   */
  'api-version'?: string;
}

export type PaymentsDeleteProps = Omit<
  MutateProps<void, unknown, PaymentsDeleteQueryParams, void, void>,
  'path' | 'verb'
>;

export const PaymentsDelete = (props: PaymentsDeleteProps) => (
  <Mutate<void, unknown, PaymentsDeleteQueryParams, void, void>
    verb="DELETE"
    path={`/api/services/Gma/Payments/Delete`}
    {...props}
  />
);

export type UsePaymentsDeleteProps = Omit<
  UseMutateProps<void, unknown, PaymentsDeleteQueryParams, void, void>,
  'path' | 'verb'
>;

export const usePaymentsDelete = (props: UsePaymentsDeleteProps) =>
  useMutate<void, unknown, PaymentsDeleteQueryParams, void, void>('DELETE', `/api/services/Gma/Payments/Delete`, {
    ...props,
  });
