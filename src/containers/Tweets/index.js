import { useEffect, useState, createRef } from 'react';
import {
  CellMeasurer, CellMeasurerCache, List, WindowScroller,
} from 'react-virtualized';
import Nav from '@components/Nav';
import TweetCard from '@components/TweetCard';
import { message } from 'antd';
import { useAppContext } from '@utils/context';
import { getFeeds, getMoreFeeds } from '@services/tweet';
import TabContentWithInfiniteScroll from '@components/LoadMore';
import Avatar from '@components/Avatar';
import { followUser, getRandomUser, unFollowUser } from '@services/users';
import { useNavigate } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import style from './index.module.scss';

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
  const [hasMore, setHasMore] = useState(false);
  const [ltTime, setLtTime] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [previousHasMore, setPreviousHasMore] = useState(false);
  const listRef = createRef();
  const nav = useNavigate();

  useEffect(() => {
    setStore({
      closeHeaderHandler: null,
    });
    const init = async () => {
      const res = await getFeeds();
      const users = await getRandomUser();
      const tweets = res.results;
      setData(tweets);
      setFilteredData(tweets);
      setLtTime(tweets[tweets.length - 1]?.created_at);
      setHasMore(res.has_next_page);
      setPreviousHasMore(res.has_next_page);
      setSuggestUsers(users);
    };
    init();
  }, []);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.recomputeRowHeights();
      listRef.current.forceUpdate();
    }
  }, [filteredData]);

  const loadMore = async (time) => {
    const res = await getMoreFeeds(time);
    const tweets = res.results;
    setLtTime(tweets[tweets.length - 1]?.created_at);
    setData((d) => [...d, ...tweets]);
    setFilteredData((d) => [...d, ...tweets]);
    setHasMore(res.has_next_page);
    setPreviousHasMore(res.has_next_page);
  };

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
          <TweetCard key={filteredData[index].tweet.id} dataSource={filteredData[index].tweet} />
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
          nav('/profile', { state: { isMy: false, user } });
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

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value === '') {
      setFilteredData(data);
    }
  };

  const handleSearchSubmit = () => {
    if (searchQuery !== '') {
      const filtered = filteredData.filter(({
        tweet,
      }) => tweet.content.toLowerCase().includes(searchQuery.toLowerCase()));
      setFilteredData(filtered);
      setHasMore(false);
    } else {
      setFilteredData(data);
      setHasMore(previousHasMore);
    }
  };

  const resetFilter = () => {
    setFilteredData(data);
    setHasMore(previousHasMore);
    setSearchQuery('');
  };

  return (
    <div className={style.container}>
      <aside className={style.leftSider}>
        <Nav />
      </aside>
      <main className={style.mainContent}>
        <form onSubmit={handleSearchSubmit} className={style.searchContainer}>
          {searchQuery
            && (
            <LeftOutlined
              className={style.closeIcon}
              onClick={resetFilter}
            />
            )}
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchInputChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSearchSubmit();
              }
            }}
            placeholder="Search tweets"
            className={style.searchInput}
          />
        </form>
        <WindowScroller>
          {({
            height,
            isScrolling,
            registerChild,
            onChildScroll,
            scrollTop,
          }) => (
            <div ref={registerChild}>
              <List
                ref={listRef}
                isScrolling={isScrolling}
                onScroll={onChildScroll}
                scrollTop={scrollTop}
                isScrollingOptOut
                autoHeight
                height={height}
                deferredMeasurementCache={cache}
                rowHeight={cache.rowHeight}
                overscanRowCount={2}
                rowCount={filteredData.length}
                rowRenderer={rowRenderer}
                width={600}
              />
            </div>
          )}
        </WindowScroller>
        <TabContentWithInfiniteScroll
          hasMore={hasMore}
          onLoadMore={() => loadMore(ltTime)}
        />
      </main>
      <aside className={style.rightSider}>
        <div style={{ padding: 24, textAlign: 'left' }}>
          <p className={style.Header}>Who to follow</p>
          {renderUserList()}
        </div>
      </aside>
    </div>
  );
};

export default Tweets;
