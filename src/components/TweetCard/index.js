import Bar from '@components/Bar';
import ImageCard from '@components/ImageCard';
import moment from 'moment';
import { useState, useEffect } from 'react';

import style from './index.module.scss';

const tweet = {
  id: 1,
  user: {
    id: 1,
    username: 'ybb0812',
    nickname: 'Wang Xiao Mei',
    avatar_url: 'https://img.shoufaw.com/wp-content/uploads/2020/10/aEjURn.jpg',
  },
  created_at: '2022-02-15T04:38:34.078407Z',
  content: "Life is too short to waste time on things that don't matter. Focus on what brings you joy and fulfillment, and let go of the rest. #lifegoals #happiness",
  comments_count: 10,
  likes_count: 10,
  has_liked: true,
  photo_urls: [
    'https://mooc-drop.oss-cn-beijing.aliyuncs.com/20200607085521_Czt8N.gif',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZuKXKJeqzfVVrwwS6IZ0NfZUwaxMoXiJkeya7tUM04zl3BJtbbbx2rThPKxwpXeufwbc&usqp=CAU',
    'https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2021/08/12/realtime/13315182.jpg',
    // 'https://mooc-drop.oss-cn-beijing.aliyuncs.com/64427024ly1h3sbdtbpvzj21ec0xmah0.jpeg',
  ],
};

/**
*
*/
const TweetCard = () => {
  const [data, setDate] = useState();
  useEffect(() => {
    console.log('data', data);
    setDate([]);
  }, []);
  return (
    <div className={style.container}>
      <div className={style.avatarContainer}>
        <img src={tweet.user.avatar_url} alt="personalImg" className={style.avatar} />
      </div>
      <div className={style.contentContainer}>
        <div className={style.header}>
          <span className={style.nickname}>
            {tweet.user.nickname}
          </span>
          @
          <span className={style.username}>
            {tweet.user.username}
          </span>
          &nbsp;~&nbsp;
          {`${moment(tweet.created_at).format('mm')}minute`}
        </div>
        <div className={style.content}>
          {tweet.content}
        </div>
        <div className={style.photo}>
          <ImageCard imgs={tweet.photo_urls} />
        </div>
        <div className={style.bar}>
          <Bar commentsCount={tweet.comments_count} likesCount={tweet.likes_count} id={tweet.id} />
        </div>
      </div>
    </div>
  );
};

export default TweetCard;
