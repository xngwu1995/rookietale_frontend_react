import ImageCard from '@components/ImageCard';
import { useState, useEffect } from 'react';
import Bar from '@components/Bar';
import moment from 'moment';
import CommentCard from '@components/CommentCard';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '@utils/context';
import { OBJECT_KEYS } from '@components/Bar/constants';
import style from './index.module.scss';

const defaultTweet = {
  id: 6,
  user: {
    id: 1,
    username: 'admin',
    nickname: 'IU',
    avatar_url: 'https://img.shoufaw.com/wp-content/uploads/2020/10/aEjURn.jpg',
    acvatar_url_0: 'https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2021/08/12/realtime/13315182.jpg',
  },
  comments: [
    {
      id: 10,
      tweet_id: 6,
      user: {
        id: 2,
        username: 'admin',
        nickname: 'IUShadow',
        avatar_url: 'https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2021/08/12/realtime/13315182.jpg',
      },
      created_at: '2022-02-15T04:38:34.078407Z',
      content: 'I wanna make a test, I wanna make a test, I wanna make a test, I wanna make a test, I wanna make a test, I wanna make a test',
      likes_count: 1110,
      has_liked: false,
    },
  ],
  created_at: '2022-02-15T04:38:34.078407Z',
  content: 'I wanna make a test, I wanna make a test, I wanna make a test, I wanna make a test, I wanna make a test, I wanna make a testI wanna make a test, I wanna make a test, I wanna make a test, I wanna make a test, I wanna make a test, I wanna make a test I wanna make a test, I wanna make a test, I wanna make a test, I wanna make a test, I wanna make a test, I wanna make a testI wanna make a test, I wanna make a test, I wanna make a test, I wanna make a test, I wanna make a test, I wanna make a test',
  comments_count: 10,
  likes_count: 10,
  has_liked: true,
  photo_urls: [
    'https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2021/08/12/realtime/13315182.jpg',
    'https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2021/08/12/realtime/13315182.jpg',
    'https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2021/08/12/realtime/13315182.jpg',
    'https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2021/08/12/realtime/13315182.jpg',
  ],
};
/**
*
*/
const Tweet = () => {
  const [data, setData] = useState(defaultTweet);
  const [, setStore] = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    setData(defaultTweet);
    setStore({ closeHeaderHandler: () => navigate('/') });
  }, []);
  return (
    <div className={style.container}>
      <div className={style.contentContainer}>
        <div className={style.header}>
          <img src={data.user.avatar_url} alt="" className={style.avatar} />
          <div className={style.right}>
            <div className={style.nickname}>
              {data.user.nickname}
            </div>
            <div className={style.username}>
              @
              {data.user.username}
            </div>
          </div>
        </div>
        <div className={style.content}>
          {data.content}
        </div>
        <div className={style.photo}>
          <ImageCard imgs={data.photo_urls} />
        </div>
        <div className={style.time}>
          {
            moment(data.created_at).format('h:m A  ~ YYYY/MM/DD')
          }
        </div>
        <div className={style.bar}>
          <Bar
            commentsCount={data.comments_count}
            likesCount={data.likes_count}
            id={data.id}
            type={OBJECT_KEYS.TWEET}
          />
        </div>
      </div>
      {data.comments.map((item) => (<CommentCard key={item.id} data={item} />))}
    </div>
  );
};

export default Tweet;
