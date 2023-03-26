import { useEffect, useState } from 'react';
import {
  CellMeasurer, CellMeasurerCache, List, WindowScroller,
} from 'react-virtualized';
import Nav from '@components/Nav';
import TweetCard from '@components/TweetCard';
import { Layout, message } from 'antd';
import { useAppContext } from '@utils/context';
import { getFeeds, getTweets } from '@services/tweet';
import Avatar from '@components/Avatar';
import { followUser, getRandomUser, unFollowUser } from '@services/users';
import { useNavigate } from 'react-router-dom';
import style from './index.module.scss';

const { Content, Sider } = Layout;

const cache = new CellMeasurerCache({
  fixedWidth: true,
  minHeight: 110,
});
/**
*
*/
const Tweets = () => {
  const [, setStore] = useAppContext();
  const [data, setData] = useState([]);
  const [following, setFollowing] = useState([]);
  const [suggestUsers, setSuggestUsers] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    setStore({
      closeHeaderHandler: null,
    });
    const init = async () => {
      const res = await getFeeds();
      const users = await getRandomUser();
      setData(res.newsfeeds);
      setSuggestUsers(users);
    };
    init();
  }, []);

  const rowRenderer = ({
    index,
    key,
    style: sy,
    parent,
  }) => (
    <CellMeasurer
      cache={cache}
      columnIndex={0}
      key={key}
      rowIndex={index}
      parent={parent}
    >
      {({ registerChild }) => (
        <div style={sy} key={key} ref={registerChild}>
          <TweetCard dataSource={data[index].tweet} />
        </div>
      )}
    </CellMeasurer>
  );

  const toggleFollowing = async (userId) => {
    if (following.includes(userId)) {
      const res = await unFollowUser(userId);
      if (res.success) {
        message.success('Successfully Unfollowed!');
        setFollowing((prevFollowing) => prevFollowing.filter((id) => id !== userId));
        return;
      }
      message.error("Ops, Can't Unfollow!");
    } else {
      const res = await followUser(userId);
      if (res.created_at) {
        message.success('Successfully Followed!');
        setFollowing((prevFollowing) => [...prevFollowing, userId]);
        return;
      }
      message.error("Ops, Can't Follow!");
    }
  };

  const handleMouseOver = (e, isFollowing) => {
    if (!isFollowing) {
      e.target.style.backgroundColor = 'rgba(24, 144, 255, 0.1)';
    }
  };

  const handleMouseOut = (e, isFollowing) => {
    if (!isFollowing) {
      e.target.style.backgroundColor = 'transparent';
    }
  };

  const renderUserList = () => (
    <ul>
      {suggestUsers.map((user) => {
        const handleAvatarClick = async () => {
          const res = await getTweets(user.id);
          nav('/profile', { state: { passedData: res, isMy: false, currentUser: user } });
        };
        const isFollowing = following.includes(user.id);

        return (
          <li key={user.id} style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
            <Avatar avatarUrl={user.avatar_url} size={40} onClick={handleAvatarClick} />
            <div style={{ marginLeft: 16 }}>
              <div style={{ fontWeight: 'bold' }}>{user.nickname}</div>
              <div>
                @
                {user.username}
              </div>
            </div>
            <button
              type="button"
              style={{
                marginLeft: 'auto',
                padding: '6px 12px',
                backgroundColor: isFollowing ? '#1890ff' : 'transparent',
                color: isFollowing ? '#ffffff' : '#1890ff',
                border: '1px solid #1890ff',
                borderRadius: 20,
                cursor: 'pointer',
                transition: 'all 0.3s',
                fontSize: 14,
                fontWeight: 'bold',
                letterSpacing: '0.5px',
              }}
              onMouseOver={(e) => handleMouseOver(e, isFollowing)}
              onMouseOut={(e) => handleMouseOut(e, isFollowing)}
              onFocus={(e) => handleMouseOver(e, isFollowing)}
              onBlur={(e) => handleMouseOut(e, isFollowing)}
              onClick={() => toggleFollowing(user.id)}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </button>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div style={{ minHeight: '100vh' }}>
      <Layout>
        <Sider
          theme="light"
          width={300}
          style={{
            marginTop: 20,
            marginLeft: 200,
            padding: '50px 0',
            overflow: 'auto',
            height: '100%',
            position: 'fixed',
          }}
        >
          <Nav />
        </Sider>
        <Layout
          className="site-layout"
          style={{
            marginTop: 15,
            marginLeft: 200,
            paddingLeft: 300,
            paddingRight: 300,
            width: '100%',
          }}
        >
          <Content
            style={{
              padding: '50px 24px',
              overflow: 'auto',
              maxWidth: 800,
            }}
          >
            <WindowScroller>
              {({
                height, isScrolling, registerChild, onChildScroll, scrollTop,
              }) => (
                <div ref={registerChild}>
                  <List
                    isScrolling={isScrolling}
                    onScroll={onChildScroll}
                    scrollTop={scrollTop}
                    isScrollingOptOut
                    autoHeight
                    height={height}
                    deferredMeasurementCache={cache}
                    rowHeight={cache.rowHeight}
                    overscanRowCount={2}
                    rowCount={data.length}
                    rowRenderer={rowRenderer}
                    width={800}
                  />
                </div>
              )}
            </WindowScroller>
          </Content>
          <Sider
            theme="light"
            width={400}
            style={{
              marginTop: 20,
              marginRight: 200,
              padding: '20px 0',
              overflow: 'auto',
              height: '100%',
              position: 'fixed',
              right: 0,
            }}
          >
            <div style={{ padding: 24, textAlign: 'left' }}>
              <p className={style.Header}>Who to follow</p>
              {renderUserList()}
            </div>
          </Sider>
        </Layout>
      </Layout>
    </div>
  );
};

export default Tweets;
