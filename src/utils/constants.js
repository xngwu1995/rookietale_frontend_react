import { matchPath } from 'react-router-dom';
import homeSvg from '@assets/home.svg';
import messageSvg from '@assets/message.svg';
import tipSvg from '@assets/tip.svg';
import searchSvg from '@assets/search.svg';
import twitterLogSvg from '@assets/twitter-logo.svg';
import style from '../common.module.scss';

export const menuItems = [
  {
    key: 'home',
    link: '/tweets',
    icon: <img className={style.icon} src={homeSvg} alt="" />,
    label: 'HOME',
  },
  {
    key: 'search',
    link: '/search',
    icon: <img className={style.icon} src={searchSvg} alt="" />,
    label: 'Search',
  },
  {
    key: 'tips',
    link: '/tips',
    icon: <img className={style.icon} src={tipSvg} alt="" />,
    label: 'Notification',
  },
  {
    key: 'message',
    link: '/message',
    icon: <img className={style.icon} src={messageSvg} alt="" />,
    label: 'Message',
  },
  {
    key: 'health',
    link: '/health',
    icon: <img className={style.icon} src={twitterLogSvg} alt="" />,
    label: 'Health',
  },
];
export const createTweetItem = [
  {
    key: 'post',
    link: '/createTweet',
    label: 'Post Tweet',
  },
];
export const userProfileItem = [
  {
    key: 'profile',
    link: '/tweets',
    icon: <img className={style.icon} src={homeSvg} alt="" />,
    label: 'User Profile',
  },
];

export const allLinks = [
  {
    key: 'home',
    link: '/tweets',
  },
  {
    key: 'search',
    link: '/search',
  },
  {
    key: 'tips',
    link: '/tips',
  },
  {
    key: 'message',
    link: '/message',
  },
  {
    key: 'health',
    link: '/health',
  },
  {
    key: 'post',
    link: '/createTweet',
  },
  {
    key: 'profile',
    link: '/tweets',
  },
];

export const getMenuByKey = (key) => allLinks.find((item) => item.key === key);
export const getMenuByLink = (link) => allLinks.find((item) => matchPath(item.link, link));

export const includeMenu = (link) => menuItems.some((item) => item.link === link);
