import { matchPath } from 'react-router-dom';
import homeSvg from '@assets/home.svg';
import messageSvg from '@assets/message.svg';
import style from '../common.module.scss';

export const menuItems = [
  {
    key: 'tweets',
    link: '/',
    icon: <img className={style.icon} src={homeSvg} alt="" />,
    label: 'HOME',
  },
  {
    key: 'friendship',
    link: '/friendship',
    icon: <img className={style.icon} src={messageSvg} alt="" />,
    label: 'FRIENDSHIP',
  },
  {
    key: 'profile',
    link: '/profile',
    icon: <img className={style.icon} src={messageSvg} alt="" />,
    label: 'PROFILE',
  },
  {
    key: 'academicworld',
    icon: <img className={style.icon} src={messageSvg} alt="" />,
    label: 'ACADEMICWORLD',
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
  {
    key: 'friendship',
    link: '/friendship',
  },
  {
    key: 'academicworld',
    link: '/academicworld',
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
