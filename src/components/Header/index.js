// eslint-disable-next-line import/no-extraneous-dependencies
import { CloseOutlined } from '@ant-design/icons';
import logo from '../../assets/twitter-log.svg';
import style from './index.module.css';

export default () => (
  <div className={style.header}>
    <CloseOutlined className={style.closeIcon} />
    <img src={logo} alt="twitter-log" className={style.twitterLog} />
  </div>
);
