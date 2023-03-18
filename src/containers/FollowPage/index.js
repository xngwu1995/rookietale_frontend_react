import React, { useEffect, useState } from 'react';
import {
  message,
  Tabs,
} from 'antd';
import { useAppContext } from '@utils/context';
import { useGoTo } from '@utils/hooks';
import {
  followUser, getFollowers, getFollowings, unFollowUser,
} from '@services/users';
import { getTweets } from '@services/tweet';
import { useNavigate } from 'react-router-dom';
import Avatar from '@components/Avatar';
import style from './index.module.scss';

const { TabPane } = Tabs;

const FollowPage = () => {
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [followingsID, setFollowingsID] = useState([]);
  const [loading, setLoading] = useState(false);
  const [store, setStore] = useAppContext();
  const nav = useNavigate();
  const go = useGoTo();

  useEffect(() => {
    if (!store.user.id) return;
    setStore({ closeHeaderHandler: () => go('/') });
    const init = async () => {
      const res = await getFollowers(store.user?.id);
      setFollowers(res.followers);
      const data = await getFollowings(store.user?.id);
      setFollowings(data.followings);
      setFollowingsID(data.followings.map((following) => following.user.id));
    };
    init();
  }, []);

  const toggleFollowing = async (userId) => {
    setLoading(true);
    if (followingsID.includes(userId)) {
      const res = await unFollowUser(userId);
      setLoading(false);
      if (res.success) {
        message.success('Successfully Unfollowed!');
        setFollowingsID((prevFollowing) => prevFollowing.filter((id) => id !== userId));
        return;
      }
      message.error("Ops, Can't Unfollow!");
    } else {
      const res = await followUser(userId);
      setLoading(false);
      if (res.created_at) {
        message.success('Successfully Followed!');
        setFollowingsID((prevFollowing) => [...prevFollowing, userId]);
        return;
      }
      message.error("Ops, Can't Follow!");
    }
  };

  const renderFollowersList = () => (
    <ul>
      {followers && followers.map((user) => {
        const currenFollowers = user.user;
        const handleAvatarClick = async () => {
          const res = await getTweets(currenFollowers.id);
          nav('/profile', { state: { passedData: res, isMy: false, currentUser: currenFollowers } });
        };
        return (
          <li key={currenFollowers.id} style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
            <Avatar avatarUrl={currenFollowers.avatar_url} size={40} onClick={handleAvatarClick} />
            <div style={{ marginLeft: 16 }}>
              <div style={{ fontWeight: 'bold' }}>{currenFollowers.nickname}</div>
              <div>
                @
                {currenFollowers.username}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );

  const renderFollowingsList = () => (
    <ul>
      {followings && followings.map((user) => {
        const currenFollowings = user.user;
        const userId = currenFollowings.id;
        const isFollowing = followingsID.includes(userId);

        const handleAvatarClick = async () => {
          const res = await getTweets(userId);
          nav('/profile', { state: { passedData: res, isMy: false, currentUser: currenFollowings } });
        };

        return (
          <li key={currenFollowings.id} style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
            <Avatar avatarUrl={currenFollowings.avatar_url} size={40} onClick={handleAvatarClick} />
            <div style={{ marginLeft: 16 }}>
              <div style={{ fontWeight: 'bold' }}>{currenFollowings.nickname}</div>
              <div>
                @
                {currenFollowings.username}
              </div>
            </div>
            <button
              type="button"
              style={{
                marginLeft: 'auto',
                padding: '6px 12px',
                backgroundColor: 'transparent',
                color: '#1890ff',
                border: '1px solid #1890ff',
                borderRadius: 20,
                cursor: 'pointer',
                transition: 'all 0.3s',
                fontSize: 14,
                fontWeight: 'bold',
                letterSpacing: '0.5px',
              }}
              onClick={() => !loading && toggleFollowing(userId)}
            >
              {isFollowing ? 'Unfollow' : 'Follow'}
            </button>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className={style.followPage}>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Followers" key="1">
          {renderFollowersList()}
        </TabPane>
        <TabPane tab="Following" key="2">
          {renderFollowingsList()}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default FollowPage;
