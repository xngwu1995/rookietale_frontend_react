import { matchPath } from 'react-router-dom';
import homeSvg from '@assets/home.svg';
import messageSvg from '@assets/message.svg';
import tipSvg from '@assets/tip.svg';
import searchSvg from '@assets/search.svg';
import twitterLogSvg from '@assets/twitter-logo.svg';
import style from '../common.module.scss';

export const menuItems = [
  {
    key: 'tweets',
    link: '/',
    icon: <img className={style.icon} src={homeSvg} alt="" />,
    label: 'HOME',
  },
  {
    key: 'search',
    link: '/search',
    icon: <img className={style.icon} src={searchSvg} alt="" />,
    label: 'SEARCH',
  },
  {
    key: 'tips',
    link: '/tips',
    icon: <img className={style.icon} src={tipSvg} alt="" />,
    label: 'NOTIFICATION',
  },
  // {
  //   key: 'message',
  //   link: '/message',
  //   icon: <img className={style.icon} src={messageSvg} alt="" />,
  //   label: 'Message',
  // },
  {
    key: 'profile',
    link: '/profile',
    icon: <img className={style.icon} src={messageSvg} alt="" />,
    label: 'PROFILE',
  },
  {
    key: 'health',
    link: '/health',
    icon: <img className={style.icon} src={twitterLogSvg} alt="" />,
    label: 'HEALTH',
  },
];
export const createTweetItem = [
  {
    key: 'post',
    link: '/createTweet',
    label: 'Post Tweet',
  },
];
export const logOut = [
  {
    key: 'logout',
    label: 'Log Out',
  },
];

export const allLinks = [
  {
    key: 'login',
    link: '/login',
  },
  {
    key: 'register',
    link: '/register',
  },
  {
    key: 'tweets',
    link: '/',
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
    key: 'health',
    link: '/health',
  },
  {
    key: 'post',
    link: '/createTweet',
  },
  {
    key: 'profile',
    link: '/profile',
  },
  {
    key: 'tweet',
    link: '/tweet/:id',
  },
];

export const items = [
  {
    key: 'tweet',
    label: 'Tweets',
    children: '',
  },
  {
    key: 'replies',
    label: 'Replies',
    children: 'Replies',
  },
  {
    key: 'likes',
    label: 'Likes',
    children: 'Likes',
  },
];
export const getMenuByKey = (key) => allLinks.find((item) => item.key === key);
export const getMenuByLink = (link) => allLinks.find((item) => matchPath(item.link, link));

export const includeMenu = (link) => menuItems.some((item) => item.link === link);
