// import TweetCard from '@components/TweetCard';
import { useState, useEffect } from 'react';
import style from './index.module.scss';

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
    <div className={style.container}>
      {/* <TweetCard /> */}

    </div>
  );
};

export default Tweets;
