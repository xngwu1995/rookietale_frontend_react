import { useEffect, useState } from 'react';
import { Button, Tabs } from 'antd';
import { useAppContext } from '@utils/context';
// import { items } from '@utils/constants';
import TweetCard from '@components/TweetCard';
import { useGoTo } from '@utils/hooks';
// import { getTweets } from '@services/tweet';
import { useNavigate } from 'react-router-dom';
import style from './index.module.scss';

const defaultTweet = {
  id: 6,
  user: {
    id: 1,
    username: 'admin',
    nickname: 'IU',
    avatar_url: 'https://img.shoufaw.com/wp-content/uploads/2020/10/aEjURn.jpg',
    acvatar_url_0: 'https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2021/08/12/realtime/13315182.jpg',
  },
  comments: [
    {
      id: 10,
      tweet_id: 6,
      user: {
        id: 2,
        username: 'admin',
        nickname: 'IUShadow',
        avatar_url: 'https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2021/08/12/realtime/13315182.jpg',
      },
      created_at: '2022-02-15T04:38:34.078407Z',
      content: 'I wanna make a test, I wanna make a test, I wanna make a test, I wanna make a test, I wanna make a test, I wanna make a test',
      likes_count: 1110,
      has_liked: false,
    },
  ],
  created_at: '2022-02-15T04:38:34.078407Z',
  content: 'I wanna make a test, I wanna make a test, I wanna make a test, I wanna make a test, I wanna make a test, I wanna make a testI wanna make a test, I wanna make a test, I wanna make a test, I wanna make a test, I wanna make a test, I wanna make a test I wanna make a test, I wanna make a test, I wanna make a test, I wanna make a test, I wanna make a test, I wanna make a testI wanna make a test, I wanna make a test, I wanna make a test, I wanna make a test, I wanna make a test, I wanna make a test',
  comments_count: 10,
  likes_count: 10,
  has_liked: true,
  photo_urls: [
    'https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2021/08/12/realtime/13315182.jpg',
    'https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2021/08/12/realtime/13315182.jpg',
    'https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2021/08/12/realtime/13315182.jpg',
    'https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2021/08/12/realtime/13315182.jpg',
  ],
};
const tweets = [{
  id: 1,
  user: {
    id: 1,
    username: 'ybb0812',
    nickname: 'Wang Xiao Mei',
    avatar_url: 'https://img.shoufaw.com/wp-content/uploads/2020/10/aEjURn.jpg',
  },
  created_at: '2022-02-15T04:38:34.078407Z',
  content: "Life is too short to waste time on things that don't matter. Focus on what brings you joy and fulfillment, and let go of the rest. #lifegoals #happinessLife is too short to waste time on things that don't matter. Focus on what brings you joy and fulfillment, and let go of the rest. #lifegoals #happinessLife is too short to waste time on things that don't matter. Focus on what brings you joy and fulfillment, and let go of the rest. #lifegoals #happinessLife is too short to waste time on things that don't matter. Focus on what brings you joy and fulfillment, and let go of the rest. #lifegoals #happinessLife is too short to waste time on things that don't matter. Focus on what brings you joy and fulfillment, and let go of the rest. #lifegoals #happinessLife is too short to waste time on things that don't matter. Focus on what brings you joy and fulfillment, and let go of the rest. #lifegoals #happiness",
  comments_count: 0,
  likes_count: 10,
  has_liked: true,
  photo_urls: [
    'https://mooc-drop.oss-cn-beijing.aliyuncs.com/20200607085521_Czt8N.gif',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZuKXKJeqzfVVrwwS6IZ0NfZUwaxMoXiJkeya7tUM04zl3BJtbbbx2rThPKxwpXeufwbc&usqp=CAU',
    'https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2021/08/12/realtime/13315182.jpg',
    // 'https://mooc-drop.oss-cn-beijing.aliyuncs.com/64427024ly1h3sbdtbpvzj21ec0xmah0.jpeg',
  ],
},
{
  id: 1,
  user: {
    id: 1,
    username: 'ybb0812',
    nickname: 'Wang Xiao Mei',
    avatar_url: 'https://img.shoufaw.com/wp-content/uploads/2020/10/aEjURn.jpg',
  },
  created_at: '2022-02-15T04:38:34.078407Z',
  content: 'Fuck Ad, Fuck All ',
  comments_count: 10,
  likes_count: 0,
  has_liked: true,
  photo_urls: [
    'https://mooc-drop.oss-cn-beijing.aliyuncs.com/20200607085521_Czt8N.gif',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZuKXKJeqzfVVrwwS6IZ0NfZUwaxMoXiJkeya7tUM04zl3BJtbbbx2rThPKxwpXeufwbc&usqp=CAU',
    'https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2021/08/12/realtime/13315182.jpg',
    // 'https://mooc-drop.oss-cn-beijing.aliyuncs.com/64427024ly1h3sbdtbpvzj21ec0xmah0.jpeg',
  ],
},
{
  id: 1,
  user: {
    id: 1,
    username: 'ybb0812',
    nickname: 'Wang Xiao Mei',
    avatar_url: 'https://img.shoufaw.com/wp-content/uploads/2020/10/aEjURn.jpg',
  },
  created_at: '2022-02-15T04:38:34.078407Z',
  content: "Life is too short to waste time on things that don't matter. Focus on what brings you joy and fulfillment, and let go of the rest. #lifegoals #happinessLife is too short to waste time on things that don't matter. Focus on what brings you joy and fulfillment, and let go of the rest. #lifegoals #happinessLife is too short to waste time on things that don't matter. Focus on what brings you joy and fulfillment, and let go of the rest. #lifegoals #happinessLife is too short to waste time on things that don't matter. Focus on what brings you joy and fulfillment, and let go of the rest. #lifegoals #happinessLife is too short to waste time on things that don't matter. Focus on what brings you joy and fulfillment, and let go of the rest. #lifegoals #happinessLife is too short to waste time on things that don't matter. Focus on what brings you joy and fulfillment, and let go of the rest. #lifegoals #happiness",
  comments_count: 0,
  likes_count: 10,
  has_liked: true,
  photo_urls: [],
},
];
const items = [
  {
    key: 'tweet',
    label: 'Tweets',
    children: tweets.map((tweet) => <TweetCard dataSource={tweet} />),
  },
  {
    key: 'media',
    label: 'Medias',
    children: tweets.filter((tweet) => tweet.photo_urls.length > 0)
      .map((tweet) => <TweetCard dataSource={tweet} />),
  },
  {
    key: 'replies',
    label: 'Replies',
    children: tweets.filter((tweet) => tweet.comments_count > 0)
      .map((tweet) => <TweetCard dataSource={tweet} />),
  },
  {
    key: 'likes',
    label: 'Likes',
    children: tweets.filter((tweet) => tweet.likes_count > 0)
      .map((tweet) => <TweetCard dataSource={tweet} />),
  },
];
/**
* Personal Info
*/
const My = () => {
  const [data] = useState(defaultTweet);
  const [, setStore] = useAppContext();
  const navigate = useNavigate();
  const go = useGoTo();
  useEffect(() => {
    // const init = async () => {
    //   const res = await getTweets();
    //   console.log('res', res);
    // };
    // init();
    setStore({ closeHeaderHandler: () => go('/') });
  }, []);
  const onChange = (key) => {
    // items.key.children = <TweetCard dataSource={tweets} />;
    console.log('key', key);
  };
  return (
    <div className={style.container}>
      <div className={style.header} />
      <img className={style.avatar} src={data.user?.avatar_url} alt="" />
      <Button
        className={style.edit}
        onClick={() => navigate('/edituser')}
      >
        Edit Profile
      </Button>
      <div className={style.nickname}>
        {data.user?.nickname || 'unknown'}
      </div>
      <div className={style.username}>
        @
        {data.user?.username}
      </div>
      <div className={style.follower}>
        <span className={style.number1}>
          100
        </span>
        <span>Follower</span>
        <span className={style.number2}>
          200
        </span>
        <span>Following</span>
      </div>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} className={style.tabs} centered size="large" />
    </div>
  );
};

export default My;
