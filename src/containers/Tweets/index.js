import { useCallback, useEffect, useState } from 'react';
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
  minHeight: 100,
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
  console.log('data', data);
  const rowRenderer = useCallback(({
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
          <TweetCard dataSource={data[index].tweet} />
        </div>
      )}
    </CellMeasurer>
  ), [data]);
  return (
    <Layout>
      <Sider
        theme="light"
        width={300}
        style={{
          padding: '50px 0',
          overflow: 'auto',
          height: '100%',
          position: 'fixed',
        }}
      >
        <Nav />
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 300, width: '1100px' }}>
        <Content
          style={{
            padding: '50px 24px',
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
