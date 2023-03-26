import Avatar from '@components/Avatar';
import Bar from '@components/Bar';
import { OBJECT_KEYS } from '@components/Bar/constants';
import ImageCard from '@components/ImageCard';
import { getComments } from '@services/comments';
import { getUser } from '@services/users';
import { getTweets } from '@services/tweet';
import { timeDiff } from '@utils/index';
import PropTypes from 'prop-types';
import { generatePath, useNavigate } from 'react-router-dom';
import style from './index.module.scss';

/**
*
*/
const TweetCard = ({
  dataSource,
}) => {
  const nav = useNavigate();

  const handleTweetClick = async () => {
    const tweetID = dataSource.id;
    const res = await getComments(tweetID);
    const link = generatePath('/tweet/:id', { id: tweetID });
    nav(link, { state: { passedData: dataSource, comments: res } });
  };

  const handleAvatarClick = async () => {
    const userID = dataSource.user.id;
    const res = await getTweets(userID);
    const user = await getUser(userID);
    nav('/profile', { state: { passedData: res, isMy: false, currentUser: user } });
  };

  return (
    <div className={style.container}>
      <Avatar
        key="avatarUrl"
        avatarUrl={dataSource.user?.avatar_url}
        onClick={handleAvatarClick}
      />
      <div className={style.contentContainer}>
        <div className={style.header}>
          <span className={style.nickname}>
            {dataSource.user.nickname}
          </span>
          @
          <span className={style.username}>
            {dataSource.user.username}
          </span>
          &nbsp;~&nbsp;
          {timeDiff(dataSource.created_at)}
        </div>
        <div className={style.content} onClick={handleTweetClick}>
          {dataSource.content}
        </div>
        <div className={style.photo}>
          {dataSource.photo_urls.length > 0
            && <ImageCard imgs={dataSource.photo_urls} />}
        </div>
        <div className={style.bar}>
          <Bar
            commentsCount={dataSource.comments_count}
            likesCount={dataSource.likes_count}
            id={dataSource.id}
            type={OBJECT_KEYS.TWEET}
            hasLiked={dataSource.has_liked}
            dataSource={dataSource}
          />
        </div>
      </div>
    </div>
  );
};

TweetCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  dataSource: PropTypes.object.isRequired,
};
export default TweetCard;
