import { LoadingOutlined } from '@ant-design/icons';
import { Button, Form, message, notification, Result, Spin } from 'antd';
import Link from 'next/link';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { GetDataError, useGet, useMutate } from 'restful-react';
import { FormDto, useFormGet, useFormGetByPath } from '../../apis/form';
import { AjaxResponseBase } from '../../apis/user';
import { ConfigurableForm, ValidationErrors } from '../../components';
import { useSubscribe } from '../../hooks';
import { PageWithLayout } from '../../interfaces';
import { useGlobalState } from '../../providers';
import { ConfigurableFormInstance } from '../../providers/form/contexts';
import { IFormDto } from '../../providers/form/models';
import { evaluateComplexString, removeZeroWidthCharsFromString } from '../../providers/form/utils';
import { getQueryParams } from '../../utils/url';
import { DynamicFormPubSubConstants } from './pubSub';

type FormMode = 'designer' | 'edit' | 'readonly';

export interface IDynamicPageProps {
  /**
   * Form path. You can pass either this or `formId`. This is required if `formId` is not provided
   */
  path?: string;

  /**
   * Entity id. This should not be confused with the form id
   */
  id?: string;

  /**
   * Form id. You can pass either this or the `path`. This is required if `path` is not provided
   */
  formId?: string;

  /**
   * form mode.
   */
  mode?: FormMode;

  /**
   * This tells the dynamic page that the id should be passed as a path and not as a query parameter
   * this is the id for fetching the entity
   *
   * Required if the id is not provided
   */
  entityPathId?: string;
}

export interface EntityAjaxResponse {
  targetUrl?: string | null;
  success?: boolean;
  error?: unknown;
  unAuthorizedRequest?: boolean;
  __abp?: boolean;
  result?: IEntity;
}

interface IEntity {
  id: string;
  [name: string]: unknown;
}

interface IDynamicPageState extends IDynamicPageProps {
  formResponse?: IFormDto;
  fetchedEntity?: IEntity;
  mode?: FormMode;
}

const DynamicPage: PageWithLayout<IDynamicPageProps> = props => {
  const [state, setState] = useState<IDynamicPageState>({});
  const formRef = useRef<ConfigurableFormInstance>();
  const { globalState } = useGlobalState();

  const { id, path, formId, entityPathId } = state;

  const {
    refetch: fetchFormByPath,
    data: dataByPath,
    loading: isFetchingFormByPath,
    error: fetchFormByPathError,
  } = useFormGetByPath({ queryParams: { path }, lazy: true });

  const [form] = Form.useForm();

  const {
    refetch: fetchFormById,
    data: dataById,
    loading: isFetchingFormById,
    error: fetchFormByIdError,
  } = useFormGet({ id: formId, lazy: true });

  const formResponse: IFormDto = useMemo(() => {
    if (isFetchingFormByPath || isFetchingFormById) {
      return null;
    }

    let result: FormDto;
    if (dataByPath) {
      result = dataByPath.result;
    }

    if (dataById) {
      result = dataById.result;
    }

    if (result) {
      const formResponse: IFormDto = { ...(result as any) };
      formResponse.markup = JSON.parse(result.markup);

      return formResponse;
    }

    return null;
  }, [isFetchingFormByPath, isFetchingFormById, props]);

  const fetchEntityPath = useMemo(() => {
    const pathToReturn = (removeZeroWidthCharsFromString(formResponse?.markup?.formSettings?.getUrl) || '').trim();

    if (entityPathId) {
      return pathToReturn?.endsWith('/') ? `${pathToReturn}${entityPathId}` : `${pathToReturn}/${entityPathId}`;
    }

    return pathToReturn?.trim();
  }, [formResponse, entityPathId, props, state]);

  const {
    refetch: fetchEntity,
    error: fetchEntityError,
    loading: isFetchingEntity,
    data: fetchEntityResponse,
  } = useGet<EntityAjaxResponse>({
    path: fetchEntityPath,
    // queryParams: { id },
    lazy: true, // We wanna make sure we have both the id and the state?.markup?.formSettings?.getUrl before fetching data
  });

  const putUrl = useMemo(() => {
    const url = formResponse?.markup?.formSettings?.putUrl;

    return url
      ? evaluateComplexString(url, [
          { match: 'query', data: getQueryParams() },
          { match: 'globalState', data: globalState },
        ])
      : '';
  }, [formResponse?.markup?.formSettings]);

  const { mutate: postEntity, loading: isPostingData } = useMutate({
    path: putUrl,
    verb: id ? 'PUT' : 'POST',
  });

  useEffect(() => {
    setState(() => ({ ...props }));
  }, [props]);

  //#region get form data
  useEffect(() => {
    // Avoid fetching entity if we're displaying index table
    if ((id || entityPathId) && fetchEntityPath) {
      fetchEntity({ queryParams: entityPathId ? {} : { id } });
    }
  }, [id, formResponse?.markup?.formSettings?.getUrl, entityPathId, fetchEntityPath]);

  const onChangeId = (id: string) => {
    setState(prev => ({ ...prev, id }));
  };

  useEffect(() => {
    if (!isFetchingFormByPath && fetchEntityResponse) {
      setState(prev => ({ ...prev, fetchedEntity: fetchEntityResponse?.result }));
    }
  }, [isFetchingFormByPath, fetchEntityResponse]);
  //#endregion

  //#region Fetch form and set the state
  useEffect(() => {
    if (path) {
      fetchFormByPath();
      return;
    }

    if (formId) {
      fetchFormById();
    }
  }, [path, formId, fetchFormByPath, fetchFormById]);

  useEffect(() => {
    let result: FormDto;
    if (dataByPath) {
      result = dataByPath.result;
    }

    if (dataById) {
      result = dataById.result;
    }

    if (result) {
      const formResponse: IFormDto = { ...(result as any) };
      formResponse.markup = JSON.parse(result.markup);

      setState(prev => ({ ...prev, formResponse }));
    }
  }, [dataByPath, dataById]);
  //#endregion

  const onFinish = (values: any) => {
    postEntity(values)
      .then(() => {
        message.success('Data saved successfully!');

        formRef?.current?.setFormMode('readonly');
      })
      .catch(error => {
        console.log('onFinish error :>> ', error);
      });
  };

  //#region Error messages
  useEffect(() => {
    if (fetchEntityError) {
      displayNotificationError(fetchEntityError);
    }
  }, [fetchEntityError]);

  useEffect(() => {
    if (fetchFormByPathError) {
      displayNotificationError(fetchFormByPathError);
    }
  }, [fetchFormByPathError]);

  useEffect(() => {
    if (fetchFormByIdError) {
      displayNotificationError(fetchFormByIdError);
    }
  }, [fetchFormByIdError]);
  //#endregion

  const displayNotificationError = (error: GetDataError<AjaxResponseBase>) => {
    notification.error({
      message: 'Sorry! An error occurred.',
      icon: null,
      description: <ValidationErrors error={error} renderMode="raw" />,
    });
  };

  useSubscribe(DynamicFormPubSubConstants.CancelFormEdit, () => {
    form?.setFieldsValue(state?.fetchedEntity);

    formRef?.current?.setFormData({ values: state?.fetchedEntity, mergeValues: true });

    formRef?.current?.setFormMode('readonly');
  });

  useEffect(() => {
    if (formResponse && !formResponse?.markup && state?.path) {
      notification.error({
        message: 'Form not found',
        description: (
          <span>
            Could not find a form with the path <strong>{state?.path}</strong>. Please make sure the path is correct or
            that it hasn't been changed
          </span>
        ),
      });
    }
  }, [formResponse]);

  const isLoading = isFetchingEntity || isFetchingFormByPath || isFetchingFormById || isPostingData;

  if (state && !formResponse?.markup && !isLoading) {
    return (
      <Result
        status="404"
        style={{ height: '100vh - 55px' }}
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary">
            <Link href={'/'}>
              <a>Back Home</a>
            </Link>
          </Button>
        }
      />
    );
  }

  const getLoadingHint = () => {
    switch (true) {
      case isFetchingEntity:
        return 'Fetching data...';
      case isFetchingFormByPath:
      case isFetchingFormById:
        return 'Fetching form...';
      case isPostingData:
        return 'Saving data...';
      default:
        return 'Loading...';
    }
  };

  return (
    <Spin spinning={isLoading} tip={getLoadingHint()} indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />}>
      <ConfigurableForm
        path={path}
        id={formId}
        formRef={formRef}
        mode={state?.mode}
        form={form}
        actions={{ onChangeId }}
        onFinish={onFinish}
        initialValues={state?.fetchedEntity}
        skipPostOnFinish
        skipFetchData
        className="sha-dynamic-page"
      />
    </Spin>
  );
};
export default DynamicPage;
