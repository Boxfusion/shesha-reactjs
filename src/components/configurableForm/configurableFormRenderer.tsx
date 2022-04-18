import React, { FC, useEffect } from 'react';
import { Form, Spin } from 'antd';
import ComponentsContainer from '../formDesigner/componentsContainer';
import { ROOT_COMPONENT_KEY } from '../../providers/form/models';
import { useForm } from '../../providers/form';
import { IConfigurableFormRendererProps } from './models';
import { useMutate } from 'restful-react';
import { ValidateErrorEntity } from '../../interfaces';
import { addFormFieldsList } from '../../utils/form';
import { useGlobalState } from '../../providers';
import moment from 'moment';
import { evaluateKeyValuesToObjectMatchedData } from '../../providers/form/utils';
import cleanDeep from 'clean-deep';
import { useFormEntity } from './useFormEntity';
import { useSubmitUrl } from './useSubmitUrl';

export const ConfigurableFormRenderer: FC<IConfigurableFormRendererProps> = ({
  children,
  skipPostOnFinish,
  form,
  httpVerb = 'POST',
  parentFormValues,
  initialValues,
  beforeSubmit,
  prepareInitialValues,
  ...props
}) => {
  const { setFormData, formData, allComponents, formMode, isDragging, formSettings, setValidationErrors } = useForm();
  const { excludeFormFieldsInPayload } = formSettings;
  const fetchedFormEntity = useFormEntity(parentFormValues);
  const { globalState } = useGlobalState();
  const submitUrl = useSubmitUrl(formSettings, httpVerb, formData, parentFormValues, globalState);

  const onFieldsChange = (changedFields: any[], allFields: any[]) => {
    if (props.onFieldsChange) props.onFieldsChange(changedFields, allFields);

    // custom handling here...
  };

  const onValuesChangeInternal = (changedValues: any, values: any) => {
    if (props.onValuesChange) props.onValuesChange(changedValues, values);

    // recalculate components visibility
    setFormData({ values, mergeValues: true });

    // update validation rules
  };

  // reset form to initial data on any change of components or initialData
  useEffect(() => {
    setFormData({ values: initialValues, mergeValues: true });
    if (form) {
      form.resetFields();
    }
  }, [allComponents, initialValues]);

  useEffect(() => {
    if (fetchedFormEntity) {
      const computedInitialValues = fetchedFormEntity
        ? prepareInitialValues
          ? prepareInitialValues(fetchedFormEntity)
          : fetchedFormEntity
        : initialValues;

      // TODO: setFormData doesn't update the fields when the form that needs to be initialized it modal.
      // TODO: Tried with mergeValues as both true | false. The state got updated properly but that doesn't reflect on the form
      // TODO: Investigate this
      if (form) {
        form?.setFieldsValue(computedInitialValues);
      }

      setFormData({ values: computedInitialValues, mergeValues: false });
    }
  }, [fetchedFormEntity]);

  const { mutate: doSubmit, loading: submitting } = useMutate({
    verb: httpVerb || 'POST', // todo: convert to configurable
    path: submitUrl,
  });

  const getExpressionExecutor = (expression: string, includeInitialValues = true, includeMoment = true) => {
    if (!expression) {
      return null;
    }

    // tslint:disable-next-line:function-constructor
    return new Function('data, parentFormValues, initialValues, globalState, moment', expression)(
      formData,
      parentFormValues,
      includeInitialValues ? initialValues : undefined,
      globalState,
      includeMoment ? moment : undefined
    );
  };

  const getDynamicPreparedValues = () => {
    const { preparedValues } = formSettings;

    if (preparedValues) {
      const localValues = getExpressionExecutor(preparedValues);

      if (typeof localValues === 'object') {
        return localValues;
      }

      return getExpressionExecutor(preparedValues);
    }
    return {};
  };

  const getInitialValuesFromFormSettings = () => {
    const initialValuesFromFormSettings = formSettings?.initialValues;

    const values = evaluateKeyValuesToObjectMatchedData(initialValuesFromFormSettings, [
      { match: 'data', data: formData },
      { match: 'parentFormValues', data: parentFormValues },
      { match: 'globalState', data: globalState },
    ]);

    return cleanDeep(values, {
      // cleanKeys: [], // Don't Remove specific keys, ie: ['foo', 'bar', ' ']
      // cleanValues: [], // Don't Remove specific values, ie: ['foo', 'bar', ' ']
      // emptyArrays: false, // Don't Remove empty arrays, ie: []
      // emptyObjects: false, // Don't Remove empty objects, ie: {}
      // emptyStrings: false, // Don't Remove empty strings, ie: ''
      // NaNValues: true, // Remove NaN values, ie: NaN
      // nullValues: true, // Remove null values, ie: null
      undefinedValues: true, // Remove undefined values, ie: undefined
    });
  };

  const onFinish = () => {
    const initialValuesFromFormSettings = getInitialValuesFromFormSettings();

    const preparedPostData = { ...formData, ...getDynamicPreparedValues(), ...getInitialValuesFromFormSettings() };

    const postData = excludeFormFieldsInPayload ? preparedPostData : addFormFieldsList(preparedPostData, form);

    if (excludeFormFieldsInPayload) {
      delete postData._formFields;
    } else {
      if (initialValuesFromFormSettings) {
        postData._formFields = Array.from(
          new Set<string>([...(postData._formFields || []), ...Object.keys(initialValuesFromFormSettings)])
        );
      }
    }

    if (skipPostOnFinish) {
      if (props?.onFinish) {
        props?.onFinish(postData);
      }

      return;
    }

    if (submitUrl) {
      setValidationErrors(null);

      const doPost = () =>
        doSubmit(postData)
          .then(response => {
            // note: we pass merged values
            if (props.onFinish) props.onFinish(postData, response?.result);
          })
          .catch(e => {
            setValidationErrors(e?.data?.error || e);
            console.log('ConfigurableFormRenderer onFinish e: ', e);
          }); // todo: test and show server-side validation

      if (typeof beforeSubmit === 'function') {
        beforeSubmit(postData)
          .then(() => {
            console.log('beforeSubmit then');

            doPost();
          })
          .catch(() => {
            console.log('beforeSubmit catch');
          });
      } else {
        doPost();
      }
    } // note: we pass merged values
    else if (props.onFinish) props.onFinish(postData);
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    setValidationErrors(null);
    if (props.onFinishFailed) props.onFinishFailed(errorInfo);
  };

  const mergedProps = {
    layout: props.layout ?? formSettings.layout,
    labelCol: props.labelCol ?? formSettings.labelCol,
    wrapperCol: props.wrapperCol ?? formSettings.wrapperCol,
    colon: formSettings.colon,
  };

  return (
    <Spin spinning={submitting}>
      <Form
        form={form}
        size={props.size}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        onValuesChange={onValuesChangeInternal}
        onFieldsChange={onFieldsChange}
        fields={props.fields}
        initialValues={initialValues}
        className={`sha-form sha-form-${formMode} ${isDragging ? 'sha-dragging' : ''}`}
        {...mergedProps}
      >
        <ComponentsContainer containerId={ROOT_COMPONENT_KEY} />
        {children}
      </Form>
    </Spin>
  );
};

export default ConfigurableFormRenderer;
