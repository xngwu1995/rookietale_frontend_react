import { useEffect, useState } from "react";
import Nav from "@components/Nav";
import TweetCard from "@components/TweetCard";
import { message, Button, Input, Card, List, Avatar } from "antd";
import { useAppContext } from "@utils/context";
import { getFeeds, getMoreFeeds } from "@services/tweet";
import TabContentWithInfiniteScroll from "@components/LoadMore";
import MoneyText from "@components/MoneyText";
import { followUser, getRandomUser, unFollowUser } from "@services/users";
import { useGoTo } from "@utils/hooks";
import style from "./index.module.scss";

const { Search } = Input;

const Tweets = () => {
  const [store, setStore] = useAppContext();
  const [data, setData] = useState([]);
  const [following, setFollowing] = useState([]);
  const [suggestUsers, setSuggestUsers] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [ltTime, setLtTime] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [previousHasMore, setPreviousHasMore] = useState(false);
  const go = useGoTo();

  useEffect(() => {
    setStore({ closeHeaderHandler: null });
  }, []);

  useEffect(() => {
    const init = async () => {
      if (!store.user) {
        go("login");
      }
      if (store.user) {
        const res = await getFeeds();
        const users = await getRandomUser();
        const tweets = res.results || [];
        setData(tweets);
        setFilteredData(tweets);
        setLtTime(tweets[tweets.length - 1]?.created_at || "");
        setHasMore(res.has_next_page);
        setPreviousHasMore(res.has_next_page);
        setSuggestUsers(users);
      }
    };
    init();
  }, []);

  const loadMore = async time => {
    const res = await getMoreFeeds(time);
    const tweets = res.results || [];
    setLtTime(tweets[tweets.length - 1]?.created_at || "");
    setData(d => [...d, ...tweets]);
    setFilteredData(d => [...d, ...tweets]);
    setHasMore(res.has_next_page);
    setPreviousHasMore(res.has_next_page);
  };

  const toggleFollowing = async userId => {
    if (following.includes(userId)) {
      const res = await unFollowUser(userId);
      if (res.success) {
        message.success("Successfully Unfollowed!");
        setFollowing(prevFollowing =>
          prevFollowing.filter(id => id !== userId)
        );
        return;
      }
      message.error("Ops, Can't Unfollow!");
    } else {
      const res = await followUser(userId);
      if (res.created_at) {
        message.success("Successfully Followed!");
        setFollowing(prevFollowing => [...prevFollowing, userId]);
        return;
      }
      message.error("Ops, Can't Follow!");
    }
  };

  const renderUserList = () => (
    <List itemLayout="horizontal" dataSource={suggestUsers}>
      {suggestUsers.map(user => (
        <List.Item
          key={user.id}
          actions={[
            <Button
              type={following.includes(user.id) ? "primary" : "default"}
              onClick={() => toggleFollowing(user.id)}
            >
              {following.includes(user.id) ? "Following" : "Follow"}
            </Button>,
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar src={user.avatar} size={40} />}
            title={user.nickname}
            description={`@${user.username}`}
          />
        </List.Item>
      ))}
    </List>
  );

  const handleSearch = value => {
    setSearchQuery(value);
    if (value) {
      const filtered = data.filter(({ tweet }) =>
        tweet.content.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filtered);
      setHasMore(false);
    } else {
      setFilteredData(data);
      setHasMore(previousHasMore);
    }
  };

  return (
    <div className={style.container}>
      <aside className={style.leftSider}>
        <Nav />
      </aside>
      <main className={style.mainContent}>
        <MoneyText />
        <div className={style.searchContainer}>
          <Search
            placeholder="Search tweets"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onSearch={handleSearch}
            enterButton
            allowClear
          />
        </div>
        <List itemLayout="horizontal" dataSource={filteredData}>
          {filteredData.map(item => (
            <List.Item key={item.tweet.id}>
              <TweetCard dataSource={item.tweet} />
            </List.Item>
          ))}
        </List>
        <TabContentWithInfiniteScroll
          hasMore={hasMore}
          onLoadMore={() => loadMore(ltTime)}
        />
      </main>
      <aside className={style.rightSider}>
        <Card title="Who to follow" style={{ padding: 24 }}>
          {renderUserList()}
        </Card>
      </aside>
    </div>
  );
};

export default Tweets;
