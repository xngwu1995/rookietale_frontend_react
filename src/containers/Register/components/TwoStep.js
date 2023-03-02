/* eslint-disable import/no-extraneous-dependencies */
import { Input } from 'antd';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Footer from './Footer';
import style from '../index.module.scss';

const TwoStep = ({
  confirmRegisterHandler,
  userInfo,
}) => {
  const [password, setPassword] = useState();
  const [disabled, setDisabled] = useState(true);
  const onConfirmRegister = () => {
    confirmRegisterHandler(password);
  };
  const onChangePwd = (e) => {
    setPassword(e.target.value);
  };

  const onChangeConfirmPwd = (e) => {
    if (e.target.value === password) {
      setDisabled(false);
      return;
    }
    setDisabled(true);
  };
  return (
    <div className={style.TwoStep}>
      <div className={style.form}>
        <div className={style.formTitle}>Create Your Account</div>
        <div className={style.showLabelContainer}>
          <div className={style.showLabel}>
            Name:
            <span>{userInfo.username}</span>
          </div>
          {userInfo.email && (
          <div className={style.showLabel}>
            Email:
            <span>{userInfo.email}</span>
          </div>
          )}
          {userInfo.tel && (
          <div className={style.showLabel}>
            Phone:
            <span>{userInfo.tel}</span>
          </div>
          )}
          <div className={style.showLabel}>
            Birthday:
            <span>{userInfo.birthday}</span>
          </div>
        </div>
        <div className={style.label}>Please Enter Your Password</div>
        <Input className={style.input} type="password" onChange={onChangePwd} />
        <div className={style.label}>Please Confirm</div>
        <Input className={style.input} type="password" onChange={onChangeConfirmPwd} />
        {disabled && <div className={style.showTip}>The password should be same</div>}
      </div>
      <Footer disabled={disabled} label="Confirm Register" onClickNextStep={onConfirmRegister} />
    </div>
  );
};

TwoStep.propTypes = {
  confirmRegisterHandler: PropTypes.func.isRequired,
  userInfo: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    tel: PropTypes.string,
    birthday: PropTypes.string,
  }).isRequired,
};

export default TwoStep;
