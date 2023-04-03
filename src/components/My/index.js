import { useEffect, useState } from 'react';
import { Button, Tabs } from 'antd';
import { useAppContext } from '@utils/context';
import TweetCard from '@components/TweetCard';
import { useGoTo } from '@utils/hooks';
import { getMoreTweets, getTweets } from '@services/tweet';
import { useLocation, useNavigate } from 'react-router-dom';
import TabContentWithInfiniteScroll from '@components/LoadMore';
import style from './index.module.scss';

/**
* Personal Info
*/
const My = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [store, setStore] = useAppContext();
  const [isMy, setIsMy] = useState(true);
  const [currentUser, setCurrentUser] = useState(store.user);
  const [hasMore, setHasMore] = useState(false);
  const [ltTime, setLtTime] = useState('');
  const [activeKey, setActiveKey] = useState('tweet');
  const navigate = useNavigate();
  const go = useGoTo();

  const init = async (key) => {
    const res = await getTweets(currentUser.id, key);
    const tweets = res.results;
    setData(tweets);
    setLtTime(tweets[tweets.length - 1]?.created_at);
    setHasMore(res.has_next_page);
  };

  const loadMore = async (key, time) => {
    const res = await getMoreTweets(currentUser?.id, key, time);
    const tweets = res.results;
    setLtTime(tweets[tweets.length - 1]?.created_at);
    setData((d) => [...d, ...tweets]);
    setHasMore(res.has_next_page);
  };

  useEffect(() => {
    setStore({ closeHeaderHandler: () => go('/') });
    setIsMy(location.state.isMy);
    setCurrentUser(location.state.user);
    init(activeKey);
  }, [currentUser, activeKey]);

  const items = [
    {
      key: 'tweet',
      label: 'Tweets',
      children: (
        <div>
          {data.map((tweet) => (
            <TweetCard key={tweet.id} dataSource={tweet} />
          ))}
          <TabContentWithInfiniteScroll
            hasMore={hasMore}
            onLoadMore={() => loadMore(activeKey, ltTime)}
          />
        </div>
      ),
    },
    {
      key: 'media',
      label: 'Medias',
      children: (
        <div>
          {data.map((tweet) => (
            <TweetCard key={tweet.id} dataSource={tweet} />
          ))}
          <TabContentWithInfiniteScroll
            hasMore={hasMore}
            onLoadMore={() => loadMore(activeKey, ltTime)}
          />
        </div>
      ),
    },
    {
      key: 'replies',
      label: 'Replies',
      children: (
        <div>
          {data.map((tweet) => (
            <TweetCard key={tweet.id} dataSource={tweet} />
          ))}
          <TabContentWithInfiniteScroll
            hasMore={hasMore}
            onLoadMore={() => loadMore(activeKey, ltTime)}
          />
        </div>
      ),
    },
    {
      key: 'likes',
      label: 'Likes',
      children: (
        <div>
          {data.map((tweet) => (
            <TweetCard key={tweet.id} dataSource={tweet} />
          ))}
          <TabContentWithInfiniteScroll
            hasMore={hasMore}
            onLoadMore={() => loadMore(activeKey, ltTime)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className={style.container}>
      <div className={style.header} />
      <img className={style.avatar} src={currentUser.avatar_url} alt="" />
      {isMy && (
      <Button
        className={style.edit}
        onClick={() => navigate('/edituser')}
      >
        Edit Profile
      </Button>
      )}
      <div className={style.nickname}>
        {currentUser.nickname || 'unknown'}
      </div>
      <div className={style.username}>
        @
        {currentUser.username}
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
      <Tabs
        activeKey={activeKey}
        onChange={(key) => {
          setActiveKey(key);
        }}
        items={items}
        className={style.tabs}
        centered
        size="large"
      />
    </div>
  );
};

export default My;
