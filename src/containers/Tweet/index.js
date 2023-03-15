import ImageCard from '@components/ImageCard';
import { useState, useEffect } from 'react';
import Bar from '@components/Bar';
import moment from 'moment';
import CommentCard from '@components/CommentCard';
import { getTweetDetails } from '@services/tweet';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '@utils/context';
import { OBJECT_KEYS } from '@components/Bar/constants';
import style from './index.module.scss';

/**
*
*/
const Tweet = () => {
  const tweetId = useParams();
  const [data, setData] = useState('');
  const [, setStore] = useAppContext();
  const navigate = useNavigate();
  const init = async () => {
    const res = await getTweetDetails(tweetId.id);
    setData(res);
  };
  useEffect(() => {
    init();
    setStore({ closeHeaderHandler: () => navigate('/') });
  }, []);
  return (
    <div className={style.container}>
      <div className={style.contentContainer}>
        <div className={style.header}>
          <img src={data.user?.avatar_url} alt="" className={style.avatar} />
          <div className={style.right}>
            <div className={style.nickname}>
              {data.user?.nickname}
            </div>
            <div className={style.username}>
              @
              {data.user?.username}
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
            hasLiked={data.has_liked}
          />
        </div>
      </div>
      {data.comments.map((item) => (<CommentCard key={item.id} data={item} />))}
    </div>
  );
};

export default Tweet;
