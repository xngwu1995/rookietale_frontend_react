import { useState, useEffect } from 'react';
import Nav from '@components/Nav';
import TweetCard from '@components/TweetCard';
import { Layout } from 'antd';

const { Content, Sider } = Layout;
/**
*
*/
const Tweets = () => {
  const [data, setDate] = useState();
  useEffect(() => {
    console.log('data', data);
    setDate([]);
  }, []);
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
      <Layout className="site-layout" style={{ marginLeft: 300 }}>
        <Content style={{
          padding: '40px 24px',
          overflow: 'initial',
          width: '60%',
        }}
        >
          <TweetCard />
          <TweetCard />
          <TweetCard />
          <TweetCard />
          <TweetCard />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Tweets;
