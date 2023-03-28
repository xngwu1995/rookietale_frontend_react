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
import CustomPagination from '@components/PaginationButton';
import UserList from '@components/UserList';
import style from './index.module.scss';

const { TabPane } = Tabs;

const FollowPage = () => {
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [followingsID, setFollowingsID] = useState([]);
  const [loading, setLoading] = useState(false);
  const [store, setStore] = useAppContext();

  const [followersPage, setFollowersPage] = useState(1);
  const [followingsPage, setFollowingsPage] = useState(1);
  const [followersPageSize, setFollowersPageSize] = useState(20);
  const [followingsPageSize, setFollowingsPageSize] = useState(20);
  const [followersTotal, setFollowersTotal] = useState(0);
  const [followingsTotal, setFollowingsTotal] = useState(0);

  const nav = useNavigate();
  const go = useGoTo();

  const init = async () => {
    const res = await getFollowers(store.user?.id, followersPage, followersPageSize);
    setFollowersTotal(res.total_pages);
    setFollowers(res.followers);

    const data = await getFollowings(store.user?.id, followingsPage, followingsPageSize);
    setFollowingsTotal(data.total_pages);
    setFollowings(data.followings);
    setFollowingsID(data.followings.map((following) => following.user.id));
  };

  useEffect(() => {
    if (!store.user.id) return;
    setStore({ closeHeaderHandler: () => go('/') });
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

  const handleFollowersPageChange = (page, pageSize) => {
    setFollowersPage(page);
    setFollowersPageSize(pageSize);
    init();
  };

  const handleFollowingsPageChange = (page, pageSize) => {
    setFollowingsPage(page);
    setFollowingsPageSize(pageSize);
    init();
  };

  const renderFollowersList = () => (
    <>
      <UserList
        users={followers}
        userIds={followingsID}
        onAvatarClick={async (currentUser) => {
          const res = await getTweets(currentUser.id);
          nav('/profile', {
            state: { passedData: res, isMy: false, currentUser },
          });
        }}
        showFollowButton={false}
      />
      <CustomPagination
        current={followersPage}
        total={followersTotal}
        pageSize={followersPageSize}
        onChange={handleFollowersPageChange}
        onShowSizeChange={handleFollowersPageChange}
      />
    </>
  );

  const renderFollowingsList = () => (
    <>
      <UserList
        users={followings}
        userIds={followingsID}
        onAvatarClick={async (currentUser) => {
          const res = await getTweets(currentUser.id);
          nav('/profile', {
            state: { passedData: res, isMy: false, currentUser },
          });
        }}
        onToggleFollowing={toggleFollowing}
        loading={loading}
        showFollowButton
      />
      <CustomPagination
        current={followingsPage}
        total={followingsTotal}
        pageSize={followingsPageSize}
        onChange={handleFollowingsPageChange}
        onShowSizeChange={handleFollowingsPageChange}
      />
    </>
  );

  return (
    <div className={style.followPage}>
      <Tabs defaultActiveKey="1" style={{ marginTop: 20 }}>
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
