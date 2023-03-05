import { CloseOutlined } from '@ant-design/icons';
import { useAppContext } from '@utils/context';
import logo from '../../assets/twitter-log.svg';
import style from './index.module.css';

const Header = () => {
  const [store] = useAppContext();
  return (
    <div className={style.header}>
      {store.closeHeaderHandler && (
        <CloseOutlined
          className={style.closeIcon}
          onClick={store.closeHeaderHandler}
        />
      )}
      <img src={logo} alt="twitter-log" className={style.twitterLog} />
    </div>
  );
};

export default Header;
