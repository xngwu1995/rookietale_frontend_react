import { useState } from 'react';
import { registerUser } from '@services/register';
import Header from '@components/Header';
import Show from '@components/Show';
import OneStep from './components/OneStep';
// eslint-disable-next-line import/no-named-as-default
import TwoStep from './components/TwoStep';

const STEP = {
  ONE: 0,
  TWO: 1,
};
/**
 * Signup Page
 */
const Register = () => {
  const [step, setStep] = useState(STEP.ONE);
  const [userInfo, setUserInfo] = useState({});
  const gotoNextStepHandler = (data) => {
    setUserInfo(data);
    setStep(STEP.TWO);
  };

  const confirmRegisterHandler = async (password) => {
    const res = await registerUser({
      password,
      ...userInfo,
    });
    if (res.success) {
      // eslint-disable-next-line no-alert
      window.alert('Successfully Sign Up. Congratulations!');
      return;
    }
    // eslint-disable-next-line no-alert
    window.alert('Ops, you can not singup');
  };

  const onClickClose = () => {
    setStep(STEP.ONE);
  };

  return (
    <div>
      <Header onClickClose={onClickClose} />
      <Show visible={step === STEP.ONE}>
        <OneStep gotoNextStepHandler={gotoNextStepHandler} />
      </Show>
      <Show visible={step === STEP.TWO}>
        <TwoStep
          userInfo={userInfo}
          confirmRegisterHandler={confirmRegisterHandler}
        />
      </Show>
    </div>
  );
};

export default Register;
