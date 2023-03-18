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
    go(e.key);
  };

  const handleLogout = () => {
    Cookies.set('userId', '');
    message.success('Successfully Log Out');
    window.location.reload();
  };

  const handleMouseOver = (e) => {
    e.target.style.backgroundColor = '#0576b9';
    e.target.style.transform = 'scale(1.05)';
  };

  const handleMouseOut = (e) => {
    e.target.style.backgroundColor = '#1890ff';
    e.target.style.transform = 'scale(1)';
  };

  return (
    <>
      <Menu onClick={onClick} defaultSelectedKeys={[current]} inlineIndent={36} mode="inline" items={menuItems} />
      <div
        style={{
          cursor: 'pointer',
          marginTop: '30px',
          marginLeft: '30px',
          fontSize: 26,
          fontWeight: 'bold',
          backgroundColor: '#69c0ff',
          borderRadius: '30px',
          textAlign: 'center',
          width: '80%',
          padding: '8px 16px',
          transition: 'all 0.3s',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
        onClick={() => onClick({ key: 'post' })}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onFocus={handleMouseOver}
        onBlur={handleMouseOut}
      >
        {createTweetItem[0].label}
      </div>
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
