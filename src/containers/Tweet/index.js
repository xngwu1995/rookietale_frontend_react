import ImageCard from '@components/ImageCard';
import { useEffect } from 'react';
import Bar from '@components/Bar';
import moment from 'moment';
import CommentCard from '@components/CommentCard';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '@utils/context';
import { OBJECT_KEYS } from '@components/Bar/constants';
import style from './index.module.scss';

/**
*
*/
const Tweet = () => {
  const [, setStore] = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const tweetDetails = location.state?.passedData;
  const commentDetails = location.state?.comments;

  useEffect(() => {
    setStore({ closeHeaderHandler: () => navigate('/') });
  }, []);

  return (
    <div className={style.container}>
      <div className={style.contentContainer}>
        <div className={style.header}>
          <img src={tweetDetails.user?.avatar_url} alt="" className={style.avatar} />
          <div className={style.right}>
            <div className={style.nickname}>
              {tweetDetails.user?.nickname}
            </div>
            <div className={style.username}>
              @
              {tweetDetails.user?.username}
            </div>
          </div>
        </div>
        <div className={style.content}>
          {tweetDetails.content}
        </div>
        <div className={style.photo}>
          {tweetDetails.photo_urls.length > 0
            && <ImageCard imgs={tweetDetails.photo_urls} />}
        </div>
        <div className={style.time}>
          {
            moment(tweetDetails.created_at).format('h:m A  ~ YYYY/MM/DD')
          }
        </div>
        <div className={style.bar}>
          <Bar
            commentsCount={tweetDetails.comments_count}
            likesCount={tweetDetails.likes_count}
            id={tweetDetails.id}
            type={OBJECT_KEYS.TWEET}
            hasLiked={tweetDetails.has_liked}
            dataSource={tweetDetails}
          />
        </div>
      </div>
      {commentDetails && commentDetails.comments.map(
        (item) => (<CommentCard key={item.id} data={item} />),
      )}
    </div>
  );
};

export default Tweet;
