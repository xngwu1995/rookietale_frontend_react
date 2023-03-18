import { useEffect, useState } from 'react';
import { Button, Tabs } from 'antd';
import { useAppContext } from '@utils/context';
import TweetCard from '@components/TweetCard';
import { useGoTo } from '@utils/hooks';
import { getTweets } from '@services/tweet';
import { useLocation, useNavigate } from 'react-router-dom';
import style from './index.module.scss';

/**
* Personal Info
*/
const My = () => {
  const location = useLocation();
  const [isMy, setIsMy] = useState(true);
  const [data, setData] = useState([]);
  const [store, setStore] = useAppContext();
  const [currenUser, setCurrenUser] = useState('');
  const navigate = useNavigate();
  const go = useGoTo();

  useEffect(() => {
    setStore({ closeHeaderHandler: () => go('/') });
    if (location.state) {
      setIsMy(location.state?.isMy);
      setData(location.state?.passedData.tweets);
      setCurrenUser(location.state?.currentUser);
      return;
    }
    if (!store.user.id) return;
    const init = async () => {
      const res = await getTweets(store.user?.id);
      setData(res.tweets);
      setCurrenUser(store.user);
    };
    init();
  }, []);

  const items = [
    {
      key: 'tweet',
      label: 'Tweets',
      children: data.map((tweet) => <TweetCard dataSource={tweet} />),
    },
    {
      key: 'media',
      label: 'Medias',
      children: data.filter((tweet) => tweet.photo_urls.length > 0)
        .map((tweet) => <TweetCard dataSource={tweet} />),
    },
    {
      key: 'replies',
      label: 'Replies',
      children: data.filter((tweet) => tweet.comments_count > 0)
        .map((tweet) => <TweetCard dataSource={tweet} />),
    },
    {
      key: 'likes',
      label: 'Likes',
      children: data.filter((tweet) => tweet.likes_count > 0)
        .map((tweet) => <TweetCard dataSource={tweet} />),
    },
  ];

  return (
    <div className={style.container}>
      <div className={style.header} />
      <img className={style.avatar} src={currenUser.avatar_url} alt="" />
      {isMy && (
      <Button
        className={style.edit}
        onClick={() => navigate('/edituser')}
      >
        Edit Profile
      </Button>
      )}
      <div className={style.nickname}>
        {currenUser.nickname || 'unknown'}
      </div>
      <div className={style.username}>
        @
        {currenUser.username}
      </div>
      <div className={style.follower}>
        <span className={style.number1}>
          10000K
        </span>
        <span>Follower</span>
        <span className={style.number2}>
          1
        </span>
        <span>Following</span>
      </div>
      <Tabs defaultActiveKey="1" items={items} className={style.tabs} centered size="large" />
    </div>
  );
};

export default My;
