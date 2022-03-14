import React from 'react';
import { URL_FORGOT_PASSWORD } from 'routes';
import { ILoginForm } from 'models';
import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Input, Checkbox, Button, Form } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import Link from 'next/link';
import { useAuth, ValidationErrors } from '@shesha/reactjs';
import { LoginPageWrapper } from './styles';
import { IErrorInfo } from '@shesha/reactjs/dist/interfaces/errorInfo';

export const Login = () => {
  const {
    loginUser,
    error,
    isInProgress: { loginUser: isLoggingInUser },
  } = useAuth();

  const [form] = Form.useForm<ILoginForm>();

  const handleLogin = (payload: ILoginForm) => {
    loginUser(payload);
  };

  return (
    <LoginPageWrapper
      className="login-page"
      heading="Welcome!"
      hint="Please enter your personal details in order to access your profile."
    >
      <Form form={form} onFinish={handleLogin}>
        <ValidationErrors error={error?.loginUser as IErrorInfo} />

        <FormItem name="userNameOrEmailAddress" help="This field is required" rules={[{ required: true }]}>
          <Input prefix={<MailOutlined />} placeholder="Username" />
        </FormItem>

        <FormItem name="password" help="This field is required" rules={[{ required: true }]}>
          <Input.Password
            autoComplete="on"
            prefix={<LockOutlined />}
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            placeholder="Password"
          />
        </FormItem>

        <FormItem className="un-authed-btn-container">
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            block
            loading={isLoggingInUser}
            size="large"
          >
            {isLoggingInUser ? 'Signing in....' : 'Sign In'}
          </Button>
        </FormItem>

        <div className="custom-form-item">
          <Checkbox>Remember me</Checkbox>

          <Link href={URL_FORGOT_PASSWORD}>
            <a className="login-form-forgot">Forgot password</a>
          </Link>
        </div>
      </Form>
    </LoginPageWrapper>
  );
};

export default Login;
