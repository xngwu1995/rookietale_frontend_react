import { useGoTo } from '@utils/hooks';
import { Menu } from 'antd';
import { useState } from 'react';
import { menuItems, userProfileItem, createTweetItem } from '@utils/constants';
// import style from './index.module.scss';

const Nav = () => {
  const [current, setCurrent] = useState('home');
  const go = useGoTo();

  const onClick = (e) => {
    setCurrent(e.key);
    // const mu = getMenuByKey(e.key);
    go(e.key);
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
        style={{
          position: 'absolute',
          size: 26,
          bottom: 50,
          zIndex: 1,
          transition: 'all 0.2s',
        }}
        onClick={onClick}
        inlineIndent={36}
        mode="inline"
        items={userProfileItem}
      />
    </>
  );
};

export default Nav;
