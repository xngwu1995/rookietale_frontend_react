import './index.css';
import {
  Button, Input, Form, message,
} from 'antd';
import { loginService } from '../../services/login';

const initialValues = {
  username: 'daniel',
  password: 'wert66',
};
const Login = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const onFinish = async () => {
    const res = await loginService();
    if (res) {
      messageApi.info({
        content: 'Successfully login',
      });
      return;
    }
    messageApi.info({
      content: 'Can not login',
    });
  };

  return (
    <div className="login">
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        name="basic"
        initialValues={initialValues}
        onFinish={onFinish}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          {contextHolder}
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
