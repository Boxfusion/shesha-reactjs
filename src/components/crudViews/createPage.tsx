import React from 'react';
import { Form, Spin, Button } from 'antd';
import { MainLayout, ValidationErrors, ConfigurableForm } from '../';
import { FormInstance } from 'antd/lib/form';
import { useUi } from '../../providers';
import { NextPage } from 'next';
import { IDataMutator } from './models';
import { IndexToolbar } from '../';
import { IToolbarItem } from '../../interfaces';
import { SaveOutlined, CloseOutlined, CheckCircleOutlined } from '@ant-design/icons';
import PageBtnContainer from '../pageBtnContainer';
import { useShaRouting } from '../../providers/shaRouting';

interface ICreatePageProps {
  title?: string;
  formPath?: string;
  updater: (props: any) => IDataMutator;
  onSuccess?: (form: FormInstance) => void;
  prepareValues?: (values: any) => any;
  initialValues?: any;
  actionButtonPosition?: 'top' | 'bottom';
}

const CreateForm: NextPage<ICreatePageProps> = ({
  onSuccess,
  updater,
  title,
  formPath,
  prepareValues,
  initialValues,
  actionButtonPosition = 'top',
}) => {
  const { mutate: save, error: saveError, loading: saveInProgress } = updater({});

  const { router } = useShaRouting();
  const [form] = Form.useForm();

  const toolbarItems: IToolbarItem[] = [
    {
      title: 'Submit',
      icon: <SaveOutlined />,
      onClick: () => {
        form.submit();
      },
    },
    {
      title: 'Close',
      icon: <CloseOutlined />,
      onClick: () => {
        router.back();
      },
    },
  ];

  const handleSubmit = (values: any) => {
    const preparedValues = typeof prepareValues === 'function' ? prepareValues(values) : values;
    save(preparedValues).then(() => {
      if (onSuccess) onSuccess(form);
      else router.back();
    });
  };
  const { formItemLayout } = useUi();

  return (
    <MainLayout title={title} toolbar={actionButtonPosition === 'top' ? <IndexToolbar items={toolbarItems} /> : null}>
      <Spin spinning={saveInProgress} tip="Please wait...">
        <ValidationErrors error={saveError?.data}></ValidationErrors>
        <ConfigurableForm
          mode="edit"
          {...formItemLayout}
          form={form}
          onFinish={handleSubmit}
          path={formPath || router.pathname}
          initialValues={initialValues}
        />

        {actionButtonPosition === 'bottom' && (
          <PageBtnContainer>
            <Button
              icon={<CloseOutlined />}
              onClick={() => {
                router.back();
              }}
            >
              Cancel
            </Button>

            <Button
              type="primary"
              icon={<CheckCircleOutlined />}
              onClick={() => {
                form.submit();
              }}
            >
              Submit
            </Button>
          </PageBtnContainer>
        )}
      </Spin>
    </MainLayout>
  );
};
export default CreateForm;