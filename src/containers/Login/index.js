/* eslint-disable no-alert */
import {
  Button, Input, Form,
} from 'antd';
import Header from '@components/Header';
import { login } from '../../services/login';
import style from './index.module.scss';

const Login = () => {
  const [form] = Form.useForm();
  const onSubmit = async () => {
    const values = await form.validateFields();
    if (values) {
      const res = await login(values);
      if (res.success) {
        window.alert('登录成功');
        return;
      }
      window.alert('登录失败');
    }
  };
  return (
    <div className={style.form}>
      <Header />
      <div className={style.formTitle}>Sign In Your Account</div>
      <Form
        className={style.formContainer}
        form={form}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input label="username" placeholder="username" className={style.input} />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="password" className={style.input} />
        </Form.Item>
        <Button className={style.footerButton} onClick={onSubmit}>
          Next Step
        </Button>
        <div className={style.goToRegister}>
          No Account?
          <a href="/" target="_blank">
            Register
          </a>
        </div>
      </Form>

    </div>
  );
};

export default Login;
