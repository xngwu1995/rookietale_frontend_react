import { useState } from 'react';
import {
  Input, Form, DatePicker,
} from 'antd';
import PropTypes from 'prop-types';
import Footer from './Footer';
import style from '../index.module.scss';

const ACCOUNT_TYPE = {
  TEL: 'TEL',
  EMAIL: 'EMAIL',
};
/**
 * Signup Page
 */
const OneStep = ({
  gotoNextStepHandler,
}) => {
  const [form] = Form.useForm();
  const [formData] = useState({
    username: '',
    email: '',
    birthday: '',
  });
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.EMAIL);
  const [footerButtonDisabled, setFooterButtonDisabled] = useState(true);
  const onAccountTypeChange = () => {
    if (accountType === ACCOUNT_TYPE.TEL) {
      setAccountType(ACCOUNT_TYPE.EMAIL);
      return;
    }
    setAccountType(ACCOUNT_TYPE.TEL);
  };
  const dateFormat = 'YYYY/MM/DD';
  const onClickNextStep = async () => {
    const validate = await form.validateFields();
    validate.birthday = validate.birthday.format(dateFormat);
    if (validate) {
      gotoNextStepHandler(validate);
    }
  };

  const onValuesChange = async () => {
    try {
      const validate = await form.validateFields();
      if (validate) {
        setFooterButtonDisabled(false);
        return;
      }
    } catch (e) {
      if (e.errorFields.length === 0) {
        setFooterButtonDisabled(false);
        return;
      }
      setFooterButtonDisabled(true);
    }
  };

  return (
    <div>
      <div className={style.form}>
        <div className={style.formTitle}>Create Your Account</div>
        <Form
          initialValues={formData}
          className={style.formContainer}
          form={form}
          onValuesChange={onValuesChange}
        >
          <Form.Item name="username" rules={[{ required: true, message: 'Username can not be empty' }]}>
            <Input placeholder="username" className={style.input} />
          </Form.Item>
          {accountType === ACCOUNT_TYPE.TEL && (
            <Form.Item name="tel" rules={[{ required: true, message: 'Need a valid phone number', pattern: /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/g }]}>
              <Input placeholder="phone" className={style.input} />
            </Form.Item>
          )}
          {accountType === ACCOUNT_TYPE.EMAIL && (
            <Form.Item name="email" rules={[{ required: true, message: 'Need a valid email', pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g }]}>
              <Input placeholder="email" className={style.input} />
            </Form.Item>
          )}
          <div className={style.changeTypeButton} onClick={onAccountTypeChange}>
            {accountType === ACCOUNT_TYPE.TEL ? 'Use email' : 'Use phone'}
          </div>
          <div className={style.birthTitle}>Date of birth</div>
          <div>This will not be shown publicly. Confirm your own age, </div>
          <div>even if this account is for a business, a pet, or something else.</div>
          <Form.Item name="birthday" rules={[{ required: true, message: 'Birthday can not be empty' }]}>
            <DatePicker className={style.datePicker} placeholder="Year/Month/Day" format={dateFormat} />
          </Form.Item>
        </Form>
      </div>
      <Footer onClickNextStep={onClickNextStep} disabled={footerButtonDisabled} label="Next Step" />
    </div>
  );
};

OneStep.propTypes = {
  gotoNextStepHandler: PropTypes.func.isRequired,
};

export default OneStep;
