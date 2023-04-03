import ImageCard from '@components/ImageCard';
import { useEffect, useState } from 'react';
import Bar from '@components/Bar';
import { timeDiff } from '@utils/index';
import CommentCard from '@components/CommentCard';
import { useParams } from 'react-router-dom';
import { useGoTo } from '@utils/hooks';
import { useAppContext } from '@utils/context';
import { OBJECT_KEYS } from '@components/Bar/constants';
import { getTweetDetails } from '@services/tweet';
import style from './index.module.scss';

/**
*
*/
const Tweet = () => {
  const [, setStore] = useAppContext();
  const [tweetDetails, setTweetDetails] = useState('');
  const [commentDetails, setCommentDetails] = useState({});
  const go = useGoTo();
  const params = useParams();
  const tweetID = params.id;

  const init = async () => {
    const tweets = await getTweetDetails(tweetID);
    setTweetDetails(tweets);
    setCommentDetails(tweets.comments);
  };

  useEffect(() => {
    setStore({ closeHeaderHandler: () => go('/') });
    init();
  }, []);

  return (
    <div className={style.container}>
      <div className={style.contentContainer}>
        <div className={style.header}>
          <img src={tweetDetails.user?.avatar_url} alt="" className={style.avatar} />
          <div className={style.rightPart}>
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
          {tweetDetails.photo_urls?.length > 0
            && <ImageCard imgs={tweetDetails.photo_urls} />}
        </div>
        <div className={style.time}>
          {
            timeDiff(tweetDetails.created_at)
          }
        </div>
        <div className={style.bar}>
          <Bar
            key={tweetDetails.id}
            commentsCount={tweetDetails.comments_count}
            likesCount={tweetDetails.likes_count}
            id={tweetDetails.id}
            type={OBJECT_KEYS.TWEET}
            hasLiked={tweetDetails.has_liked}
            dataSource={tweetDetails}
          />
        </div>
      </div>
      {commentDetails.length > 0 && commentDetails.map(
        (item) => (<CommentCard key={item.id} data={item} />),
      )}
    </div>
  );
};

export default Tweet;
