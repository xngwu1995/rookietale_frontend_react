/* eslint-disable no-alert */
import {
  Button, Input, Form, message,
} from 'antd';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGoTo } from '@utils/hooks';
import cookies from 'js-cookie';
import { useAppContext } from '@utils/context';
import { login } from '@services/login';
import LoginPic from '@assets/Login.jpg';
import style from './index.module.scss';

const Login = () => {
  const [form] = Form.useForm();
  const [, setStore] = useAppContext();
  useEffect(() => {
    setStore({
      closeHeaderHandler: null,
    });
  }, []);
  const go = useGoTo();

  const onSubmit = async () => {
    const values = await form.validateFields();
    if (values) {
      const res = await login(values);
      if (res.success) {
        cookies.set('userId', res.user.id);
        message.success('Successfully log in');
        go('/');
        window.location.reload();
      }
    }
  };
  return (
    <div className={style.wrap}>
      <div className={style.login}>
        <div className={style.left}>
          <img src={LoginPic} alt="" />
        </div>
        <div className={style.right}>
          <div className={style.form}>
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
                <Link to="/register" className={style.Link}>
                  Register
                </Link>
              </div>
            </Form>

          </div>
        </div>
      </div>
    </div>

  );
};

export default Login;
