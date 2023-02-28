import { Button, Input } from 'antd';
import DatePickerInput from '../../components/DatePickerInput';
import Header from '../../components/Header';
// eslint-disable-next-line import/no-extraneous-dependencies
import style from './index.module.css';

/**
 * Signup Page
 */
const Register = () => {
  console.warn('111');
  return (
    <div>
      <Header />
      <div className={style.form}>
        <div className={style.formTitle}>Create Your Account</div>
        <Input placeholder="name" className={style.input} />
        <Input placeholder="email" className={style.input} />
        <div className={style.birthTitle}>Date of birth</div>
        <div>This will not be shown publicly. Confirm your own age, </div>
        <div>even if this account is for a business, a pet, or something else.</div>
        <DatePickerInput />
      </div>
      <div className={style.footer}>
        <Button type="primary">
          Next Step
        </Button>
      </div>
    </div>
  );
};

export default Register;
