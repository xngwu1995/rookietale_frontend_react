import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import SignupPic from '@assets/SignupPicture.jpeg';
import { useAppContext } from '@utils/context';
import { registerUser } from '@services/register';
import Show from '@components/Show';
import OneStep from './components/OneStep';
// eslint-disable-next-line import/no-named-as-default
import TwoStep from './components/TwoStep';
import style from './index.module.scss';

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
      message.success('Successfully Sign Up. Congratulations!');
      navigate('/login');
    }
  };

  return (
    <div className={style.wrap}>
      <div className={style.login}>
        <div className={style.left}>
          <img src={SignupPic} alt="" />
        </div>
        <div className={style.right}>
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
      </div>
    </div>
  );
};

export default Register;
