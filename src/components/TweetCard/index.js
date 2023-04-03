import Avatar from '@components/Avatar';
import Bar from '@components/Bar';
import { OBJECT_KEYS } from '@components/Bar/constants';
import ImageCard from '@components/ImageCard';
import { useAppContext } from '@utils/context';
import { getUser } from '@services/users';
import { timeDiff } from '@utils/index';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useGoTo } from '@utils/hooks';
import style from './index.module.scss';

/**
*
*/
const TweetCard = ({
  dataSource,
}) => {
  const [store] = useAppContext();
  const nav = useNavigate();
  const go = useGoTo();

  const handleTweetClick = () => {
    const tweetID = dataSource.id;
    go('tweet', { id: tweetID });
  };

  const handleAvatarClick = async () => {
    const userID = dataSource.user.id;
    const user = await getUser(userID);
    const isMy = store.user?.id === userID;
    nav('/profile', { state: { isMy, user } });
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
            key={dataSource.id}
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
  dataSource: PropTypes.shape({
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      avatar_url: PropTypes.string,
      nickname: PropTypes.string,
      username: PropTypes.string,
    }).isRequired,
    comments_count: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    has_liked: PropTypes.bool.isRequired,
    likes_count: PropTypes.number.isRequired,
    photo_urls: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default TweetCard;
