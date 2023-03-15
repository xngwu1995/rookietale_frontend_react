import { useGoTo } from '@utils/hooks';
import { Menu, message } from 'antd';
import { useState } from 'react';
import { menuItems, logOut, createTweetItem } from '@utils/constants';
import Cookies from 'js-cookie';
import style from './index.module.scss';

const Nav = () => {
  const [current, setCurrent] = useState('tweets');
  const go = useGoTo();

  const onClick = (e) => {
    setCurrent(e.key);
    // const mu = getMenuByKey(e.key);
    go(e.key);
  };
  const handleLogout = () => {
    Cookies.set('userId', '');
    message.success('Successfully Log Out');
    window.location.reload();
  };
  return (
    <>
      <Menu onClick={onClick} defaultSelectedKeys={[current]} inlineIndent={36} mode="inline" items={menuItems} />
      <Menu
        style={{
          marginTop: '30px', fontSize: 26, fontWeight: 'bold', backgroundColor: '#1d9bf0', borderRadius: '50%', textAlign: 'center', width: '80%',
        }}
        inlineIndent={36}
        mode="inline"
        items={createTweetItem}
        onClick={onClick}
      />
      <Menu
        className={style.footer}
        onClick={handleLogout}
        inlineIndent={36}
        mode="inline"
        items={logOut}
      />
    </>
  );
};

export default Nav;
