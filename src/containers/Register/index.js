import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '@utils/context';
import { registerUser } from '@services/register';
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

  const [, setStore] = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (step === STEP.ONE) {
      setStore({
        closeHeaderHandler: () => navigate('/login'),
      });
    }
    if (step === STEP.TWO) {
      setStore({
        closeHeaderHandler: () => setStep(STEP.ONE),
      });
    }
  }, [step]);

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
      navigate('/login');
      return;
    }
    // eslint-disable-next-line no-alert
    window.alert('Ops, you can not singup');
  };

  return (
    <div>
      <Show visible={step === STEP.ONE}>
        <OneStep gotoNextStepHandler={gotoNextStepHandler} />
      </Show>
      <Show visible={step === STEP.TWO} isMount>
        <TwoStep
          userInfo={userInfo}
          goToOneStepHandler={() => setStep(STEP.ONE)}
          confirmRegisterHandler={confirmRegisterHandler}
        />
      </Show>
    </div>
  );
};

export default Register;
