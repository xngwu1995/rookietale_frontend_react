import { useGoTo } from '@utils/hooks';
import { message } from 'antd';
import { useState } from 'react';
import { menuItems, createTweetItem } from '@utils/constants';
import Cookies from 'js-cookie';
import style from './index.module.scss';

const Nav = () => {
  const [current, setCurrent] = useState('tweets');
  const go = useGoTo();

  const handleMenuItemClick = (key) => {
    setCurrent(key);
    go(key);
  };

  const handleLogout = () => {
    Cookies.set('userId', '');
    message.success('Successfully Log Out');
    window.location.reload();
  };

  return (
    <div className={style.navContainer}>
      <ul className={style.navList}>
        {menuItems.map((item) => (
          <li key={item.key}>
            <button
              type="button"
              className={`${style.navListItem} ${
                current === item.key ? style.active : ''
              }`}
              onClick={() => handleMenuItemClick(item.key)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
      <button type="button" className={style.post} onClick={() => handleMenuItemClick(createTweetItem.key)}>
        Post Tweet
      </button>
      <div className={style.logoutWrapper}>
        <button type="button" className={style.logout} onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Nav;
