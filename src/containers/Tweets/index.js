import { useEffect, useState } from 'react';
import {
  CellMeasurer, CellMeasurerCache, List, WindowScroller,
} from 'react-virtualized';
import Nav from '@components/Nav';
import TweetCard from '@components/TweetCard';
import { Layout } from 'antd';
import { useAppContext } from '@utils/context';
import { getFeeds } from '@services/tweet';
import { InfiniteScroll } from 'antd-mobile';

const { Content, Sider } = Layout;
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
  comments_count: 10,
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
  likes_count: 10,
  has_liked: true,
  photo_urls: [
    'https://mooc-drop.oss-cn-beijing.aliyuncs.com/20200607085521_Czt8N.gif',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZuKXKJeqzfVVrwwS6IZ0NfZUwaxMoXiJkeya7tUM04zl3BJtbbbx2rThPKxwpXeufwbc&usqp=CAU',
    'https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2021/08/12/realtime/13315182.jpg',
    // 'https://mooc-drop.oss-cn-beijing.aliyuncs.com/64427024ly1h3sbdtbpvzj21ec0xmah0.jpeg',
  ],
},
];
const tweet1 = [
  {
    id: 1,
    user: {
      id: 1,
      username: 'ybb0812',
      nickname: 'Wang Xiao Mei',
      avatar_url: 'https://img.shoufaw.com/wp-content/uploads/2020/10/aEjURn.jpg',
    },
    created_at: '2022-02-15T04:38:34.078407Z',
    content: "Let's go, and let go of the rest. #lifegoals #happiness",
    comments_count: 10,
    likes_count: 10,
    has_liked: true,
    photo_urls: [
      'https://mooc-drop.oss-cn-beijing.aliyuncs.com/20200607085521_Czt8N.gif',
      'https://mooc-drop.oss-cn-beijing.aliyuncs.com/64427024ly1h3sbdtbpvzj21ec0xmah0.jpeg',
    ],
  },
];

const cache = new CellMeasurerCache({
  fixedWidth: true,
  minHeight: 200,
});
/**
*
*/
const Tweets = () => {
  const [, setStore] = useAppContext();
  const [data, setData] = useState(tweets);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    setStore({
      closeHeaderHandler: null,
    });
    const init = async () => {
      const res = await getFeeds();
      console.log('res', res);
      setData(tweets);
    };
    init();
  }, []);
  const noRowsRenderer = () => 'Loading...';
  const rowRenderer = ({
    index, key, style: sy, parent,
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
          <TweetCard dataSource={data[index]} />
        </div>
      )}
    </CellMeasurer>
  );
  const handleLoadMore = async () => {
    const res = await getFeeds();
    console.log('res', res);
    const newData = tweet1;
    setData((d) => [...d, ...newData]);
    if (newData.length === 0) {
      setHasMore(false);
    }
  };
  return (
    <Layout>
      <Sider
        theme="light"
        width={300}
        style={{
          padding: '40px 0',
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
        }}
      >
        <Nav />
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 300, width: '1100px' }}>
        <Content
          style={{
            padding: '40px 24px',
            overflow: 'initial',
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
                  autoHeight
                  height={height}
                  deferredMeasurementCache={cache}
                  rowHeight={cache.rowHeight}
                  overscanRowCount={2}
                  noRowsRenderer={noRowsRenderer}
                  rowCount={data.length}
                  rowRenderer={rowRenderer}
                  width={800}
                />
              </div>
            )}
          </WindowScroller>
          <InfiniteScroll loadMore={handleLoadMore} hasMore={hasMore} />
        </Content>
      </Layout>
      <Layout className="site-layout" style={{ marginRight: 300, width: '100%' }}>
        <Content style={{
          margin: '24px 16px 0', overflow: 'initial', backgroundColor: '#fff',
        }}
        >
          <div style={{ padding: 24, textAlign: 'left' }}>
            <p>Who to follow</p>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Tweets;
