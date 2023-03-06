import { Menu } from 'antd';
import MenuItem from 'antd/es/menu/MenuItem';
// import { useState } from 'react';
import homeSvg from '@assets/home.svg';
import messageSvg from '@assets/message.svg';
import tipSvg from '@assets/tip.svg';
import searchSvg from '@assets/search.svg';
import twitterLogSvg from '@assets/twitter-logo.svg';
import TweetCard from '@components/TweetCard';
import { Content } from 'antd/es/layout/layout';
import style from './index.module.scss';

const Nav = () => (
  <div className={style.nav}>
    <Menu className={style.container} defaultSelectedKeys={['home']} inlineIndent={36} mode="inline">
      <Menu.Item className={style.label} key="home" icon=<img className={style.icon} src={homeSvg} alt="" />>
        <p className={style.navTitle}>Home</p>
      </Menu.Item>
      <MenuItem className={style.label} key="search" icon=<img className={style.icon} src={searchSvg} alt="" />>
        <p className={style.navTitle}>Search</p>
      </MenuItem>
      <MenuItem className={style.label} key="tip" icon=<img className={style.icon} src={tipSvg} alt="" />>
        <p className={style.navTitle}>Notification</p>
      </MenuItem>
      <MenuItem className={style.label} key="message" icon=<img className={style.icon} src={messageSvg} alt="" />>
        <p className={style.navTitle}>Message</p>
      </MenuItem>
      <MenuItem className={style.label} key="health" icon=<img className={style.icon} src={twitterLogSvg} alt="" />>
        <p className={style.navTitle}>Health</p>
      </MenuItem>
      <div className={style.userProfile}>
        <p className={style.postTweet}>Tweet</p>
        <div className={style.profile}>
          <img className={style.icon} src={twitterLogSvg} alt="" />
          <p className={style.navTitle}>User Profile</p>
        </div>
      </div>
    </Menu>
    <Content>
      <TweetCard />
    </Content>
  </div>
);

export default Nav;
