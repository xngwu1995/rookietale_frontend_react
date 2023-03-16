import { useEffect, useState } from 'react';
import {
  CellMeasurer, CellMeasurerCache, List, WindowScroller,
} from 'react-virtualized';
import Nav from '@components/Nav';
import TweetCard from '@components/TweetCard';
import { Layout } from 'antd';
import { useAppContext } from '@utils/context';
import { getFeeds } from '@services/tweet';

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

  useEffect(() => {
    setStore({
      closeHeaderHandler: null,
    });
    const init = async () => {
      const res = await getFeeds();
      setData(res.newsfeeds);
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

  return (
    <div style={{ minHeight: '100vh' }}>
      <Layout>
        <Sider
          theme="light"
          width={300}
          style={{
            marginLeft: 300,
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
            marginLeft: 300,
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
            width={300}
            style={{
              marginRight: 200,
              padding: '20px 0',
              overflow: 'auto',
              height: '100%',
              position: 'fixed',
              right: 0,
            }}
          >
            <div style={{ padding: 24, textAlign: 'left' }}>
              <p>Who to follow</p>
            </div>
          </Sider>
        </Layout>
      </Layout>
    </div>
  );
};

export default Tweets;
